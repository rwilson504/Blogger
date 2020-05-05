The usage of Xrm.Page is currently deprecated, still available due to it's high usage, but still deprecated. When will it go away, we don't really know yet. How then can we use it's formContext replacement within a web resource.  Well Microsoft recently added a the getContentWindow() function to the context which allows us to get the actual content of a web resource.  By adding an onload function to our form and utilizing getContentWindow() we can now call javascript on our web resource and pass it the formContext.  Additionally you can add the context to the window object of the web resource so that the formContext can be used throughout the lifecycle of the web resource.

Here is a quick tutorial on how to pass the formContext to a WebResource on a UCI Form.
[formContext in WebResource](https://youtu.be/uWDiMv82iSM)
[![Canvas App Video](https://img.youtube.com/vi/uWDiMv82iSM/sddefault.jpg)](https://youtu.be/uWDiMv82iSM)

**Form OnLoad Code**
```
// This should be in a script loaded on the form. 
// form_onload is a handler for the form onload event.
function form_onload(executionContext) {
    var formContext = executionContext.getFormContext();
    var wrControl = formContext.getControl("WebResource_getCurrentFormId");    
    if (wrControl) {
        wrControl.getContentWindow().then(
            function (contentWindow) {
                var contentAvailable = self.setInterval(function () {
                    //we need to check that the content window was actually loaded
                    // and that our function is available to call on the web resource.
                    if (contentWindow.setClientApiContext) {
                        clearInterval(contentAvailable);                  
                        contentWindow.setClientApiContext(formContext);                                               
                    }                    
                }, 100);                
            }
        )
    }
}
```

**WebResource Code**
```
<!DOCTYPE html>
<html>
    <head>
        <script>
            // This script should be in the HTML web resource.
            // No usage of Xrm or formContext should happen until this method is called.
            function setClientApiContext(formContext) {
                // Optionally set the formContext as global variables on the page.
                window._formContext = formContext;
                
                // Add script logic here that uses xrm or the formContext.
                // For this test we will just get the current form id
                document.getElementById('formIfo').innerHTML =_formContext.ui.formSelector.getCurrentItem().getId();
                document.body.style.display = "block";
            }
        </script>    
    </head>
    <body style="display: none;">
        Current Form Id: <span id="formIfo"></span> 
    </body>
</html>
```