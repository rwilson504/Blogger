
While working on creating a page to open a Canvas app full screen inside of a Model app I wanted to create one WebResource I could use over and over again.  Most of the references I found though showed people putting the Canvas app name in the code which wouldn't allow for code re-use.  Instead I wanted to pass query string parameters to the web resource so that it could get the name from the url.  The problem I ran into was with the new UCI interface and how it handles WebResources.  After a bit of trial and error I found the correct format for adding the Url to the sitemap and passing the parameters I needed.

``
main.aspx/webresources/<Your WebResource Name>?Data=
``

``
main.aspx/webresources/raw_CanvasAppInModel.html?Data=CanvasAppName=Test
``
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNDMyMjc4NTZdfQ==
-->