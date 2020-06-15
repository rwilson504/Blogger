Canvas PowerApps provide a great amount of functionality with little or no code.  Many examples demonstrate how to open a Canvas App within a Model App on a specific record and pass the context of that record.  

What if you don't want to open a Canvas App for a specific record?  Let's say you want to create a menu functionality for user to allow them to open other Canvas apps, or maybe you have developed a Canvas app which provides a file conversion function which doesn't relate to records at all.  It would be nice if we could easily load these types of Canvas Apps from the SiteMap.  Here is how to get this done.

This solution is based off the solution from [Dynamict](https://www.dynamict.eu/2020/02/27/embed-a-canvas-app-in-a-model-driven-app-full-screen/) but I have made some improvement that allow you to utilize the same WebResource over and over again and also provides information from the originating Model App.

Here is an example of a Canvas app I have created which will display a menu of items which the user can launch.  The Canvas App is being called from the SiteMap link in the Model app and displayed full screen within the content window.

![Canvas App Menu](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/CanvasMenu.png?raw=true)

## Pre-Requisites
* The Canvas app you want to open must be in a Solution.  If it is not then it will never show up in the "canvasapp" entity which we are using to get the App id.  It does not matter what Solution it is in just that it sits in a solution within your environment.

## Create a New WebResource
Create a new HTML WebResource.  You can download the source [here](https://gist.githubusercontent.com/rwilson504/417e334a5597ebc5a9dec8e762efe0b3/raw/b5e9e45526bfaa5a46f199ef16b408eed59cd21b/CanvasAppInModel.html) or copy and past from below.

<script src="https://gist.github.com/rwilson504/417e334a5597ebc5a9dec8e762efe0b3.js"></script>

![New WebResource](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/WebResourceNew.png?raw=true)

## Add A SiteMap link
The trick to not having to hard code the name of the Canvas App into the WebResource is the way in which we build the WebResource URL in the SiteMap. Typically when adding a WebResource we would choose the Type of the sub-area to be "Web Resource", unfortunately doing this will now allow us to pass any additional URL parameters other than the ones provided by Microsoft into the WebResource.  Our goal is to add a Data parameter that contains our Canvas App name and any other parameters we wish to pass to our WebResource so that it can do all the work of opening the Canvas App.  So instead of using the "Web Resource" type on the SiteMap we will utilize the URL type and add the URL in the following format.

```
main.aspx/webresources/<Web Resource Name We Created>?Data=<Our Parameters>
```

Example
```
main.aspx/webresources/raw_CanvasAppInModel.html?Data=canvasAppName%3Draw_canvasmenu_21eea%26source%3DmodelApp%26screenColor%3Drgba(34%2C139%2C34%2C1)

```

![Add Sitemap Link](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/SiteMapLink.png?raw=true)

As you can see in the example the Data property appears to have several other parameters in it but they have all been encoded.  If you want to see what these parameters are decoded copy the contents of the data parameter use the decodeURIComponent command in a console window or use a website like this [Decode/Encode](https://meyerweb.com/eric/tools/dencoder/).

Encoded Data Parameter
![Encoded Data Parameter](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/EncodedParams.png?raw=true)

Decoded Data Parameter
![Decoded Data Parameter](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/DecodedParams.png?raw=true)

Looking at the parameters we can see that I have included three in this example.  This list is just an example, as long as you include the canvasAppName you can include however many other parameters you want!

* canvasAppName - (Required) This is used by the WebResource to determine which Canvas App to open.  To get the name of your App open the maker portal and look at the Name field for your App. ![Canvas App Name](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/CanvasAppName.png?raw=true)
* source - (Optional) Can be used within your Canvas app to determine which application or SiteMap link the app is being opened by.  You could use this to determine which screen in your Canvas App should be opened when the link is clicked if you use a single Canvas App for multiple functions.
* screenColor - (Optional) Affects the loading screen color when the Canvas App is being accessed.  This takes in an rgba value.  For more information on this parameters check out the Microsoft article on [Embedding Canvas Apps](https://docs.microsoft.com/en-us/powerapps/maker/canvas-apps/embed-apps-dev).

There are two additional parameters which the WebResource will automatically push to the Canvas app so there is no need to include them.

* modelAppId - This will be the guid of your current Model app.  This can be very useful in building links later back to records where you want the record screen to show up in the property App.
* modelAppUrl - Is a link back to the Model App url where you launched the Canvas App from.  Again this can be useful later to build links.

After you have adjusted the Data parameters to be what you want make sure you go back and Encode them again before you past them into the SiteMap url.

# Adjusting the Canvas App To Fit Full Screen
If you would like to make sure that your Canvas App fits completely within the content window without any space on the left or right it's important to turn off the "Lock aspect ratio" setting with your app.  This can be done within the Canvas Editor by going to **Setting -> Screen size + orientation** and un-setting the toggle for **Lock aspect ratio**.  Make sure after you complete this you hit the **Apply** button in the lower right hand screen and Save/Publish the app.

![Turn off Lock aspect ratio](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/LockAspectRatioOff.png?raw=true)

Here is what the app looks like with the Lock aspect ratio turned off.
![App with Lock aspect ratio off](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/AppWithAspectOff.png?raw=true)

Here is what it looks ike with it turned on.  You will notice that there is now grey padding around the app.
![App with Lock aspect ratio on](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/AppWithAspectOn.png?raw=true)

Additionally with the Lock aspect radio turned off we can now set elements within our app to span the entire screen.  For example you can create a banner whose width is set to the Parent.Width of the app and that bar will be displayed across the entire app.

![App Banner](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/LauncherBarFullScreenWidth.png?raw=true)

# Getting the Parameters In Your Canvas App
Canvas App provide a function called **Param** which can be used to get the parameters from the Url that have been passed in.  As you can see in the example below I am setting a label to the modelAppId parameters which is automatically passed by the WebResource which opened the app.  

**Also make sure you note that parameter names are case sensitive.**

![Get Param](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/ParamFunction.png?raw=true)

Next we can utilize the parameters we have passed to accomplish things in our Canvas App such as opening other Canvas App or Links to Record in our Model App.

![All Params](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/AllParams.png?raw=true)

# Building a Link Back to A Record In the Model App
Having the Model App Url and Id can be very helpful if we ever want to create links back to the Model App for records.  Below I have used these parameters to build out a link which will open up the first contact in the system.  This could be easily modified to open any other entity by modifying the values being used in the **id** and **etc** fields.

This utilizes the Launch function and builds our the Model App url using the parameter.  As of now the Launch function will open this link in a new tab.  Opening it in a new window or the current window is in preview and available on some environments.

![Build Link to Model App](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/LaunchExistingRecord.png?raw=true)

Now when we click on the button we will get a new tab with the Contacts entity record displayed.
![Contact Record](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/OpensExistingRecord.png?raw=true)

# Building a Link to Another Canvas App
In my example i am building a Menu function which will allow users to complete other actions.  Some of those action may involve opening another Canvas App.  We can do this utilize the Launch functionality we used to open an entity record above.

To start we need to get the App Id of the other Canvas App.  We can do this by adding the Canvas App data source to our Canvas App and then filtering down on the Name field to get the app we want.  You can get the name of the other app by opening the Make portal and looking at the Apps name field.

In this example I have created a variable in my App Start to get the Id of the App I wanted.
![Store App Id](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/CanvasAppId.png?raw=true)

Then create a button to Launch the new app in another tab.
![Launch App](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/LaunchAnotherCanvasApp.png?raw=true)

The other app will be opened.
![App Launched](https://github.com/rwilson504/Blogger/blob/master/Launch-Canvas-From-Model-Sitemap/LaunchAnotherApp.png?raw=true)

