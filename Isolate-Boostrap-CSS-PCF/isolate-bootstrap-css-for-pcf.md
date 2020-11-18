When you create Power Apps Component Framework (PCF) components that utilize the Bootstrap framework it is important to ensure that the CSS styling will not interfere with Power Apps or any other PCF component on your page which is also using it.  In order to ensure that we don't have any styling bleedover I'm going to show you how to prefix you Bootstrap CSS utilizing  [Less.js](http://lesscss.org/#)

First let's install Less.js on our machine using npm. Open a command prompt and run.  If you don't already have npm or node.js on your machine you can get the latest version [here](https://nodejs.org/en/).
```
npm install less -g
```

Now let's download the compiled version of Bootstrap we are using.  You can find the download file by going to the [All Versions](https://getbootstrap.com/docs/versions/) page on the Boostrap main page.

Pick the version you are going to utilize in your PCF component and click on the link to download the compiled version of Boostrap.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTYyNDU0NjYyNCw1MDcxODUwMjFdfQ==
-->