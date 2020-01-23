# Dynamics WebAPI get Entity LogicalName or ObjectTypeCode

If you need to get the LogicalName or ObjectTypeCode of an entity in your Dynamics environment you can utilize the WebAPI to get the metadata.

If you have the LogicalName of the entity you can use this url.

If you have the ObjectTypeCode of the entity you can use this url.

```<dyn/api/data/v<version>/EntityDefinitions?$filter=ObjectTypeCode eq <objecttypecode>&$select=LogicalName```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgxMDU0NzE1MCw0NDk5NTQxMzNdfQ==
-->