When generating links for records, lists or reports in a Dataverse environment it is important that they open the specific application they relate to so users have the best experience. To see more details about generating links for Dataverse [click here.](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/open-forms-views-dialogs-reports-url?view=op-9-1). 

This image shows the message bar displayed within Dataverse when you open a link not directed to a specific application.

Previously in order to open a specific application using a link you had to create the it with the [app suffix url](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/manage-access-apps-security-roles?view=op-9-1) or append the appid parameters to the url.  In order to get either of those dynamically you need to query the Model-driven Apps (appmodule) entity and return the url attribute for the suffix or the appmoduleid attribute for the app id.

Using App Suffix
``
https://<Your Org>.crm.dynamics.com/apps/<Your App Suffix>/main.aspx?pagetype=entitylist&etn=contact
``

or 

Using App Id
``
https://<Your Org>.crm.dynamics.com/main.aspx?appid=82853804-d2b3-4536-ba75-f49ccca681eapagetype=entitylist&etn=contact
``

Recently when creating a new App in the maker portal I saw that 
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYzNDg3MjEyOSwtODQzNzk5NDcyXX0=
-->