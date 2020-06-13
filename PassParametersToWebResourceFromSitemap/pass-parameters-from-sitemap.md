
While working on creating a page to open a Canvas app full screen inside of a Model app I wanted to create a WebResource I could use over and over again.  Most of the references I found though showed people putting the Canvas app name in the code which wouldn't allow for code re-use.  Instead I wanted to pass query string parameters to the web resource so that it could get the name from the URL.  The problem I ran into was with the new UCI interface and how it handles WebResources.  After a bit of trial and error I found the trick was not using the WebResource type in the sitemap editor but instead using a URL in the correct format passing the parameters I needed withing the Data parameters.

![Add URL to Sitemap](addurl.png =250)

Here is the correctly formatted URL to use and an example of how to use it.
``
main.aspx/webresources/<Your WebResource Name>?Data=<Your Parameters URI Encoded>
``

``
main.aspx/webresources/raw_CanvasAppInModel.html?Data=CanvasAppName=Test
``


<!--stackedit_data:
eyJoaXN0b3J5IjpbNzM3NTU0NTVdfQ==
-->