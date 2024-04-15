Integrating PCF Controls with Custom Entity Data in Model-Driven Apps


# Integrating PCF Controls with Host Form Data in Model-Driven Apps

## Introduction
This tutorial delves into integrating PowerApps Component Framework (PCF) controls with host form data within Microsoft Power Platform's model-driven apps. For developers using Microsoft PowerApps and PCF, aligning custom controls with entity data not only boosts the controls' functionality but also their interactivity across applications. This article will guide you through the necessary scripting to expose and consume formContext and globalContext from a custom entity known as new_Competitor. Aimed at enhancing both custom and Microsoft Form Component PCF controls, this approach ensures dynamic interactions with the host form data. By the end of this tutorial, you'll have a clear understanding of how to implement these integrations effectively, making your model-driven apps more responsive and adept at managing complex interactions.

## Setting up JavaScript on Host Form
To enable a PCF control to access data from its hosting form, a JavaScript module needs to be implemented on the host form. This module will capture and expose crucial context data (`formContext` and `globalContext`) to the PCF control through global variables.

### 1. JavaScript Code Implementation
Here is the code to be included in your entity form:
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

### 2. Deployment and Configuration
- **Add the Script**: Include the JavaScript as a web resource linked to the `new_Competitor` entity.
- **Modify the OnLoad Event**: Configure the entity form's OnLoad event to trigger the `onLoad` function.

## Getting Data from Host Form in Custom PCF Control
Once the host form data is made available globally, your custom PCF control needs to implement a method to utilize this data effectively.

### 1. Implementing the Render Component
```javascript
var NEWCompetitor = NEWCompetitor || {};

NEWCompetitor.renderComponent = function () {
    var self = this;
    if (!parent.NEWCompetitorInfo || !parent.NEWCompetitorInfo.formContext) {
        setTimeout(function () { self.renderComponent(); }, 500);
        return;
    }

    var formContext = parent.NEWCompetitorInfo.formContext;
    var globalContext = parent.NEWCompetitorInfo.globalContext;
    this.props = {
        formContext: formContext,
        globalContext: globalContext,
    };

    ReactDOM.render(
        React.createElement(YourPCFControl, this.props),
        this._container
    );
};
```

### 2. Testing and Validation
- **Include the Script**: Ensure the JavaScript is part of your PCF control's project.
- **Initialization and Rendering**: Verify the `renderComponent` function is called properly during the control's initialization.
- **Comprehensive Testing**: Test the integration to confirm that the control behaves as expected, especially when loading times vary.

## Getting Data from Host Form in Microsoft Form Component PCF

Integrating host form data with a Microsoft Form Component PCF requires a strategic approach to ensure seamless functionality. By placing JavaScript within the Form Component itself, you can access shared context data (`formContext` and `globalContext`) from a global variable set in the host form. This setup enables the Form Component to interact dynamically with data from the host form, enhancing its capability to respond to data-driven events.

### 1. Setting up JavaScript in the Form Component
To access the `formContext` from the host form, insert JavaScript directly into the form that is hosted within the Form Component. This script will reference the global variable provided by the host form's script.

#### JavaScript Code Example
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

### 2. Implementation Steps
- **Embed the Script**: Ensure that the JavaScript is embedded as a web resource within the Form Component's form. This script should be configured to execute appropriately, for example, during the form’s OnLoad event.
- **Reference Global Variable**: Use the `top.NEWCompetitorInfo` object to access shared data. This structure should have been populated by the host form, as described in earlier sections.

### 3. Considerations for Implementation
- **Testing for Null Conditions**: Always check if `top.NEWCompetitorInfo` and `top.NEWCompetitorInfo.formContext` are not null before accessing properties or methods to avoid runtime errors.
- **Cross-Frame Scripting Permissions**: Ensure that the configuration of your model-driven app and the user's browser settings allow for cross-frame scripting, as accessing `top` can be restricted in certain secure environments.
- **Performance and Security**: Consider the performance implications of cross-frame data access and ensure all data handling complies with security standards, especially when sensitive information is involved.

By implementing this method, the Microsoft Form Component within your model-driven app can dynamically interact with the data from the host form, making it more responsive and capable of handling complex scenarios based on live data inputs.
