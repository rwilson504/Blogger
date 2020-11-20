
## Visual Studio - Add Node.js Development
Open **Visual Studio Installer**

**Modify** your current Visual Studio instance.

Add **Node.js development** option

## Typescript - Get Current Version SDK
In order to get TypeScript Intellisense for your PCF component in Visual Studio you will need to install the current TypeScript SDK.  Open a PowerShell windows and run the following command to get your current TypeScript version.
```
tsc --version
```

Open Visual Studio and navigate in the toolbar to Extensions -> Manage Extensions

Search the online list of Extensions for **typescript**.  Then find the version of Typescript that matches the current one on your machine.  Click the **Download** button.

A new browser windows will open and the TypeScript SDK will be downloaded.  Run the downloaded installer.

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDE2NjExMDkzLC0zNTg5NzU0NzNdfQ==
-->