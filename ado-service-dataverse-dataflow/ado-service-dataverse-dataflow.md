# Syncing Azure DevOps Work Item States to Microsoft Dataverse with Power BI Dataflows

In today’s fast-paced development environments, seamless integration between customer service and development tracking systems is crucial for maintaining transparency, efficiency, and alignment across teams. Our objective centers around a common scenario faced by many organizations: **synchronizing customer requirements captured by service staff in Microsoft Dataverse with the development work tracked in Azure DevOps (ADO)**. 

## Business Case and Goals

Our service teams interact with customers to capture requirements, which are then stored in Microsoft Dataverse. As development plans are formulated, corresponding ADO items are created for each requirement. The primary goals of our integration efforts are:

1. **Visibility for Service Staff:** Enable service teams to view the status of the ADO items associated with customer requirements directly within Dataverse. This integration aims to eliminate the need for service staff to navigate away from their primary system to check development progress, fostering a more efficient and cohesive workflow.

2. **Enhanced Reporting Capabilities:** By syncing ADO item statuses with Dataverse, we unlock the potential for advanced querying capabilities within Dataverse. This allows for the creation of detailed reports and analytics on development progress, directly correlating customer requirements with development statuses.

3. **Streamlined Operations:** The integration ensures that information flow between customer service and development teams is automated and streamlined. This not only saves time but also reduces the potential for errors in tracking and reporting on the progress of development work against customer requirements.

By achieving these goals, we aim to enhance the operational efficiency of our teams, improve the accuracy of our reporting, and ultimately deliver a better service experience to our customers. The following sections detail the technical journey we embarked on to realize this integration, navigating through authentication challenges, API limitations, and leveraging Power BI Dataflows as a creative solution to synchronize ADO Work Items with Microsoft Dataverse.

## The Challenge

Our objective to synchronize specific ADO Work Item fields with a Dataverse table for enriched reporting introduced a multifaceted set of challenges:

1. **Authentication with Personal Access Token (PAT):** Although ADO supports various authentication methods, our scenario necessitated the use of a PAT for its flexibility and security. Integrating this with Dataverse Dataflows presented an initial obstacle, as these dataflows do not natively support basic authentication, which is essential when using PATs.

2. **Inconsistent Behavior in Authentication:** Initial attempts to directly set the Authorization header in the `Web.Contents` function and configure the connection as Anonymous were met with errors, reporting incorrect credentials. This issue underscored the subtle complexities of handling authentication within Power BI and Dataverse integrations.
   
3. **Challenges with Data Source Configuration:** Adding a new data source via the Web API connector and attempting to use the PAT solely in the password field (leaving the username empty) resulted in invalid credentials errors. However, starting with a blank query and then incorporating the `Web.Contents` function with Basic authentication—using only the PAT for authentication—eventually proved successful. This discovery process highlighted the trial and error involved in establishing a viable authentication method.

4. **API Limitations:** The `wit/workitemsbatch` endpoint, ideal for our purposes, does not support `POST` requests when authenticating with basic authentication via the `Web.Contents` function in M code. This limitation, along with a constraint on processing only 200 records at a time, required a strategic approach to batch processing and API requests.

5. **Absence of a Direct Azure DevOps Connector in Dataflows:** Unlike Power BI Desktop, Dataflows lacks an out-of-the-box connector for Azure DevOps, adding an extra layer of complexity. This required us to utilize the Azure DevOps REST API, a robust yet initially daunting interface for those unfamiliar with its intricacies. Learning to navigate and effectively leverage the REST API took time but was essential for achieving our integration goals.

