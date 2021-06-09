
![Custom Process Action vs Custom API in Dataverse](https://github.com/rwilson504/Blogger/blob/master/custom-process-action-vs-custom-api/customprocessvscustomapiheader.png?raw=true)

I recently had the opportunity to utilize the new [Custom API](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/custom-api) functionality within Dataverse.  I had previously used [Custom Process Actions](https://docs.microsoft.com/en-us/powerapps/maker/data-platform/create-actions) and was a little confused as to the difference and why i would want to use the Custom API functionality.  After digging through the documentation I finally discovered the major difference is this..

![Custom Process Action vs Custom API](https://github.com/rwilson504/Blogger/blob/master/custom-process-action-vs-custom-api/customactionvscustomapi.png?raw=true)

The use case I was working on only returned data to the user so the Custom API allowed me to create a Function rather than an Action.  This made it much easier to test my API because i can just put the Url into the web browsers and see the results instance since it's only a GET operation.

There are some additional benefits to utilizing the Custom API as well such as being able to specify a specific security privilege.

To see all the differences between Custom Process Actions and Custom API check out this [article from Microsoft](https://docs.microsoft.com/en-us/powerapps/developer/data-platform/custom-actions#compare-custom-process-action-and-custom-api)

## Make Sure To Create Custom API Record Before Deploying Code

On a side note, most of the articles I found about creating a Custom API talked about creating the code first.  This ended up causing me a bit of a headache the first time i tried to deploy my Custom API code with [spkl](https://github.com/scottdurow/SparkleXrm/wiki/spkl). A null reference exception kept being throw during the registration.  I finally realized that I needed to create the Custom API record within my solution before actually attempting to deploy the code.  It was a silly mistake but one that cost me about an hour of my life which hopefully you can avoid 😀
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk0MTE3MTk1OF19
-->