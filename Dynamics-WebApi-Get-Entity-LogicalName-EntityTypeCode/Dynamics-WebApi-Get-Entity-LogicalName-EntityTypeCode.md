# Dynamics WebAPI get Entity LogicalName or ObjectTypeCode

If you need to get the LogicalName or ObjectTypeCode of an entity in your Dynamics environment you can utilize the WebAPI to get the metadata.

If you have the LogicalName of the entity you can use this url.
Format:  
`<Dynamics Url>/api/data/v<Version>/EntityDefinitions(LogicalName='<LogicalName>')?$select=ObjectTypeCode`

Example:  
`https://org12345.crm.dynamics.com//api/data/v9.0/EntityDefinitions?$filter=ObjectTypeCode eq 1&$select=LogicalName`

If you have the ObjectTypeCode of the entity you can use this url.

Format:
```<Dynamics Url>/api/data/v<Version>/EntityDefinitions?$filter=ObjectTypeCode eq <ObjectTypeCode>&$select=LogicalName```

Example:
```https://org12345.crm.dynamics.com/api/data/v9.0/EntityDefinitions?$filter=ObjectTypeCode eq 1&$select=LogicalName```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5MzU4MDc3ODMsLTE2NzQ3NTAyNDEsND
Q5OTU0MTMzXX0=
-->