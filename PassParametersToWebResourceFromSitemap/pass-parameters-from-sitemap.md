While working on creating a page to open a Canvas app full screen inside of a Model app I wanted to create a WebResource I could use over and over again.  Most of the references I found showed the Canvas app name in the code which wouldn't allow for code re-use.  Instead I wanted to pass query string parameters to the WebResource so that it could get the name from the URL.  The problem I ran into was with the new UCI interface and how it handles WebResources.  After a bit of trial and error I found the trick was not using the WebResource type in the SiteMap editor but instead using a URL in the correct format and passing the parameters I needed within the Data parameters.

**Update-** After working with the Maker SiteMap editor I have realized that it will auto decode all of your Data parameters.  Instead of using the Maker portal you will need to update the SiteMap using [XrmToolbox] or another XML Editor. 
![Do Not Use Default Sitemap Editor](https://github.com/rwilson504/Blogger/blob/master/PassParametersToWebResourceFromSitemap/addurl.png?raw=true)

Use XRMToolbox SiteMap editor to create your 
![Use XRMToolbox](https://github.com/rwilson504/Blogger/blob/master/PassParametersToWebResourceFromSitemap/SiteMapLinkXrmToolbox.png?raw=true)

Here is the correctly formatted URL to use and an example of how to use it.
```
main.aspx/webresources/<Your WebResource Name>?Data=<Your Parameters URI Encoded>
```

```
main.aspx/webresources/raw_CanvasAppInModel.html?Data=CanvasAppName=Test
```

To encode your parameters just open the console in your browser by hitting the F12 button and run the encodeURIComponent function on your parameters.
![EncodeURI](https://github.com/rwilson504/Blogger/blob/master/PassParametersToWebResourceFromSitemap/encodeuri.png?raw=true)

In order to get the values of the Data parameter in your WebResource you can follow the instruction and code from Microsoft in the link below.

[Sample: Pass multiple values to a web resource through the data parameter](https://docs.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/sample-pass-multiple-values-web-resource-through-data-parameter)
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IFBhc3MgQ3VzdG9tIFBhcm
FtZXRlcnMgVG8gV2ViUmVzb3VyY2UgRnJvbSBVSUMgU2l0ZU1h
cCBpbiBEeW5hbWljc1xuYXV0aG9yOiBSaWNoYXJkIFdpbHNvbl
xudGFnczogJ3NpdGVtYXAsIGR5bmFtaWNzLCB3ZWJyZXNvdXJj
ZSdcbiIsImhpc3RvcnkiOlsxODE3NDQ1NTA2LDEwNDc2OTEzND
AsMzY0OTM4MTg4LC04NTE5MDY2ODgsLTU3NTE4MDMzMCwtMTM3
NTMwMTQwOCw3Mzc1NTQ1NV19
-->