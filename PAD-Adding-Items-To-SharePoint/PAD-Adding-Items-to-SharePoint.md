Power Automate Desktop - How to Add Items to SharePoint, Let me count the ways...

* [Screen Recording](#screen-recording)
* [SharePoint REST API](#sharepoint-rest-api)
* [Powershell PnP](#powershell-pnp)

## Screen Recording

One issue i did run into while building this automation was that after the first record creation the validation on the SharePoint create screen always said that my required field were not filled in even though they were.  To work around this I added a Browser Reaload Web Page action at the start of each loop to reload the SharePoint list url.

If you copy the code below you can paste it into the Power Automate Desktop design surface to get started. 
```
Excel.LaunchExcel.LaunchAndOpen Path: $'''C:\\Files\\Desktop\\MOCK_CLIENT_DATA.xlsx''' Visible: True ReadOnly: False LoadAddInsAndMacros: False Instance=> ExcelInstance
@@timestamp: '01/27/2022 02:14:39'
@@source: 'Recorder'
@@culture: 'en-US'
WebAutomation.LaunchEdge.LaunchEdge Url: 'https://yoursharepoint.sharepoint.com/sites/Clients/Lists/Client%20Contacts/AllItems.aspx' BrowserInstance=> Browser
Excel.GetFirstFreeColumnRow Instance: ExcelInstance FirstFreeColumn=> FirstFreeColumn FirstFreeRow=> FirstFreeRow
Excel.ReadFromExcel.ReadCells Instance: ExcelInstance StartColumn: 1 StartRow: 2 EndColumn: FirstFreeColumn - 1 EndRow: FirstFreeRow - 1 ReadAsText: False FirstLineIsHeader: False RangeValue=> ExcelData
LOOP FOREACH CurrentItem IN ExcelData
    WebAutomation.GoToWebPage.ReloadWebPage BrowserInstance: Browser
    @@timestamp: '01/27/2022 02:16:24'
    @@source: 'Recorder'
    @@culture: 'en-US'
    WebAutomation.Click.Click BrowserInstance: Browser Control: appmask['Recording']['span']
    WebAutomation.PopulateTextField.PopulateTextField BrowserInstance: Browser Control: appmask['Recording']['input'] Text: CurrentItem[1] EmulateTyping: True UnfocusAfterPopulate: False Mode: WebAutomation.PopulateTextMode.Replace
    WebAutomation.PopulateTextField.PopulateTextField BrowserInstance: Browser Control: appmask['Recording']['input 2'] Text: CurrentItem[2] EmulateTyping: True UnfocusAfterPopulate: False Mode: WebAutomation.PopulateTextMode.Replace
    WebAutomation.PopulateTextField.PopulateTextField BrowserInstance: Browser Control: appmask['Recording']['input 3'] Text: $'''WR - %CurrentItem[3]%''' EmulateTyping: True UnfocusAfterPopulate: False Mode: WebAutomation.PopulateTextMode.Replace
    WebAutomation.PopulateTextField.PopulateTextField BrowserInstance: Browser Control: appmask['Recording']['input 4'] Text: CurrentItem[4] EmulateTyping: True UnfocusAfterPopulate: False Mode: WebAutomation.PopulateTextMode.Replace
    WebAutomation.PopulateTextField.PopulateTextField BrowserInstance: Browser Control: appmask['Recording']['input 5'] Text: CurrentItem[5] EmulateTyping: True UnfocusAfterPopulate: False Mode: WebAutomation.PopulateTextMode.Replace
    @@timestamp: '01/27/2022 02:16:38'
    @@source: 'Recorder'
    @@culture: 'en-US'
    WebAutomation.Click.Click BrowserInstance: Browser Control: appmask['Recording']['span 2']
END
Excel.CloseExcel.Close Instance: ExcelInstance
WebAutomation.CloseWebBrowser BrowserInstance: Browser

# [ControlRepository][PowerAutomateDesktop]
{
  "ApplicationInfo": {
    "Name": "ClipboardControlRepository",
    "Version": "1.0"
  },
  "Screens": [
    {
      "Controls": [
        {
          "AutomationProtocol": null,
          "ScreenShot": "iVBORw0KGgoAAAANSUhEUgAAAFkAAABKCAYAAADQSfiaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPiSURBVHhe7ZtNSxtBGMfzgfod/AS9Fjz21JPgsR56KC2C8dBWi3pQUKyQvtkGm6JGRRpEcasViaKYYhSWJg1Jca0EzZZ/Z/Ylzcuq2XHzWM3zgz+TzMzus/PLsIkhhsA0HZZMAEsmgCUTwJIJYMkEsGQCWDIBLJkAlkwASyaAJRPAkgkI5XNZcJob3skEsGQCWDIBLJkAlkwASyYg1NU+Aeq8vvsCWttDq/UaDzpB1Hv64D2+LqYcbf64FslywQiFrNZrPOgEVU+KVoEl+4wKLNlnVGDJPqMCS/YZFViyz6jAkn1GBWXJ3U9WMPsxiWhP1HP8orDkhhLB8JsMDNOEPv0FjyvG3A/+F+XHnXvWomXrNR50/NS77A8WFQKXLC9ULuimRl5/9Vqro8I17+QOFD7FgXgcpwN9NfPG8Fv0l4YHa/r959bt5EYiF2PvmkGkTpwrwTGSvZXzUsiK3uLWekWfWv7VuyX35EZSJ7l4iqIp2sw+RsvzWkhyuEfDwtQ2EjVZXj0SYkwUNlN1Y4mpJGL9n8+VXyf5JIPEyrF4YCI7P+fMq5ccHtlH1pCvhpxqovh913pRhp1jDyadGgM6DDlHTyEsnmttL616iIxZz93zqUSFSyS/xavpAkrOZD8UVjX03/c6p7fkWPsKdn6Jx2cFJDrlvBrJveL5megwclgeXcLs6rF1XcbaSlmqO9eWLjDFuWQ9cR2yXrGvp3wNqlGh8Z0cq07VTq4Zs3fyjK+dHJNjQ7as0l5S7LhqydHNU/kMO0PueZbsF8XIIOq+QD8PMdwehaaL7r2cONcpUuOiXjhq1ct3tPI92ZUsErNkCjkT4tYgHrmSpThPnGNjW/K4I2id29BNKXfdOrextoTD0Rmr3u7/ek/2TvMkd3XacmCIN0PR1O3k8SVEBiryfM6+z07mrNuHviXaYg4Loi+Rlh068h/Ex0SrHksuj4cdYZLyPXk8Y0kv5XPQIlLwBrStYxzMu8clcSAnyPfF9LZ9nsUjcQITf+L2TmbJVXOiWNizP0WUJYuMTmVQkPMdSsYRNsQ91x23dq5An3a+T+k+REF2xN61suSrL7qRBFlPBUXJE3jWn0Tym47lkRk8qujnL4jqUZZ8XuSFygXd1Mjr91qXGxUCl8w7uZ7AJTcSuZhGdk1QCbKeCizZZ1RgyT6jAkv2GRVYss+owJJ9hH9weEGCqHeln846LS1x+1sxq6WAul4N1yM5nbYXLFsKqOvVcD2SWwyWTABLJoAlE8D/wE4Q3skEsGQCWDIBLJkAlkwASyaAJRPAkglgyQSwZAJYMgEsmQCWTABLJoAlNx3gL98grdEytSjrAAAAAElFTkSuQmCC",
          "ElementTypeName": "span",
          "InstanceId": "30e39dae-9a80-45f5-bc73-37ec46a06b6f",
          "Name": "span",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(0) > div:eq(1) > div:eq(2) > div > div:eq(1) > div:eq(1) > div:eq(1) > div:eq(0) > div > div > div > div > div > div > div:eq(0) > div:eq(0) > button > span > span > span",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "span"
        },
        {
          "AutomationProtocol": null,
          "ScreenShot": "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",
          "ElementTypeName": "input",
          "InstanceId": "1ad356db-2912-4cdc-a538-f7fb3345bdd0",
          "Name": "input",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(2) > div > div:eq(3) > div > div > div:eq(3) > div > div > div:eq(1) > div > div > div > div > div:eq(2) > div:eq(0) > span > div:eq(0) > div > div > input",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "input"
        },
        {
          "AutomationProtocol": null,
          "ScreenShot": "iVBORw0KGgoAAAANSUhEUgAAAyYAAABgCAYAAADo3mbeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAwzSURBVHhe7d39c1WFncdx/yR1WuvuWtuZtj+0nd2udbFTNa6C0lmr9gGrgtZtiwhbKhoKtC4QQaFMbacmJDwITmkRqFgWuhAEHATkSQqDUJaHwADfvd9DTry5DUmg0BPi6zXzniT3npzc8NP9eO6N1+3YsSO2b98e27Zti3feeSc2bdoUGzZsCAAAgL8XwwQAAKicYQIAAFTOMAEAACpnmAAAAJUzTAAAgMoZJgAAQOUMEwAAoHKGCQAAUDnDBAAAqJxhAgAAVK7yYXLmzJnYvLkzNqxfP+jy+Pw+AABgeKh8mPzl6NGYNrU53l67ts8R0lgel8fn9/XnyJEjcU9TU9x4w/U9TW1ujtOnT8eiRR2xf//+7iP/dq2trxXnz4/18udlAABA/4bEMJk7pyW6urq6b7ng7NmzxYholMfl8YMdJgsWLCg+z04cPx6HDh2KUSNHxooVK7qPHFh+3+TJPy4GTV9ykPzjP9wcX7tjROzZs6f7VsMEAAAGa0gNk5MnT0bL7Jmxd+/e2P3++/HmypXdR33kUodJ41WMyzHQufL2Ef92ezz0zQfjpz+dWoyqZJgAAMDgDKlhsrP2WDraF8aKFb8thsm8V16O6dOmxtatW2qPbXNM+cnk6Kw9vr9lmOTv++UvfTHWrVsXp06dinHjxsajY8bEtx55pBgRhw8fjiefHBc3f+qmolWrVvV6SVgen99XL39GHpPnzIGycePG4vb6YXLw4MEYN/aJnvM+//yUOHHiRM/jaWtrjW+MHh1f+PznYtmy16OjoyM++5lb4yv/8s8958t/o5daWorbs3nzXunzqhIAAFxrhswwySf7bbUn+MteXxpzWmbH1i1b4ve/W1EMjFd/uSDaF7ZFV+2YS71iUg6KLIdDX8PkvvvujQMHPii+b8b06TF+/I96PeEfzBWTvP/DDz8sXjo29onHi9FRP0yOHz9e/Ixz587Frp074/av3lb7d17f83imT5sWx44dK35+vizs17/+VfE7PvH44z2PJ0dJ3p+f57nuHzUyVq9eXZwfAACuZUNmmOR7Pxa2tca5s2fjD2tWx+JFHfGzGdNiyeJFserNlcV9eSUlX+Z1KcOk/j0m+Ze8+hom5XhIb7zxRtz66Vui+YUXaj9rT5w/f37QwySPy8eVL+lavmxZr2GSg+pXr74ao0c/UFwV6WsopfyYoyV/z5Tnzsd48M9/LgZU/dDKLvaYAADgWjJkhkleYSivUuR7NE6ePFFcIcmPOQ6y48f/rzjuUoZJ4xP3gYZJ/pwcJDNmTC8GRA6VSxkmaU1tWN377/f0vDwszZ0zp7j6kY+7PN/Fhkn9uRqHyfLly4vbAQBgOBkSw2T2rJnFFZP8fKDyuDw+P+/P5Q6TUr4R/6knnyxeOpV/leu73/l2vDx3bvFSrEaNwyQH1oRnnimuaJTnzo/PTnimuHKSb+q/5ZZ/uqRhki8Fm/Lcc/HA/aNi3759xXjLAbR79+7iOAAAuJZVM0x27YrI//Jf+5gDoPW138T8ea8Mujw+v68/lztMZtVGz02f/ETxBvV8E3y+GT6vorS3txe3Pf39p3q9/yQ1DpNU/pzy3O+9917cdefXizetz5nzUtx9152XNEzysR6tjbH8s8X5OPI8Eyc+2+tnAgDAZat7jl6FaoZJ/sLXXXfhIwAAUL2Kn6MbJgAAgGECAAAMAYYJAABQOcMEAAConGECAABUzjABAAAqZ5gAAACVG3bDpPwfs/TXpEkXfumJE+PckiW1FkuSJEmqsPMTJvQ8R+/zOXx9V+F/wnjdokUd8Z9PPx1vvfXWlRkm+UDzF5IkSZI0PMvn/FfYlR8ml3DFJFdZrrNYvkySJElSldU9R+/zOXx918QVk8HIX6b2S+coOXO6q3bDeUmSJElVluOk+zl6FQwTSZIkSYaJYSJJkiQNgQwTw0SSJEmqPMPEMJEkSZIqzzAxTCRJkqTKM0wME0mSJKnyDBPDRJIkSaq8qofJjh07Yvv27bFt2zbDRJIkSfq4ZpgYJpIkSVLlGSYXHyZTm5uL6m87cuTDuKepKdat+2Ov21tbf1Mc23h/fhw3bmycOnWy1/GSJEmS6jJMLj5M+hoVeduNN1z/V4Mlv85xUn9bZphIkiRJg8gwufgw2bHjvWhqurv4WN6WA+Shbz7Ya2zkVZKHH36o13FlhokkSZI0iAyTiw+THBM5KnJclF8/++yE4uv6IVI/Phq/p3GY5LDJKy5Z/e3lS8DK+/LzvK38uXns8mWv9xzz5S99sc8hJEmSJF2TGSb9v/m9fO9Ifp5DIIdJDoW8rRwf9cf0N0waR8rmzZ3F5+UoqX8pWH5eHlues36s5M+rP5ckSZJ0TWeY9D9Mcozk1ZEcBPUDpPy8HA3lEGn8unGY1I+LssbBkuUx5VWZxnNm9Y+rvE2SJEm6ZjNM+h8m9QOh/ipJOQx27txRjIZyIPQ3TMqvG1+KVT94yurPY5hIkiRp2GeY9D9MshwNs2fN7DVAysGy4Bfzew2PgYZJWQ6L8o31fR2Tn+fLxvL+xnOW32+YSJIkadhkmAw8THIQNL5ZPcvBkn+hq/69IY0jon505JvXc1Dk7eWwya/z88G8x8QwkSRJ0rDNMBl4mOQIyJde1Q+HLIdC41/H6m+Y5OflX93K6odGOU7K+8rv6eucmWEiSZKkYZVhMvAwkSRJknSVM0wME0mSJKnyDBPDRJIkSao8w8QwkSRJkiqv6mHS2bkpNm383/jThvXxP+v+GG+vfSvWrF7VffdVYphIkiRJQytXTAwTSZIkqfIME8NEkiRJqjzDxDCRJEmSKs8wMUwkSZKkyjNMDBNJkiSp8gwTw0SSJEmqvI/3MFlSDBNJkiRJ1VYMku7n6FW48sNk164Lw6O/Jk0qfumYOLH4xfMfQZIkSVJ1nZ8woec5ep/P4evL5/xX2JUfJvlA8xeSJEmSNDzL5/xXWLVXTPJjX/dLkiRJ+vt2Kc/Rr4krJoORv8xVWloAAMBlqPg5umECAAAYJgAAwBBgmAAAAJUzTAAAgMoZJgAAQOUMEwAAoHKGCQAAULmP5TAp/yeMV+F/zAIAAFyGip+jVzNMAAAA6hgmAABA5QwTAACgcoYJAABQOcMEAAConGECAABUzjABAAAqZ5gAAACVM0wAAIDKGSYAAEDlDBMAAKByhgkAAFA5wwQAAKhc5cPkzJkzsXlzZ2xYv37Q5fH5fQAAwPBQ+TD5y9GjMW1qc7y9dm2fI6SxPC6Pz+8byPnz56OzszMefPA/4qZPfiI++5lbY8GCBXH27NnuIwAAgKFgSAyTuXNaoqurq/uWC3I8nD59uvurj+RxefxAwyRHSXt7e9z66Vviv198MT744INYs2Z1/NekSXHq1KnuowAAgKFgSA2TkydPRsvsmbF3797Y/f778ebKld1HfWSww+TgwYPR1HR3tLW1FiOltG/fvj4HDwAAUJ0hNUx21h5LR/vCWLHit8UwmffKyzF92tTYunVL7bFtjik/mRydtcc3mGGSo+buu+6Mw4cPd9/SW/68l1paipd35cu8vvfomNi/f39x39Tm5njsse/F/Pnz4uZP3RSPP/ZYvPvuu/GtRx4pjp3y3HPFVZds3Lix8cz48fH881OKY0eNHBm7du4sztPR0RG3/etX4sYbro87Royo/buuL27P8z86Zkw0v/BCr+/Jn3H7V2+LrVu2FMedOH48vvudb8fSpUuLrwEAYLgaMsMkn+S3tb4Wy15fGnNaZhdPzn//uxVx5MiRePWXC6J9YVt01Y4Z7BWT1tq5cjT09bKtfJlYvrzrgftHxd69e+LYsWPFsMixcOLEiWI45KDIx7B169bi82+MHl0cu2rVqvjC5z9X+3fa2DNM7mlqip21YZHnmTz5xz3nyePz47lz5+LFn/88nv7+U8XVmvL8OVQOHDgQDz/8UMyYPr04Nr/3F/PnF48zf8Z9991bXP0BAIDhbMgMk0OHDsXCttY4VxsNf1izOhYv6oifzZgWSxYvilVvrizuyysp+TKvwQyT5cuXF0/q+zoub8v78phSjpCv3TEi8t8jh0M5asrxMXvWrOK4HEo5RNatW/dX96W8Pe/P43LU/PAHPyiuluSVlvKc9edP+fX48T8q/tJYXh3JqyR5tSTPO2vWzF4vRQMAgOEn4v8B9CulrZ4rTyUAAAAASUVORK5CYII=",
          "ElementTypeName": "input",
          "InstanceId": "dae70276-c98f-4162-a2f1-0fb4fc78b848",
          "Name": "input 2",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(2) > div > div:eq(3) > div > div > div:eq(3) > div > div > div:eq(1) > div > div > div > div > div:eq(2) > div:eq(1) > span > div:eq(0) > div > div > input",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "input"
        },
        {
          "AutomationProtocol": null,
          "ScreenShot": "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",
          "ElementTypeName": "input",
          "InstanceId": "ec86ac3c-a3cd-4454-b496-5b310b397a95",
          "Name": "input 3",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(2) > div > div:eq(3) > div > div > div:eq(3) > div > div > div:eq(1) > div > div > div > div > div:eq(2) > div:eq(2) > span > div:eq(0) > div > div > input",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "input"
        },
        {
          "AutomationProtocol": null,
          "ScreenShot": "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",
          "ElementTypeName": "input",
          "InstanceId": "520d3912-1a9a-40ee-91a9-c4dccff2537b",
          "Name": "input 4",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(2) > div > div:eq(3) > div > div > div:eq(3) > div > div > div:eq(1) > div > div > div > div > div:eq(2) > div:eq(3) > span > div:eq(0) > div > div > input",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "input"
        },
        {
          "AutomationProtocol": null,
          "ScreenShot": "iVBORw0KGgoAAAANSUhEUgAAAyYAAABgCAYAAADo3mbeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAgLSURBVHhe7d3bj5R3Hcdx/qS20eq9moD10KposWDsTbWmFypt6cE7QLCYKgRq6gKpAhIPlGM5JqAUrBhgEyiwIIetISR1Q2Apy0l2f873B8/2cZmdZcnS3zB9vZJ3dg7P7Oz0aj55Zsqk06dPp5MnT6bjx4+no0ePpsOHD6fu7u4EAADwSTFMAACA4gwTAACgOMMEAAAozjABAACKM0wAAIDiDBMAAKA4wwQAACjOMAEAAIozTAAAgOIMEwAAoLjiw+TGjRvpyJH3U/fBg3ddHB+PAwAAOkPxYdJ/8WJavGhh+ue+fU1HyMjiuDg+HtfKhQsX0vdmzEiPPPxQ7onHv562b9+WhoaGUrzmx748Je3fv//20QAAQEltMUx+99bydO3atdu33HLz5s10/fr129c+FsfF8Xc7TFavXp0v79ixI4+RQ4cOGSYAANBm2mqYXLlyJS1f1pXOnj2b/v3BB+nd3btvH/Wx8Q6TdevW5uvxu1+aNStfN0wAAKC9tNUwOdP4WzZt3JB27dqZh8nKFb9PSxYvSj09xxp/25H0+i8XpPcbf99EDZM/rFqVnvrutPT5zz2aVq5ckc/ShPjv8INnnskfAZsyeXLauHFjvu/q1avplVdeTnNmz849+tnPpBdffCGdP38+P+5i429asOC1/PvicVu3bk2Dg4P5PgAAYHRtM0ziTf/6xmjYvm1remv5stRz7Fj621935YHxpz+uThs3rE/XGsfcyxmTGAd79uzJ3zM5ceLE8DCJEdHf35/Wrl2b7+vt7U1nzpxJ33ji8bRmzV/yR8m6uw/m63v37h0eJk8//f3U2zju1KlT6dtTp6ZNmzblY38+d07+XfF8PT09adq0J/PzAQAArbXNMOnr60sb1q9Lgzdvpvf+vjdtfmdT+s0bi9OWze+kPe/uzvfFmZT4mNd4hkn15fcvffELaVtj9DT78ntcj/Fx+PChPDKeffaH6dKlS/m+OFPy2i/mp0ULFw4Pk7gcquvLli7No+ZrX/3K8PNV+bgYAACMrW2GycDAwPCX3WMMXLkykM+QxM8YE9Hlyx/l48YzTOLL73Fs9TGt0GyYVNdjmPz0Jz9OA5cv5/uqYfLGkiWjDpO4HsNk6re+mccNAAAwPm0xTJYt7cpnTOLyWMVxcXxcbmXkd0zqWg2TuBxnPuof5Zr25Hfyfa2GSQym52fOTD979dX8t8VHzuL/BDbW3wkAAJQaJr29qfGuPf+ML6WvW/t2WrVyxV0Xx8fjWrnXYRJnZg4cOJC/FB8fxYrvkOzauTPf3mqYhHPnzqUXnp+ZvxQfHx3r6vptPgYAANpe7T16CWWGSbzgSZNu/QQAAMor/B7dMAEAAAwTAACgDRgmAABAcYYJAABQnGECAAAUZ5gAAADFGSYAAEBxHTdMqn+YpVXz59960fPmpcEtWxptliRJklSwoblzh9+jN30PX+8+/COMEz9M4g+NFyRJkiSpM4v3/BOs6BmTWGW3FlqcNZEkSZJUquqMSf7Z7D18vQfijMndiBfTeNExSm5cv5b+e+O6JEmSpILFOKneo5dgmEiSJEkyTAwTSZIkqXyGiWEiSZIkFc8wMUwkSZKk4hkmhokkSZJUPMPEMJEkSZKKZ5gYJpIkSVLxDBPDRJIkSSqeYWKYSJIkScUzTMY5TPr+82F67rkfpX+dOJ6vv73mz+nXv3r9juNGK46Nx8Tlff94L7380qz00aX+O45r1nifS5IkSXpQMkwME0mSJKl4holhIkmSJBXPMBljmMRoiPHwyMMP5brefHPUYVIdWx8bcX/12Lh9zpzZow6T+D0zpk/P46e6v3ps3B7PbZhIkiSpEzNMWgyTamhUQyKKYfDYlMl3DJPq2PpwiPvqw6MaGs2GSTxu5LH1kRLPF89rmEiSJKkTM0xaDJMYA3F2pBoH0Wgf5aqqjquGSgyM6rYojhk5TFatWPF/o2TkcVXVc9VvkyRJkjohw6TFMKmf0ahuazZMqo9ptTquauQwqT6mVR8/o40aw0SSJEmdmmEyzjMmcdv06U81PWNSHyfNxkV1W32YxPU4YzJynNQHTP02w0SSJEmdmGHSYpjEUIjBUB8IMQyafcekuq8+TkZer86QjBwmcX/cVh8nI6/H8/mOiSRJkjo1w6TFMImqcRKDItraeEyz75jE5eqMSH24xH3VY+Ny1GyY1I+tzrLEcdVj47g4s1I9lyRJktRJGSZjDBNJkiRJ9z/DxDCRJEmSimeYGCaSJElS8QwTw0SSJEkqnmFimEiSJEnFM0wME0mSJKl4holhIkmSJBXPMDFMJEmSpOIZJoaJJEmSVDzDxDCRJEmSimeYGCaSJElS8T7lw2RLHiaSJEmSypYHye336CVM/DDp7b01PFo1f35+0WnevPzC4z+CJEmSpHINzZ07/B696Xv4evGef4JN/DCJPzRekCRJkqTOLN7zT7CyZ0ziZ7P7JUmSJH2yjec9+gNxxuRuxIu5T0sLAAC4B4XfoxsmAACAYQIAALQBwwQAACjOMAEAAIozTAAAgOIMEwAAoDjDBAAAKO5TOUyqf4TxPvzDLAAAwD0o/B69zDABAACoMUwAAIDiDBMAAKA4wwQAACjOMAEAAIozTAAAgOIMEwAAoDjDBAAAKK7YMDnf96EkSZKkB6T7zRkTAACgOMMEAAAozjABAACKM0wAAIDiDBMAAKA4wwQAACjOMAEAAIozTAAAgOIMEwAAoDjDBAAAKM4wAQAACkvpf2pMXZDitRP0AAAAAElFTkSuQmCC",
          "ElementTypeName": "input",
          "InstanceId": "298ba462-b2a0-415e-905e-8f620bf377d0",
          "Name": "input 5",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(2) > div > div:eq(3) > div > div > div:eq(3) > div > div > div:eq(1) > div > div > div > div > div:eq(2) > div:eq(4) > span > div:eq(0) > div > div > input",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "input"
        },
        {
          "AutomationProtocol": null,
          "ScreenShot": "iVBORw0KGgoAAAANSUhEUgAAAGIAAABKCAYAAABAWoFVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOZSURBVHhe7Zpdb9owFIb71/srtmmatN3uar3uf6ggmKQhIYQlQAOUllab1GrSu+N88DWP0C7IZ/S80qs0OY5j+/GxQ5UziFhIQDCRgGAiAcFEAoKJBAQTCQgmEhBMJCCYSEAwkYBgIgHBRAKCiQQEEwkIJhIQTCQgmEhAMJGAYCIBwUQHg3h+fsLjw7IR/+wqPF1c5EdT3IaP2SY9dnU6GISu8GHnAa+17jDOzvKjKW7Dx2pTNWZ1ehGIpvyWQFSuk4AoLSAMcRsWEIa4DQsIQ9yGBYQhbsMCwhC34ZMDUf0w2udf5+d5p/XRFLfhl7TpNT/66tQ4CN1Q3aFTtu6jqe/7XCeq+TCZKjf5nzPi21c8fP6I2Yd3mL4v/ekLfuyWa9gnlxGHWHfGPLPukHgtOK0rKK+HOOoj7l/Dc31Mtso177+3qRnXiRmIEcLOFZxuiMXW9eNbQGzFbhApAtFyEKa3OzHtGdJAodvWZQp3rweYU2waOHTegj9cl6+uBak+z5D2FFR1r6MQje5WZQXETmw56sEtB6ujXMSTTSCUMS4NYDLGNEsQdYtlzB/QgM778PQ9XlyWLaEqHxkteZNeAcXrJ5iOYwQ689oukvuibgFhiD8uRhj61extwQ0SLE3lxtdQNPiqN6LzGeKuHlwPqY5lBJRi3XBCsQh+DmmwrmfooqMhxsW5gDDEVyYgxax3EGX62i0mkQdPtdBpF9mgXYCgbMoHl5aipFqWFOI53VcCq8pv2h8UzxIQhviml5EqBoxm7iL/mzIkHCLLbjBPNzOCyt8P4FMWKT/Kl6V1BlQZEdGSdrPl+aJ4joDYitGAdRSCgF5b81dXr9gv2gpDmtlZufm6oV7nh6s9YgWCnPp0rdMiQHrjrjbjGYb5azFd6xcQsySET6/I1WuxgNiKfUeYLzvrpUPlG3Y5oDOa8XqT1bG2g4BAbWWEdlpccxwPo1W95PsxYs9Z101Lm+vHq9dkAWGI2/DJgZB/+pldp8ZB6IbqDp2ydR9Nfd/nOlHNh8lUucmSEWbXqXEQh1h35rUz61g+dpvqJCBKCwhD3IYFhCFuwwLCELfh/wqEfIT8cjf+EXKTn+W/JRDajX6W36guL/NO50custwmOyDiuOiwPnKR5TbZASH6QwKCiQQEEwkIJhIQTCQgmEhAMJGAYCIBwUQCgokEBBMJCCYSEEwkIJhIQDCRgGAiAcFEAoKJBAQTCQgWAn4D/HRMHi6snHMAAAAASUVORK5CYII=",
          "ElementTypeName": "span",
          "InstanceId": "b54b28d7-719b-4e77-a97c-d97627ea5a6d",
          "Name": "span 2",
          "SelectorCount": 1,
          "Selectors": [
            {
              "CustomSelector": "html > body > div:eq(0) > div > div:eq(1) > div:eq(2) > div > div:eq(3) > div > div > div:eq(3) > div > div > div:eq(1) > div > div > div > div > div:eq(4) > div > button > span > span > span",
              "Elements": [],
              "Ignore": false,
              "IsCustom": true,
              "IsWindowsInstance": false,
              "Order": 0
            }
          ],
          "Tag": "span"
        }
      ],
      "ScreenShot": null,
      "ElementTypeName": "Web Page",
      "InstanceId": "87159776-0a1f-47cb-99f6-2a3a0826ae81",
      "Name": "Recording",
      "SelectorCount": 1,
      "Selectors": [
        {
          "CustomSelector": null,
          "Elements": [
            {
              "Attributes": [],
              "CustomValue": null,
              "Ignore": false,
              "Name": "Web Page",
              "Tag": "domcontainer"
            }
          ],
          "Ignore": false,
          "IsCustom": false,
          "IsWindowsInstance": false,
          "Order": 0
        }
      ],
      "Tag": "domcontainer"
    }
  ],
  "Version": 1
}
```

## SharePoint REST API
The SharePoint REST API offer a huge amount of capabilities for carrying out actions within SharePoint.  In order to utilize them within Power Automate Desktop we can use the **Invoke web service** action.  In order to utilize the web service it must have the proper authentication information sent along with it.  The authentication mechanism will consist of a service principal, within sharepoint there are two options for doing this.  The first is App-only authentication which can be configured through the use of SharePoint pages and is detailsed [here](https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/security-apponly-azureacs). Additionally you can utilize AD-only authentication which is newer and prefered for SharePoint Only but does not work in SharePoitn On-Premise.  For the secario I choose to utilize the App-Only method due to the greater simplicity in setting it up and the ablity for it to function Online and On-Premise.

### Create a Service Principal
Creating the service principal and configuring it's permissions are well documented at [Setting up an app-only principal with tenant permissions](https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/security-apponly-azureacs#setting-up-an-app-only-principal-with-tenant-permissions)

After you have created the service principal you may also need to ensure that app-only authentication is not disabled.  The is detailed in the next section.

### Enable Tenant for App-Only Access
Newer tenants may App-only access disabled.  In order to enable you will need to update the setting for the SharePoint tenant.  This can be done though the use of the [SharePoint PnP PowerShell Cmdlets.](https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-pnp/sharepoint-pnp-cmdlets?view=sharepoint-ps)

After you run these command it can take some time for it to propegate, so go grab some coffee or drink of your choice.

```
Install-Module -Name Microsoft.Online.SharePoint.PowerShell
Install-Module -Name PnP.PowerShell
Register-PnPManagementShellAccess
Connect-PnPOnline -Url https://yoursharepoint.sharepoint.com
Set-PnPTenant -DisableCustomAppAuthentication $false
```

If you copy the code below you can paste it into the Power Automate Desktop design surface to get started. 
```
Excel.LaunchExcel.LaunchAndOpen Path: $'''C:\\Files\\Desktop\\MOCK_CLIENT_DATA.xlsx''' Visible: True ReadOnly: False LoadAddInsAndMacros: False Instance=> ExcelInstance
Excel.GetFirstFreeColumnRow Instance: ExcelInstance FirstFreeColumn=> FirstFreeColumn FirstFreeRow=> FirstFreeRow
Excel.ReadFromExcel.ReadCells Instance: ExcelInstance StartColumn: 1 StartRow: 2 EndColumn: FirstFreeColumn - 1 EndRow: FirstFreeRow - 1 ReadAsText: False FirstLineIsHeader: False RangeValue=> ExcelData
Web.InvokeWebService.InvokeWebService Url: $'''https://accounts.accesscontrol.windows.net/ef0ff4be-5248-4843-9746-4bd7b801fc2b/tokens/OAuth/2''' Method: Web.Method.Post Accept: $'''application/json''' ContentType: $'''application/x-www-form-urlencoded''' RequestBody: $'''
client_id=2c2aa580-ef50-46ba-aeeb-289e03584fc3@ef0ff4be-5248-4843-9746-4bd7b801fc2b
&grant_type=client_credentials
&resource=00000004-0000-0aa2-cc00-000000000000/yoursharepoint.sharepoint.com@ef0ff4be-5248-4843-9746-4bd7b801fc2b
&client_secret=H1pp6FxAK3jeJu/Tjtugb5sUc7ab+5O14mDmvvTR83i=
''' ConnectionTimeout: 30 FollowRedirection: False ClearCookies: False FailOnErrorStatus: False EncodeRequestBody: False UserAgent: $'''Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.21) Gecko/20100312 Firefox/3.6''' Encoding: Web.Encoding.AutoDetect AcceptUntrustedCertificates: False ResponseHeaders=> WebServiceResponseHeaders2 Response=> WebServiceResponse2 StatusCode=> StatusCode2
Variables.ConvertJsonToCustomObject Json: WebServiceResponse2 CustomObject=> JsonAsCustomObject
LOOP FOREACH CurrentItem IN ExcelData
    Web.InvokeWebService.InvokeWebService Url: $'''https://yoursharepoint.sharepoint.com/sites/Clients/_api/web/lists/GetByTitle(\'Client Contacts\')/items''' Method: Web.Method.Post Accept: $'''application/json;odata=verbose''' ContentType: $'''application/json;odata=verbose''' CustomHeaders: $'''Authorization: %JsonAsCustomObject.token_type% %JsonAsCustomObject.access_token%''' RequestBody: $'''{
  \"__metadata\": {
    \"type\": \"SP.Data.Client_x0020_ContactsListItem\"
  },
  \"FirstName\": \"%CurrentItem[1]%\",
\"Title\" : \"%CurrentItem[2]%\",
\"Company\" : \"WS - %CurrentItem[3]%\",
\"Email\" : \"%CurrentItem[4]%\",
\"Phone\": \"%CurrentItem[5]%\"
}''' ConnectionTimeout: 30 FollowRedirection: True ClearCookies: False FailOnErrorStatus: False EncodeRequestBody: False UserAgent: $'''Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.21) Gecko/20100312 Firefox/3.6''' Encoding: Web.Encoding.AutoDetect AcceptUntrustedCertificates: False ResponseHeaders=> WebServiceResponseHeaders Response=> WebServiceResponse StatusCode=> StatusCode
END
Excel.CloseExcel.Close Instance: ExcelInstance
SET NumberOfClients TO ExcelData.RowsCount
```

## Powershell PnP

### Install SharePoint PnP
```
Install-Module -Name PnP.PowerShell
Register-PnPManagementShellAccess
```

![image](https://user-images.githubusercontent.com/7444929/151807568-b5516ce7-4b51-4520-a012-77e23f248554.png)


[How to use the Windows Credential Manager to ease authentication with PnP PowerShell](https://github.com/pnp/PnP-PowerShell/wiki/How-to-use-the-Windows-Credential-Manager-to-ease-authentication-with-PnP-PowerShell)

```
Add-PnPStoredCredential -Name https://yourtenant.sharepoint.com -Username youraccount@yourtenant.onmicrosoft.com -Password (ConvertTo-SecureString -String "YourPassword" -AsPlainText -Force)
```

If you copy the code below you can paste it into the Power Automate Desktop design surface to get started. 
```
Excel.LaunchExcel.LaunchAndOpen Path: $'''C:\\files\\Desktop\\MOCK_CLIENT_DATA.xlsx''' Visible: True ReadOnly: False LoadAddInsAndMacros: False Instance=> ExcelInstance
Excel.GetFirstFreeColumnRow Instance: ExcelInstance FirstFreeColumn=> FirstFreeColumn FirstFreeRow=> FirstFreeRow
Excel.ReadFromExcel.ReadCells Instance: ExcelInstance StartColumn: 1 StartRow: 2 EndColumn: FirstFreeColumn - 1 EndRow: FirstFreeRow - 1 ReadAsText: False FirstLineIsHeader: False RangeValue=> ExcelData
SET PowerShellScript TO $'''Connect-PnPOnline -Url https://yoursharepoint.sharepoint.com/sites/Clients'''
LOOP FOREACH CurrentItem IN ExcelData
    Text.AppendLine Text: PowerShellScript LineToAppend: $'''Add-PnPListItem -List \"Client Contacts\" -ContentType \"SP.Data.Client_x0020_ContactsListItem\" -Values @{\"Title\" = \"%CurrentItem[2]%\"; \"FirstName\" =\"%CurrentItem[1]%\"; \"Company\" = \"PS - %CurrentItem[3]%\"; \"Email\" = \"%CurrentItem[4]%\"; \"Phone\" = \"%CurrentItem[5]%\"}''' Result=> Result
    SET PowerShellScript TO Result
END
Scripting.RunPowershellScript Script: PowerShellScript ScriptOutput=> PowershellOutput ScriptError=> ScriptError
Excel.CloseExcel.Close Instance: ExcelInstance
SET NumberOfClients TO ExcelData.RowsCount
```
