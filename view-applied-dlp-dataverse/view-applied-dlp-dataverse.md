![How to View DLP Policies Applied to a Power Platform Environment](https://github.com/user-attachments/assets/08b245a4-c6f0-48e5-a497-d9032fef2feb)

To quickly see which Data Loss Prevention (DLP) policies are applied to a specific Power Platform environment, you can use a direct URL. This article shows you how to:

1. Find your environment ID
2. Use the DLP filter URL
3. View results in both the old and new Power Platform Admin Center interfaces

### Step 1: Locate Your Environment ID

To get your environment ID:

1. Go to the [Power Platform Admin Center](https://admin.powerplatform.microsoft.com).
2. Click **Environments** in the left-hand menu.
3. Select the environment you want to inspect.
4. Under the **Details** or **Overview** section, locate the **Environment ID** (a GUID string).

![image](https://github.com/user-attachments/assets/1318a95e-7fa4-4ea1-b5a1-5c8feabacb03)

### Step 2: Use the URL to View Applied DLP Policies

There are two URL formats, depending on which version of the Admin Center you're using.

#### ✅ New Admin Center:

```
https://admin.powerplatform.microsoft.com/security/dataprotection/dlp/environmentFilter/{environmentId}
```

#### 🕹️ Old Admin Center:

```
https://admin.powerplatform.microsoft.com/dlp/environmentFilter/{environmentId}
```

Just replace `{environmentId}` with the actual ID from Step 1.

Example:

```
https://admin.powerplatform.microsoft.com/security/dataprotection/dlp/environmentFilter/f4834a12-5388-4f41-b755-cce6a52d38a0
```
![image](https://github.com/user-attachments/assets/ed7086a9-5d03-48bf-9216-0197d1a94b5e)  

![image](https://github.com/user-attachments/assets/b2485972-3f21-4dd7-922f-4475cf5a940b)  

These URLs take you directly to the list of DLP policies scoped to that environment, saving you time from clicking into each policy manually.

### Summary

Using this method, you can:

* Instantly view applied DLP policies per environment
* Bypass manual filtering through policies
* Easily audit security coverage

*Pro tip: Save the URL format with a placeholder so you can quickly reuse it for other environments.*
