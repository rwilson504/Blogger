The usage of Xrm.Page is currently deprecated, still available due to it's high usage, but still deprecated. When will it go away, we don't really know yet. How then can we use it's formContext replacement within a web resource.  Well Microsoft recently added a the getContentWindow() function to the context which allows us to get the actual content of a web resource.  By adding an onload function to our form and utilizing getContentWindow() we can now call javascript on our web resource and pass it the formContext.  Additionally you can add the context to the window object of the web resource so that the formContext can be used throughout the lifecycle of the web resource.

Here is a quick tutorial on how to pass the formContext to a WebResource on a UCI Form.
[formContext in WebResource](https://youtu.be/uWDiMv82iSM)
[![Canvas App Video](https://img.youtube.com/vi/uWDiMv82iSM/sddefault.jpg)](https://youtu.be/uWDiMv82iSM)

Form OnLoad Code
<script src="http://gist-it.appspot.com/https://github.com/rwilson504/Blogger/blob/master/Get-formContext-In-UCI-WebResource/raw_formScriptOnLoad.js"></script>

WebResource Code
<script src="http://gist-it.appspot.com/https://github.com/rwilson504/Blogger/blob/master/Get-formContext-In-UCI-WebResource/raw_getCurrentFormId.html"></script>