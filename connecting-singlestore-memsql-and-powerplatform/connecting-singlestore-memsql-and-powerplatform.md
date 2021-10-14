# Connecting SingleStore (memSQL) On-Premise and Power Platform
- Part 1 - Overview
- **Part 2 - Installing SingleStore and Createing Demo Data**
- Part 3 - Install On-Premise Data Connector
- Part 4 - Getting Data Directly Using Power Automate and Power Apps
- Part 5 - Utilizing Azur API Management and Logic Apps


## Install memSQL/SingleStore
SingleStore offers a free Docker image that contains a Cluster in a box which can be run on any operating system.  Instructions for getting that up and running is located [here on their website](https://docs.singlestore.com/db/v7.5/en/deploy/cluster-in-a-box/introduction.html).

To get started sign up at their portal https://portal.singlestore.com/ and get a free license.  Once you have a free license click the Install SingleStore button.  
![image](https://user-images.githubusercontent.com/7444929/137362518-eec745ee-1c3a-4199-bd8c-ba0f61aa9242.png)

Choose the quick start option.  
![image](https://user-images.githubusercontent.com/7444929/137361760-2266ccf6-489f-436c-851b-4ef1836497a0.png)

Finally follow the directions on the last page for setting up the docker image and make sure you copy the username and password somewhere safe.  
![image](https://user-images.githubusercontent.com/7444929/137362007-c5ed0d25-4ab6-40bc-a573-1f5d461d5c5e.png)

## Connect and Create Demo Database
Now that we have a SingleStore instance we can utilize for testing let's get connected.  I preferr to connect to MySQL using the [MySQL Workbench](https://www.mysql.com/products/workbench/) but any tool that can connect to MySQL will work or you can utilize the SingleStore Studio.  Additional information on connecting using MySQL Workbench and other tools can be found [here](https://docs.singlestore.com/db/v7.5/en/connect-to-your-cluster/connect-with-mysql/connect-with-mysql-workbench.html).

![image](https://user-images.githubusercontent.com/7444929/137361445-bd05b474-1e74-4069-b2f2-ad09b6e957af.png)

After connecting to the cluster it's time to add some data for testing.  The script below will create a new database and load in some data, this script and other basic scripts can also be found [here](https://docs.singlestore.com/managed-service/en/query-data/run-queries/query-procedures/basic-query-examples.html).

```
-- Create the database

CREATE DATABASE memsql_example;
use memsql_example;

-- Create 3 tables: departments, employees, and salaries

CREATE TABLE departments (
  id int,
  name varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id int,
  deptId int,
  managerId int,
  name varchar(255),
  hireDate date,
  state char(2),
  PRIMARY KEY (id)
);

CREATE TABLE salaries (
  employeeId int,
  salary int,
  PRIMARY KEY (employeeId)
);

-- Populate each table with data

INSERT INTO departments (id, name) VALUES
  (1, 'Marketing'), (2, 'Finance'), (3, 'Sales'), (4, 'Customer Service');

INSERT INTO employees (id, deptId, managerId, name, hireDate, state) VALUES
  (1, 2, NULL, "Karly Steele", "2011-08-25", "NY"),
  (2, 1, 1, "Rhona Nichols", "2008-09-11", "TX"),
  (3, 4, 2, "Hedda Kent", "2005-10-27", "TX"),
  (4, 2, 1, "Orli Strong", "2001-07-01", "NY"),
  (5, 1, 1, "Leonard Haynes", "2011-05-30", "MS"),
  (6, 1, 5, "Colette Payne", "2002-10-22", "MS"),
  (7, 3, 4, "Cooper Hatfield", "2010-08-19", "NY"),
  (8, 2, 4, "Timothy Battle", "2001-01-21", "NY"),
  (9, 3, 1, "Doris Munoz", "2008-10-22", "NY"),
  (10, 4, 2, "Alea Wiggins", "2007-08-21", "TX");

INSERT INTO salaries (employeeId, salary) VALUES
  (1, 885219), (2, 451519), (3, 288905), (4, 904312), (5, 919124),
  (6, 101538), (7, 355077), (8, 900436), (9, 41557), (10, 556263);
```

After you execute the query you will now have some data which you can test with.  
![image](https://user-images.githubusercontent.com/7444929/137364472-0a965352-d939-4c57-b071-7c8753f4f310.png)

In the next part we will install the On-Premise data connector which will allow us to access this data within Azure and the Power Platform.
