<img width="1613" height="1068" alt="Passing Pipeline Trigger Time to Data Flows in Azure Data Factory: Use Strings, Not Timestamps!" src="https://github.com/user-attachments/assets/a43143f8-5ac0-4dde-96f6-cce54a341855" />

When working with Azure Data Factory (ADF) and the **Dataverse connector**, passing the pipeline trigger time into a Data Flow can be trickier than expected.

### The Scenario

You want to pass the pipeline's trigger time—using the `@pipeline().TriggerTime` system variable—into a Data Flow. This is often needed for auditing, filtering, or other time-based logic.

The catch? You're using **Dataverse**, which communicates over the Web API and handles datetime values as **strings**.

### The Common Mistake

In Azure Data Factory, you might instinctively define the Data Flow parameter as a **timestamp** or **date** type. But ADF doesn’t have a dedicated **datetime** type—only **date** and **timestamp**. So you choose one of those, thinking it aligns with your goal.

**Then you hit an error.**
And to make matters worse, the error message doesn't clearly explain the real issue—it can be vague or misleading, which only adds to the confusion. This tripped me up for a while, as I assumed the problem was elsewhere.
<img width="1020" height="646" alt="image" src="https://github.com/user-attachments/assets/abbb0756-0507-4d4d-8673-e6bd21bbdbc9" />

### The Solution

1. **Define the Data Flow parameter as a `string`.**
   <img width="1541" height="774" alt="image" src="https://github.com/user-attachments/assets/5a88fdea-b987-4314-a75c-e30c609b7196" />

3. In the pipeline, pass the `@pipeline().TriggerTime` system variable directly into this parameter using a pipeline expression.
   <img width="1260" height="774" alt="image" src="https://github.com/user-attachments/assets/c53057c5-f92c-4adc-8f88-18ba8a11426a" />


This small change ensures compatibility with the Dataverse connector and avoids the cryptic conversion error.

### Lesson Learned

Even though it’s tempting to use date or timestamp types when dealing with datetime values in ADF, the **correct approach for Dataverse is to use strings**. It aligns with how the Web API expects the data and helps you avoid hard-to-decipher errors.
