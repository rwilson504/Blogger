# Use Dynamics WebAPI to get LogicalName or ObjectTypeCode for Entity

If you need to get the LogicalName or ObjectTypeCode of an entity in your Dynamics environment you can utilize the WebAPI to get the metadata.

If you have the *LogicalName* of the entity you can use this url.
Format:  
`<Dynamics Url>/api/data/v<Version>/EntityDefinitions(LogicalName='<LogicalName>')?$select=ObjectTypeCode`

Example:  
`https://org12345.crm.dynamics.com/api/data/v9.0/EntityDefinitions(LogicalName='account')?$select=ObjectTypeCode`

Data Returned:
```{"@odata.context":"https://org6744e6cd.crm.dynamics.com/api/data/v9.0/$metadata#EntityDefinitions(ObjectTypeCode)/$entity","ObjectTypeCode":1,"MetadataId":"70816501-edb9-4740-a16c-6a5efbc05d84"}```

If you have the *ObjectTypeCode* of the entity you can use this url.

Format:
```<Dynamics Url>/api/data/v<Version>/EntityDefinitions?$filter=ObjectTypeCode eq <ObjectTypeCode>&$select=LogicalName```

Example:
```https://org12345.crm.dynamics.com/api/data/v9.0/EntityDefinitions?$filter=ObjectTypeCode eq 1&$select=LogicalName```

Data Returned:
```{"@odata.context":"https://org6744e6cd.crm.dynamics.com/api/data/v9.0/$metadata#EntityDefinitions(LogicalName)","value":[{"LogicalName":"account","MetadataId":"70816501-edb9-4740-a16c-6a5efbc05d84"}]}```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNjY3ODU3NzEsLTE2NzQ3NTAyNDEsNDQ5OT
U0MTMzXX0=
-->