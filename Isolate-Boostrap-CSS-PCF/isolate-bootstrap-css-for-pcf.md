When you create Power Apps Component Framework (PCF) components that utilize the Bootstrap framework it is important to ensure that the CSS styling will not interfere with Power Apps or any other PCF component on your page which is also using it.  In order to ensure that we don't have any styling bleedover I'm going to show you how to prefix you Bootstrap CSS utilizing  [Less.js](http://lesscss.org/#)

First let's install Less.js on our machine using npm. Open a command prompt and run.  If you don't already have npm or node.js on your machine you can get the latest version [here](https://nodejs.org/en/).
```
npm install less -g
```
![install less.js](https://github.com/rwilson504/Blogger/blob/master/Isolate-Boostrap-CSS-PCF/Less-Install-NPM.png?raw=true)

Now let's download the compiled version of Bootstrap we are using.  You can find the download file by going to the [All Versions](https://getbootstrap.com/docs/versions/) page on the Boostrap main page.
![All Version Bootstrap Page](https://github.com/rwilson504/Blogger/blob/master/Isolate-Boostrap-CSS-PCF/Bootstrap-All-Version.png?raw=true)

Pick the version you are going to utilize in your PCF component and click on the link to download the compiled version of Bootstrap.
![Download Version](https://github.com/rwilson504/Blogger/blob/master/Isolate-Boostrap-CSS-PCF/Bootstrap-Download-Distro.png?raw=true)
![Download compiled](https://github.com/rwilson504/Blogger/blob/master/Isolate-Boostrap-CSS-PCF/Bootstrap-Download-Compiled-Version.png?raw=true)

After the file is downloaded extract the Bootstrap files to a folder on your computer and navigate to the css folder.

Within the css folder create a new file called isolate.less and then open this file in the editor of your choosing.

Create a CSS class within the isolate.less file.  This class name will be the prefix which will be applied as a prefix to all the css that we will then mark as imports to this class.  With the class you will @import the CSS files you need from the Bootstrap distro. You can include as many as you need.

Finally we will run the lessc command in a Command prompt to generate our new CSS file.  I typically name the output file the same as the class name. 

The format for the Less.js command line interface will be:
```
lessc "<less file location>" "<css file output>"
```

Example command:
```
lessc "C:\Users\rwilson1\Downloads\bootstrap-3.4.1-dist\css\isolate.less" "C:\Users\rwilson1\Downloads\bootstrap-3.4.1-dist\css\bootstrap-raw-samplecomponent.css"
```

If you run into any issue with this command try adding in the --math=strict command line option.  Some version of Bootstrap that use the calc method in their CSS can cause issues if this is not turned on.

```
lessc --math=strict "<less file location>" "<css file output>"
```

After you run the Less in the command prompt navigate back to your bootstrap CSS folder and you will now see the output file you created.



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0MzQxMjE0MzgsMTg4NzI4NjYxNyw0NT
YzOTg4MTksLTYyNDU0NjYyNCw1MDcxODUwMjFdfQ==
-->