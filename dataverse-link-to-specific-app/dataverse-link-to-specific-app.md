![2021-06-23_11-14-09](https://user-images.githubusercontent.com/7444929/123127614-727c8980-d418-11eb-9f01-8731c4896e78.png)

When generating links for records, lists or reports in a Dataverse environment it is important that they open the specific application they relate to so users have the best experience. To see more details about generating links for Dataverse [click here.](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/open-forms-views-dialogs-reports-url?view=op-9-1). 

![2021-06-23_10-59-18](https://user-images.githubusercontent.com/7444929/123127398-3ba67380-d418-11eb-9eff-85b6f39d2ed5.png)
This image shows the message bar displayed within Dataverse when you open a link not directed to a specific application.

Previously in order to open a specific application using a link you had to create the it with the [app suffix url](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/manage-access-apps-security-roles?view=op-9-1) or append the appid parameters to the url.  In order to get either of those dynamically you need to query the Model-driven Apps (appmodule) entity and return the url attribute for the suffix or the appmoduleid attribute for the app id.

Using App Suffix

``
https://<Your Org>.crm.dynamics.com/apps/<Your App Suffix>/main.aspx?pagetype=entitylist&etn=contact
``

or 

Using App Id

``
https://<Your Org>.crm.dynamics.com/main.aspx?appid=82853804-d2b3-4536-ba75-f49ccca681ea&pagetype=entitylist&etn=contact
``

Recently when creating a new App in the maker portal I saw the app creation screen now includes a Unified Interface URL which populates when you set the name of the app.  The format of the url looks like this.

``
https://<Your Org>.crm.dynamics.com/Apps/uniquename/<Your App Unique Name>/main.aspx?pagetype=entitylist&etn=contact
``

Because the unique name does not change between environment you can now eliminate any calls you previously did to the Model-driven App entity.  You may still need to get the host url for the environment you are in if using Power Apps or Power Automate.  To get the url in Power Automate you can make a call to any Dataverse entity and then parse out the url from the @odata.id value of any record you return.

``
uriHost(outputs('Get_CDS_Record')?['body/value'][0]?['@odata.id'])
``

The get the url in PowerApps you have some options.  You can call a Power Automate flow which will call out to a CDS record and return the host url using the same method I described earlier or you can utilize the [CDS Environment URL ](https://pcf.gallery/cds-environment-url/) PCF component from Dan Cox.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyMjI5NTc1ODcsMTM1MjAxNjA5NiwtNj
M0ODcyMTI5LC04NDM3OTk0NzJdfQ==
-->
