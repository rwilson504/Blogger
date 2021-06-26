After watching the RPA (Robotic Process Automation) demo from Steve Winward [Real-Life Use case using AI Builder Form Processing with Power Automate Desktop](https://www.youtube.com/watch?v=r6f0m1Bn878) I have been looking for ways to utilize Power Automate Desktop Flows in order to make my life a little easier.  Yesterday like every day I started clicking through all the emails that I receive from my kids schools.  I open each email, download the image, then move the image to a network drive on my computer. This takes me a few minutes every day but my kids are worth it :) This scenario was a perfect one for me to automate using Desktop Flows since they can access the network drive on my desktop.

The basic flow of the solution will be as follows:
- A Power Automate Cloud Flow will be set up to run whenever a new email comes into my gmail account with a specific tag.
- The Cloud Flow will gather up all the information needed to run the Desktop Flow
- The Cloud Flow call the Desktop Flow by connecting through an On-Premise Data Gateway that is installed on my desktop.
- The Desktop Flow will download the image and save it to my network drive.

## Prerequisites
In order to complete all this you will need the following.

- Access to a Power Apps environment.  If you don't have one you can try it out by signing up for a Developer Plan [here](https://powerapps.microsoft.com/en-us/developerplan/)
- Power Automate Desktop.  This needs to be installed on your computer, download it [here](https://flow.microsoft.com/en-us/desktop)
- On-Premise data gateway.  This is how the online Power Automate cloud flows will connect to your deckstop flows.  You can download it [here](https://www.microsoft.com/en-us/download/details.aspx?id=53127)
- A Application registration for Gmail.  You cannot use the defualt shared application because it's not compatible with the Encodian or any other external Flow actions. Learn how to create this [here](https://docs.microsoft.com/en-us/connectors/gmail/#creating-an-oauth-client-application-in-google).
- API key for Encodian to utilize their Regex action in your flow. You can sign up for one [here](https://www.encodian.com/products/flowr/#form)

## Inspecting the Email
For this example I'm using emails supplied by a service called Tadpole which my kids school uses to send out images and notification.  The first thing I had to do was use the developer tools (F12) within the browser to help me understand how the urls were formatted for the service and how they worked.  After searching through the html I figured out the formatting and found that if i used one of the parameters found in the one linke for d=t that it would download the full size image.
![2021-06-25_19-32-46](https://user-images.githubusercontent.com/7444929/123494377-9fce6080-d5ed-11eb-9aae-55dc092b1ed2.png)

## Gmail Label and Filter
The first thing i did was went into my Gamil and created a new label for the incoming emails.  The name of the service the school use is Tadpole so i made that my label.  I think created a filter so that all emails comging from the Tadpole address would get that label applied.  All of this is important because otherwise your Flow will run on everything in your Inbox which could be a lot of messages and you could end up running into API limits for Flow depdenting on your license.

![2021-06-25_15-23-53](https://user-images.githubusercontent.com/7444929/123493442-73fdab80-d5ea-11eb-8882-e7aab0a1b7c6.png)

## Creating the Desktop Flow
The desktop flow will download the image using it's url and save it to to the network drive.  To get started open the Power Automate Desktop application you have installed and create a new Flow.

The first thing we need to do is define the input variables we will use.  We will later be passing the data into these variables from the Cloud Flow created later.  
![2021-06-25_15-30-37](https://user-images.githubusercontent.com/7444929/123493549-c212af00-d5ea-11eb-83cf-439051dfa1e8.png)

Now we can start adding actions to the Desktop flow.  The first one will be a Convert text to datetime action which we will use to transform the input variable from the flow into a datetime which will allow us to do some string formatting faster.  
![2021-06-25_15-34-46](https://user-images.githubusercontent.com/7444929/123493611-01410000-d5eb-11eb-8a8e-bed92c140955.png)

Next we will do some formatting on our date time to create flow variables which we will use later.  
![2021-06-25_15-37-10](https://user-images.githubusercontent.com/7444929/123493622-0c942b80-d5eb-11eb-95ea-38d0216e3765.png)

![2021-06-25_15-39-25](https://user-images.githubusercontent.com/7444929/123493660-26357300-d5eb-11eb-8510-d73d45b4b56b.png)

Check to see if the network drive folder exists and if not create it.  
![2021-06-25_15-42-17](https://user-images.githubusercontent.com/7444929/123493697-3f3e2400-d5eb-11eb-8f2e-b8c84a696c36.png)

![2021-06-25_15-45-39](https://user-images.githubusercontent.com/7444929/123493713-4e24d680-d5eb-11eb-84d6-923c957af126.png)

Finally we will download the file using the url provided as an input variable and save it to our network drive folder.  
![2021-06-25_15-48-55](https://user-images.githubusercontent.com/7444929/123493760-73b1e000-d5eb-11eb-8f67-373abdb36ccd.png)

We have not successfully created our Desktop flow. Make sure you save it and then you can test it by clickin the run button in the editor.  
![2021-06-25_15-51-50](https://user-images.githubusercontent.com/7444929/123493782-8fb58180-d5eb-11eb-8ca6-f0e76e48efbe.png)


## Creating the Cloud Flow
Now that we have created oru desktop flow we need to run it any time an email arrives in our Tadpole inbox.  This flow also needs to extract the Url for the image and pass that information to the cloude flow.

The image below is a high level outline of the Flow we are going to build.  
![2021-06-25_17-08-39](https://user-images.githubusercontent.com/7444929/123493050-4fed9a80-d5e9-11eb-9b23-1d8c51ec76c9.png)

Now let's get started building! We will start by creating a solution in the maker portal.  
![2021-06-25_16-08-48](https://user-images.githubusercontent.com/7444929/123493114-84f9ed00-d5e9-11eb-86fc-9d90082fe2ec.png)

Add a new Cloud Flow.  
![2021-06-25_16-12-41](https://user-images.githubusercontent.com/7444929/123493154-a5c24280-d5e9-11eb-8399-9490a6296802.png)

Setup for our Gmail trigger.  Again if you havent created a new Application within the Google console you should do that now using the instructions located [here](https://docs.microsoft.com/en-us/connectors/gmail/#creating-an-oauth-client-application-in-google).  
![2021-06-25_16-14-53](https://user-images.githubusercontent.com/7444929/123493166-afe44100-d5e9-11eb-8da6-69d15274ad66.png)

![2021-06-25_16-24-09](https://user-images.githubusercontent.com/7444929/123493197-c4283e00-d5e9-11eb-8b68-92c885f76b76.png)

![2021-06-25_16-21-51](https://user-images.githubusercontent.com/7444929/123493181-ba063f80-d5e9-11eb-8398-2554f1e6be75.png)

All the emails that contain images have my kids names at the beginning of the subject so i will set up a condition to make sure that this is an image email and also extract that data so i can use it to save the image later.  
![2021-06-25_16-27-59](https://user-images.githubusercontent.com/7444929/123493239-dace9500-d5e9-11eb-9e0b-1cdaa11ef310.png)

![2021-06-25_16-32-34](https://user-images.githubusercontent.com/7444929/123493249-e1f5a300-d5e9-11eb-9b5d-250b57380912.png)

We need to get all the urls contained in the email so we will use the Encodian Regex action here to find them.  Here is the Regex you will need to find all the urls in the body of the email.  
```
(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?
```
![2021-06-25_16-37-10](https://user-images.githubusercontent.com/7444929/123493265-efab2880-d5e9-11eb-980b-8444699df253.png)

Now that we have all the urls in the message we need to look at them all and see which one is the image.  We will also do some parsing of the url to make sure we get the full size image by appending the ?d=t property to the url.
![2021-06-25_16-46-10](https://user-images.githubusercontent.com/7444929/123493360-2d0fb600-d5ea-11eb-9f90-0874e908629a.png)

![2021-06-25_16-49-05](https://user-images.githubusercontent.com/7444929/123493373-3a2ca500-d5ea-11eb-967d-20bc5a3200cc.png)

Last but not least we will connect to the Desktop Flow we created earlier and pass in all the information we have collected from the email.
![2021-06-25_16-58-56](https://user-images.githubusercontent.com/7444929/123493394-46186700-d5ea-11eb-908f-7528bb94683f.png)


## Test It!
In order to test my flow I added another Gmail filter that would tagged any email coming from myself with my kids names in the subject.  This allowed me to then forward old email to myself for test processing.

![2021-06-25_20-05-06](https://user-images.githubusercontent.com/7444929/123495263-0e60ed80-d5f1-11eb-93ba-f880011f78a3.png)

![2021-06-25_20-05-43](https://user-images.githubusercontent.com/7444929/123495267-128d0b00-d5f1-11eb-95d9-0b4db5f1a0d4.png)

