# Power Automate's Hidden Gem: Exploring Custom Connection Parameters

Power Automate has revolutionized the way businesses automate their workflows. One of its standout features is the ability to create custom connectors, allowing users to connect to virtually any API. In this article, we'll delve into the intricacies of custom connection parameters and demonstrate using the Edamam Food Database API as a prime example.

## The Challenge with Out-of-the-Box Authentication

While Power Automate offers a range of out-of-the-box authentication parameters, these can sometimes fall short. Many APIs, especially proprietary or niche ones, have unique authentication mechanisms that don't fit into the predefined categories. This limitation can make it cumbersome for users, forcing them to manually add required information to every action.

## Edamam's Food Database API: A Case Study

The Food Database API from Edamam is a perfect example of an API that doesn't use standard OAuth but requires an application ID and an application key for authentication. This API uses Natural Language Processing and semantically structured data, offering access to close to 900,000 basic foods, restaurant items, and consumer packaged foods. The data is enriched with diet, allergy, and nutrition labeling, making it a comprehensive resource for food-related applications.

![image](https://github.com/rwilson504/Blogger/assets/7444929/e005d3a8-d7dd-4d16-8161-dee5e1b6443b)

## Getting Started with a New Connector

- Begin by navigating to the [Power Automate Maker Portal](https://make.powerautomate.com/).
- Create a new custom connector. 
- When prompted for the **host**, provide the following for the Edamam API: `api.edamam.com`.
- For the **base URL**, input: `/api`.
- Navigate to the **Security** tab and select the authentication type as "No Authentication".
- Once the connector is created, you'll have a basic structure in place, ready for further customization.

## Harnessing the `paconn` CLI Tool for Custom Connectors

To create a custom connector for the Edamam API, the `paconn` command-line tool comes in handy. This tool offers a granular approach, especially when the Custom Connector Wizard isn't flexible enough.

### Setting Up and Using the `paconn` CLI Tool

1. **Installation**:
   - Begin by installing Python 3.5+ from [Python downloads](https://www.python.org/downloads).
   - Ensure you check the box 'Add Python X.X to PATH' during installation.
   - Verify the installation by running: `python --version`.
   - After installing Python, run the command: `pip install paconn`.

2. **Understanding Connector Files**:
   - A custom connector typically consists of an Open API swagger definition, an API properties file, and optionally, an icon for the connector.

3. **Command-Line Operations with `paconn`**:
   - **Login**: Authenticate with Power Platform by running: `paconn login`.
   - **Download Custom Connector Files**: Use `paconn download` or specify environment and connector ID with `paconn download -e [Environment GUID] -c [Connector ID]`.
   - **Create a New Custom Connector**: Use `paconn create --api-prop [Path to apiProperties.json] --api-def [Path to apiDefinition.swagger.json]`.
   - **Update an Existing Custom Connector**: Use `paconn update --api-prop [Path to apiProperties.json] --api-def [Path to apiDefinition.swagger.json]`.
   - **Validate a Swagger JSON**: Use `paconn validate --api-def [Path to apiDefinition.swagger.json]`.

## Implementing Custom Connection Parameters with the `apiProperties.json` File

Creating custom connection parameters is a powerful way to enhance the flexibility of your custom connectors. Let's walk through the process using the Edamam Food Database API as an example:

1. **Modifying the `apiProperties.json` File**:
   - Open the downloaded `apiProperties.json` file.
   - Locate or add the `connectionParameters` section.
   - Add the custom parameters required by the Edamam API: the application ID and the application key.

2. **Using the Set Query String Parameters Policy Template**:
   - In the `policies` section of your custom connector definition, add the `SetQueryParameter` policy to append the application ID and key to every request.

3. **Testing Your Custom Connector**:
   - After making these changes, save your `apiProperties.json` file.
   - Use the `paconn` CLI tool to update your custom connector.
   - Test the connector in Power Automate to ensure the custom connection parameters are being passed correctly with each API call.

## Conclusion

The ability to create custom connection parameters and harness the `paconn` CLI tool underscores Power Automate's commitment to flexibility and user-centric design. By understanding and leveraging these tools, developers can create more tailored and efficient connectors, enhancing the overall experience in Power Automate.
