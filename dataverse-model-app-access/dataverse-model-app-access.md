![2021-06-28_13-53-22](https://user-images.githubusercontent.com/7444929/123683732-91b15780-d81a-11eb-9ae8-badf315269e1.png)

Want to know which model applications your users have access to in Dataverse?  Check out the app access checker that is available within the [Power Platform admin center](https://docs.microsoft.com/en-us/power-platform/admin/admin-guide).  Enter a users Id or email address and see the list of published apps in your environment and all the access, license and security information specific to that user.  This can be a very useful tool in troubleshooting why a user cannot see a specific app in your environment.

Below are the different ways you can access the app access checker.

## Direct Url
You can access the app access checker directly using a url.  Here is the format.

``
https://<Your Org>.crm.dynamics.com/WebResources/msdyn_AppAccessChecker.html
``

## Power Platform Admin Center
- Open the Power Platform admin center [https://admin.powerplatform.microsoft.com/](https://admin.powerplatform.microsoft.com/)
- On the Environments list click the link for the environment you would like to check.![2021-06-28_13-33-25](https://user-images.githubusercontent.com/7444929/123683771-9fff7380-d81a-11eb-9e26-2a35f9541c76.png)
- Click on **See all** under the User heading the Action area. ![2021-06-28_13-26-21](https://user-images.githubusercontent.com/7444929/123683856-b6a5ca80-d81a-11eb-9240-9fa292e5b1ec.png)
- Click the **app access checker** link located above the Users list.![2021-06-28_13-26-02](https://user-images.githubusercontent.com/7444929/123683866-b9a0bb00-d81a-11eb-86cb-1ddeb5eb9bf3.png)


## WebAPI Call
The information returned to the page comes from a single WebAPI call.  If you will to call it yourself and create your own page you can do so.

``
https://<Your Org>.crm.dynamics.com/api/data/v9.0/RetrieveUserAppDebugInfo(UserIdOrEmail%20='testuser2@rawonet.onmicrosoft.com')
``
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTIwODE5OTU5OTZdfQ==
-->