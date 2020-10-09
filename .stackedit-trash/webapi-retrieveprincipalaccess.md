
```
static  async  retrievePrincipalAccess(entityId: string, entityTypeName: string, pcfContext: ComponentFramework.Context<IInputs>): Promise<string[]>{

let  userId = Utilities.debracketGuid(pcfContext.userSettings.userId);

  

const  PrincipalAccessRequest: any = function (entityTypeName: string, entityId: string) {

this.entity = {

"entityType":  'systemuser',

"id":  userId

}

this.Target = {

"@odata.type":  `Microsoft.Dynamics.CRM.${entityTypeName}`,

"dsr_personid":  entityId

};

};

  

PrincipalAccessRequest.prototype.getMetadata = function (){

return {

boundParameter:  'entity',

parameterTypes: {

"entity": {

"typeName":  "mscrm.systemuser",

"structuralProperty":  5

},

"Target": {

"typeName":  "mscrm.crmbaseentity",

"structuralProperty":  5

}

},

operationType:  1,

operationName:  "RetrievePrincipalAccess"

};

}

let  request = new  PrincipalAccessRequest(entityTypeName, entityId);

let  response = await  this.executePrincipalAccessRequest(request);

//if response is null then there was an issue obtaining the access rights.

if (!response) return [];

let  accessRights = await  this.returnAccessRightsFromResponse(response);

return  accessRights;

}

  

static  async  executePrincipalAccessRequest(request: any | null){

try {

return  await  parent.Xrm.WebApi.online.execute(request).then(

async (response: any) => {

if (response.ok)

{

return  response;

}

else{

return  '';

}

},

(error: any) => {

return  null;

}

);

}

catch (error) {

return  null;

}

}

  

static  async  returnAccessRightsFromResponse(response: any): Promise<string[]>{

let  accessRights: string[] = [];

  

await  response.json().then(

(responseObj: any) => {

if (responseObj.hasOwnProperty('AccessRights'))

{

accessRights = responseObj.AccessRights.split(', ');

}

}

)

return  accessRights;

}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE5MTIzNzM4MTNdfQ==
-->