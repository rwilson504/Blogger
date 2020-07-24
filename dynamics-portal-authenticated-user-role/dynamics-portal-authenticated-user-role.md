Anyone who has configured the PowerApps/Adx Portal before can tell you how complicated the security mechanisms can be to configure.  It's both easy to give users to much permission or not enough.  

Today we learned an important lesson regarding two fields on the Web Role entity.  During testing of a new app a users told us that they could see the portal edit button as well as every web page in the system, OH NO!  

![Everyone Is An Admin](https://github.com/rwilson504/Blogger/blob/master/dynamics-portal-authenticated-user-role/portal-editing.png?raw=true)

After spending about two hours digging through the Web Role, Website Access Permission, and Web Page Access Control records we finally realized that someone had updated the **Authenticated Users Role** field on the Administrator Web Role to True.  This field and the **Anonymous Users Role** field gives every portal user of that related type the Web Role without having to directly assign the Web Role to the User/Contact/Account record.  Which explained why we still had admin rights even though the test Contact we were using had zero Web Roles assigned to it.

![Web Role](https://github.com/rwilson504/Blogger/blob/master/dynamics-portal-authenticated-user-role/web-role.png?raw=true)

I hope this saves someone out there some time during their day trying to figure out why everyone on their portal is now an admin or has mystery rights they shouldn't 😁



<!--stackedit_data:
eyJwcm9wZXJ0aWVzIjoidGl0bGU6IFBvd2VyQXBwcyBQb3J0YW
wgLSBVc2VycyBDYW4gU2VlIE1vcmUgVGhhbiBUaGVpciBBc3Np
Z25lZCBXZWIgUm9sZXMgQWxsb3dcbmF1dGhvcjogUmljaGFyZC
BXaWxzb25cbnRhZ3M6ICdwb3dlcmFwcHMsIHBvcnRhbCwgd2Vi
cmVvbGUsIHNlY3VyaXR5LCBhZG1pbmlzdHJhdG9yJ1xuIiwiaG
lzdG9yeSI6Wzc1NDg4MjAyOSwxNDg3NDgzNTMzLC0xNTMzNTQ3
NzMwLC0xMzU5ODE5NDM0LC0xMjE0NDA4MzUwLDcxMjA3MDQyNV
19
-->