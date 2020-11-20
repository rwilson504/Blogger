
## Visual Studio - Add Node.js Development
Open **Visual Studio Installer**

**Modify** your current Visual Studio instance.

Add **Node.js development** option

## Typescript - Get Current Version SDK
In order to get TypeScript Intellisense for your PCF component in Visual Studio you will need to install the TypeScript SDK which matches the version of TypeScript current installed on your machine.

Open a PowerShell windows and run the following command to get your current TypeScript version.
```
tsc --version
```

Open Visual Studio and navigate in the toolbar to Extensions -> Manage Extensions

Search the online list of Extensions for **typescript**.  Then find the version of Typescript that matches the current one on your machine.  Click the **Download** button.

A new browser windows will open and the TypeScript SDK will be downloaded.  Run the downloaded installer.

After you install the SDK you will need to re-start Visual Studio or possibly your computer before the Intellisense will start working.

## Visual Studio - Add Node.js Console Project
Next we will add the project that will hole the PCF projects to the solution.

Right click on your solution and choose Add Project

Choose a Blank Node.js Console Application and ensure it's the one with TypeScript.

Click the Next button

## Initialize New PCF Component
Now that the environment and solution are all set up we can start initializing new PCF Components.

Create a new folder in your new Node.js project which will hold your PCF code.

Open a Developer PowerShell in Visual Studio

Run the command command to initialize a 
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgwMTg5NzY4NiwtNzQwOTUyODMyLDE4NT
QxMjQzNjAsMTYwNDY2NjUwMSw0MTY2MTEwOTMsLTM1ODk3NTQ3
M119
-->