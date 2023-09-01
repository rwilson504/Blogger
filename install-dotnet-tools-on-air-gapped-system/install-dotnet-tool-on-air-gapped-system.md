![Installing .NET Tools on Air Gapped Systems](https://github.com/rwilson504/Blogger/assets/7444929/091918db-8218-4b69-aecb-104297153253)

In today's digital age, the vast majority of our tasks rely heavily on internet connectivity. However, there are scenarios, more common than one might think, where systems are intentionally kept offline for security or other reasons. These air-gapped or isolated systems, like Azure VMs in a restricted VNET, pose unique challenges, especially when it comes to software installation. One such challenge is installing .NET tools, a task that's straightforward with an internet connection but can become a complex endeavor without one. In this blog, we'll delve deep into the intricacies of using the dotnet command line reference to seamlessly install .NET tools on machines that don't have the luxury of internet access. Whether you're a seasoned developer or just starting out, this guide aims to simplify the seemingly daunting process and equip you with the knowledge to conquer the offline world of .NET installations.

Before diving into the nitty-gritty of offline installations, it's essential to understand the foundational tools at our disposal. Central to our endeavor is the .NET SDK, a powerful suite that grants us the capability to harness the `dotnet` command. With this command, we can perform a myriad of tasks, including the installation of .NET tools. But how do we achieve this without an active internet connection? The answer lies in NuGet packages. These packages, which are typically fetched from online repositories, can also be saved locally. By leveraging locally saved NuGet packages, we can sidestep the need for online connectivity, making it possible to install our desired .NET tools on air-gapped systems. In the sections that follow, we'll walk you through the step-by-step process of setting up the .NET SDK, accessing the 'dotnet' command, and utilizing local NuGet packages to achieve our installation goals.

![default behavior when installing packages](https://github.com/rwilson504/Blogger/assets/7444929/3603f080-251d-4658-8f16-362982cf672d)

# Step 1: Preparing for the Offline Journey
Remember, the key to a successful installation on an air-gapped system is thorough preparation. By ensuring you have all necessary files on hand and understanding the nuances of your isolated environment, you're setting yourself up for a smooth and hassle-free installation process.

## Downloading the .NET SDK:
Before anything else, you'll need the .NET SDK. This is the backbone that will allow you to run the `dotnet` command on your air-gapped machine. Visit the official .NET SDK download page from a machine with internet access. Ensure you select the appropriate version and platform for your needs, then initiate the download.

![Download .Net SDK](https://github.com/rwilson504/Blogger/assets/7444929/c5e6a01c-8b51-4a8e-b86c-60f698bfc9c5)

## Gathering Required NuGet Packages:
Next, identify all the .NET tools you wish to install on the offline machine. For each tool, you'll need its corresponding NuGet package. Navigate to NuGet's official website and use the search functionality to locate each package. Once found, download the .nupkg file for the latest stable version, or the version you require.

![Download nupkg files](https://github.com/rwilson504/Blogger/assets/7444929/7f922cb0-6dd4-4c54-b451-d21954901eb9)

## Transferring Files to the Air-Gapped Machine:
With the .NET SDK installer and the necessary NuGet packages in hand, you're now faced with the task of moving them to your offline environment. Before you proceed with the transfer, it's beneficial to establish a clear and organized folder structure to house these files. Here's a recommended approach:

### Creating a Structured Folder Hierarchy:
Start by creating a primary folder named packages. This will serve as the central repository for all your installation files. Within this packages folder, create a subfolder specifically for NuGet, aptly named nuget. This subfolder will hold all the .nupkg files you've downloaded. By maintaining this structure, not only do you ensure a neat and tidy directory, but it also simplifies the process of locating and managing packages in the future. Whether you choose to set up this structure directly on the air-gapped machine or on a local network drive accessible by the machine, consistency is key.

Once your folder hierarchy is in place, proceed to transfer the .NET SDK installer and the NuGet packages to their respective locations. The method you choose will depend on the tools and protocols available in your specific setup. Whether it's through USB drives, optical discs, or any other secure transfer method your organization permits, ensure the files are safely and completely transferred to the destination machine.

# Step 2: Installing the .NET SDK on the Air-Gapped Machine

## Initiate the Installation:
Navigate to the location where you've transferred the .NET SDK installer. Double-click the installer file to initiate the installation process. Follow the on-screen prompts, ensuring you select the appropriate options that suit your environment. Once the installation is complete, you should be able to access the dotnet command from the command line or terminal.

## Setting Up the NuGet Configuration File:

Given the unique constraints of an air-gapped system, the default behavior of the dotnet command line, which seeks out online NuGet repositories, won't serve our purpose. Even using the `--add-source` command option and pointing that to our local directory will not circumvent the default behavior unless you also include the `--ignore-failed-sources` option at the same time, which is a lot for users to remember. To get around this, we'll create a custom NuGet configuration file that points solely to our local repository.

## Creating the NuGet Configuration File:
Open a text editor of your choice and paste the following configuration:
```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="Local NuGet" value="F:\packages\nuget" />
  </packageSources>
</configuration>
```

Ensure that the value attribute in the <add> tag points to the correct location of your nuget folder. Save this file as nuget.config within your packages/nuget directory.

![nuget.config file](https://github.com/rwilson504/Blogger/assets/7444929/bddc68be-768a-4eda-bd95-8b9353e10b36)

# Step 3: Running dotnet tool commands
When you wish to install a tool or package using the dotnet command line, ensure you use the --configfile option, pointing it to your custom nuget.config. This ensures that the command line only refers to your local NuGet repository and doesn't attempt to reach out to the default online NuGet provider. For example:

```
dotnet tool install <tool-name> --configfile F:\packages\nuget\nuget.config
```

![installing docfx](https://github.com/rwilson504/Blogger/assets/7444929/4dcb3d87-9ca9-424b-acb9-affc75b2997a)

# Alternate Configuration: Modifying the Default NuGet Configuration
For those who'd prefer a more permanent solution, rather than using the --configfile argument every time, there's an alternative. You can directly modify the default nuget.config file that the dotnet command line uses. This approach ensures that the command line always refers to your local NuGet repository by default, without any additional arguments.

## Navigating to the Default NuGet Configuration:
* On your air-gapped machine, open the File Explorer.
* In the address bar, type `%appdata%\nuget` and press Enter. This will take you directly to the directory containing the default `nuget.config` file.
* Open the `nuget.config` file in a text editor of your choice.

## Modifying the Configuration:
* Within the file, you'll find a section named `<packageSources>`. This section lists all the NuGet repositories that the dotnet command line refers to.
* Remove or comment out the entry that points to the default online NuGet repository. It typically looks like this:
```
<add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
```
* Add your local NuGet repository to this section, similar to the custom configuration we discussed earlier:
```
<add key="Local NuGet" value="F:\packages\nuget" />
```
Save and close the file.

With these changes in place, every time you use the dotnet command line to install a tool or package, it will refer to your local NuGet repository by default, without the need for any additional arguments.  Additionally because this is a known file location you can create automation around this to ensure that this will be completed without any user intervention within your environment.

# Conclusion/References
By following these steps, you effectively create an environment where the dotnet command line works seamlessly, even in the absence of an internet connection. This approach not only ensures successful installations but also provides a blueprint for managing and expanding your local NuGet repository in the future.

* [MSFT Docs - dotnet tool install](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-tool-install)
* [MSFT Docs - nuget.config reference](https://learn.microsoft.com/en-us/nuget/reference/nuget-config-file)
