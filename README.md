# Employee-Tracker

Here a link to the GitHub Repo
https://github.com/ksfallon/Employee-Tracker

Here is the link to a video reviewing the basic requirements
https://youtu.be/qjnVly4MVM4

### **TABLE OF CONTENTS:**
1. [Overview of Employee-Tracker](#1-overview-of-tasks)
2. [Getting Started and the Setup](#2-files-and-modules-needed-to-start)
3. [Creating the Server & htmlRoutes](#3-the-serverjs-and-htmlroutesjs-files)
4. [Creating the middleware](#4-the-middlewarejs-file)
5. [Creating the apiRoutes](#5-the-apiroutesjs-file)
6. [Screen Shots of App with Inspect/Console](#6-screen-shots-of-app)
7. [License for Repository](#7-license)

<br>
<br>

## Overview of Tasks
- The goal is to build a system for a company to manage their employees.
- To create this system we must use node js, MySQL, npm Inquirer, npm Console Table.
- The database is based on 3 things: departments, roles and employees
<br>
- The minimum requirements are giving the user the ability to: 
- 1. Add: employees, departments and roles
- 2. View: employees, departments and roles
- 3. Updae an employee's role
- <br>
- The bonus features are:
- 1. Delete: employees, departments and roles
- 2. Update employee's manager
- 3. View employee by manager
- 4. View total utilized budget by department (salary combo)

## Getting Started and the Set up
**MySQL** needed to be connected to my Employee-Tracker work, so I created two files:
1. server.js
2. empTrackerDB.sql

1. In my **empTrackerDBsql** file the first two lines of code are 
`DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;`
- And in the **server.js** file has a const that requires mysql and a const connection that creates the mysql connection by calling on the host, port, user, my *MySQL* password and the *emp_trackerDB*
- Then I can start building my *emp_trackerDB* and **seed.sql** file which i'll use to add value's into my tables.

2. My **empTrackerDBsql** holds my *empTrackerDB* and I need to create 3 tables within it: *employee*, *role* and *department*.
- for each table I need to create the *keys* for my key value pairs in these arrays. I also need to do them in the correct order. *department* is the grandparent table, this is because the *role* table calls on information from it and *employee* will call on information from within *role*. They are connected by foreign keys to each other to allow this onnection call.
- 
3. ge
4.

2. Once the two are connected I can use  *MySQL* workbench as well to test out my queries and see the updated data that forms in the tables when the inquirer is run in the terminal, but that comes later
