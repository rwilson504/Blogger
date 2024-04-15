# Integrating PCF Controls with Host Form Data in Model-Driven Apps

## Introduction
This tutorial delves into integrating PowerApps Component Framework (PCF) controls with host form data within Microsoft Power Platform's model-driven apps. For developers using Microsoft PowerApps and PCF, aligning custom controls with entity data not only boosts the controls' functionality but also their interactivity across applications. This article will guide you through the necessary scripting to expose and consume formContext and globalContext from a custom entity known as new_Competitor. Aimed at enhancing both custom and Microsoft Form Component PCF controls, this approach ensures dynamic interactions with the host form data. By the end of this tutorial, you'll have a clear understanding of how to implement these integrations effectively, making your model-driven apps more responsive and adept at managing complex interactions.

**Disclaimer**: It's important to note that there are various methods to retrieve data within PCF controls, including the use of WebAPI. While WebAPI provides a versatile way to access data across different entities and contexts, the approach described in this tutorial focuses on directly integrating with host form data, which can be particularly beneficial in specific use cases where immediate context is crucial. This method allows for real-time data interactions that are essential for certain scenarios, providing a streamlined integration that may not always be achievable through WebAPI alone.

## Setting up JavaScript on Host Form
To enable a PCF control to access data from its hosting form, a JavaScript module needs to be implemented on the host form. This module will capture and expose crucial context data (`formContext` and `globalContext`) to the PCF control through global variables.

### JavaScript Code Implementation
Here is code you can utilize with a webresource which has been loaded into your host form.  This example loads the `formContext` and `globalContext` but you can load additional inforation here as you need.

```javascript
var NEWCompetitor = window.NEWCompetitor || {};

(function () {
    "use strict";

    this.onLoad = function (executionContext) {
        var formContext = executionContext.getFormContext();
        var globalContext = Xrm.Utility.getGlobalContext();
        copyDataToWindowForPCF(globalContext, formContext);
    };

    this.copyDataToWindowForPCF = function (globalContext, formContext) {
        if (typeof parent['NEWCompetitorInfo'] === "undefined") {
            parent.NEWCompetitorInfo = { __namespace: true };
        }

        parent.NEWCompetitorInfo.formContext = formContext;
        parent.NEWCompetitorInfo.globalContext = globalContext;
    };

}).call(NEWCompetitor);
```

### Deployment and Configuration
- **Add the Script**: Include the JavaScript as a web resource linked to the `new_Competitor` entity.
- **Modify the OnLoad Event**: Configure the entity form's OnLoad event to trigger the `onLoad` function.

## Getting Data from Host Form in Custom PCF Control
Once the host form data is made available globally, your custom PCF can access that information using `window.NEWCompetitorInfo.formContext`.

### Implementing the Render Component
I typically use the rendenComponent function in PCF to make sure that the host data is loaded before the overall PCF is loaded, so that I make sure I can access this from everywhere within the PCF.  Within the renderComponent function is also where you might call render a React component which you can now pass this information in it's props.

```javascript

private renderComponent(){
		var self = this;
		//@ts-ignore for this._context.mode.contextInfo
		if (!parent.NEWCompetitorInfo.formContext){			
			setTimeout(() => {self.renderComponent()}, 500);
			return;
		}		
	}
```

## Getting Data from Host Form in Microsoft Form Component PCF

Integrating host form data with a Microsoft Form Component PCF requires a strategic approach to ensure seamless functionality. By placing JavaScript within the Form Component itself, you can access shared context data (`formContext` and `globalContext`) from a global variable set in the host form. This setup enables the Form Component to interact dynamically with data from the host form, enhancing its capability to respond to data-driven events.  For information about the Microsoft Fomponent can be found here [Edit related table records directly from another table’s main form](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/form-component-control).

### Setting up JavaScript in the Child Form
To access the `formContext` from the host form, insert JavaScript directly into the form that is hosted within the Form Component. This script will reference the global variable provided by the host form's script.

```javascript
// Access the formContext from the global variable set by the host form
if (top.NEWCompetitorInfo && top.NEWCompetitorInfo.formContext) {
    var formContext = top.NEWCompetitorInfo.formContext;
    
    // Utilize formContext for further operations within the Form Component
    // Example: Accessing data, manipulating form fields, etc.
    var someFieldValue = formContext.getAttribute("fieldname").getValue();
    // Additional logic to manipulate or use the form data
}
```

By implementing this method, the Microsoft Form Component within your model-driven app can dynamically interact with the data from the host form, making it more responsive and capable of handling complex scenarios based on live data inputs.
