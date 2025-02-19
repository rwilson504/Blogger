![How to Show Notes (Annotations) on a Model-Driven App Dashboard](https://github.com/user-attachments/assets/6340b6f4-df97-4a81-b1e4-813d671be6bb)

Model-driven apps in Power Apps allow users to create dashboards that display key data from different entities. By default, dashboards do not provide an easy way to display Notes (Annotations). However, using a combination of dashboard customization and XrmToolBox, you can modify a dashboard to include a list of Notes. This article provides a step-by-step guide to achieving this.

---

### **Step 1: Create a New Dashboard**
1. Navigate to the **Maker Portal**.
2. Create a new **dashboard**.
3. When adding components to the dashboard, insert a **List** for any entity (e.g., Accounts). The selected entity does not matter, as we will modify it later to display Notes.

![Create new dashboard](https://github.com/user-attachments/assets/1af606e3-919b-4441-82e6-537093a41f3e)

---

### **Step 2: Obtain the Notes View ID**
1. In the **Maker Portal**, navigate to an existing **View** for the **Notes (Annotations)** entity or create a new custom view.
2. Once the view is open, **copy the View ID** as it will be needed later.

![Copy view guid](https://github.com/user-attachments/assets/8404f9d5-bd9a-4cc8-ba7d-599e4015d132)

---

### **Step 3: Install XrmToolBox and FormXml Manager Plugin**
1. Download and install **XrmToolBox** from [https://www.xrmtoolbox.com/](https://www.xrmtoolbox.com/).
2. Install the **FormXml Manager Plugin**.
3. Connect to your **Dataverse environment** where the dashboard was created.

![Install FormXml Manager](https://github.com/user-attachments/assets/c56e5192-b18b-4823-90f2-09d00ff4c2d5)

---

### **Step 4: Modify the Dashboard’s XML**
1. Open **FormXml Manager** in XrmToolBox.
2. Click **Load Dashboards** and select **Dashboard** in the entity list.
3. In the **FormXmls pane**, find and select your **custom dashboard**.
4. Click **Edit FormXml** to open the editor.  

![image](https://github.com/user-attachments/assets/33c566ad-16f0-49fd-829d-77708cf9230e)

5. Locate the control corresponding to the **List component** added in Step 1 (e.g., the Accounts list).
6. Modify the XML as follows:
   - Change the label from:
     ```xml
     <label description="Accounts" languagecode="1033" />
     ```
     to:
     ```xml
     <label description="Notes" languagecode="1033" />
     ```
   - Change the target entity from:
     ```xml
     <TargetEntityType>account</TargetEntityType>
     ```
     to:
     ```xml
     <TargetEntityType>annotation</TargetEntityType>
     ```
   - Update the View ID with the one copied earlier:
     ```xml
     <ViewId>{e7b7272b-dcee-ef11-be21-00224804c479}</ViewId>
     ```
7. Click **Update** and **Publish** the changes.

![Steps to update FormXml](https://github.com/user-attachments/assets/86bdf98a-a0d8-4ea2-9aae-4877a4b318db)

---

### **Step 5: Verify Changes in the Model-Driven App**
1. Return to your **Model-Driven App**.
2. Open the **Dashboard**.
3. The list that previously displayed **Accounts** should now display **Notes** instead.

---

### **Conclusion**
By following these steps, you have successfully modified a Model-Driven App Dashboard to display Notes (Annotations) using XrmToolBox. This method allows for greater customization of dashboards to meet business requirements.

