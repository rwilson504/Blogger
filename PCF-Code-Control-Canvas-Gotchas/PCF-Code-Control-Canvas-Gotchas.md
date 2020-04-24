PCF Code Components allow developers to create their own custom interfaces utilizing Typescript and/or React.  To learn more about the PCF Component Framework check out [this article](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/custom-controls-overview).  Building these controls has been great in Model app but only recently could we also start using them in Canvas apps. If you want to learn more about how to add your PCF Code component to a Canvas App check out [this article from Microsoft](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps).

Now that these controls can be utilized within Canvas Apps there are a few things to watch out for. Some of these are bugs that should be fixed when this feature come to General Availability. 

## Be Careful of XML Escape Characters in ControlManifest.Input.xml
The ControlManifest.Input.xml file is where you can define your controls name and all the properties associated with it.  When defining everything it's important to add descriptions to ensure your users know how to interact with your control.  When doing so though make sure you don't include any XML escape characters which include the following.

| Name      | Character|
| :---        |    :----:   |
| **Ampersand**      | Title       |
| Paragraph   | Text        |

By doing so you can break the import of your control.

## Don't Include Preview Image

## Don't Use Enums as Parameters
Using enuim
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg1OTQyODE1OCwtMzA4MjA2NjcwLC03MD
c3NjU4MDRdfQ==
-->