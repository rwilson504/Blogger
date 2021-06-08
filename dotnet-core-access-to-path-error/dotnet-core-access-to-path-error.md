After installing the .NET Core sdk on my Raspberry Pi I received the following error when attempting to create a new console application using the 'dotnet new console' command.

![image](https://user-images.githubusercontent.com/7444929/119385533-3ed10700-bc94-11eb-9df9-ad784bc565d2.png)

```
pi@raspberrypi:~/IoT/FirstProject $ dotnet new console
System.UnauthorizedAccessException: Access to the path '/home/pi/.dotnet/5.0.203.toolpath.sentinel' is denied.
 ---> System.IO.IOException: Permission denied
   --- End of inner exception stack trace ---
   at Interop.ThrowExceptionForIoErrno(ErrorInfo errorInfo, String path, Boolean isDirectory, Func`2 errorRewriter)
   at Microsoft.Win32.SafeHandles.SafeFileHandle.Open(String path, OpenFlags flags, Int32 mode)
   at System.IO.FileStream.OpenHandle(FileMode mode, FileShare share, FileOptions options)
   at System.IO.FileStream..ctor(String path, FileMode mode, FileAccess access, FileShare share, Int32 bufferSize, FileOptions options)
   at System.IO.FileStream..ctor(String path, FileMode mode, FileAccess access, FileShare share, Int32 bufferSize)
   at System.IO.File.Create(String path)
   at Microsoft.Extensions.EnvironmentAbstractions.FileWrapper.CreateEmptyFile(String path)
   at Microsoft.DotNet.Configurer.FileSystemExtensions.<>c__DisplayClass0_0.<CreateIfNotExists>b__0()
   at Microsoft.DotNet.Cli.Utils.FileAccessRetrier.RetryOnIOException(Action action)
   at Microsoft.DotNet.Configurer.FileSystemExtensions.CreateIfNotExists(IFileSystem fileSystem, String filePath)
   at Microsoft.DotNet.Configurer.FileSentinel.Create()
   at Microsoft.DotNet.Configurer.DotnetFirstTimeUseConfigurer.Configure()
   at Microsoft.DotNet.Cli.Program.ConfigureDotNetForFirstTimeUse(IFirstTimeUseNoticeSentinel firstTimeUseNoticeSentinel, IAspNetCertificateSentinel aspNetCertificateSentinel, IFileSentinel toolPathSentinel, Boolean isDotnetBeingInvokedFromNativeInstaller, DotnetFirstRunConfiguration dotnetFirstRunConfiguration, IEnvironmentProvider environmentProvider, Dictionary`2 performanceMeasurements)
   at Microsoft.DotNet.Cli.Program.ProcessArgs(String[] args, TimeSpan startupTime, ITelemetry telemetryClient)
   at Microsoft.DotNet.Cli.Program.Main(String[] args)
```

The .NET Core libraries apparently need full access to the users home folder.  In the following example I am logged into my Raspberry pi as the default pi user.  In order to fix this issue I ran the following commands.  This changes the owner of the .dotnet folder to the user you specify in the [chown](https://linuxize.com/post/linux-chown-command/) command.

```
cd /home/pi
sudo chown pi .dotnet
```

To run this for another user just replace <USER> with your username.
  
```
cd /home/<USER>
sudo chown <USER> .dotnet
```

After the changes were made the project was created successfully!
 
 ```
pi@raspberrypi:~/IoT/FirstProject $ dotnet new console

Welcome to .NET 5.0!
---------------------
SDK Version: 5.0.203

Telemetry
---------
The .NET tools collect usage data in order to help us improve your experience. It is collected by Microsoft and shared with the community. You can opt-out of telemetry by setting the DOTNET_CLI_TELEMETRY_OPTOUT environment variable to '1' or 'true' using your favorite shell.

Read more about .NET CLI Tools telemetry: https://aka.ms/dotnet-cli-telemetry

----------------
Installed an ASP.NET Core HTTPS development certificate.
To trust the certificate run 'dotnet dev-certs https --trust' (Windows and macOS only).
Learn about HTTPS: https://aka.ms/dotnet-https
----------------
Write your first app: https://aka.ms/dotnet-hello-world
Find out what's new: https://aka.ms/dotnet-whats-new
Explore documentation: https://aka.ms/dotnet-docs
Report issues and find source on GitHub: https://github.com/dotnet/core
Use 'dotnet --help' to see available commands or visit: https://aka.ms/dotnet-cli
--------------------------------------------------------------------------------------
Getting ready...
The template "Console Application" was created successfully.

Processing post-creation actions...
Running 'dotnet restore' on /home/pi/IoT/IoT.csproj...
  Determining projects to restore...
  Restored /home/pi/IoT/IoT.csproj (in 533 ms).
Restore succeeded.
 ```
