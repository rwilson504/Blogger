# Power Apps Portal - Configure Azure AD Provier in Azure B2C

It is recommended that you no longer use Local Login authentication for Power Apps Portal but instead utilize Azure Active Directory B2C to provide this type of authentication. See [Migrate identity providers to Azure AD B2C
](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/migrate-identity-providers)

Configuring the B2C providers is fairly straightforward utilizing the the new preview interface [Configure the Azure Active Directory B2C provider](https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-azure-ad-b2c-provider).  Make sure you navigate to the preview version of the Maker portal for now to access this, [https://make.preview.powerapps.com/](https://make.preview.powerapps.com/)

For this article my goals were the following.
* Set the existing Azure AD configuration as a deprectated authentication mechanism within the portal to move users on to the B2C instance.
* Allow user to authenticate to B2C using Azure AD, Google or Create local B2C account.

![Original log in screen](https://user-images.githubusercontent.com/7444929/148592406-10108368-93ab-4308-a721-23f4412a8a22.png "Original Login Screen")

## Depreacate Old Providers

Once I had run through the instructions for configuring the Azure B2C authentication I then had to mark the Local Login and Azure AD authentication mehtods as Deprecated.  This would ensure that when existing users log into the Portal using those methods they will then be asked to migrate their account to B2C.

![Account Migration](https://user-images.githubusercontent.com/7444929/148592949-b3d4f3ad-e5e2-48a4-92b3-624f5d7a14c8.png "Account Migration Screen")

Deprecation of the old providers can be done through the Portal Management model app within the Site Settings.

### Set Local Login Authentication as Deprecated
The site setting for deprecated the local authentication was already in my site settings so i set the value to true.
![Deprecate Local Login](https://user-images.githubusercontent.com/7444929/148593379-6f13653c-de3b-4c42-a140-085b5a8facd2.png "Deprecate Local Login")

| Name      | Value |
| ----------- | ----------- |
| Authentication/Registration/LocalLoginDeprecated      | true       |

### Set Portal Azure AD Authentication as Deprected
In order to deprecate other other providers you need to create the site settings for them and set the value to true.

![Deprecate Azure AD Authentication](https://user-images.githubusercontent.com/7444929/148593704-28e66710-1b6b-4782-a7f6-5775b25ede35.png "Deprecate Azure AD Authentication")

| Name      | Value |
| ----------- | ----------- |
| Authentication/OpenIdConnect/AzureAD/Deprecated      | true       |

### Google Identity Provider
Setting up the Google identity provider was easily and the instructions provided worked without any issues. See [Set up sign-up and sign-in with a Google account using Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-google?pivots=b2c-user-flow)

### Azure AD Provider
The instructions for [Adding an Azure Active Directory provider to Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-azure-ad-single-tenant?pivots=b2c-user-flow) but there were a few items missing to get it working correctly with Power Apps Portal.
