Anyone who has set up the PowerApps/Adx Portal before can tell you how complicated the security mechanisms can be to configure.  It's both easy to give users to much permission or not enough.  

Today we learned an important lesson regarding two fields on the Web Role entity.  During our testing one of users told us that they could see the portal editing button, OH NO!  After spending about two hours digging through the Web Roles, Website Access Permissions, and Web Page Access Controls we finally realized that someone had updated the **Authenticated Users Role" field on the Administrator Web Role to True.





<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzNTk4MTk0MzQsLTEyMTQ0MDgzNTAsNz
EyMDcwNDI1XX0=
-->