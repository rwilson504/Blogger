# Securely Connecting Azure DevOps (Commercial) to GCC High Storage with Managed Identity Federation

## Introduction

The goal of this setup is to allow an **Azure DevOps pipeline running in the Commercial cloud** to move files (e.g., build artifacts, documentation, or deployment packages) into a **Storage Account in GCC High**. Because these are two different clouds, the connection must be established carefully to remain **secure, compliant, and tenant-scoped**.

Although this guide is written for **Commercial → GCC High**, the same approach can also be used for **file transfers between Commercial environments** or even **across tenants within Commercial Azure**. By relying on **federated credentials** instead of secrets, the process ensures secure, governed transfers that honor existing Azure AD (Entra ID) boundaries.

To achieve this, we use an **Azure User Assigned Managed Identity (UAMI)** in the target environment, link it with **Workload Identity Federation** from Azure DevOps (Commercial), and grant it the **minimum necessary roles**. This way, files can flow between environments without storing long-lived secrets or keys.

## Key Placeholders to Fill In
This is the list of the placeholder for all of the azure resources and connection string we will need during the setup process.  This can be helpful when going through the instructions below.

**From GCC High Azure Portal ([https://portal.azure.us/](https://portal.azure.us/))**

* `<<gcc-subscription-id>>`
* `<<gcc-subscription-name>>`
* `<<gcc-resource-group-name>>`
* `<<gcc-storage-account-name>>`
* `<<gcc-storage-container-name>>`
* `<<gcc-container-name>>`
* `<<gcc-managed-identity-name>>`
* `<<gcc-managed-identity-client-id>>`
* `<<gcc-federated-credential-name>>`
* `<<gcc-tenant-id>>`

**From Azure DevOps / Commercial Azure Portal ([https://portal.azure.com/](https://portal.azure.com/))**

* `<<commercial-issuer-url-from-ADO>>`
* `<<commercial-subject-id-from-ADO>>`
* `<<commercial-service-connection-name>>`

## Step 1 — Create a Storage Account in GCC High

1. In the **[GCC High Azure Portal](https://portal.azure.us/)**, create a new **Storage Account**.

   * Resource Group: `<<gcc-resource-group-name>>`
   * Type: **Blob Storage (Gen2)**
   * Name: `<<gcc-storage-account-name>>`
2. Note the **subscription ID** (`<<gcc-subscription-id>>`) and **resource group name** for later use.
3. Create a container within the storage acocunt.
   * Name: <<gcc-storage-container-name>>

## Step 2 — Create a Managed Identity in GCC High

1. In the **[GCC High Azure Portal](https://portal.azure.us/)**, within the same **Resource Group** (`<<gcc-resource-group-name>>`), create a **User Assigned Managed Identity (UAMI)**.

   * Name: `<<gcc-managed-identity-name>>`
2. Copy the **Client ID** (`<<gcc-managed-identity-client-id>>`) and **Object ID**.

## Step 3 — Assign Roles to the Managed Identity

1. At the **Subscription** level (`<<gcc-subscription-id>>`):

   * Go to **Access Control (IAM)** → **Add Role Assignment**
   * Role: **Reader**
   * Assign to: `<<gcc-managed-identity-name>>`
2. At the **Storage Account** level (`<<gcc-storage-account-name>>` in `<<gcc-resource-group-name>>`):

   * Add **Role Assignment**
   * Role: **Storage Blob Data Contributor**
   * Assign to: `<<gcc-managed-identity-name>>`

## Step 4 — Begin Service Connection Setup in Azure DevOps (Commercial)

1. In the **[Commercial Azure Portal](https://portal.azure.com/)**, go to **Azure DevOps → Project Settings → Service Connections**.
2. Create a new **Azure Resource Manager** service connection.
3. Configure the wizard as follows:

   * **Identity Type:** *App registration or Managed Identity (Manual)*
   * **Credential:** *Workload Identity Federation*
   * **Environment:** *Azure US Government*
   * **Directory Tenant ID:** `<<gcc-tenant-id>>` (from GCC High tenant)

## Step 5 — Configure Federated Credentials (Exchange Between ADO & GCC High)

1. From the ADO wizard (Commercial), copy the:

   * **Issuer URL** → `<<commercial-issuer-url-from-ADO>>`
   * **Subject Identifier** → `<<commercial-subject-id-from-ADO>>`
2. In the **[GCC High Azure Portal](https://portal.azure.us/)** → **Managed Identity** (`<<gcc-managed-identity-name>>` in `<<gcc-resource-group-name>>`):

   * Go to **Federated Credentials → Add Credential**
   * Scenario: **Other**
   * Issuer: `<<commercial-issuer-url-from-ADO>>`
   * Subject Identifier: `<<commercial-subject-id-from-ADO>>`
   * Name: `<<gcc-federated-credential-name>>`
   * Audience: keep default (`api://AzureADTokenExchange`)

## Step 6 — Complete Service Connection in ADO (Commercial)

1. Back in ADO’s **Service Connection Wizard**:

   * Scope level: **Subscription**
   * Subscription ID: `<<gcc-subscription-id>>`
   * Subscription Name: `<<gcc-subscription-name>>`
   * Authentication → Client ID: `<<gcc-managed-identity-client-id>>`
2. **Important:** Uncheck *Grant access permissions to all pipelines*.
3. Click **Verify and Save**.

## Step 6a — Approve pipeline to use the service connection

1. In ADO (Commercial) go to **Project Settings → Service connections → `<<commercial-service-connection-name>>`**.
2. Open **Security**.
3. Under **User permissions**, explicitly grant access to the **project** and/or the **specific pipeline** that will run this connection.

   * Option A (recommended): Add the **build pipeline** or its **build service account** (e.g., `Project Name Build Service (Organization)`), set **Use** permission to **Allow**.
   * Option B: Add the **Project Contributors** group if you want broader use.
4. Save.
5. Alternative: If you try to run the pipeline without this step, ADO will pause with “**Needs approval**.” You can approve it from the run page, but configuring Security first is cleaner.

## Step 7 — Test the Connection

1. In ADO (Commercial), create a new **repository** with a single file `README.md`.
2. Create a new **Pipeline** pointing to this repo.

   * Agent pool: `windows-latest`
3. Add an **Azure File Copy** task to the pipeline.

   * Source Path: `README.md`
   * Azure Subscription: `<<commercial-service-connection-name>>`
   * Destination: **Azure Blob Storage**
   * Storage Account: `<<gcc-storage-account-name>>` (in `<<gcc-resource-group-name>>`)
   * Container: `<<gcc-container-name>>`

     Here is an example pipline.  Make sure to replace the placeholders in the AzureFileCopy@6 tasks based on the names you used earlier
     ```
     # Example pipeline to copy README.MD file
      trigger:
      - master
      
      pool:
        vmImage: windows-latest
      
      steps:
      - script: echo Lets copy a file!
        displayName: 'Run a one-line script'
      
      - task: AzureFileCopy@6
        inputs:
          SourcePath: 'README.MD'
          azureSubscription: '<<commercial-service-connection-name>>'
          Destination: 'AzureBlob'
          storage: '<<gcc-storage-account-name>>'
          ContainerName: '<<gcc-storage-container-name>>'
     ```
4. Run the pipeline.

   * If you did not complete Step 6a, approve the service connection usage when prompted.
   * ✅ Verify `README.md` appears in the GCC High Storage Blob container.
  
