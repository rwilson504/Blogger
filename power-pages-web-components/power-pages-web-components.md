# Using Web Templates as Custom Components in Power Pages: A Classification Banner Example

## Introduction
Web templates in Power Pages offer a powerful way to create reusable components that can be used across multiple pages, headers, and footers. This approach simplifies development and maintenance by allowing common elements, such as banners or data tables, to be managed centrally. In this article, we will explore how to use web templates as custom components, focusing on a practical example: a classification banner that can be placed in the header or footer of a Power Pages site.

## What Are Web Templates in Power Pages?
Web templates are Liquid-based templates that allow developers to structure and render dynamic content within Power Pages. They are commonly used for:
- **Custom layouts**: Defining reusable structures for pages.
- **Reusable components**: Creating elements like banners, notifications, and data tables.
- **Dynamic content**: Injecting data dynamically using Dataverse and Liquid expressions.

Microsoft has provided comprehensive guidance on using web templates as components in Power Pages. You can read more about it in the [official documentation](https://learn.microsoft.com/en-us/power-pages/configure/web-templates-as-components).

## Creating a Reusable Classification Banner Component
A classification banner is a useful element in government or security-focused applications, where content must be labeled according to its classification level (e.g., Unclassified, Confidential, Top Secret). Instead of hardcoding this banner on multiple pages, we can create a reusable web template component.

### Step 1: Creating the Web Template
Below is the web template code for a classification banner component that allows users to specify its position (top or bottom), text, and background color. Once you have the code, you need to add the web template to Power Pages.  You can quickly do this using the Power Pages Management app.

- Navigate to the Power Pages Management App via the Power Pages Maker Portal.

![image](https://github.com/user-attachments/assets/9fb49f6a-093f-49b0-86a4-03218599b974)

- Create a new Web Template record.

- Paste the code into the Source field and save the record.

![image](https://github.com/user-attachments/assets/4c6ff8ae-ccf2-4076-ba0d-365006b25f8c)

```liquid
{% manifest %}
{
    "type": "Functional",
    "displayName": "Classification Banner",
    "description": "Used to display the classification banner in the header and footer with customizable text and background color.",
    "params": [
        {
            "id": "position",
            "displayName": "Position",
            "description": "Enter the position of the banner: either 'top' or 'bottom'."
        },
        {
            "id": "text",
            "displayName": "Banner Text",
            "description": "Enter the classification text to display. Examples: 'Unclassified', 'Controlled (CUI)', 'Confidential', 'Secret', 'Top Secret', 'Top Secret//SCI'."
        },
        {
            "id": "backgroundColor",
            "displayName": "Background Color",
            "description": "Choose a background color based on classification level: Unclassified: #007a33, Controlled (CUI): #502b85, Confidential: #0033a0, Secret: #c8102e, Top Secret: #ff8c00, Top Secret//SCI: #fce83a."
        }
    ]
}
{% endmanifest %}

{% if user %}
<div style="
    background-color: {{ backgroundColor }};
    color: {% if backgroundColor == '#fce83a' or backgroundColor == '#ff8c00' %}black{% else %}white{% endif %};
    width: 100%;
    height: 2.5rem;
    font-weight: 700;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    display: flex;
    position: sticky;
    {% if position == 'top' %}
        top: 0;
    {% endif %}
    {% if position == 'bottom' %}
        bottom: 0;
    {% endif %}
    left: 0;
    z-index: 1000;">
    {{ text }}
</div>
{% endif %}
```

### Step 2: Adding the Component to a Page
Once the web template is created, it can be inserted into a page, header, or footer.

#### Inserting the Component into the Header
To insert the component into the header, use the **VS Code Editor** built into Power Pages. Navigate to the **Header Web Template** and add the following code snippet where the classification banner should appear:

```liquid
{% component name="Classification Banner" position="top" text="Confidential" backgroundColor="#0033a0" %}
```

![image](https://github.com/user-attachments/assets/635eedb3-f6c5-4a99-9b91-ac73b0f1dc48)

![image](https://github.com/user-attachments/assets/fde83ee6-fbba-4ab4-b128-0fd7c7332797)

### Step 3: Modifying Component Settings
Once the component is placed on a page, you can modify its settings directly within the editor. If the component is added to a header or footer, you will need to return to the **VS Code Editor** to make changes.

![image](https://github.com/user-attachments/assets/77a45c4c-2c34-44c9-b809-5c1b6fb84585)

### Step 4: Editing Web Templates in Restricted Environments
If you are working in an environment where the built-in VS Code Editor is not available, you can use the **Power Platform CLI (PAC CLI)** to download and edit the web templates.

#### Steps to Use PAC CLI:
1. Install the Power Platform CLI if you haven’t already.
2. Authenticate to your Power Pages environment using:
   ```sh
   pac auth create --environment "your-environment" --cloud UsGovHigh
   ```
3. Download the web template files:
   ```sh
   pac pages download --environment "your-environment" --cloud UsGovHigh --modelVersion 2
   ```
4. Make your modifications locally using your preferred editor.
5. Upload the updated web template back to Power Pages:
   ```sh
   pac pages upload --environment "your-environment" --cloud UsGovHigh --path "your-local-path"
   ```

This method ensures you can manage your custom components even when direct online editing is not possible.

## Conclusion
Using web templates as custom components in Power Pages allows for greater flexibility and maintainability in site development. Whether for simple elements like banners or more complex components like data tables, this approach enhances efficiency and reusability.

By leveraging the VS Code Editor or PAC CLI, you can efficiently create, modify, and deploy these components across your Power Pages sites. Ready to start building reusable components? Give it a try and enhance your Power Pages experience!

