
There are a couple of options you can persue if you want to get at this information.
* Power Automate: Using a Flow to capture the data, a good example of how to implement that can be found here: [Last Successful Login on Contact record](https://prasadmotupallicrm.blogspot.com/2021/10/last-successful-login-on-contact-record.html) by [Prasad Motupalli](https://prasadmotupallicrm.blogspot.com/).  The one thing this was missing for me though was security which could be a concern with the http trigger not requiring authentication.  I want to be sure that the person updating the data is an authenticated user.
* Application Insights: You can track additional details surrounding users on your site by using liquid and adjusting the application insights JS on your site.  Details on how to do that can be found here: [PowerApps Portals tracking using Azure Application Insights](https://www.dancingwithcrm.com/powerappsportals-tracking-using-azure-app-insights/) by [Oleksandr Olashyn](https://www.dancingwithcrm.com/about/). I have added this code to my site and will be using it for more detailed reports.  The on thing that was missing from this one though was the inability to have that data pushed to Dataverse so that I can do reporting there directly or easily a run Power Automate against that data to automatically disable a user who hasn't logged in for a very long time. 

Code to be copied into the Tracking Code content snippit:

```
<script type = "text/javascript" > 
{% if user %}
    (function(webapi, $) {
        function safeAjax(ajaxOptions) {
            var deferredAjax = $.Deferred();
            shell.getTokenDeferred().done(function(token) {
                // add headers for AJAX
                if (!ajaxOptions.headers) {
                    $.extend(ajaxOptions, {
                        headers: {
                            "__RequestVerificationToken": token
                        }
                    });
                } else {
                    ajaxOptions.headers["__RequestVerificationToken"] = token;
                }
                $.ajax(ajaxOptions)
                    .done(function(data, textStatus, jqXHR) {
                        validateLoginSession(data, textStatus, jqXHR, deferredAjax.resolve);
                    }).fail(deferredAjax.reject); //AJAX
            }).fail(function() {
                deferredAjax.rejectWith(this, arguments); // on token failure pass the token AJAX and args
            });
            return deferredAjax.promise();
        }
        webapi.safeAjax = safeAjax;
    })(window.webapi = window.webapi || {}, jQuery)
    const loginCacheKey = "lastLoginKey";
    if (!sessionStorage.getItem(loginCacheKey)) {
        const now = new Date();
        sessionStorage.setItem(loginCacheKey, now);
        webapi.safeAjax({
            type: "PATCH",
            url: "/_api/contacts({{ user.contactid }})",
            contentType: "application/json",
            data: JSON.stringify({
                "adx_identity_lastsuccessfullogin": now
            })
        });
    }
{% else %}
  const loginCacheKey = "lastLoginKey";
  sessionStorage.removeItem(loginCacheKey);
{% endif %} 
</script>
```
