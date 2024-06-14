![Installing PowerShell Modules in Firewalled and Air-Gapped Systems](https://github.com/rwilson504/Blogger/assets/7444929/c2927200-441b-4645-9689-d82038fb3a5e)

Managing IT environments with limited or no internet access, such as firewalled systems or air-gapped setups, presents unique challenges. One of the critical tasks in such environments is the installation and usage of PowerShell modules, which often require internet access for download and updates. This guide provides a method to facilitate the offline installation of PowerShell modules using custom scripts and includes a practical example of managing Power Platform environments by limiting developer environments.

## Background

Firewalled systems have restricted internet access, necessitating special methods to manage and configure software. Air-gapped systems are completely isolated from the internet, making direct downloads impossible. In such environments, administrators need to manually transfer and install PowerShell modules to manage various tasks effectively.

## Step-by-Step Guide

### Step 1: Prepare the PowerShell Module for Offline Use

The first script, **PowerShellModuleOfflinePackager.ps1**, downloads the required PowerShell module and its dependencies from an internet-connected machine, then packages them into a zip file for easy transfer.

Here’s the script [(Get it on Github)](https://github.com/rwilson504/PowerShell/blob/main/PowerShell/PowerShellModuleOfflinePackager.ps1):

```powershell
<#
.SYNOPSIS
Downloads the most current version of a PowerShell NuGet package or a specified version and extracts it for manual installation.

.DESCRIPTION
This script downloads the specified or latest version of a NuGet package from the PowerShell Gallery and extracts it to a specified or default output directory. 
If no version is specified, the latest version of the package is downloaded. If no output directory is specified, the script 
creates a default output folder in the script's directory. After extracting the packages, the script can optionally compress 
the package folders into a single ZIP file for easy transfer to an offline system. If the zipping is done, it also deletes the 
folders created by Save-Package unless the SkipZip parameter is specified.

.PARAMETER Name
The ID of the NuGet package to download.

.PARAMETER Version
The version of the NuGet package to download. If not specified, the latest version will be downloaded.

.PARAMETER OutputDir
The directory where the package will be downloaded and extracted. If not specified, a folder named 'NuGetPackages' will be 
created in the directory where the script is being run.

.PARAMETER SkipZip
If specified, the script will not compress the package folders into a ZIP file.

.EXAMPLE
.\PowerShellModuleOfflinePackager.ps1 -Name "PSReadline"

Downloads the latest version of the PSReadline package, extracts it to the default output directory, and compresses the extracted files into a ZIP file.

.EXAMPLE
.\PowerShellModuleOfflinePackager.ps1 -Name "PSReadline" -Version "2.2.0"

Downloads version 2.2.0 of the PSReadline package, extracts it to the default output directory, and compresses the extracted files into a ZIP file.

.EXAMPLE
.\PowerShellModuleOfflinePackager.ps1 -Name "PSReadline" -OutputDir "C:\MyPackages"

Downloads the latest version of the PSReadline package, extracts it to C:\MyPackages, and compresses the extracted files into a ZIP file.

.EXAMPLE
.\PowerShellModuleOfflinePackager.ps1 -Name "PSReadline" -Version "2.2.0" -OutputDir "C:\MyPackages"

Downloads version 2.2.0 of the PSReadline package, extracts it to C:\MyPackages, and compresses the extracted files into a ZIP file.

.EXAMPLE
.\PowerShellModuleOfflinePackager.ps1 -Name "PSReadline" -SkipZip

Downloads the latest version of the PSReadline package, extracts it to the default output directory, but does not compress the extracted files into a ZIP file.
#>

param (
    [Parameter(Mandatory = $true, HelpMessage = "The ID of the NuGet package to download.")]
    [string]$Name,

    [Parameter(HelpMessage = "The version of the NuGet package to download. If not specified, the latest version will be downloaded.")]
    [string]$Version,

    [Parameter(HelpMessage = "The directory where the package will be downloaded and extracted. If not specified, a folder named 'NuGetPackages' will be created in the directory where the script is being run.")]
    [string]$OutputDir = "$PSScriptRoot",

    [Parameter(HelpMessage = "If specified, the script will not compress the package folders into a ZIP file.")]
    [switch]$SkipZip
)

$packageDir = "$($OutputDir)\NuGetPackages"

# Create the output directory if it doesn't exist
if (-Not (Test-Path -Path $PackageDir)) {
    New-Item -ItemType Directory -Path $PackageDir -Force
}

# If no version is specified, find the latest version
if (-Not $Version) {
    Write-Output "Fetching the latest version of $Name from the PowerShell Gallery..."
    $latestPackage = Find-Package -Name $Name -Source PSGallery | Sort-Object -Property Version -Descending | Select-Object -First 1
    if ($latestPackage) {
        $Version = $latestPackage.Version
        Write-Output "Latest version of $Name is $Version"
    } else {
        Write-Error "Package $Name not found in the PowerShell Gallery."
        exit 1
    }
}

# Download and extract the specified version of the package
Write-Output "Downloading and extracting $Name version $Version..."
Save-Package -Name $Name -RequiredVersion $Version -Path $packageDir -Source PSGallery

# Compress the extracted package folders into a single ZIP file, if SkipZip is not specified
if (-Not $SkipZip) {
    $zipFileName = "$Name-$Version.zip"
    $zipFilePath = Join-Path -Path $OutputDir -ChildPath $zipFileName

    Write-Output "Compressing the package folders into $zipFilePath..."
    Compress-Archive -Path "$packageDir\*" -DestinationPath $zipFilePath -Force

    Write-Output "Packages compressed into $zipFilePath"

    # Remove the extracted folders after zipping
    Write-Output "Cleaning up extracted folders..."
    Remove-Item -Path $packageDir -Recurse -Force

    Write-Output "Cleanup complete."
} else {
    Write-Output "Skipping compression and cleanup of the package folders."
}
```

**Example Usage:**

```powershell
.\PowerShellModuleOfflinePackager.ps1 -Name "Microsoft.PowerApps.Administration.PowerShell" -OutputDir "C:\ModulePackages"
```

### Step 2: Transfer the Zip File to the Air-Gapped or Firewalled System

Copy the generated zip file and the second script, **ExtractModuleToDirectory.ps1**, to the air-gapped or firewalled system using a USB drive or other secure method.

### Step 3: Extract and Install the PowerShell Module

The second script, **ExtractModuleToDirectory.ps1**, extracts the PowerShell module from the zip file to a specified directory within the `PSModulePath` environment variable.

Here’s the script [(Get it on Github)](https://github.com/rwilson504/PowerShell/blob/main/PowerShell/ExtractModuleToDirectory.ps1):

```powershell
<#
.SYNOPSIS
Extracts a PowerShell module ZIP file to a selected PowerShell module directory.

.DESCRIPTION
This script is used on an offline system to extract the contents of a PowerShell module ZIP file to a specified PowerShell module directory. 
The script lists all the available PowerShell module directories, allows the user to select one, and then extracts the ZIP file contents to that directory. 
If the -Force parameter is specified, existing files will be overwritten.

.PARAMETER ZipFilePath
The path to the ZIP file containing the PowerShell module.

.PARAMETER Force
If specified, existing files in the target directory will be overwritten.

.EXAMPLE
.\ExtractModuleToDirectory.ps1 -ZipFilePath "C:\Modules\PSReadline-2.2.0.zip"

Lists available PowerShell module directories, prompts the user to select one, and extracts the contents of PSReadline-2.2.0.zip to the selected directory.

.EXAMPLE
.\ExtractModuleToDirectory.ps1 -ZipFilePath "C:\Modules\PSReadline-2.2.0.zip" -Force

Lists available PowerShell module directories, prompts the user to select one, and extracts the contents of PSReadline-2.2.0.zip to the selected directory, overwriting existing files if they already exist.
#>

param (
    [Parameter(Mandatory = $true, HelpMessage = "The path to the ZIP file containing the PowerShell module.")]
    [string]$ZipFilePath,

    [Parameter(HelpMessage = "If specified, existing files in the target directory will be overwritten.")]
    [switch]$Force
)

# Function to get all available PowerShell module directories
function Get-ModulePaths {
    $modulePaths = $env:PSModulePath -split ';'
    return $modulePaths
}

# Function to display a menu and get user selection
function Show-Menu {
    param (
        [string[]]$MenuItems
    )

    for ($i = 0; $i -lt $MenuItems.Length; $i++) {
        Write-Host ("[{0}] {1}" -f ($i + 1), $MenuItems[$i])
    }

    $selection = Read-Host "Please select a directory (enter the number)"
    return [int]$selection - 1
}

# Verify that the ZIP file exists
if (-Not (Test-Path -Path $ZipFilePath)) {
    Write-Error "The ZIP file '$ZipFilePath' does not exist."
    exit 1
}

# Get available PowerShell module directories
$modulePaths = Get-ModulePaths

# Display the menu

 and get user selection
Write-Output "Available PowerShell module directories:"
$selectionIndex = Show-Menu -MenuItems $modulePaths

# Validate the selection
if ($selectionIndex -lt 0 -or $selectionIndex -ge $modulePaths.Length) {
    Write-Error "Invalid selection. Exiting."
    exit 1
}

$targetDir = $modulePaths[$selectionIndex]

# Ensure the target directory exists
if (-Not (Test-Path -Path $targetDir)) {
    Write-Output "The directory '$targetDir' does not exist. Creating it..."
    New-Item -ItemType Directory -Path $targetDir -Force
}

# Extract the ZIP file to the selected directory
Write-Output "Extracting the contents of '$ZipFilePath' to '$targetDir'..."
try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($ZipFilePath, $targetDir, $Force)
    Write-Output "Extraction complete."
} catch {
    Write-Error "An error occurred while extracting the ZIP file: $_"
    if ($_.Exception.Message -match "already exists") {
        Write-Output "Consider using the -Force parameter to overwrite existing files."
    }
}
```

**Example Usage:**

```powershell
.\ExtractModuleToDirectory.ps1 -ZipFilePath "D:\ModulePackages\Microsoft.PowerApps.Administration.PowerShell.zip" -Force
```

## Practical Example: Limiting Power Platform Developer Environments

With the PowerShell module installed, you can manage Power Platform environments, including restricting the creation of developer environments. This example demonstrates how to connect to Power Platform and disable developer environments using the installed PowerShell module.

1. **Connect to Power Platform**

   For firewalled systems, specify the appropriate `-Environment` parameter to connect to your Power Platform environment. For government cloud environments, adjust the `-Endpoint` parameter accordingly (e.g., `usgov` for GCC Moderate, `usgovhigh` for GCC High, or `dod` for GCC DOD).

   ```powershell
   Add-PowerAppsAccount -Endpoint "usgov"
   ```

2. **Disable Developer Environments**

   Use the following command to disable the creation of developer environments:

   ```powershell
   $requestBody = [pscustomobject]@{
       powerPlatform = [pscustomobject]@{
           governance = [pscustomobject]@{
               disableDeveloperEnvironmentCreationByNonAdminUsers  = $true
           }
       }
   }

   Set-TenantSettings -RequestBody $requestBody
   ```

This configuration helps maintain control over the Power Platform environments, ensuring that only authorized users can create developer environments.

## Conclusion

Managing PowerShell modules in firewalled or air-gapped systems requires additional steps, but with the right tools, it can be efficiently achieved. By packaging and transferring PowerShell modules offline, you can maintain the security of your environment while still being able to manage it effectively. The provided scripts simplify this process, ensuring that your isolated systems remain functional and secure. Additionally, the practical example of managing Power Platform environments demonstrates how to apply these techniques to real-world scenarios.
