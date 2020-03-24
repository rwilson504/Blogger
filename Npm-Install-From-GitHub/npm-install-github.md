When working with npm libraries there are times you find bugs or want to add functionality to a library.  You could just modify the files locally and run the application but this gets tricky when you go to deploy an application and it does an npm install which doesn't include your changes.

If the project is out there on GitHub there is a better way.

1. Fork the project on Github to your account.
2. Create a new branch from your fork.
3. Fix the bug or add the functionality you want.
4. Uninstall the original npm package.
5. Install the npm package from your Forked branch using the following command.

```npm install --save <yourgithubuser>/<project-name>#<branch-
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3NDc2MDAxMjZdfQ==
-->