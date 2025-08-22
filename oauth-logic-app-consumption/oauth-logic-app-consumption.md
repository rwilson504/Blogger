# Locking Down a Logic App (Consumption) with OAuth for Calls from Dataverse Plug-ins using Managed Identity

## Why I did this

I’m using **managed identity** to let a [Dataverse plug-in](https://learn.microsoft.com/en-us/power-platform/admin/managed-identity-overview) call Azure resources without storing secrets. One of those calls hits a **Logic App (Consumption)** via the *When an HTTP request is received* trigger. I wanted to ensure the workflow can **only** be invoked by callers from **my tenant** using **OAuth**—no shared access signature (SAS) keys. (If you’re on **Logic Apps Standard**, you’d typically use App Service “Easy Auth”.)

Microsoft’s docs say you can require OAuth and (critically) you must **disable SAS** for request triggers in Consumption, otherwise a valid SAS bypasses OAuth. The official instructions work, but I found a simpler way to flip the SAS switch directly in code view.

## What I changed

### 1) Disable SAS for the HTTP trigger (Consumption only)

<img width="1260" height="526" alt="image" src="https://github.com/user-attachments/assets/b1c32b30-4139-454d-b3b9-6326ed089148" />

1. Open the Logic App (Consumption) in the Azure portal.
2. Go to **Development Tools ➜ Logic app code view**.
3. In the workflow JSON, add the following **sibling** to `"parameters"` (top level) and **Save**:

```json
"accessControl": {
  "triggers": {
    "sasAuthenticationPolicy": {
      "state": "Disabled"
    }
  }
}
```

This disables SAS so OAuth can’t be bypassed. (This is equivalent to what the docs recommend; adding it here is the fastest way.)

⚠️ **Important:**

* After you save, the `accessControl` snippet will **not appear** again the next time you open **code view**. The setting still applies, it’s just hidden.
* If you try to reapply the JSON snippet again later, it will **delete your existing OAuth profile**, and you’ll need to recreate it from scratch.

> Tip: If you automate deployments, include this in your ARM/Bicep/Template spec rather than patching after the fact.

### 2) Add an OAuth policy on the Logic App

<img width="1294" height="774" alt="image" src="https://github.com/user-attachments/assets/a49e65d3-f1da-46f2-9ce5-de6868c991f4" />

1. In the Logic App, go to **Authorization**.
2. Click **+ Add policy** ➜ **OAuth 2.0**.
3. Enter:

   * **Issuer** (iss): use your tenant issuer, e.g.
     `https://sts.windows.net/<tenant-guid>/` *(v1)* or
     `https://login.microsoftonline.com/<tenant-id>/v2.0` *(v2)*
   * **Audience** (aud): the resource your token targets. In my case, I used `https://management.azure.com`.
4. **Save**.

The OAuth policy validates the token’s `iss` and `aud` claims on inbound calls to the request trigger.

## What broke (and how I fixed it)

On first run I got **issuer or audience mismatch** errors. My Dataverse plug-in was acquiring a token whose **issuer** looked like:

* `https://sts.windows.net/<tenant-guid>/` (AAD v1 style)

…but I had configured the Logic App policy with:

* `https://login.microsoftonline.com/<tenant-id>/` (different issuer format)

To debug, I had my plug-in **log the raw access token**, then pasted it into **[https://jwt.ms](https://jwt.ms)** to inspect the claims. I updated the Logic App policy to use the **exact** issuer from the token, and everything worked.

> Quick refresher:
>
> * **Issuer (`iss`)** must match exactly, including trailing slash and version (v1 vs v2.0).
> * **Audience (`aud`)** must match the resource you requested when you got the token (e.g., `https://management.azure.com` for ARM).

## Minimal plug-in tracing snippet (to see the token)

When you call your Logic App from the plug-in, capture and trace the bearer token you’re sending. For example:

```csharp
// inside Execute(IServiceProvider serviceProvider)
var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

// Acquire the token with managed identity
string accessToken = context.ManagedIdentityService.AcquireToken("https://management.azure.com");

// Output the full token (needed for jwt.ms inspection)
tracing.Trace("AccessToken: {0}", accessToken);

// …then send HTTP request with Authorization: Bearer {accessToken}
```

⚠️ **Note:** Output the **entire token** (not truncated) if you want to paste it into **jwt.ms** for inspection of `iss` and `aud`.

## References

* [Power Platform managed identity overview (Dataverse plug-ins)](https://learn.microsoft.com/en-us/power-platform/admin/managed-identity-overview)
* [Securing Logic Apps & enabling OAuth (Consumption) + adding authorization policies](https://docs.azure.cn/en-us/logic-apps/logic-apps-securing-a-logic-app?tabs=azure-portal#disable-shared-access-signature-sas-authentication-consumption-only)
* [Inspect tokens quickly with jwt.ms](https://jwt.ms)
