When utilizing scopes within Power Automate to create a try/catch/finally statement it can be useful to provide additional details about any errors that occurred within the try block.  The example below shows how to get the results of a try block after it has failed and return that information.

To replicate this do the following: 

- Add a **Control - Scope** action called 'Try'
- Add another **Control - Scope** action below Try called 'Catch'
- Click the (...) on the Catch action and select the **Configure after run settings**. Then click the 'has failed' checkbox.
- Follow the screen shot below which will get the results array of the Try block then filter it down to the Failed result.  You can then utilize the filtered result to return errors.

![2021-06-22_13-50-06](https://user-images.githubusercontent.com/7444929/122980038-37ba1900-d366-11eb-9283-b722ac24ebdd.png)

The iamge belows shows the output after a completed run.  We can now see the Action name which failed as well as the error message.  In this scenario I am using that information to populate a JSON object which will be used later for returning information back to a Power App.

![2021-06-22_13-59-51](https://user-images.githubusercontent.com/7444929/122977991-02143080-d364-11eb-8326-7cd42369dd68.png)

If you would like to return additional information from the Failed result test the flow in a way which will force it to fail then look at the flow run history.  Expand the 

<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IFJldHVybiBFcnJvciBpbi
BQb3dlciBBdXRvbWF0ZSBXaGVuIFVzaW5nIFRyeS9DYXRjaCBT
Y29wZXNcbnRhZ3M6ID4tXG4gIHBvd2VyYXV0b21hdGUscG93ZX
JhcHBzLGVycm9yLGFjdGlvbnMsY2xvdWRmbG93LGZsb3csdHJ5
Y2F0Y2gsdHJ5Y2F0Y2hmaW5hbGx5LHRyeSxjYXRjaCxmaW5hbG
x5XG4iLCJoaXN0b3J5IjpbLTExOTMzMzE2ODddfQ==
-->