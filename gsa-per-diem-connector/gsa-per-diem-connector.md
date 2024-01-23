<base target="_blank">
![# Enhancing Public Sector Travel with the GSA Per Diem Connector for Power Platform](https://github.com/rwilson504/Blogger/assets/7444929/cf4fb2d3-16a9-40de-ae6f-57b04cb20819)

## Introduction
Navigating travel expenses in the public sector can be intricate, especially when it comes to adhering to per diem rates. To address this, I developed the GSA Per Diem Connector for Power Platform, aiming to simplify access to essential travel expense data. For those looking to delve deeper into per diem rates, the [U.S. General Services Administration (GSA)](https://www.gsa.gov/travel/plan-book/per-diem-rates) offers comprehensive information. Additionally, the [GSA Per Diem API](https://open.gsa.gov/api/perdiem-api/){:target="_blank"}, which serves as the backbone of this connector, provides detailed insights into the rate data.

## The Importance of Per Diem Rates
Per diem rates, set by the U.S. General Services Administration (GSA), are daily allowances allotted to federal employees to cover lodging, meals, and incidental expenses when traveling for work. These rates are crucial for budgeting and expense management in government-related travel.

## My Journey to Approval
Developing this connector involved aligning with Microsoft's [certification submission guidelines](https://learn.microsoft.com/en-us/connectors/custom-connectors/certification-submission-ip), ensuring both functionality and compliance. The approval signifies the connector's readiness to serve the public sector's specific needs.

## Connector Overview
The GSA Per Diem Connector seamlessly integrates with Power Platform, granting users immediate access to up-to-date GSA per diem rates. This integration is key for accurately calculating travel expenses and streamlining expense reporting processes. For more in-depth information and a detailed exploration of the connector's capabilities, visit the [official GSA Per Diem Rates connector page on Microsoft Learn](https://learn.microsoft.com/en-us/connectors/gsaperdiem/).

## Empowering Public Sector Organizations
The connector is specifically designed to:
- **Simplify Data Retrieval**: Provides instant, updated access to per diem rates.
- **Ensure Accuracy and Compliance**: Maintain alignment with federal travel expense standards.
- **Enable Custom Solutions**: Combine per diem data with other Power Platform functionalities for bespoke application development.

## Practical Applications
- **Automated Expense Reporting**: Enhances travel expense forms with automatically integrated current per diem rates.
- **Budget Forecasting**: Leverages current and historical rate data for accurate fiscal planning.
- **Custom Travel Management Tools**: Develops real-time, compliant travel planning applications.

## Actions Available in the GSA Per Diem Connector
The GSA Per Diem Connector offers a variety of actions to retrieve per diem rates, each tailored to different requirements. Here's a breakdown of these actions and how they can be utilized:

1. **Retrieve Rates by City, State, and Year**
   - **Functionality**: Fetches per diem rates for a specific city and state for a given fiscal year.
   - **Use Case**: Ideal for applications focused on specific cities or for detailed travel planning within known destinations.

2. **Retrieve Rates for All Counties in a State**
   - **Functionality**: Provides per diem rates for all counties and cities within a chosen state for a specified year.
   - **Use Case**: Useful for applications that require a broad view of per diem rates across an entire state, such as statewide travel management systems.

3. **Retrieve Rates by ZIP Code**
   - **Functionality**: Offers per diem rates based on ZIP code for a specific fiscal year.
   - **Use Case**: Best suited for applications where the travel destination is known primarily by ZIP code, providing quick and localized rate information.

4. **Lodging Rates for Continental US**
   - **Functionality**: Gives detailed lodging rate information across various locations within the Continental US for the selected fiscal year.
   - **Use Case**: Essential for applications managing accommodation expenses, offering comprehensive data for budgeting and reimbursement processes.

5. **Mapping ZIP Codes to Destination IDs**
   - **Functionality**: Delivers a mapping of ZIP codes to their corresponding Destination-IDs and state locations for a particular fiscal year.
   - **Use Case**: This action is particularly beneficial for advanced applications that integrate geographic data with per diem rates for enhanced travel analysis and reporting.

Each of these actions is designed to make accessing and utilizing per diem rate data as seamless and efficient as possible, ensuring your Power Platform solutions are both robust and compliant with federal travel regulations.

## Integrating the Connector
Incorporating the GSA Per Diem Connector into Power Platform enhances travel-related applications with essential per diem rate data. Here's a brief guide on how to utilize the connector in both Power Automate and Power Apps.

### Building a Power Automate Flow

![image](https://github.com/rwilson504/Blogger/assets/7444929/4f567874-08c5-40d5-a382-0335ee07cd0e)

1. **Create a New Flow**: Start by creating a new automated flow in Power Automate.
2. **Trigger**: Choose a trigger that suits your application needs, such as a scheduled trigger for daily updates or a manual trigger for on-demand requests.
3. **Add the Connector**: Search for the GSA Per Diem Connector in the action panel and add it to your flow.
4. **Configure Parameters**: Set up the required parameters (City, State Abbreviation, Year, etc.) based on your specific needs.
5. **Add Actions**: Use the retrieved per diem rates to perform calculations, create reports, send notifications, or store data in your database.
6. **Test and Deploy**: Test your flow to ensure it works as expected and then deploy it for use.

### Creating a Power App

![Sample Power App](https://github.com/rwilson504/Blogger/assets/7444929/e41323ec-217c-4d02-9939-a5faef508fa1)

The entire sample app can be downloaded here: [Sample Power App](https://github.com/rwilson504/Blogger/raw/master/gsa-per-diem-connector/Travel%20Location.msapp)

1. **Start a New App**: Open Power Apps and start a new canvas app from blank or choose a template that fits your scenario.
2. **Add Data Connection**: Connect to the GSA Per Diem Connector as a data source.  
   ![image](https://github.com/rwilson504/Blogger/assets/7444929/843b9b07-1748-4e6f-ae2a-8046ace82758)
4
3. **Design the User Interface**: Create a user-friendly interface with input fields for city, state, and year, and display areas for the retrieved per diem rates.
54. **Integrate the Connector**: Use Power Apps formulas to fetch per diem rates based on user input and display the results in the app.
65. **Add Logic and Navigation**: Implement logic for data validation, error handling, and navigation between different screens of the app.
76. **Test and Share Your App**: Thoroughly test the app for usability and accuracy. Once satisfied, share your app with users in your organization.

PowerFx code for OnSelect of Location gallery.
```
Set(varPerDiemRates, GSAPerDiem.GetPerDiemRatesByCityStateAndYear(ThisItem.City, ThisItem.State, Dropdown1.SelectedText.Value).rates);
If(
    CountRows(varPerDiemRates) = 0,
    Set(
        noLocationFound,
        true
    );
    Set(
        varMeals,
        Blank()
    );
    //Set(varHotelMonths, Table({}));
Clear(colHotelMonths);
    Set(
        varCity,
        Blank()
    );
    Set(
        varState,
        Blank()
    );
    Set(
        varYear,
        Blank()
    );
    ,
    Set(
        noLocationFound,
        false
    );
    Set(
        varMeals,
        Index(
            Index(
                varPerDiemRates,
                1
            ).rate,
            1
        ).meals
    );    
Set(
        varCity,
        Index(
            Index(
                varPerDiemRates,
                1
            ).rate,
            1
        ).city
    );
    Set(
        varState,
        Index(
            varPerDiemRates,
            1
        ).state
    );
    Set(
        varYear,
        Index(
            varPerDiemRates,
            1
        ).year
    );
  ClearCollect(
        colHotelMonths,
        Index(
            Index(
                varPerDiemRates,
                1
            ).rate,
            1
        ).months.month
    );  
)
```

## Conclusion
I am pleased to offer the public sector a practical tool in the GSA Per Diem Connector, simplifying the management of travel expenses in alignment with federal guidelines.

## Explore and Connect
Discover the GSA Per Diem Connector's capabilities within your Power Platform environment. For further information or support, feel free to reach out.
<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6ID4tXG4gIEVuaGFuY2luZy
BQdWJsaWMgU2VjdG9yIFRyYXZlbCB3aXRoIHRoZSBHU0EgUGVy
IERpZW0gQ29ubmVjdG9yIGZvciBQb3dlclxuICBQbGF0Zm9ybV
xuYXV0aG9yOiBSaWNrIFdpbHNvblxudGFnczogPi1cbiAgZ3Nh
LGdvdmVybm1lbnQscG93ZXJwbGF0Zm9ybSxwb3dlcmF1dG9tYX
RlLGNvbm5lY3RvcnMsY3VzdG9tY29ubmVjdG9ycyxmbG93cyxh
dXRvbWF0aW9uLHBlcmRpZW0sdXNnb3ZcbiIsImhpc3RvcnkiOl
stODEyOTkxMTEyLDI3NDc1MTM5OSwxMDU1MjUyMzUyXX0=
-->
