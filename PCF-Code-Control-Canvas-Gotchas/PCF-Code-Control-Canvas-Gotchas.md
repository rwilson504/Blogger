PCF Code Components allow developers to create their own custom interfaces utilizing Typescript and/or React.  To learn more about the PCF Component Framework check out [this article](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/custom-controls-overview).  Building these controls has been great in Model app but only recently could we also start re-using them in our Canvas apps. 

If you want to learn more about how to add your PCF Code component to a Canvas App check out [this article from Microsoft](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps).

Now that these controls can be utilized within Canvas Apps there are a few things to watch out for. Some of these are bugs that should be fixed when this all comes out of Preview and into General Availability. 

# ControlManifest.Input.xml
The ControlManifest.Input.xml file is where you define your component information and all the properties associated with it.  Below are some gotcha that will cause you errors when attempting to deploy your component into a Canvas app.

## Be Careful of XML Escape Characters
When defining your component it's important to add descriptions to ensure your users know how to interact with your control.  When doing so though make sure you don't include any XML escape characters or your control will not import correctly 

This is bad...
![No Escape Characters](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/manifest-escap-character.png?raw=true)
XML Escape Characters
| Name      | Character|
| :---        |    :----:   |
| Ampersand      | &|
| Less-than   | <        |
|Greater-than|>|
|Quotes|"|
|Apostrophe|'|
## Don't Include Preview Image
The preview image is great for Model apps because it gives the user an image of what your control looks like before selecting it.  Unfortunately right now it will cause an error when you attempt to import your control into the Canvas editor.

Here is what the sample image looks like in a Model App when adding it to a form or view.
![Preview Image Sample](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/preview-image.png?raw=true)

Make sure not to utilize the preview-image in your manifest if you plan on importing this control to Canvas.
![Preview Image in Manifest](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/namifest-preview-image.png?raw=true)

## Don't Use Enum Type for Parameters
When defining your parameters Enums are a great way to let the users know which values are allowed.  Unfortunately using Enums will allow the control to be added in the Canvas editor but as soon as you try to run the app in the Canvas run-time you will get the horrible Canvas Screen of Death!

![Canvas Screen of Death](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/canvas-screen-of-death.png?raw=true)

Here is an example of an Enum defined in a manifest.
![Manifest With Enum](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/manifest-enum-dont.png?raw=true)

Instead define your parameters and an SingleLine.Text and give the user some instruction on the Description keys as the valid options.
![Use SingleLine.Text Instead](https://github.com/rwilson504/Blogger/blob/master/PCF-Code-Control-Canvas-Gotchas/manifest-enum-do.png?raw=true)

Using text is a bit harder and will require you to determine the correct value in your code. For example with a true/false field you will need to do something like this.

``var _myTrueFalse = context.parameters?.trueFalseField?.raw.toLowerCase() === "true" ? true : false;``
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEdvdGNoYXMgZm9yIFBDRi
BDb2RlIENvbXBvbmVudHMgaW4gQ2FudmFzIEFwcHNcbmF1dGhv
cjogUmljaGFyZCBXaWxzb25cbnRhZ3M6IHBjZjtjYW52YXM7ZH
luYW1pY3M7ZDM2NTtwb3dlcmFwcHNcbiIsImhpc3RvcnkiOlst
MTQzNzY3MjI4LC02Mjg4MzUwNzcsMTU1MjY0NzUwMCwtMzA4Mj
A2NjcwLC03MDc3NjU4MDRdfQ==
-->