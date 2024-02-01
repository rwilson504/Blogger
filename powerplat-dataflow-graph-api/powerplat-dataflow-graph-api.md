![Handling Graph API Pagination in Power Platform Dataflows](https://github.com/rwilson504/Blogger/assets/7444929/123afe82-83a8-4e29-9bd8-828bd925b8fc)

## Introduction

When managing extensive user datasets from Microsoft Graph API, a common challenge is handling the pagination of data. This blog post explores a solution for effectively looping through multiple pages of Graph API data within Power Platform dataflows and discusses alternative methods that might be more efficient in certain scenarios.

## Background

The need for this project arose from our requirement to comprehensively collect and set manager information for our users in Dataverse. This was integral to improving our workflow automation and communication processes. However, the pagination feature in Graph API responses presented a significant challenge in retrieving this data efficiently, prompting us to seek a solution that could integrate seamlessly with Dataverse and optimize our data management practices.

## Exploring Graph API with Graph Explorer

To become proficient in crafting queries for the Microsoft Graph API, a powerful resource at your disposal is the [Graph Explorer tool](https://developer.microsoft.com/en-us/graph/graph-explorer/). This interactive tool allows you to formulate and test Graph API queries in a user-friendly environment. It provides a practical hands-on approach to learning how the API responds to different queries and helps you understand the structure of the data it returns.
  
By experimenting with Graph Explorer, you gain valuable insights into how Graph API operates, enabling you to build more effective queries for your Power Platform dataflows. Whether you're retrieving user data, managing tasks, or accessing analytics, the Graph Explorer can be your sandbox for mastering Graph API interactions.

## Solution: Implementing Looping Logic and Considering Alternatives

### 1. Understanding Graph API Pagination
- Microsoft Graph API uses pagination to manage large datasets, providing links to subsequent pages in each response.
- Effectively handling this is crucial for comprehensive data collection.

### 2. Setting Up the Graph API Connection
- The first step involves integrating the Graph API into your Power Platform dataflow.
- Create a new Dataflow in the Maker portal.
  ![image](https://github.com/rwilson504/Blogger/assets/7444929/6b2279b1-0964-4e7a-abe5-87128d9255b0)
- Select the Web API connector  
  ![image](https://github.com/rwilson504/Blogger/assets/7444929/07f9fa85-87d8-41fe-b3d1-9a730ca7b9f0)
- Create a connection to the Graph API url (eg: [https://graph.microsoft.com/v1.0](https://graph.microsoft.com/v1.0)).  Make sure to get the authentication type to **Organizational account**.  
  ![image](https://github.com/rwilson504/Blogger/assets/7444929/347b939f-4862-4cf5-8c37-10e6cbea7de5)
- A new query will be created showing all of the endpoints for the Graph API.  
  ![image](https://github.com/rwilson504/Blogger/assets/7444929/8f4914d2-4d83-47b9-aa1b-c96dd695b653)

Now that you have a connection to graph you can utilze the default query that was provided for you or create your own queries using the pattern provided by this default query and using the **Json.Document(Web.Contents("https://graph.microsoft.com/v1.0/me"))** functionality to pass in your Graph query.

### 3. Looping Through Paginated Data
- Develop a script or logic within your dataflow to process each page and retrieve the next page's link.
- The code below loops through all users within [Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id) and get all manager information.  You can utilize the **Advanced editor** button in the query window to copy/paste this code.
```
let
    // This query will return all users who are domain members and have a usage location with the US.
    // Expand gets us the mail attribute for the users first level manager.
    // Top is set to 999, this is the max size of records returned per page for this call and will result in fewer calls having to be made.
    url = "https://graph.microsoft.com/v1.0/users?$filter=userType eq 'Member' and usageLocation eq 'US' &$select=userPrincipalName&$expand=manager($levels=1;$select=mail)&$top=999",

    // This function will return the data for each page.
    FnGetOnePage = (url) as record =>
        let
            Source = Json.Document(Web.Contents(url)),
            data = try Source[value] otherwise null,
            next = try Record.Field(Source, "@odata.nextLink") otherwise null,
            res = [Data=data, Next=next]
        in
            res,

    // This calls the function to return data for each page that is returned and creates the combined list.
    GeneratedList = List.Generate(
        ()=>[i=0, res = FnGetOnePage(url)],
        each [res][Data] <> null,
        each [i=[i]+1, res = FnGetOnePage([res][Next])],
        each [res][Data]
    ),

    // Create a combined list
    CombinedList = List.Combine(GeneratedList),
    // Convert the list into a table format
    #"Convert To Table" = Table.FromList(CombinedList, Splitter.SplitByNothing(), null, null, ExtraValues.Error),
    
    // Assuming the data structure is a record, expand the columns you need. Adjust the column names based on your data structure.
    #"Expand Each Record" = Table.ExpandRecordColumn(#"Convert To Table", "Column1", {"userPrincipalName", "manager"}, {"userPrincipalName", "manager"}),
    // Expand the manager record to get their email address
    #"Expand Manger" = Table.ExpandRecordColumn(#"Expand Each Record", "manager", {"mail"}, {"mail.1"}),
    #"Renamed columns" = Table.RenameColumns(#"Expand Manger", {{"mail.1", "ADUser.ManagerEmail"}, {"userPrincipalName", "ADUser.Upn"}})

in
    #"Renamed columns"
```

### 4. Considering Alternatives
- Looping through pages is straightforward, but not always the most efficient.

   **Alternative Approaches**:
   - **Batch Processing**: Send multiple requests in a single call using the Microsoft Graph batch processing feature.
   - **Delta Query**: Use delta queries to fetch only changes since the last query, reducing data volume.
   - **WebJobs or Azure Functions**: For more control, consider Azure services like WebJobs or Azure Functions.

### 5. Conclusion and Optimization Tips
- While looping is effective, alternatives could offer more efficiency for specific use cases or large-scale operations.
- Evaluate your project needs to choose the most suitable method.

## Final Note

Assess your project's specific requirements to determine whether looping through pagination or an alternative approach is more appropriate. This decision can significantly impact the efficiency and scalability of your data management in Power Platform and Graph API.
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEhhbmRsaW5nIEdyYXBoIE
FQSSBQYWdpbmF0aW9uIGluIFBvd2VyIFBsYXRmb3JtIERhdGFm
bG93c1xuYXV0aG9yOiBSaWNrIFdpbHNvblxudGFnczogJ3Bvd2
VycGxhdGZvcm0sZGF0YWZsb3dzLGdyYXBoLGdyYXBoYXBpLGFw
aSxkYXRhLHBhZ2luYXRpb24scXVlcnknXG4iLCJoaXN0b3J5Ij
pbLTE3NTQ0NzY3OF19
-->
