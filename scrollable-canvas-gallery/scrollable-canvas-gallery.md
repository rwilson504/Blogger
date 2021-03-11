So you have a lot of data to display but the screen in Power Apps isn't large enough.  My friend [Ronald Sease](https://www.linkedin.com/in/ronald-sease-888438111/) recently showed me how to create a gallery in Power Apps that you can scroll horizontally.  It's a simple but powerful solution utilizing a horizontal container and a vertical gallery.

## Demo

![Scrollable Gallery](https://github.com/rwilson504/Blogger/blob/master/scrollable-canvas-gallery/ScrollingCanvasGallery.gif?raw=true)

## Instructions

First add a **Horizontal container** to your screen.  

![Add Horizontal Container to Screen](https://user-images.githubusercontent.com/7444929/110697283-29326200-81ba-11eb-9893-138b0d7802e6.png)

Set the following propertie(s) on the Horizontal container.
* **LayoutOverflowX** = LayoutOverflow.Scroll

Add a **Vertical gallery** within the horizonal container you created.

![Add Vertial Gallery to Screen](https://user-images.githubusercontent.com/7444929/110697539-7dd5dd00-81ba-11eb-8275-19153a57426d.png)

Set the following propertie(s) on the Vertical gallery.
* **ShowNavigation** = true (this isn't required but the navigation buttons make it much easier to move up and down the list when the up/down scrollbar is off the screen.)
* **Height** = Parent.Height (if you are using the Show Navigation option then set this to Parent.Heigh - 20 so that the navigation buttons are not covered up by the scroll bar.)
* **LayoutMinWidth** = 1000 (This value needs to be larger than the width of the horizontal container for the scrollbar to appears.  Choose a size will allow you to fit all of you gallery fields in the template.)

Now we have a gallery that we can scroll left to right to see more data.  

![image](https://user-images.githubusercontent.com/7444929/110698901-3a7c6e00-81bc-11eb-819c-29bed9a5a1cd.png)

Let's finish up designing our Gallery.  

First let's make sure the seperator goes all the way across. Change the following property on the seperator.
* **Width** = Parent.LayoutMinWidth

![image](https://user-images.githubusercontent.com/7444929/110699445-dd34ec80-81bc-11eb-94a9-5b4891a6dfac.png)

Next let's turn on the gallery loading spinner so our users know when the control is loading more data.  You can do this by clicking on the 

![image](https://user-images.githubusercontent.com/7444929/110703176-6f3ef400-81c1-11eb-8b68-e54730cb8c3e.png)

Finally add any additional fields you want to show and update the height of the gallery template to your needs. **IMPORTANT NOTE** The Power Apps editor gets somewhat confused as to the placement of items after you have scrolled so in order to move the components around on the gallery template you will need to utilize the X/Y Position values on the controls.  

![image](https://user-images.githubusercontent.com/7444929/110702572-b1b40100-81c0-11eb-9b38-5cfd999b5ae6.png)

<!--stackedit_data:
eyJoaXN0b3J5IjpbNTY1MDQ4OTc3XX0=
-->