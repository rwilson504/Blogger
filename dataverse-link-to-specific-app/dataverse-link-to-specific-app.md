When generating links for records, lists or reports in a Dataverse environment it is important that they open the specific application they relate to so users have the best experience. To see more details about generating links for Dataverse [click here.](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/open-forms-views-dialogs-reports-url?view=op-9-1). 

This image shows the message bar displayed within Dataverse when you open a link not directed to a specific application.

Previously in order to open a specific application using a link you had to create the it with the [app suffix url](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/manage-access-apps-security-roles?view=op-9-1) or append the appid parameters to the url.  In order to get either of those you needed to query the Model-driven A

``
https://<Your Org>.crm.dynamics.com/apps/<Your App Suffix>/main.aspx?pagetype=entitylist&etn=contact
``

or 

``
https://<Your Org>.crm.dynamics.com/main.aspx?appid=82853804-d2b3-4536-ba75-f49ccca681eapagetype=entitylist&etn=contact
``
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwMzA1ODMyNjMsLTg0Mzc5OTQ3Ml19
-->