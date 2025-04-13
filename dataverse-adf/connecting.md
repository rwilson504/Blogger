![Connecting to Dataverse from Azure Data Factory](https://github.com/user-attachments/assets/d5f7a240-e1a7-472c-af1f-d62cde8fff8c)

## Introduction

Azure Data Factory (ADF) provides versatile ways to connect and interact with Dataverse. Understanding the connection options and configurations is crucial for securely and efficiently managing your data integration tasks. This guide walks through the primary methods for connecting Azure Data Factory to Dataverse, covering their benefits, best practices, and detailed walkthroughs to get you started. provides versatile ways to connect and interact with Dataverse. Understanding the connection options and configurations is crucial for securely and efficiently managing your data integration tasks. This guide walks through the primary methods for connecting Azure Data Factory to Dataverse, covering their benefits, best practices, and detailed walkthroughs to get you started.

*Disclaimer: These thoughts are my own and based on my personal experience. If you have different ideas or approaches, I’d love to hear them—I’m always eager to learn more from others in the community.*

## Connection Types

There are three main ways to connect Azure Data Factory to Dataverse: the REST API, the built-in Dataverse connector, and the OData connector. Each method offers unique advantages depending on your use case. Personally, I prefer using the REST API because it offers the greatest amount of flexibility. While it may require some additional configuration—like setting pagination rules or custom headers—it enables capabilities that are simply not possible with the Dataverse connector, such as returning additional metadata, bypassing plugins, or impersonating users.

### REST API

Connecting via the Dataverse REST API gives you detailed control over the data retrieval process, including the ability to return formatted values and metadata for lookups. More on Microsoft Learn: [https://learn.microsoft.com/en-us/azure/data-factory/connector-rest?tabs=data-factory](https://learn.microsoft.com/en-us/azure/data-factory/connector-rest?tabs=data-factory)

**Advantages:**

- Ability to invoke custom actions or functions on records, enabling powerful server-side operations within the same integration flow.
- Richer data retrieval with annotations. [Request Annotations](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/compose-http-requests-handle-errors#request-annotations)
- Complete control over data requests.
- Returns all fields, including those with null values if you use specify those fields in the \$select, this can be helpful when building projections if not all of your records contains data.
- Allows setting custom headers such as CallerObjectId for impersonating users (with appropriate permissions) and MSCRM.BypassCustomPluginExecution	 to bypass plugins. More info: [Other Headers](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/compose-http-requests-handle-errors#other-headers)
- Supports FetchXML queries in addition to OData for advanced querying scenarios.
- FetchXML Builder in XrmToolBox can be used to craft FetchXML queries and even convert them into OData format.

**Considerations:**

- Generating the request body for POST or PATCH operations (such as updates) can be more cumbersome and error-prone compared to the built-in Dataverse connector.
- Requires handling JSON transformations.
- You must configure pagination rules to retrieve more than 5,000 records (to be discussed in a future article).
- Ideal for complex scenarios where pipeline lookups fall short.

### Dataverse Connector

The built-in Dataverse connector simplifies connectivity and basic data operations with minimal configuration. More on Microsoft Learn: [https://learn.microsoft.com/en-us/azure/data-factory/connector-dynamics-crm-office-365?tabs=data-factory](https://learn.microsoft.com/en-us/azure/data-factory/connector-dynamics-crm-office-365?tabs=data-factory)

**Advantages:**

- Easy setup with minimal configuration.
- Convenient for simple scenarios and basic CRUD operations.
- When used in Data Flows, it automatically handles pagination and retrieves more than 5,000 records without additional configuration.

**Considerations:**

- Limited control over annotations and formatted data.
- Fields with null values are not returned, making it difficult to detect missing data in pipeline activities.

### OData

OData offers a standardized protocol for interacting with Dataverse, beneficial for interoperability and standardized queries. More on Microsoft Learn: [https://learn.microsoft.com/en-us/azure/data-factory/connector-odata](https://learn.microsoft.com/en-us/azure/data-factory/connector-odata)

**Advantages:**

- Standardized query syntax since it is using the REST API.
- Interoperable with multiple tools.

**Considerations:**

- Limited functionality compared to the REST API.
- Does not support Managed Identity authentication, limiting secure integration options.

## Security Considerations

Each of the connector types discussed above supports different authentication methods. The Dataverse connector and OData connector primarily rely on Azure Active Directory-based service principal authentication. The REST API offers greater flexibility by supporting both service principal and Managed Identity configurations, and it allows you to include custom headers for additional control.

In this article, I focus on using **Managed Identity**, as it is my preferred method for securing connections. Managed Identity provides credential-free authentication, reduces the risk of secrets exposure, and integrates cleanly with Azure resources. The REST API allows you to use either a System-assigned or a User-assigned Managed Identity, giving flexibility based on your identity management preferences. The Dataverse connector, on the other hand, only supports User-assigned Managed Identities. I typically choose User-assigned identities regardless, as they provide clearer control and traceability across enterprise environments. This article will focus on how to configure and assign a User-assigned identity for this integration. as it is my preferred method for securing connections. 
### Managed Identities

Managed identities offer secure, credential-free access to Dataverse from ADF.

- **User-assigned Managed Identity:** Preferred due to clear management and reusability.
- Ensure appropriate Dataverse security roles are assigned directly.

**Walkthrough: Creating and Assigning a Managed Identity**

1. In the Azure Portal, create a new **User-assigned Managed Identity**.
   ![image](https://github.com/user-attachments/assets/942a3dd3-e14c-4d86-9bae-d3a7e5e1f869)
   
2. Navigate to your Azure Data Factory resource.
3. Under **Settings**, select **Managed identities** and then click **+ Add user-assigned managed identity**.
   ![image](https://github.com/user-attachments/assets/48532949-acd7-4552-b4a7-8898c13808d4)
   
4. Select the newly created identity and add it to your ADF instance.
   ![image](https://github.com/user-attachments/assets/45978f65-2825-4156-87ee-96e43fcb5844)
   
5. Go to Azure Active Directory and assign the identity to your Dataverse environment if needed.
6. In the Power Platform admin center, assign the identity a security role (e.g., System Administrator or a custom role with required privileges).

### Security Roles in Dataverse

Assigning security roles in Dataverse is essential to ensure that your ADF-managed identities can access and perform the operations they require.

**Walkthrough: Assigning a Security Role to a Managed Identity**

1. Go to the **Power Platform Admin Center** and open the **Environments** section.
2. Click on the environment you want to assign access to.
3. Select the **S2S Apps** tab to manage Server-to-Server (S2S) app users.
   ![image](https://github.com/user-attachments/assets/ed95b971-409f-49f2-9890-05ec68b85210)

4. Click **+ Add an app user** to begin adding your Managed Identity.  
   **Important:** When searching for your Managed Identity, search by **Object ID**, not the display name, as it may not appear otherwise.  
   ![image](https://github.com/user-attachments/assets/b5023dca-4f60-49c1-b6d2-cfd5562e1274)

5. Select a **Business Unit** if prompted.
   ![image](https://github.com/user-attachments/assets/7f7c4f1b-d664-4605-b8ac-73e55fbd6509)

6. Choose a **Security Role** to grant the necessary permissions.
    ![image](https://github.com/user-attachments/assets/bdfb2220-8a0e-457b-8cbb-cc932c80f210)  

Although the screenshot example shows assigning the **System Administrator** role, I typically recommend creating a tailored security role that grants only the permissions needed for your ADF activities. This promotes better security hygiene and minimizes risk.

- Configure roles precisely to maintain a strong security posture.


### Using the Credentials in Azure Data Factory

Once your User-assigned Managed Identity has been created and assigned the proper security role in Dataverse, the next step is to use it within Azure Data Factory.

**Walkthrough: Connecting with Managed Identity in ADF**

1. In Azure Data Factory, go to **Manage > Linked services** and click **+ New** to create a new connection.
2. Select your connector type (e.g., REST or Dataverse) and begin configuring the connection.
   ![image](https://github.com/user-attachments/assets/dc72da9a-68a9-4b1a-ab3d-a5fa19e35294)
   
3. When prompted for authentication, choose **Managed Identity** and click **+ New** to create a credential.
   ![image](https://github.com/user-attachments/assets/074e354b-12bd-4471-af49-9cd4081ac949)

4. Select **User-assigned managed identity** from the dropdown and pick the identity previously created and assigned roles.
   ![image](https://github.com/user-attachments/assets/815e7076-dd6d-43b1-a474-b85371fe7c35)

With these steps, your ADF pipelines and data flows will be able to securely access Dataverse using the configured Managed Identity.

## Best Practices

- Choose REST API for detailed, annotation-rich data access and complex transformations, especially when you need access to all fields including nulls.
- Opt for Dataverse Connector for straightforward data integration scenarios and automatic pagination in Data Flows.

## Conclusion

Selecting the right connection method and properly configuring security ensures efficient, secure, and robust data integrations between Azure Data Factory and Dataverse.

This article includes detailed walkthroughs to guide you through setting up your Managed Identity and assigning security roles in Dataverse.

**Next Steps:**
Stay tuned for hands-on examples and step-by-step configurations for each connection method.

**Have questions or insights?** Drop your comments below and let's discuss!

