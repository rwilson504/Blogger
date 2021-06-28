Want to know which model applications your users have access to in dataverse?  Check out the app access checker that is available within the [Power Platform admin center](https://docs.microsoft.com/en-us/power-platform/admin/admin-guide).  This page allows you to enter a users Id or email address and see the entire list of published apps on your system and all the access, license and security infromation for each one specific to that user.  This can be a very useful tool in troubleshooting why a user cannot see a specific app in your environment.

Below are the different ways you can access the app access checker.

## Direct Url
You can access the app access checker directly using a url.  Here is the format.

``
https://<Your Org>.crm.dynamics.com/WebResources/msdyn_AppAccessChecker.html
``

## Power Platform Admin Center
- Open the Power Platform admin center [https://admin.powerplatform.microsoft.com/](https://admin.powerplatform.microsoft.com/)
- On the Environments list click the link for the enviroment you would like to check.
- Click on **See all** under the User heading the Action area. 
- Click the **app access checker** link located above the Users list.

## WebAPI Call
The information returned to the page comes from a single WebAPI call.  If you will to call it yourself and create your own page you can do so.

``
https://<Your Org>.crm.dynamics.com/api/data/v9.0/RetrieveUserAppDebugInfo(UserIdOrEmail%20='testuser2@rawonet.onmicrosoft.com')
``
