PCF Code Components allow developers to create their own custom interfaces utilizing Typescript and/or React.  To learn more about the PCF Component Framework check out [this article]([https://docs.microsoft.com/en-us/powerapps/developer/component-framework/custom-controls-overview](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/custom-controls-overview)).  Building these controls has been great in Model app but only recently could we also start using them in Canvas apps. If you want to learn more about how to add your PCF Code component to a Canvas App check out [this article from Microsoft]([https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps)).

Now that these controls can be utilized within Canvas Apps there are a few things to watch out for. Some of these are bugs that should be fixed when this feature come to General Availability. 

## ControlManifest.Input - Be Careful of XML Escape Characters
The ControlManifest.Input.xml

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUzMTUwNDExM119
-->