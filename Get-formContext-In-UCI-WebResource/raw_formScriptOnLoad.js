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