# Use Dynamics WebAPI to get Record Count

When working in an environment where tools like XrmToolbox are not available or allowed getting a total record count can be a real pain sometimes.  One way of doing it just using the browser involves using the Dynamics WebAPI.  This came in handy last time we were doing a data load on our production system and wanted to see the status of how many records had been imported.

If you are trying to get the count for 5,000 or less records. you can do a simple count on the data.

Format
``````
/api/data/v9.0/<Entity Set Name>/?$count=true
``````

Example
``````
/api/data/v9.0/accounts/?$count=true
``````

Data Returned

If your record set will have 5k or more you can utilize the webapi by creating a FetchXml aggregate query.

Format
``````
/api/data/v9.0/accounts?fetchXml=<FetchXml query that has been URI encoded>
``````

Example
``````
/api/data/v9.0/accounts?fetchXml=<FetchXml query that has been URI encoded>
``````
Data Returned
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU0OTgwMTI5Ml19
-->