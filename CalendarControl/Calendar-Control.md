
## Overview
This calendar control was built off of  [React Big Calendar](https://github.com/jquense/react-big-calendar). The calendar can be used to display events with or without related resources.

![Control Overview](https://github.com/rwilson504/PCFControls/raw/master/Calendar/images/calendarcontrol.gif)

This control has been designed to work in both Canvas and Model apps. Because of the differences in those types of applications there are some differences in how you utilize them in each app.

Canvas

-   If you want to utilize resources in Canvas you will need to use a collection as the data source. If just showing events with no resources a simple CDS dataset can be used.
-   There are output parameters that are defined in the app which will pass back data when an item is clicked on, an empty time span is selected, or the calendar range has been updated. These output parameters will allow you to create your own functionality in the Canvas app for updated or creating records.

Model

-   Clicking on and event will open the record for editing.
-   Clicking on an empty timespan will open a new record form, and will pass in the start, end, and resource field data.

Lear More Here: [https://github.com/rwilson504/PCFControls/blob/master/Calendar/README.md](https://github.com/rwilson504/PCFControls/blob/master/Calendar/README.md)
Download Here: https://github.com/rwilson504/PCFControls/releases/latest
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE4NjUyMTkwOTNdfQ==
-->