For comprehensive guidance on utilizing the Azure DevOps REST API, including accessing work items, repositories, and other essential services, refer to the official API documentation: [Azure DevOps Services REST API Reference](https://learn.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-7.2&viewFallbackFrom=azure-devops-rest-7.1).

## The Solution

Despite these obstacles, a solution was crafted through a series of steps, leveraging Power BI Dataflows as an intermediary to handle the data transformation and syncing process.

### Step 1: Create and Configure the PAT

The initial and crucial step in syncing Azure DevOps (ADO) Work Item states with Microsoft Dataverse involves creating a Personal Access Token (PAT) within Azure DevOps. This PAT serves as the authentication mechanism for accessing ADO's APIs securely.

Here’s a step-by-step guide to ensure your PAT is properly configured:

1. **Navigate to Azure DevOps:** Go to your Azure DevOps organization's user settings. 
2. **Access Security:** Find and click on the "Personal access tokens" option under the security settings.
3. **Create New Token:** Select "New Token." Ensure you provide it with a descriptive name that clearly indicates its usage, such as "DataverseSync."
4. **Set Expiry:** Choose an appropriate expiry date for the token according to your project duration and security policies.
5. **Assign Scopes:** Assign the necessary scopes for the PAT. For this integration, you must at least include permissions to read Work Items. If your integration requires accessing other ADO API endpoints, make sure to include those permissions as well.

For a detailed walkthrough on creating a PAT in Azure DevOps, refer to the official documentation available at [Create Personal Access Tokens to authenticate access](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate).

Remember, the PAT is sensitive and should be securely stored. It provides direct access to your Azure DevOps services and should only be shared with trusted individuals and applications.

### Step 2: Implement Power BI Dataflow

After securing your PAT, the next step is to establish a Power BI dataflow that will serve as the intermediary for transferring and transforming data between Azure DevOps (ADO) and Microsoft Dataverse. This involves creating custom functions within Power BI to handle data batching and API calls. Follow these detailed instructions to set up your Power BI dataflow:

![Copmleted Dataflow](https://github.com/rwilson504/Blogger/assets/7444929/1d1a23f1-448c-4c34-acee-b8c51087ac4b)

#### Creating a New Blank Query for Batching

1. **Open Power BI Desktop:** Start by opening Power BI Desktop and navigating to the Data view.
2. **Create a New Query:** Go to the Home tab, click on "Transform Data," and then select "Data Source Settings." Here, choose to create a new blank query by selecting "New Source" > "Blank Query."
3. **Enter the SplitListIntoBatch Function Code:** In the query editor that opens, enter the following M code to create the `SplitListIntoBatch` function. This function is designed to split your data into smaller batches for processing.

```m
// Function to split a list into smaller lists of a given size
(list as list, batchSize as number) as list =>
let
    // Calculate the number of batches
    numBatches = Number.RoundUp(List.Count(list) / batchSize),
    // Generate a list of batches
    batches = List.Transform(
        {0..numBatches - 1}, each List.Skip(list, _ * batchSize) & List.FirstN(list, batchSize)
    )
in
    batches
```

4. **Name Your Query:** Rename the query to `SplitListIntoBatch` by right-clicking on the query name in the left pane and selecting "Rename."

#### Creating the Function for Azure DevOps API Calls

1. **Add Another Blank Query:** Repeat the steps to add a new blank query, this time for making API calls to Azure DevOps.
2. **Enter the GetWorkItems Function Code:** In the new blank query, copy the following M code to create the `GetWorkItems` function. Adjust the `adoOrganization` and `adoProject` variables as necessary for your Azure DevOps instance.

```m
(ids as list) as table =>
let
    // Convert the list of IDs to a comma-separated string
    idsString = Text.Combine(List.Transform(ids, Text.From), ","),

    // Specify the fields to retrieve
    fields = "System.Title,System.State",
    
    //ADO Organization Name
    adoOrganization = "PowerAppsRAW",

    //ADO Project Name
    adoProject = "My%20Project",

    // Set up API URL and headers
    apiUrl = "https://dev.azure.com/" & adoOrganization & "/" & adoProject & "/_apis/wit/workitems",
    headers = [
        #"Content-Type" = "application/json"
    ],
    
    // Make the Get request
    Source = Json.Document(Web.Contents(apiUrl, [
        Headers = headers,
        Query = [
            #"api-version" = "7.1",
            ids = idsString,
            fields = fields
        ]
    ])),
    
    // Convert 'value' array to a table
    workItemsTable = Table.FromList(Source[value], Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    
    // Expand the top-level properties of each work item
    expandedTable = Table.ExpandRecordColumn(workItemsTable, "Column1", {"id", "rev", "fields", "url"}, {"ID", "Revision", "Fields", "URL"}),
    
    // Dynamically expand all fields within the 'Fields' column
    // Get the list of field names dynamically from the first row (assuming consistency across rows)
    fieldNames = Record.FieldNames(expandedTable{0}[Fields]),
    fullyExpandedTable = Table.ExpandRecordColumn(expandedTable, "Fields", fieldNames, fieldNames)
in
    fullyExpandedTable
```

3. **Name Your Query:** This time, rename the query to `GetWorkItems` to reflect its purpose.

After completing these steps, you've successfully created the necessary functions within your Power BI Dataflow. These functions will allow you to batch process your Dataverse data and fetch updated work item information from Azure DevOps, respectively.

## Step 3: Efficiently Combining Data for Synchronization

As we proceed to optimize our synchronization process, it's important to address the configuration needed when actually running the query. This step ensures that we only query Azure DevOps for updates on ADO item IDs present in our Dataverse environment, significantly reducing Azure API usage. Below, we've provided sample code and now include essential guidance on configuring the connection for the Azure DevOps (ADO) URL.

### Efficient Data Fetching and Processing

1. **Initiate Data Retrieval:** Start the process by creating a new query for the `new_customerrequirement` table in Dataverse to identify the specific ADO item IDs that require updates. This step determines the scope of our synchronization efforts.

2. **Apply Batch Processing:** Utilize the `SplitListIntoBatch` function to divide the list of relevant IDs into smaller batches. This approach is crucial for managing API call volume and adhering to Azure DevOps API rate limits.

3. **Fetch Updated Work Item Information:** With each batch, invoke the `GetWorkItems` function to fetch the current status and other pertinent details for the ADO items. Targeting only the IDs identified earlier ensures that our data retrieval is as efficient as possible.

```m
let
    // Connect to dataverse
    Source = CommonDataService.Database("12345.crm.microsoftdynamics.com", [CreateNavigationProperties = true]),
    // Navigate to our table
    #"Navigation 1" = Source{[Shcema="dbo", Item="new_customerrequirement"]}[Data],
    // We will drill down just to the new_adoitemid field so we can pass the entire list to the next step
    #"Drill Down" = #"Navigation 1"[new_adoitemid],
    // Split the list into batches of 200
    #"Batch Items" = SplitListIntoBatches(#"Drill Down", 200),
    // Get the work items for each batch from the Azure DevOps API
    #"Get Work Items" = List.Transform(#"Batch Items", each GetWorkItems(_)),
    // Combine the results into a single table
    #"Combined Results" = Table.Combine(#"Get Work Items")
in
    #"Combined Results"
```

### Running the Query and Configuring the Connection

After setting up your query with the provided sample code, executing the query will prompt you to configure the connection settings for accessing Azure DevOps. Here’s how to accurately set up the connection:

1. **Prompt for Connection Settings:** When you attempt to run the query for the first time, Power BI will prompt you to specify how to connect to the Azure DevOps URL. This is a crucial step to ensure secure and successful data retrieval.

2. **Set Authentication Type:** In the dialog box that appears, you’ll need to set the authentication method for the ADO URL connection. Choose "Basic" as the authentication method. This selection is necessary to use your Personal Access Token (PAT) for authentication.

3. **Configure Username and Password:** For the username field, leave it blank. The PAT does not require a username to be specified. In the password field, paste in the PAT that you created earlier. Your PAT acts as the password, providing secure access to Azure DevOps data based on the permissions you've set when creating the token.

4. **Save and Proceed:** After configuring the authentication settings, save your changes and proceed with running the query. This setup should allow Power BI to securely fetch the required data from Azure DevOps using your PAT, enabling the data transformation and syncing process to proceed.

### Finalizing the Data Preparation

With the connection properly configured, you can efficiently combine the data fetched from Azure DevOps with the records in your Dataverse `new_customerrequirement` table. This process prepares the synchronized dataset for the final step of updating Dataverse records, ensuring that only relevant and updated ADO item information is processed and prepared for synchronization.

## Step 4: Creating a Dataverse Dataflow and Linking to Power BI Dataflow Results

After setting up your Power BI dataflow to fetch and process ADO item statuses, the final step involves creating a dataflow within Microsoft Dataverse. This Dataverse dataflow will utilize the Dataflows connector to connect to your Power BI dataflow, allowing you to synchronize and update the `new_customerrequirement` table with the latest ADO item statuses. Here’s how to accomplish this:

### Creating a Dataverse Dataflow

1. **Navigate to Power Apps:** Start by going to the Power Apps portal and selecting your environment.
2. **Access Dataflows:** From the left navigation pane, choose "Data" and then "Dataflows" to access the dataflows section.
3. **Create New Dataflow:** Click on "New dataflow" and then select "Start from blank" to begin the creation process.

### Connecting to Power BI Dataflow

1. **Use the Dataflows Connector:** Within the dataflow creation process, select "Add data" and then choose the "Power BI dataflows" connector. This allows you to connect directly to the data processed by your Power BI dataflow.
2. **Authenticate and Select Your Dataflow:** Authenticate as necessary and select the Power BI dataflow you created earlier, which contains the ADO item statuses.

### Linking and Updating the `new_customerrequirement` Table

1. **Combine IDs with Power BI Dataflow Results:** With the data from your Power BI dataflow now accessible within Dataverse, the next step is to link this data with the corresponding IDs in the `new_customerrequirement` table. This involves matching ADO item IDs from Power BI dataflow results with those stored in Dataverse to ensure accurate updates.
2. **Update Table with ADO Item Statuses:** Finally, utilize the linked information to update the `new_customerrequirement` table, specifically the fields related to ADO item statuses. This ensures that the service staff can view the current status of development work directly within Dataverse, without needing to access Azure DevOps.

### Finalizing the Integration

- **Test and Validate:** It's essential to test the dataflow to ensure that data is being correctly updated in the `new_customerrequirement` table. Validate the integration by checking if the ADO item statuses in Dataverse accurately reflect those in Azure DevOps.
- **Schedule Refreshes:** To maintain up-to-date information, schedule regular refreshes of your Dataverse dataflow. This ensures that the service staff always has the latest status updates at their disposal.

By following these steps, you complete the integration cycle, effectively bridging Azure DevOps and Microsoft Dataverse. This enables your organization to streamline operations, enhance reporting capabilities, and provide your service staff with the visibility needed to offer informed customer support.

## An Alternative Approach: Single Query Execution

While the method described above leverages functions within Power BI Dataflows to batch process and synchronize data, it's crucial to note that there is an alternative strategy that does not require premium capacity. This alternative involves consolidating the entire process into a single query, thereby avoiding the creation of a computed table which necessitates a Power BI workspace with premium capacity.

### Benefits of a Single Query Approach

- **Cost Efficiency:** By avoiding the need for premium capacity, this method can be more cost-effective, especially for organizations looking to optimize their use of Power BI and Azure resources.
- **Simplicity:** Consolidating the process into a single query can simplify the dataflow, making it easier to manage and troubleshoot.
- **Performance:** A single query approach might also offer performance benefits by reducing the complexity and potential overhead introduced by multiple function calls and batch processing.

### Considerations

It's important to weigh the benefits against potential limitations, such as the complexity of crafting a single, comprehensive query that can handle all necessary operations efficiently. Additionally, while this approach avoids the need for premium capacity, it still requires careful planning around API rate limits and the handling of large datasets.

### Implementation

Implementing this strategy requires a deep understanding of the Power Query M language and the ability to effectively leverage the Web.Contents function, query parameters, and data transformation capabilities within a single query block. This approach might look something like the following:

```m
let
    // Connect to dataverse
    Source = CommonDataService.Database("12345.crm.microsoftdynamics.com", [CreateNavigationProperties = true]),
    
    // Navigate to our table
    #"Navigation 1" = Source{[Shcema="dbo", Item="new_customerrequirement"]}[Data],
    
    // We will drill down just to the new_adoitemid field so we can pass the entire list to the next step
    #"Drill Down" = #"Navigation 1"[new_adoitemid],
    
    // Define the batch size
    BatchSize = 200,

    // Split the list into batches
    NumBatches = Number.RoundUp(List.Count(#"Drill Down") / BatchSize),
    Batches = List.Transform({0..NumBatches - 1}, each List.Skip(#"Drill Down", _ * BatchSize) & List.FirstN(#"Drill Down", BatchSize)),

    // Function to fetch work items for a batch of IDs (inline definition)
    GetWorkItemsForBatch = (ids as list) as table =>
        let
            idsString = Text.Combine(List.Transform(ids, Text.From), ","),
            fields = "System.Title,System.State",
            adoOrganization = "PowerAppsRAW",
            adoProject = "My%20Project",
            apiUrl = "https://dev.azure.com/" & adoOrganization & "/" & adoProject & "/_apis/wit/workitems",
            headers = [#"Content-Type" = "application/json"],
            Source = Json.Document(Web.Contents(apiUrl, [
                Headers = headers,
                Query = [
                    #"api-version" = "7.1",
                    ids = idsString,
                    fields = fields
                ]
            ])),
            workItemsTable = Table.FromList(Source[value], Splitter.SplitByNothing(), null, null, ExtraValues.Error),
            expandedTable = Table.ExpandRecordColumn(workItemsTable, "Column1", {"id", "rev", "fields", "url"}, {"ID", "Revision", "Fields", "URL"}),
            fieldNames = if Table.IsEmpty(expandedTable) then {} else Record.FieldNames(expandedTable{0}[Fields]),
            fullyExpandedTable = Table.ExpandRecordColumn(expandedTable, "Fields", fieldNames, fieldNames)
        in
            fullyExpandedTable,

    // Fetch work items for each batch and combine results
    FetchResults = List.Transform(Batches, each GetWorkItemsForBatch(_)),
    CombinedResults = Table.Combine(FetchResults)
in
    CombinedResults
```

This illustrative example simplifies the process into a single, cohesive query, demonstrating the potential to streamline the integration without relying on premium features.

## Overcoming Obstacles

This journey wasn't without its trials, particularly around authentication and the nuances of the M language for dataflows. The solution required creative thinking, such as using Power BI dataflows as a workaround for Dataverse's authentication limitations and meticulously crafting M code to interact with the ADO API within its constraints.

## Conclusion

By bridging Azure DevOps and Microsoft Dataverse with Power BI Dataflows, we've established a robust process for syncing work item updates for enhanced reporting and insight into project requirements. This solution not only addresses the immediate need but also offers a template for similar challenges, showcasing the flexibility and power of Microsoft's ecosystem when it comes to custom integrations.
