Anyone who has set up the PowerApps/Adx Portal before can tell you how complicated the security mechanisms can be to configure.  It's both easy to give users to much permission or not enough.  

Today we learned an important lesson regarding two fields on the Web Role entity.  During our testing one of users told us that they could see the portal editing button, OH NO!  

After spending about two hours digging through the Web Roles, Website Access Permissions, and Web Page Access Controls we finally realized that someone had updated the **Authenticated Users Role** field on the Administrator Web Role to True.  This field and the **Anonymous Users Role** field gives every portal user of that related type the Web Role without having to directly assign the Web Role to the User/Contact/Account record.  Which explained why we still had admin rights even  though the test contact we tested with has zero Web Roles assigned to it.



I hope this saves someone out there some time during their day trying to figure out why everyone on their portal is now an admin 😁



<!--stackedit_data:
eyJoaXN0b3J5IjpbNjQ2NzEyMzI3LC0xMzU5ODE5NDM0LC0xMj
E0NDA4MzUwLDcxMjA3MDQyNV19
-->