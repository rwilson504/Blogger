![Harnessing Host Form Data with PCF Controls in Model-Driven Applications](https://github.com/rwilson504/Blogger/assets/7444929/0308e67d-07e7-401a-b717-f8965d10bf2e)

## Introduction

This tutorial delves into integrating PowerApps Component Framework (PCF) controls with host form data within Microsoft Power Platform's model-driven apps. This article will guide you through the necessary scripting to expose and consume formContext and globalContext from a custom table called new_Competitor. Aimed at enhancing both custom and Microsoft Form Component PCF controls, this approach ensures dynamic interactions with the host form data.

**Disclaimer**: It's important to note that there are various methods to retrieve data within PCF controls, including the use of WebAPI. While WebAPI provides a versatile way to access data across different entities and contexts, the approach described in this tutorial focuses on directly integrating with host form data, which can be particularly beneficial in specific use cases where immediate context is crucial. This method allows for real-time data interactions that are essential for certain scenarios, providing a streamlined integration that may not always be achievable through WebAPI alone.

## Setting up JavaScript on Host Form

To enable a PCF control to access data from its hosting form, JavaScript needs to be implemented on the host form. This will capture and expose crucial context data (`formContext` and `globalContext`) to the PCF control through global variables.

### JavaScript Code Implementation

Here is code you can utilize within a webresource which has been loaded into your host form.  This example loads the `formContext` and `globalContext` but you can load additional information here as you need.

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

- **Add the Script**: Include the JavaScript as a web resource linked to the `new_Competitor` table form.
- **Modify the OnLoad Event**: Configure the entity form's OnLoad event to trigger the `onLoad` function.

## Getting Data from Host Form in Custom PCF Control

Once the host form data is made available globally, your custom PCF can access that information using `window.NEWCompetitorInfo.formContext`.

### Implementing the Render Component

I typically use the renderComponent function in PCF to make sure that the host data is loaded before the overall PCF is loaded, so that I make sure I can access this from everywhere within the PCF.  Within the renderComponent function is also where you might call the render of a React component.

```javascript

private renderComponent(){
		var self = this;
		//@ts-ignore for this._context.mode.contextInfo
		if (!window.NEWCompetitorInfo.formContext){			
			setTimeout(() => {self.renderComponent()}, 500);
			return;
		}		
	}
```

### Accessing in React

If you are using a React control within your PCF you can declare the namespace for the top-level form within your typescript as an any so you don't get errors.

```javascript
import * as React from "react";
import {IInputs} from "./generated/ManifestTypes";

export interface IProps {
    pcfContext: ComponentFramework.Context<IInputs>  
}

declare global {
    interface Window {
        NEWCompetitorInfo: any
    }
}
```

## Getting Data from Host Form in Microsoft Form Component PCF

If you are using the Form Component to load editable form into a host form you may want to access information and interact with the host form.  The onLoad function running on the host form as shown earlier gets us global variables we can use here as well.  These variables will enable you to call JavaScript on the form inside the component and access information from the hosing form.  More information about the Form Component can be found here [Edit related table records directly from another table’s main form](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/form-component-control).

![image](https://github.com/rwilson504/Blogger/assets/7444929/7598bf4c-f269-4ba9-9876-313814049551)

### Setting up JavaScript in the Child Form

To access the `formContext` from the host form, use a webresource and event in the form hosted within the Form Component. This script will reference the global variable provided by the host form's script.

```javascript
var NEWCompetitorContact = window.NEWCompetitorContact || {};

(function () {
    "use strict";

    this.onLoad = function (executionContext) {
		// Access the formContext from the global variable set by the host form
		if (top.NEWCompetitorInfo && top.NEWCompetitorInfo.formContext) {
		    var formContext = top.NEWCompetitorInfo.formContext;
		    
		    // Utilize formContext for further operations within the Form Component
		    // Example: Accessing data, manipulating form fields, etc.
		    var someFieldValue = formContext.getAttribute("fieldname").getValue();
		    // Additional logic to manipulate or use the form data
		}
 };

}).call(NEWCompetitorContact);
```

By implementing this method, the Form Component within your model-driven app can dynamically interact with the data from the host form, making it more responsive and capable of handling complex scenarios based on live data inputs.
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IEhhcm5lc3NpbmcgSG9zdC
BGb3JtIERhdGEgd2l0aCBQQ0YgQ29udHJvbHMgaW4gTW9kZWwt
RHJpdmVuIEFwcGxpY2F0aW9uc1xuYXV0aG9yOiBSaWNrIFdpbH
NvblxudGFnczogJ3Bvd2VyYXBwcyxtb2RlbGFwcHMscGNmLGR5
bmFtaWNzLGphdmFzY3JpcHQnXG4iLCJoaXN0b3J5IjpbMTA1Mz
MwNTY3OSwtNjgwNDk5OTU0LC04MjQxNTE4NTFdfQ==
-->