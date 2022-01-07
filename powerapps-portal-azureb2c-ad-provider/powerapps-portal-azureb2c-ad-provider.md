It is recommended that you no longer use Local Login authentication for Power Apps Portal but instead utilize Azure Active Directory B2C to provide this type of authentication. See [Migrate identity providers to Azure AD B2C
](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/migrate-identity-providers)

Configuring the B2C providers is fairly straightforward utilizing the new preview interface [Configure the Azure Active Directory B2C provider](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-azure-ad-b2c-provider).  Make sure you navigate to the preview version of the Maker portal for now to access this, [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/).

For this article my goals were the following.
* Set the existing Azure AD and Local Login configuration as deprecated authentication mechanisms within the portal to migrate the users to B2C.
* Allow user to authenticate to B2C using Azure AD, Google or create local B2C account.

![Original log in screen](https://user-images.githubusercontent.com/7444929/148592406-10108368-93ab-4308-a721-23f4412a8a22.png "Original Login Screen")

## Deprecate Old Providers

Once I had run through the [instructions](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-azure-ad-b2c-provider) for configuring the Azure B2C authentication I then had to mark the Local Login and Azure AD authentication methods as deprecated.  This ensures that when existing users log into the Portal using those methods, they will then be asked to migrate their account to B2C.

![Account Migration](https://user-images.githubusercontent.com/7444929/148592949-b3d4f3ad-e5e2-48a4-92b3-624f5d7a14c8.png "Account Migration Screen")

Deprecation of the old providers can be done through the Portal Management model app within the Site Settings.

### Set Local Login Authentication as Deprecated
The site setting for deprecated the local authentication was already in my site settings so i set the value to true.
![Deprecate Local Login](https://user-images.githubusercontent.com/7444929/148593379-6f13653c-de3b-4c42-a140-085b5a8facd2.png "Deprecate Local Login")

| Name      | Value |
| ----------- | ----------- |
| Authentication/Registration/LocalLoginDeprecated      | true       |

### Set Azure AD Authentication as Deprecated
In order to deprecate other providers you need to create the site settings for them and set the value to true. The format for these values is.
``
Authentication/[protocol]/[provider]/Deprecated	
``

![Deprecate Azure AD Authentication](https://user-images.githubusercontent.com/7444929/148593704-28e66710-1b6b-4782-a7f6-5775b25ede35.png "Deprecate Azure AD Authentication")

| Name      | Value |
| ----------- | ----------- |
| Authentication/OpenIdConnect/AzureAD/Deprecated      | true       |

### Google Identity Provider
Setting up the Google identity provider was easy and the instructions provided worked without any issues. See [Set up sign-up and sign-in with a Google account using Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-google?pivots=b2c-user-flow)

### Azure AD Provider
The instructions for [Adding an Azure Active Directory provider to Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-azure-ad-single-tenant?pivots=b2c-user-flow) but there were a few items missing to get it working correctly with Power Apps Portal.

If you don't complete the additional steps you will end up with users in your B2C who do not have an email address assigned to them.  Additionally, the persons email, first name and last name will not be provided to the portal which will result in the following error screen when new users attempt to register.
![Email field is required](https://user-images.githubusercontent.com/7444929/148596769-659b9c43-3bfb-42c8-a921-20c99063bfdc.png "Email field is required")

The first thing we need to do after creating the Azure AD provider app registration is to update the token configuration.  This will ensure that email, first name, and last name are included correctly in the token.
* Navigate to the directory in the Azure Portal where your Azure AD lives.
* Create the app registration for the Azure AD Identity provider using the instructions found [here]((https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-azure-ad-single-tenant?pivots=b2c-user-flow)
* Under Manage click **Token configuration**
* Click **Add optional claim** button
* Select the **Token type** of **ID**
* Click the check boxes next to **eamil, family_name, given_name**
* Click the **Add** button
* You will receive a message that the optional claims will require additional API permissions.  Click the **Turn on the Microsoft Graph email permission (required for claims to appear in token)** checkbox and click the **Add** button.
![Token configuration](https://user-images.githubusercontent.com/7444929/148598076-37a3f107-434d-4c59-a47c-b29c50dedb4a.png)

Next we must ensure that the API permissions that were added have admin consent
* Under Manage click the **API permissions**
* Click **Grant admin consent for <Domain>** button
* Click Yes when asked to grand admin consent
![Grant Admin Consent](https://user-images.githubusercontent.com/7444929/148598239-d3d804fd-c87a-4e7e-a4b5-d1f9d9cb6f92.png)
  
I also found issues where the B2C configuration redirect URI utilize the tenant id instead of the domain name so I also added an extra Uri for that address.
* Under manage click **Authentication**
* You should already have one Redirect URI listed (eg. https://domainb2c.b2clogin.com/domainb2c.onmicrosoft.com/oauth2/authresp) which you added when going through the instructions for creation the app registration. Click the **Add URI** button to add another.
* Add a second uri that utilizes the Tenant ID of the B2C directory instead of domainb2c.onmicrosoft.com (eg. https://domainb2c.b2clogin.com/a89ff66d-26c2-4407-9096-b216ce8b6a10/oauth2/authresp)

Finally we need to update the Sign In/Sign Up user flow created during the B2C Portal setup.
* Navigate to the director in the Azure Portal where you Azure B2C lives.
* Within Azure services click on **Azure AD B2C**
* Under the policies area click **User flows**
* You should see 2 users flows.  Select the one contaiing the text **signupsignin**
  ![Select User Flow](https://user-images.githubusercontent.com/7444929/148599190-74834b00-0555-490e-a5bc-d1a1485136a0.png)
* Click on Identity providers and ensure that you have selected the new Identity providers you have created.  After selecting them click the **Save** button
  ![Choose Identity providers](https://user-images.githubusercontent.com/7444929/148599359-3dc1e68c-5ee7-4cac-ad43-47425b0edbc6.png)
* Click on Application claims and select the Display Name, Email Addresses, Given Name, and Surname attributes then click the Save button.
  ![Select Application claims](https://user-images.githubusercontent.com/7444929/148599552-c2d34564-a59c-4ea7-b6c4-57146117d068.png)
  
Now when a user attempts to register using your AD provider the email, first name and last name will all be passed to the Portal and show up on the profile page after the user has logged in.
  
![B2C Login Page](https://user-images.githubusercontent.com/7444929/148600720-4b044ee1-6b12-43cf-8e40-a96328cfb66b.png)
![Profile Page After Login](https://user-images.githubusercontent.com/7444929/148600771-89a76665-4662-424a-85f7-7f5a342ec09e.png)

## Invitation Info
One thing I discovered through all this was that the Invitation system still works correctly after moving to B2C.  I was able to create Invitations for contacts and redeem those invitation with the B2C provider in the exact same manner I did with the other providers.
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IFBvd2VyIEFwcHMgUG9ydG
FsIC0gQ29uZmlndXJlIEF6dXJlIEFEIFByb3ZpZGVyIGluIEF6
dXJlIEIyQ1xuYXV0aG9yOiBSaWNoYXJkIFdpbHNvblxudGFncz
ogJ3Bvd2VyYXBwcyxwb3J0YWwsYXp1cmUsYWN0aXZlZGlyZWN0
b3J5LGIyYydcbiIsImhpc3RvcnkiOlsyNjA2ODcwMzYsMTg2OD
EyMDgyMV19
-->