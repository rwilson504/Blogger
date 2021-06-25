After recently watching a great RPA demo from Steve Winward [Real-Life Use case using AI Builder Form Processing with Power Automate Desktop](https://www.youtube.com/watch?v=r6f0m1Bn878) I have been looking for ways to utilize Desktop Flows in order to make my life a little easier.  Every day I look at all the emails I recieve from my kids school which have link to the photos that were taken.  I have to open each email, download the image, then move those images to a network drive on my computer.  Desktop Flows were the perfect choice for helping me whith this since they can access the network drive on my desktop.  Below is a tutorial of what i did to get this all working.

## Creating the Desktop Flow
We will utilze a desktop flow to actually download the image and save it to to the network drive. Get started by downloading the Desktop Flow client.  If you down already hav it you can get it [here](https://flow.microsoft.com/en-us/desktop)




## Creating the Cloud Flow
- Add the trigger "Gmail - When a new email arrives"  
Make sure when creating the connection for the Gmail trigger you bring your own application.  If you utilize the default application will not be able to utilize the Encodian regex actions. To learn how to create the application check out the [Microsoft docs](https://docs.microsoft.com/en-us/connectors/gmail/#creating-an-oauth-client-application-in-google).

