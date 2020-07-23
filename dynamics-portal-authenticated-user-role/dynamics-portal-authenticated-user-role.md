Anyone who has set up the PowerApps/Adx Portal before can tell you how complicated the security mechanisms can be to configure.  It's both easy to give users to much permission or not enough.  

Today we learned an important lesson regarding two fields on the Web Role entity.  During our testing one of users told us that they could see the portal edit button as well as every web page in the system, OH NO!  

After spending about two hours digging through the Web Role, Website Access Permission, and Web Page Access Control records we finally realized that someone had updated the **Authenticated Users Role** field on the Administrator Web Role to True.  This field and the **Anonymous Users Role** field gives every portal user of that related type the Web Role without having to directly assign the Web Role to the User/Contact/Account record.  Which explained why we still had admin rights even though the test Contact we were using had zero Web Roles assigned to it.



I hope this saves someone out there some time during their day trying to figure out why everyone on their portal is now an admin or has mystery rights they shouldn't 😁



<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ4NzQ4MzUzMywtMTUzMzU0NzczMCwtMT
M1OTgxOTQzNCwtMTIxNDQwODM1MCw3MTIwNzA0MjVdfQ==
-->