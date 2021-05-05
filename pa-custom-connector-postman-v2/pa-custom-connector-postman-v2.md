There are many tools you can utilize to develop [Power Automate custom connectors](https://docs.microsoft.com/en-us/connectors/custom-connectors/) including [Postman](https://www.postman.com/) and [Swagger Inspector](https://inspector.swagger.io/builder).  I prefer to utilize Postman but recent updates to the product no longer make it possible to export to a v1 collection.

![image](https://user-images.githubusercontent.com/7444929/117196706-cf62a880-adb4-11eb-9bc8-a70a7fb01cfa.png)

This is unfortunate because the Power Automate custom connector site only allows upload of v1 collections.

![image](https://user-images.githubusercontent.com/7444929/117197061-59ab0c80-adb5-11eb-87ed-ed2cd9f37672.png)

Luckily [APIMATIC](https://www.apimatic.io/) allows you to convert the Postman 2.0 collection to just about any other format you want.  You can downgrade them to Postman 1.0 or you could convert them to OpenAPI 2.0 format which you can also directly upload to the Power Automate connector page.

![image](https://user-images.githubusercontent.com/7444929/117196501-8ca0d080-adb4-11eb-9c6f-1e4d8a62d597.png)

Have fun creating custom connectors!

<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IFBvd2VyIEF1dG9tYXRlIE
N1c3RvbSBDb25uZWN0b3JzIC0gSW1wb3J0IFBvc3RtYW4gdjIg
Q29sbGVjdGlvblxuYXV0aG9yOiBSaWNoYXJkIFdpbHNvblxudG
FnczogJ1Bvd2VyQXV0b21hdGUsIFBvd2VyUGxhdGZvcm0sIEN1
c3RvbUNvbm5lY3RvciwgUG93ZXJBcHBzLEFjdGlvbnMsVHJpZ2
dlcnMnXG4iLCJoaXN0b3J5IjpbLTE0NzQ1MTI5NTEsLTc1NDM5
MTM2NV19
-->