# Building Better Entities for Dataflows: Autonumber and Alternate Keys in Power Platform

## Introduction

Navigating the complexities of dataflows in Microsoft's Power Platform, especially when dealing with Dataverse, can present unique challenges. One significant hurdle is efficiently setting up and using lookup values. This article introduces a straightforward design pattern I've developed, emphasizing the use of autonumber fields and alternate keys in entity creation to facilitate smoother data mapping for data analysts.

## Understanding the Role of Entity Design in Traditional Dataflows

The effectiveness of traditional dataflows in Microsoft's Power Platform often depends on how entities are configured in Dataverse. The challenge usually lies not in the dataflows themselves but in the nuances of entity setup. A critical aspect of this is the complexity involved in managing lookup values. The article [How to map a Lookup Column in a Power Platform Dataflow](https://www.apprising.co.nz/post/how-to-map-a-lookup-column-in-a-power-platform-dataflow) highlights these difficulties, underscoring the importance of well-structured entities. My design pattern addresses this by optimizing entity configuration, thus enhancing the overall functionality of traditional dataflows.

## A Simplified Approach: Autonumber and Alternate Keys

To address these challenges, I incorporate a consistent practice in my entity creation process. Each new entity begins with an 'ID' field set as an autonumber type, followed by an alternate key named 'IdKey.' This approach not only ensures uniformity but also greatly simplifies data mapping in dataflows.

## Step-by-Step Implementation Guide

Implementing this pattern involves:

1. **Creating an Autonumber Field**: Establish an autonumber field in each new entity as a unique identifier.

![Create Autonumber Column](https://github.com/rwilson504/Blogger/assets/7444929/bd4297a0-46f3-4f42-bced-1ecc6e198220)

2. **Setting Up an Alternate Key (IdKey)**: Implement an alternate key for the entity to facilitate efficient data mapping.

![Create Alternate Key on ID Column](https://github.com/rwilson504/Blogger/assets/7444929/304f0fa4-7319-4dfe-9f47-6f2e562876f1)

## Integrating This Setup in Dataflows

Once you have established the autonumber field and alternate key (IdKey) in your entities, the next crucial step is integrating this configuration into your dataflows for effective data mapping. This integration is key to leveraging the full potential of your design pattern in Power Platform's data management.

![Using Autonumber field to set lookup value](https://github.com/rwilson504/Blogger/assets/7444929/6073839a-eae4-4e97-ac7a-b84e5044f5b9)

1. **Data Mapping in Dataflows**: Navigate to the data mapping stage when setting up or editing a dataflow in Power Platform. Here, you will map data from your source to the corresponding fields in your Dataverse entities.
2. **Mapping the ID Field**: Focus on the lookup columns of your entity. Correctly mapping the 'ID' field, your autonumber field, is crucial. This ID field will serve as a reference, ensuring data from your source is correctly associated with the corresponding record in your entity.
3. **Setting the Lookup for the Entity**: For each lookup field in your entity, map it to the 'ID' field of the related entity in your data source. This maintains relational integrity by establishing a direct link between the records in your data source and the corresponding records in Dataverse.
4. **Validating Data Integrity**: After configuring the mappings, validate the data integrity by running a test. This helps identify any potential issues with the mapping setup.
5. **Regular Monitoring and Adjustments**: Regularly monitor and adjust the data mappings as needed to ensure that your dataflow continues to function accurately and efficiently over time.

## Enhancing Existing Tables with Autonumber Fields

For those working with existing tables in Dataverse, integrating autonumber columns into your current setup is straightforward. This addition improves data management processes, aligning them with the new entity creation pattern.

If you're looking to add autonumber columns to existing tables, you can do so seamlessly using the [XrmToolBox AutoNumberUpdater](https://mayankp.wordpress.com/2021/12/09/xrmtoolbox-autonumberupdater-new-tool/). This tool facilitates the efficient population of autonumber fields in your tables.

### Using XrmToolBox AutoNumberUpdater

1. **Download and Install XrmToolBox**: First, download and install XrmToolBox from its [official website](https://www.xrmtoolbox.com/).
2. **Add the AutoNumberUpdater Tool**: Locate and add the AutoNumberUpdater tool to your toolbox.
3. **Connect to Your Dataverse Environment**: Connect to your environment and use the tool to populate the new autonumber fields.

![AutoNumberUpdater Tool](https://github.com/rwilson504/Blogger/assets/7444929/56de40d2-d4b6-40ff-88b2-8b1f949cc0dc)

## Adjusting Seed Values with Auto Number Manager in XrmToolBox

After populating autonumber fields in existing tables, adjust the seed value using the Auto Number Manager. This step is vital to ensure new records have unique autonumber values.

1. **Install Auto Number Manager**: Add this tool to your XrmToolBox, following instructions from its [dedicated page](https://jonasr.app/ANM/).
2. **Connect to Your Environment**: Open the Auto Number Manager and connect to your environment.
3. **Adjust Seed Values**: Locate the autonumber fields and adjust the seed value to be greater than the highest number set by the AutoNumberUpdater.
4. **Save Changes**: Ensure your new configuration is applied by saving the changes.

![Auto Number Manager Tool](https://github.com/rwilson504/Blogger/assets/7444929/b56a0864-20a8-443f-9fc9-9368439abb17)

## Conclusion

Incorporating autonumber fields and alternate keys in entity creation offers a structured and efficient way to enhance data management within the Power Platform and Dataverse. Tools like the AutoNumberUpdater and Auto Number Manager in XrmToolBox are invaluable for integrating this pattern into both new and existing entities, ensuring optimal functionality of your data management system.
