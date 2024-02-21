![Elevate Your Automation Game with the Voice Monkey Power Platform Connector](https://github.com/rwilson504/Blogger/assets/7444929/fe817911-bad0-4c7b-90e1-7fded04134b0)

In the realm of smart technology, voice assistants have been pivotal, but their dependency on voice commands has been a limiting factor for automation. The [Voice Monkey](https://voicemonkey.io) Power Platform Custom Connector addresses this limitation by enabling the automation of Alexa routines through programmed processes rather than spoken words. This functionality turns any Alexa-enabled device into a more versatile automation hub, allowing for comprehensive control over the connected smart environment. By bridging various smart devices through Alexa's routines and skills, Voice Monkey enhances the utility of the Power Platform for users seeking a more connected and automated experience.

**Features and Functionalities:**

**Automated Alexa Routines:** [Voice Monkey](https://voicemonkey.io) introduces the capability to trigger Alexa routines based on events captured by the Power Platform, bypassing the need for voice commands. This feature can activate predefined sequences of smart device actions, enhancing efficiency and allowing for more complex automation scenarios.

**Custom TTS Announcements:** The service provides a custom TTS feature that enables users to send personalized announcements across Alexa devices. This can be used for reminders, notifications, or broadcasting information without manual intervention, suitable for both personal use and business applications.

**Media Playback Control:** Users gain the ability to control media playback through custom TTS commands. This operation extends Alexa's functionality to manage entertainment options, distribute information, and control ambient sounds, all integrated within Power Platform workflows.

## Capabilities of Voice Monkey: Devices, Flows, and Announcements

Voice Monkey is a versatile Alexa Skill designed to augment your smart home or office with advanced automation and interactive features. Here’s an overview of its key capabilities:

### Devices: Your Automation Triggers

![Device Types](https://github.com/rwilson504/Blogger/assets/7444929/02637e82-de74-48d4-8be8-6df4e3ab2c5f)

- **Virtual Devices**: Create virtual triggers within the Voice Monkey console that appear as devices in your Alexa app. These can start Alexa Routines when activated by the Voice Monkey API.
- **Physical Echo Device Linking**: Associate these virtual devices with actual Echo devices to play audio or video content directly when triggered.

### Flows: Complex Automations Made Simple
- **Customizable Actions**: Design sequences of actions, similar to Alexa Routines, that can perform a variety of tasks like playing sounds, displaying images, or controlling smart home devices.
- **Conditional Logic**: Incorporate conditions into your Flows, allowing for dynamic responses based on variables or inputs.

### Announcements: Engage Your Space with Sound and Vision
- **Text to Speech**: Send spoken messages through your Alexa devices, using custom text and a selection of voices and languages.
- **Multimedia Integration**: Include images, audio, and video in your announcements, turning your Echo devices into multimedia hubs.

By combining Devices, Flows, and Announcements, Voice Monkey enhances your Alexa ecosystem, providing you with the tools to create a more responsive and personalized smart environment. Whether it's for relaxation with ambient sounds, adding fun with interactive apps, or increasing productivity through automated alerts, Voice Monkey delivers a robust smart home experience.

## Detailed Operations of the Voice Monkey Power Platform Custom Connector

Integrate advanced automation capabilities into your environment with the Voice Monkey Power Platform Custom Connector. This tool enriches your Alexa-enabled devices with new layers of interaction, bypassing the need for voice commands. Below is a detailed look at the operations you can leverage:

### Make an Announcement
- **Functionality**: Sends custom Text To Speech (TTS) commands for announcements and can include additional content such as images, audio, and video.
- **Input Properties**:
  - **Device ID**: Target your announcement to a specific device by its unique identifier.
  - **Announcement Text**: Define the text for Alexa to articulate.
  - **Voice**: Select from a range of voices for the TTS announcement.
  - **Language Code**: Choose the language code that the announcement should be made in.
  - **Chime**: Opt for a notification/alarm sound at the beginning of the announcement.
  - **Audio URL**: Provide an HTTPS URL to an audio file for playback.
  - **Background Audio URL**: Set an HTTPS URL for background audio during TTS.
  - **Website URL**: Open a specific website on screen-enabled Echo devices.
  - **No Background**: Decide whether to display the Voice Monkey logo/image on devices.
  - **Image URL**: Display an image on screen-enabled devices via an HTTPS URL.
  - **Media Width/Height**: Specify the dimensions of the image to be displayed.
  - **Media Scaling**: Choose how the image should be scaled within its container.
  - **Media Alignment**: Align the image within its display area.
  - **Media Radius**: Set the clipping radius for the image corners, if desired.
  - **Video URL**: Include an HTTPS URL to a video file for screen-enabled devices.
  - **Video Repeat Count**: Determine how many times the video should loop.
  - **Echo Dot With Clock Display**: Input text to be displayed on devices like the Echo Dot With Clock.

### Trigger a Routine
- **Functionality**: Initiates one of your Alexa routines via a Voice Monkey Trigger Device.
- **Input Properties**:
  - **Device ID**: Use the unique identifier to specify the device you want to trigger.

### Trigger a Flow
- **Functionality**: Starts a predefined Voice Monkey Flow.
- **Input Properties**:
  - **Flow ID**: The numeric identifier of the Flow you wish to initiate.

These operations provide a rich set of tools for customizing the behavior of your smart devices. With Voice Monkey's Power Platform Connector, you can create a tailored, automated experience that responds to your unique needs, whether at home or in a business setting.

## Setting the Stage

Getting started with the Voice Monkey Power Platform Custom Connector is straightforward. Users need to create a Voice Monkey account and navigate the dashboard to access the necessary credentials. Once set up, the connector can be configured within the Power Platform environment, allowing users to tailor their automation workflows to their specific requirements.

## Practical Applications

The practical applications of this connector are vast. From automating home lighting systems to initiating personalized alerts based on Power Platform triggers, users can enhance their smart home experience in numerous ways. Businesses can leverage this technology to streamline operations, improve customer interactions, and create more efficient workflows.

- **Smart Home Automation**: Automate your home lighting to turn on/off based on specific triggers, such as the time of day or when you arrive home, enhancing both convenience and security.

- **Personalized Announcements**: Use custom Text To Speech (TTS) to broadcast personalized messages, reminders for appointments, or wake-up calls through your Alexa devices, ensuring you and your family stay on track with daily routines.

- **Interactive Customer Experiences in Business**: For businesses, trigger ambient background music or announcements in retail spaces based on customer interactions or time of day, creating a more engaging and personalized shopping experience.

- **Efficient Workplace Notifications**: Automate the broadcasting of meeting reminders or urgent alerts throughout your office space, improving communication and operational efficiency among teams.

## Demonstrating the Voice Monkey Connector: Email Alert with Smart LED Control

Let's create a Power Automate Flow that uses the Voice Monkey Connector to trigger an Alexa routine that changes the LED lights behind your office TV to yellow when an important email is received.
Certainly, here's how you can integrate the setup instructions for Voice Monkey and the Alexa routine into your article:

### Setting Up Voice Monkey:

1. **Create a Voice Monkey Account**:
   - Navigate to the Voice Monkey website and sign up for an account if you haven't already: [Voice Monkey Console](https://console.voicemonkey.io).

2. **Add a New Device**:
   - Once logged in, create a new `Device` by following the instructions provided. This device will act as a trigger for your Alexa routine.  
    ![Add a new device](https://github.com/rwilson504/Blogger/assets/7444929/7ef616b8-da27-4aa6-b8dd-61b94c9c0cfb)

3. **Device Naming Convention**:
   - Name your device with an easily recognizable identifier, such as including "VM" in the name, to denote it’s a Voice Monkey device.

4. **Integration with Alexa**:
   - After creating the device, it will appear in your list of devices within the Alexa app on your phone. You may need to refresh the devices or rescan to see the new addition.  
    ![Alexa Device](https://github.com/rwilson504/Blogger/assets/7444929/7a3c83c8-b693-4dc6-9e1b-47e02577ac57)

5. **Obtaining API Credentials**
   - Under the `Settings -> API Credentials` section copy your API token which will be used in Power Automate to create your connection.
### Setting Up the Alexa Routine:

![Alexa Routine](https://github.com/rwilson504/Blogger/assets/7444929/9b33ae6d-dadc-4e62-b0b6-82c3659858ed)

1. **Access Routines in the Alexa App**:
   - Open the Alexa app on your mobile device and navigate to the 'Routines' section.

2. **Create a New Routine**:
   - Tap the '+' icon to create a new routine. Assign it a name that reflects its purpose, like "Important Email Notification."

3. **Set the Trigger**:
   - For the trigger, select "Smart Home," then find and choose the Voice Monkey device you created as the trigger.

4. **Add Actions for LED Lights**:
   - Add actions to turn on the LED light strips, set them to the color yellow, and then turn them off after a set duration. Ensure your LED strips are Alexa-compatible and have been set up in the Alexa app.

5. **Testing the Routine**:
   - Save your routine and test it by manually triggering the Voice Monkey device from your Voice Monkey console to ensure the lights respond as intended.

6. **Finalize and Activate**:
   - Once confirmed, your routine is ready. It will automatically trigger when the Voice Monkey device is activated by the Power Automate Flow upon receiving an important email.  

### Create Power Automate Flow:

![Sample Flow](https://github.com/rwilson504/Blogger/assets/7444929/66ff648a-79e0-4c46-8033-18c590c05853)

1. **Sign In to Power Automate**:
   - Log into your Power Automate account and navigate to 'My flows'.
   - Choose to create a new automated flow.

2. **Trigger Setup**:
   - Select 'When a new email arrives (V3)' from the available triggers (you may need to sign into your email if it’s your first time setting this up).
   - Set the trigger to look for emails with a specific subject line or that have a "High" importance level.

3. **Voice Monkey Routine Trigger**:
   - Search for the 'Voice Monkey' connector and choose the 'Trigger a Routine' action.
   - Create the connection using the API token you copied earlier from the Voice Monkey console.
   - Fill in the details:
     - **Device ID**: Enter the ID of the Alexa device controlling your LED lights.     

4. **Email Received Confirmation** (Optional):
   - After the routine is triggered, you can add another step to send a confirmation back to your email or as a mobile notification.

5. **Save and Test**:
   - Save your flow and give it an appropriate name.
   - Test the flow by sending an email that matches your important criteria and observe the LED lights behind your TV.

By following these steps, you'll have a visual alert system that integrates the Voice Monkey connector with your smart lighting to signal the arrival of critical emails, enhancing your productivity and response time.

## Conclusion

The integration of Voice Monkey with the Microsoft Power Platform expands the boundaries of what smart automation can achieve. It allows users to bypass the traditional voice command model, instead leveraging automated processes to run Alexa routines. Alongside, its TTS announcements and media playback control features build upon Alexa's existing functionalities, opening up new avenues for creating interconnected and automated personal and professional spaces. Voice Monkey thus offers a comprehensive suite of tools that bring sophistication and simplicity to the management of smart environments, indicating a significant step forward in the evolution of home and office automation.
