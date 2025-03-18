# Automating Azure Storage Account IP Restrictions with a Custom Connector

## Introduction

When managing Azure Storage Accounts, it's essential to control access by restricting allowed IP addresses. Manually updating these restrictions can be cumbersome, especially when dealing with frequently changing IP ranges. To address this challenge, I developed a Power Automate custom connector that automates fetching and processing Azure IP ranges using Microsoft's **Azure IP Ranges and Service Tags** JSON files.

While my initial use case focused on automating Azure IP Ranges and Service Tags, this solution can also be adapted to work with **custom lists of IP addresses**. Many of the actions in this connector, such as reducing CIDR blocks and generating IP rules, can be applied to any list of IP addresses. This allows users to integrate their own IP management workflows and leverage the **Azure Management API** to dynamically update firewall rules.

I collaborated with [Chris Chin](https://www.linkedin.com/in/chinchris/) to refine this idea, ultimately simplifying the process of updating storage account firewall rules dynamically.

## The Challenge

I needed to update an **Azure Storage Container's** IP restrictions to allow specific Azure service IPs. The IP addresses I required were within Microsoft's downloadable JSON file for Azure IP Ranges and Service Tags ([available here](https://www.microsoft.com/en-us/download/details.aspx?id=56519)). The problem?

- The file name changes monthly, making it impossible to use a static link.
- The storage account IP restriction rules have a maximum CIDR prefix of **/30**, requiring filtering.
- The JSON file includes overlapping CIDR ranges, which needed optimization.
- **Azure Storage Accounts only support 400 IP rules** ([limit reference](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security?tabs=azure-portal#grant-access-from-an-internet-ip-range)), so it’s necessary to check for and eliminate overlapping CIDRs to reduce the number of rules.

## The Solution: A Power Automate Custom Connector

To automate this process, I created a **Power Automate custom connector** that performs the following:

1. **Fetches the latest download link** from the Microsoft website by scraping the URL dynamically.
2. **Downloads the JSON file** and extracts the IP ranges associated with specified service tags.
3. **Filters CIDR blocks** to ensure no prefixes larger than `/30` are included.
4. **Reduces redundant CIDR ranges**, keeping only the most efficient set.
5. **Generates an array of IP Rules** formatted for use in Azure Management API.
6. **Updates the Azure Storage Account's firewall rules** using an HTTP PATCH request.

## How It Works

The Power Automate flow consists of the following steps:

1. **Retrieve the latest download URL** using the `GetDirectDownloadUrl` action.
   ![image](https://github.com/user-attachments/assets/322d96f9-8b60-45f1-bbd2-1de204c9f4a5)
3. **Extract service tags and IP addresses** using the `GetIPAddressesByServiceTag` action.
   ![image](https://github.com/user-attachments/assets/ee5268dd-4833-4392-9114-88501baddf8c)
4. **Filter CIDR ranges** using `CIDRReducer`, ensuring only `/30` or smaller prefixes are included.  This action also included an output for Reduced Count, so you can check to make sure your IP addresses are less than 400 at this point.
   ![image](https://github.com/user-attachments/assets/284cd25c-aeaa-4d91-ae1e-f4b1df59de47)
5. **Generate IP rules** using `GenerateIPRules`, formatting them for Azure Storage firewall.
   ![image](https://github.com/user-attachments/assets/233f5236-fa9a-4023-98ad-a6363df7d665)
6. **Compose the request body** for the Azure Management API with `defaultAction` set to `Deny` and `ipRules` containing the allowed list.
   ![image](https://github.com/user-attachments/assets/d02a764a-2a64-4c40-87b4-52f25fe4f26f)
8. **Call the Azure Management API** via an HTTP PATCH request to update the storage account settings.
   ![image](https://github.com/user-attachments/assets/9d96ff8f-c52b-419a-8641-075b588e4b62)

Overall flow diagram generated using [PowerDocu](https://github.com/modery/PowerDocu)  
![flow-detailed](https://github.com/user-attachments/assets/4ecf05a0-740e-455d-a0b8-5d75b508d22d)


### API Call Example

To update the **storage account firewall**, I used the following API request:

```http
PATCH https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{storageAccountName}?api-version=2024-01-01
```

For **GCC or GCCH**, use:

```http
PATCH https://management.usgovcloudapi.net/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{storageAccountName}?api-version=2024-01-01
```

The authentication method used was **App Registration**, with the `Storage Account Contributor` role assigned.

## Prerequisites

Before using this solution, you'll need to set up an **App Registration** in Azure Active Directory and assign it the necessary permissions on the Azure Storage Account.

### 1. Create an App Registration

1. Navigate to **Azure Active Directory** in the Azure Portal.
2. Select **App registrations** > **New registration**.
3. Enter a name and select the appropriate supported account types.
4. Click **Register**.

### 2. Generate Client Credentials

1. In the App Registration, navigate to **Certificates & secrets**.
2. Click **New client secret**, enter a description, and set an expiration date.
3. Copy the generated secret value (it won’t be shown again).

### 3. Assign Role to the Storage Account

1. Navigate to your **Azure Storage Account**.
2. Go to **Access Control (IAM)** > **Role assignments**.
3. Click **Add role assignment**.
4. Select **Storage Account Contributor**.
5. Assign the role to your App Registration.

Once set up, this App Registration will authenticate API calls to update storage firewall rules.

## Deploying the Connector in Power Platform

You can install this solution by downloading and importing the provided **solution file** or by manually using the **PACONN** or **PAC CLI** tools.

### 1. Install Using Solution File

You can directly download and import the Power Platform solution file:

- **Download Solution File:** [AzureIPAddressesCustomConnector\_1\_0\_0\_1.zip](https://github.com/rwilson504/PowerAutomateConnectors/raw/refs/heads/main/Azure%20IP%20And%20Service%20Tags/AzureIPAddressesCustomConnector_1_0_0_1.zip)
- **Import into Power Automate:**
  1. Go to **Power Apps** > **Solutions**.
  2. Click **Import Solution**.
  3. Upload the downloaded `.zip` file.
  4. Follow the prompts to complete the import.

### 2. Manually Import Using PACONN

If you prefer using the **PACONN CLI** tool, follow these steps:

- Install the **Power Platform CLI** (`paconn`) following [this guide](https://learn.microsoft.com/en-us/connectors/custom-connectors/paconn-cli#create-a-new-custom-connector).
- Use the following command to import the connector:
  ```sh
  paconn create --api-definition apiDefinition.swagger.json --icon icon.png --script script.c
  ```
  This connector includes a **code file**, so you must use the `--script` option.

### 3. Manually Import Using PAC CLI

Alternatively, you can use the **Power Platform CLI (PAC CLI)**:

- Install the **PAC CLI** following [this guide](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/connector#pac-connector-create).
- Use the following command:
  ```sh
  pac connector create --api-definition apiDefinition.swagger.json --script-file script.c
  ```
  The `--script-file` option is required since this connector includes a custom script.

👉 [GitHub Repository](https://github.com/rwilson504/PowerAutomateConnectors/tree/main/Azure%20IP%20And%20Service%20Tags)

## Conclusion

By leveraging Power Automate and a custom connector, I eliminated the need for manual updates to Azure Storage firewall rules. This solution dynamically fetches the latest IP ranges, optimizes CIDR blocks, and seamlessly updates the storage account via API—all without requiring user intervention.

Big thanks to [Chris Chin](https://www.linkedin.com/in/chinchris/) for helping refine this approach!

