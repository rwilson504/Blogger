![Powering Justice: Unveil the FBI Most Wanted with the Power Platform Custom Connector](https://github.com/rwilson504/Blogger/assets/7444929/cfe0d57b-f2c7-4f86-9224-4f127c35aaea)

Today's digital landscape offers unprecedented opportunities to leverage technology in the service of public safety. The FBI's open API, a comprehensive source of data on the nation's most wanted individuals and significant art crimes, now seamlessly integrates into the Power Platform thanks to the FBI Most Wanted Custom Connector. This innovation enables low-code developers across federal agencies to quickly and easily repurpose critical law enforcement data for the greater good.

### Inspiration Behind the Connector

The inception of the FBI Most Wanted Custom Connector was driven by the untapped potential within the FBI's publicly available data. Recognizing the wealth of information housed on the [FBI's Top Ten Most Wanted list](https://www.fbi.gov/wanted/topten) and the broader [FBI's Most Wanted API](https://www.fbi.gov/wanted/api), the development of this connector was aimed at unlocking this data trove. By facilitating streamlined access to these resources through the Power Platform, the connector is designed to empower developers and agencies to build solutions that enhance public safety and awareness. This initiative not only simplifies the integration of critical law enforcement data into various applications but also supports the wider goal of keeping communities informed and safe.

#### Operations Overview:

- **List Recent Wanted**: Fetches the latest list of individuals deemed most wanted by the FBI. This operation is perfect for applications or flows designed to provide timely updates on significant fugitives.

- **Get Wanted Person Details**: Allows for retrieving detailed information on a specific individual from the most wanted list. By supplying a unique identifier (UID), users can access in-depth profiles, including criminal charges, last known locations, and available rewards.

- **List Art Crimes**: Accesses information on stolen art and artifacts, highlighting cases of significant cultural and historical value. This operation can be used to raise awareness about art theft and assist in recovery efforts.

- **Get Art Crime Details**: Similar to the operation for individuals, this allows for detailed exploration of a specific art crime, providing descriptions, images, and details about the theft.

### Demonstrating the Connector's Capabilities

To illustrate the practical use of the connector, a sample PowerApp and a flow have been developed:

#### Sample PowerApp 

This application allows users to search and access detailed profiles of the FBI’s most wanted, designed to facilitate public engagement and support law enforcement efforts.
  
![Sample PowerApp](https://github.com/rwilson504/Blogger/assets/7444929/8e2dc855-b040-4c59-a411-21fb1985f80e)

Following the illustrative image in the article, let's delve into how to effectively leverage the app with the FBI Most Wanted Custom Connector to display the top 10 most wanted individuals. By integrating real-time data directly into your Power App, you can create a dynamic and informative resource. Here's a step-by-step guide to setting up your app:

#### Leveraging the FBI Most Wanted Custom Connector in Your App

1. **Add the Data Source**:
   - In the canvas app editor, navigate to the data table.
   - Click the 'Add data' button and search for "FBI Most Wanted."
   - Select the FBI Most Wanted Custom Connector to add it as a data source to your app.

2. **Configure the App to Display the Top 10**:
   - Access the properties for the app and locate the formulas property.
   - Enter the following formula to retrieve the top 10 most wanted individuals based on the 'ten' poster classification:
     ```
     Top10 = FBIMostWanted.ListWanted({poster_classification: "ten"}).items;
     ```
   - Adjust this formula as needed to match your specific display preferences.

3. **Set Up a Gallery**:
   - Add a gallery to your app and set its items property to `Top10`.
   - This gallery will dynamically display the top 10 most wanted individuals, pulling the latest data from the FBI's database.

4. **Display Individual Details**:
   - To add an image for each individual within the gallery, use the following expression:
     ```
     First(ThisItem.images).thumb
     ```
     This expression fetches the thumbnail image from the available images for each person.
   - To display the person's name, add a text box to the gallery and set its text property to:
     ```
     ThisItem.title
     ```
     This will show the title or name associated with each wanted individual.

By following these instructions, you can create a powerful application that not only informs users about the FBI's top 10 most wanted individuals but also keeps the information current with daily updates. This app serves as a valuable tool for raising awareness and aiding in the identification and reporting of suspects, showcasing the power of integrating real-time law enforcement data into custom applications.

#### Sample Flow

A scheduled daily flow designed to email users about the current FBI Top 10 Most Wanted. This automation ensures recipients are kept informed with the latest updates, directly contributing to heightened awareness and community safety.

### Conclusion

The Power Platform Custom Connector for the FBI's Most Wanted represents a significant step forward in the use of technology for public safety. By providing easy access to vital information, it enables a broad spectrum of developers to create applications that not only inform the public but also support the vital work of law enforcement agencies. It stands as a testament to the power of technology to make a real-world impact on safety and justice.
