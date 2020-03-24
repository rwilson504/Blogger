When working with npm libraries there are times you find bugs or want to add functionality to a library.  You could just modify the files locally and run the application but this gets tricky when you go to deploy an application and it does an npm install which doesn't include your changes.

If the project is out there on GitHub there is a better way.

1. Fork the project on Github to your account.![enter image description here](https://github.com/rwilson504/Blogger/blob/master/Npm-Install-From-GitHub/npm-fork.png?raw=true)
2. Create a new branch from your fork.
3. Fix the bug or add the functionality you want.
4. Uninstall the original npm package.

```npm uninstall <package-na``

5. Install the npm package from your Forked branch using the following command.

```npm install --save <your-github-user>/<repository-name>#<branch-name>```

Example
```npm install --save rwilson504/node-simple-odata-server#Add-Nullable```

6. Make sure to create a pull request if possible from your branch to the original authors project so that they could include your fixes or functionality in the original project.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTk1NDYwMzM2NiwtMTk3NTk3OTQ4MF19
-->