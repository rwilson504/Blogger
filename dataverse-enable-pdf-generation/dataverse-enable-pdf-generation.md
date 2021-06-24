![2021-06-24_17-09-43](https://user-images.githubusercontent.com/7444929/123333167-658e9180-d50f-11eb-91e6-1ce770308f59.png)

Dataverse allows you to easily generate your Word Templates as [PDF files](https://docs.microsoft.com/en-us/dynamics365/sales-enterprise/create-quote-pdf).  Last year they expanded the functionality beyone just the out of the box sales entities to all custom entities.  In order to enable the functionality though you need to do some configuration.  Below are the different methods in which you can turn the PDF generation on or off for entities.

**Note**: Aftert updating these settings in whatever manor make sure you [clear your browser data](https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd).  The ribbon stores the values for which entities are enabled and disabled within the browser session.  If you don't do this you may not see the PDF generation buttons show up after you enable them.

## Method 1 (Sales Hub Installed):
For those orgs that have the Sales Hub app this is fairly straightforward.

* Navigate to the Apps page for your organization
  ``
  https://<Your Org>.crm.dynamics.com/apps
  ``
* Open the Sales Hub app
* Navigate to the App settings Area in the sitemap and click on Overview under the General group. [Microsoft Instructions](https://docs.microsoft.com/en-us/dynamics365/sales-enterprise/admin-settings-overview)
* In the Overview click the Manage link next to Convert to PDF [Microsoft Instructions](https://docs.microsoft.com/en-us/dynamics365/sales-enterprise/enable-pdf-generation-quote)
* Choose the entities you wish to enable PDF generation for and click Save.

## Method 2 (Sales Hub Installed)
If you have the Sales solution installed you can access the the Convert to PDF page using the following url which you could put in the sitemap.

``
https://<Your Org>.crm.dynamics.com/main.aspx?pagetype=control&controlName=MscrmControls.FieldControls.CCFadminsettings&data={"id":"overview","ismanage":"overview"}
``

## Method 3 (XrmToolBox)
If you don't have sales installed on your system you can still enable this feature but it takes a bit more work.  The easiest way is to utilize some of the tools in XrmToolBox. 

First we will open FetchXML Builder and retrieve the pdfsetting entity, we will need to specify the pdfsettingsid and pdfsettingsjson attributes.  This will return a single records.  Copy the outputs of these fields to your text editor.

![2021-06-24_13-52-57](https://user-images.githubusercontent.com/7444929/123332434-7c80b400-d50e-11eb-9c85-a7bcccd1b45c.png)

Next I will utilize the WebAPI Launcher to update the pdfsettign entity with our updated json which will contain all the entities you want to enable for PDF generation.

![2021-06-24_15-19-38](https://user-images.githubusercontent.com/7444929/123332462-84d8ef00-d50e-11eb-9d55-d7101b2b611d.png)

## Method 4 (PowerShell)
Because the PDF settings are stored per envrionment you may want to update them as part of your ALM.  One way of doing this would be to run a PowerShell script which sets them during deployment.  To learn more about how to connect to Dataverse using PowerShell check out [this article](https://www.richardawilson.com/2021/06/calling-dataverse-web-api-in-powershell.html).  The following Invoke-RestMethod calls would get the existing pdfsetting entity and then update that entity with the JSON you want.

```
##########################################################
# GET THE PDF SETTINGS ENTITY
##########################################################

$pdfSettingRetrieveUriParams = '$select=pdfsettingid,pdfsettingsjson&$top=1'

$pdfSettingRetrieveParams =
@{
    URI = "$($dataverseEnvUrl)/api/data/v9.1/pdfsettings?$($pdfSettingRetrieveUriParams)"
    Headers = @{
        "Authorization" = "$($authResponse.token_type) $($authResponse.access_token)" 
    }
    Method = 'GET'
}

# Get the pdf settigns entity
$pdfSettignsRetriveRequest = Invoke-RestMethod @pdfSettingRetrieveParams -ErrorAction Stop
$pdfSettignsRetriveResponse = $pdfSettignsRetriveRequest

#Output the results
$pdfSettingsValue = $apiCallResponse.value

##########################################################
# UPDATE THE PDF SETTINGS ENTITY
##########################################################

$pdfSettingJSON = '{ "pdfsettingsjson" : ''{"contact": true, "account": true}'' }'

$pdfSettingUpdateParams =
@{
    URI = "$($dataverseEnvUrl)/api/data/v9.1/pdfsettings($($pdfSettingsValue.pdfsettingid))"
    Headers = @{
        "Authorization" = "$($authResponse.token_type) $($authResponse.access_token)" 
    }
    Method = 'PATCH'
    Body = $pdfSettingJSON
    ContentType = "application/json"
}

# Update the pdf settings entity
$pdfSettignsUpdateRequest = Invoke-RestMethod @pdfSettingUpdateParams -ErrorAction Stop
$pdfSettignsUpdateResponse = $pdfSettignsUpdateRequest
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI1MDU5NDQ3Ml19
-->