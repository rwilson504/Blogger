![From Messy to Manageable: Cleanly Load Dataverse Tables in Power BI](https://github.com/user-attachments/assets/58aa531e-bae7-4ed1-b88a-a54cf87b1db6)

First and foremost, I want to take a moment to acknowledge [Brandon Pires](https://www.linkedin.com/in/brandonpires/), who originally crafted the script that inspired all of this work. Brandon's creativity laid the foundation for this blog post, and his efforts are key to helping Power BI developers improve efficiency and cleanliness in their reports.

**Introduction: Using Templates to Keep Your Dataverse Clean**

When working with Microsoft Dataverse in Power BI, things can get messy quickly. Dataverse often contains a wealth of fields, system columns, and metadata that can make your reports harder to understand, cluttered, and less efficient. However, by leveraging templates and custom functions, you can automatically clean and format your data, allowing you to focus on deriving insights rather than grappling with unnecessary noise.

One such function, inspired by Brandon Pires, is designed to clean column names from Dataverse and keep them tidy. In this blog post, I will explain how this function works, why it improves efficiency, and how you can use it in your Power BI workflows to create more manageable and maintainable data models.

**The Power BI Cleaning Function: A Deep Dive**

```
let
    // Define the function with parameters for the table name, prefix, Dataverse host, and feature toggles
    #"Clean Table" = (tableName as text, prefix as text, dataverseHost as text, transformDateTimeToDate as logical, removeColumnsWithTablesAndRecords as logical) =>
    let
        // Connect to the Common Data Service
        Source = CommonDataService.Database(dataverseHost),
        
        // Retrieve the specified table
        #"One Table" = Source{[Schema="dbo", Item=tableName]}[Data],
        
        // Rename columns with the specified prefix
        #"Rename columns to system columns" = Table.RenameColumns(
            #"One Table",
            {
                {"createdon", prefix & "createdon"},
                {"modifiedon", prefix & "modifiedon"},
                {"createdby", prefix & "createdby"},
                {"statuscodename", prefix & "statusreason"},
                {"statecodename", prefix & "state"}
            }
        ),
        
        // List of all datetime and datetimezone columns
        #"List of all datetime and datetimezone columns" = if transformDateTimeToDate then
            Table.ColumnsOfType(
                #"Rename columns to system columns",
                {
                    type nullable datetime,
                    type datetime,
                    type nullable datetimezone,
                    type datetimezone
                }
            )
        else
            {},
        
        // Create list pair of datetime and datetimezone columns to type date pair
        #"Create list pair of datetime and datetimezone columns to type date pair" = if transformDateTimeToDate then
            List.Transform(
                #"List of all datetime and datetimezone columns",
                each {_, type date}
            )
        else
            {},
        
        // Transform datetime and datetimezone columns to date
        #"Transform datetime and datetimezone columns to date" = if transformDateTimeToDate then
            Table.TransformColumnTypes(
                #"Rename columns to system columns",
                #"Create list pair of datetime and datetimezone columns to type date pair"
            )
        else
            #"Rename columns to system columns",
        
        // Get names of columns with tables and records
        #"Get names of columns with tables and records" = if removeColumnsWithTablesAndRecords then
            Table.ColumnsOfType(
                #"Transform datetime and datetimezone columns to date",
                {
                    type nullable table,
                    type table,
                    type nullable record,
                    type record
                }
            )
        else
            {},
        
        // Remove columns with tables and records
        #"Remove columns with tables and records" = if removeColumnsWithTablesAndRecords then
            Table.RemoveColumns(
                #"Transform datetime and datetimezone columns to date",
                #"Get names of columns with tables and records"
            )
        else
            #"Transform datetime and datetimezone columns to date",
        
        // Remove system columns, only keep columns with specified prefix or "modified"
        #"Remove system columns" = Table.TransformColumnNames(
            Table.SelectColumns(
                #"Remove columns with tables and records",
                List.Select(
                    Table.ColumnNames(#"Remove columns with tables and records"),
                    each Text.StartsWith(_, prefix) or Text.StartsWith(_, "modified")
                )
            ),
            each Text.Replace(_, prefix, "")
        )
    in
        #"Remove system columns"
in
    #"Clean Table"

```

The function script presented here is a template that helps you **remove unnecessary columns** and **rename system fields**, making your data more consistent and easier to work with. The function takes in parameters such as the **Dataverse host URL**, a **prefix for column names**, and flags to control additional transformations. Let’s break down how each part of this function works:

1. **Connect to the Dataverse Host**: This function starts by connecting to Dataverse using a parameterized URL (`dataverseHost`). This is a best practice because it allows the same function to be used across different environments (like dev, test, and production) without modifying the core script.

2. **Rename System Columns**: One of the early steps in the function is to rename system columns by adding a specified prefix (`prefix`). This ensures that key fields like `createdon`, `modifiedon`, etc., are consistently labeled, helping to avoid confusion. Consistent column naming also makes your data model more intuitive for future developers or collaborators.

3. **Optional Transformations**: This function uses two **feature toggles** (`transformDateTimeToDate` and `removeColumnsWithTablesAndRecords`) to control how much data cleaning is performed. This flexibility helps adapt the function to different use cases:

   - **Date Transformations**: Converts datetime columns to simple date columns if specified, reducing data complexity and making it easier to create date-based visuals.
   - **Removing Complex Columns**: The script can also remove columns containing nested tables or records, which can complicate data processing and impact performance.

4. **Filtering Columns**: Finally, the function removes any columns that do not match the specified prefix or the word `"modified"`. This helps limit your data to only what you need, cutting down on clutter and improving the efficiency of your Power BI reports.

**Best Practice: Use a Parameter for Dataverse URL**

One of the best practices highlighted by this script is to use a **parameter for the Dataverse URL** (`dataverseHost`). By using parameters, you can easily switch environments without editing the script each time. This approach supports a **more agile and scalable development process** and allows teams to deploy their reports in multiple environments seamlessly.

![Create parameter](https://github.com/user-attachments/assets/ee084ac5-632e-4f02-b87b-c318903af495)

If you're unsure how to create a parameter in Power BI, here's a quick guide:

1. In **Power BI Desktop**, navigate to the **Home** tab and click **Manage Parameters**.
2. Click **New Parameter** and name it something like `DataverseUrl`.
3. Set the **Type** to **Text** and use the **Suggested Values** option to create a **List of Values**. Enter your different environment URLs, such as Dev, Integration, and Prod, into the list. Then, set the **Default Value** and **Current Value** to the appropriate environment (e.g., your development Dataverse URL).
4. Use this parameter in your query to reference different environments without rewriting your scripts.

**How to Add This Function to Your Power BI Report**

To use this function within Power BI, follow these steps:

1. **Open Power Query Editor**: In your Power BI Desktop file, go to **Transform Data** to open Power Query Editor.
2. **Create a New Query**: Click on **New Source** > **Blank Query**, then open the **Advanced Editor** and paste the script provided.
3. **Rename Function**: After pasting, rename the query to something like `CleanTable`.
4. **Invoke the Function**: Now that you have the function, you can use it to clean multiple tables. For each table, create a new query and use **Invoke Custom Function**, selecting `CleanTable` and specifying your desired parameters. You can also use this function on Microsoft tables, such as `account` and `contact`, if you wish to apply some of the optional transformations. Just make sure to set the `prefix` parameter to an empty string (`""`).
   
    ![call function](https://github.com/user-attachments/assets/f5d3cb0f-9e3d-4c14-bc5d-29354ae651ca)

This process allows you to apply consistent cleaning across multiple tables in Dataverse, significantly improving both efficiency and maintainability.

![show data pane](https://github.com/user-attachments/assets/77bb5350-5e83-41ad-91d9-09ed65fd79e3)

**Save as a Template for Future Use**

You can also save your Power BI report with this function and parameter as a **template file** (.pbit). This allows you to easily reuse the setup for all of your future reports. By using a template, you can ensure consistency across different projects and avoid repeating the setup process each time you need to create a new report.

**Conclusion**

Keeping your Power BI data clean and organized is crucial for effective reporting and analysis. By leveraging custom functions like the one described here, you can maintain consistency, reduce clutter, and improve the performance of your Power BI reports. Inspired by Brandon Pires, this script is a powerful tool to help streamline your data transformation process, making your reports more intuitive and easier to manage.

Feel free to try this approach in your next Power BI project and let me know how it works for you. Embracing these best practices will save time and help your team stay focused on what really matters—extracting valuable insights from your data.


<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6ICdGcm9tIE1lc3N5IHRvIE
1hbmFnZWFibGU6IENsZWFubHkgTG9hZCBEYXRhdmVyc2UgVGFi
bGVzIGluIFBvd2VyIEJJJ1xuYXV0aG9yOiAnUmljayBXaWxzb2
4sIEJyYW5kb24gUGlyZXMnXG50YWdzOiAncG93ZXJiaSxkYXRh
dmVyc2UscmVwb3J0aW5nLGRhdGEsZHluYW1pY3MscmVwb3J0aW
5nLHJlcG9ydHMnXG4iLCJoaXN0b3J5IjpbLTE5OTMwNjU1NzMs
LTczODA5NTBdfQ==
-->