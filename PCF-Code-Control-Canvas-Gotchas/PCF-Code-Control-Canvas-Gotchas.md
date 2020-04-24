PCF Code Components allow developers to create their own custom interfaces utilizing Typescript and/or React.  To learn more about the PCF Component Framework check out [this article](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/custom-controls-overview).  Building these controls has been great in Model app but only recently could we also start using them in Canvas apps. If you want to learn more about how to add your PCF Code component to a Canvas App check out [this article from Microsoft](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps).

Now that these controls can be utilized within Canvas Apps there are a few things to watch out for. Some of these are bugs that should be fixed when this feature come to General Availability. 

# ControlManifest.Input.xml
The ControlManifest.Input.xml file is where you can define your controls name and all the properties associated with it.  Below are some gotcha that will cause you errors when attempting to add or deploy your components.

## Be Careful of XML Escape Characters
When defining your component it's important to add descriptions to ensure your users know how to interact with your control.  When doing so though make sure you don't include any XML escape characters or your control will either not import correctly in Canvas or in a Model app you will not see any of the properties when you attempt to add it to a View/Form.

XML Escape Characters
| Name      | Character|
| :---        |    :----:   |
| Ampersand      | &|
| Less-than   | <        |
|Greater-than|>|
|Quotes|"|
|Apostrophe|'|


## Don't Include Preview Image
The preview image is great for Model apps because it gives the user a pic of what your control looks like.  Unfortunately right now it will cause an error when you attempt to import your control into the Canvas editor.

## Don't Use Enums as Parameters
When defining your parameters Enums are a great way to let the users know which values are allowed.  Unfortunately using Enum will allow the control to be added in the Canvas editor but as soon as you try to run the app in the Canvas run-time you will get the horrible Canvas Screen of Death!



![Canvas Screen of Death](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/canvas-screen-of-death.png?raw=true)


<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMyNzQxMzcxMCwtNjI4ODM1MDc3LDE1NT
I2NDc1MDAsLTMwODIwNjY3MCwtNzA3NzY1ODA0XX0=
-->