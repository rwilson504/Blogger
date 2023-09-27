# PCF Component for Power Platform: Docx Templates in Canvas Apps

Have you ever wanted to fill in a Docx template within a Canvas App? Look no further! I'm excited to introduce a new PCF component that allows you to do just that. This component leverages the [easy-template-x](https://github.com/alonrbar/easy-template-x) open-source library, making it a breeze to create and structure templates.

![Docx Template Sample App](https://raw.githubusercontent.com/rwilson504/PCFControls/master/DocxTemplatesCanvas/image.png)

## How to Get Started:

1. **Installation:** Begin by [downloading](https://github.com/rwilson504/PCFControls/releases/latest/download/RAWDocxTemplatesCanvas_managed.zip) and importing the managed solution into your environment. Ensure you've enabled PCF components for Canvas apps. If you're unsure how, you can find instructions [here](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps).

2. **Usage Instructions:** Once you're in the Power Apps Editor, navigate to **Insert -> Custom -> Import Components**. From there, select the **Code** tab and import the **RAW! Docx Templates (Canvas)**. Add the component to the form, and you're good to go! The component offers various input properties, such as `docxTemplate`, `fillTemplate`, and `templateData`, allowing for a customizable experience.

## Explore the Sample Application:

To get a feel for the component, download the sample solution. This includes a Canvas app with a sample Docx and other essential components. You can [download the sample app here](https://github.com/rwilson504/PCFControls/raw/master/DocxTemplatesCanvas/Sample/DocxTemplateSample_1_0_0_1_managed.zip).

## Template Features from easy-template-x:

- **Text Plugin:** The most basic plugin that replaces a single tag with custom text while preserving the original text style.
  
- **Loop Plugin:** This plugin allows for iterating text, table rows, and list rows. It also supports simple conditions and nested conditions, providing flexibility in template creation.

- **Image Plugin:** Embed images directly into the document with ease.

- **Link Plugin:** Insert hyperlinks into the document, preserving their original style.

- **Raw XML Plugin:** Add custom XML into the document to be interpreted by Word. This can be especially useful for adding elements like page breaks.

- **Scope Resolution:** `easy-template-x` supports tag data scoping, allowing you to reference "shallow" data from deeper in the hierarchy. This is similar to referencing an outer scope variable from within a function in JavaScript.

- **Extensions:** While most document manipulations can be achieved using plugins, `easy-template-x` also supports extensions for more advanced use cases. For instance, the community-developed [easy-template-x-data-binding](https://github.com/sebastianrogers/easy-template-x-data-binding) extension supports updating custom XML files inside Word documents, enabling the automatic filling of Word forms that use content controls.

In conclusion, this new PCF component, combined with the capabilities of `easy-template-x`, offers a powerful and seamless way to integrate Docx templates within Canvas Apps. Whether you're looking to create simple text replacements or more complex templates with loops, conditions, and embedded images, this solution has got you covered. Give it a try and let me know your thoughts!

---

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE0NTAxNTY5ODNdfQ==
-->