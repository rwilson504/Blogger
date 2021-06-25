After recently watching a great RPA demo from Steve Winward [Real-Life Use case using AI Builder Form Processing with Power Automate Desktop](https://www.youtube.com/watch?v=r6f0m1Bn878) I have been looking for ways to utilize Desktop Flows in order to make my life a little easier.  Every day I look at all the emails I recieve from my kids school which have link to the photos that were taken.  I have to open each email, download the image, then move those images to a network drive on my computer.  Desktop Flows were the perfect choice for helping me whith this since they can access the network drive on my desktop.  Below is a tutorial of what i did to get this all working.

## Pre-Requisites
In order to complete all this you will need the following.

- Access to a Power Apps environment.  If you don't have one you can try it out by signing up for a Developer Plan [here](https://powerapps.microsoft.com/en-us/developerplan/)
- Power Automate Desktop.  This needs to be installed on your computer, download it [here](https://flow.microsoft.com/en-us/desktop)
- On-Premise data gateway.  This is how the online Power Automate cloud flows will connect to your deckstop flows.  You can download it [here](https://www.microsoft.com/en-us/download/details.aspx?id=53127)
- A Application registration for Gmail.  You cannot use the defualt shared application because it's not compatible with the Encodian or any other external Flow actions. Learn how to create this [here](https://docs.microsoft.com/en-us/connectors/gmail/#creating-an-oauth-client-application-in-google).
- API key for Encodian to utilize their Regex action in your flow. You can sign up for one [here](https://www.encodian.com/products/flowr/#form)

## Gmail Label and Filter
The first thing i did was went into my Gamil and created a new label for the incoming emails.  The name of the service the school use is Tadpole so i made that my label.  I think created a filter so that all emails comging from the Tadpole address would get that label applied.  All of this is important because otherwise your Flow will run on everything in your Inbox which could be a lot of messages and you could end up running into API limits for Flow depdenting on your license.



## Creating the Desktop Flow
The desktop flow will download the image using it's url and save it to to the network drive.  To get started open the Power Automate Desktop application you have installed and create a new Flow.




## Creating the Cloud Flow
Now that we have created oru desktop flow we need to run it any time an email arrives in our Tadpole inbox.  This flow also needs to extract the Url for the image and pass that information to the cloude flow.

The image below is a high level outline of the Flow we are going to build.



Regex
``
(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?
``
