<h1 align ="center"> Employee-Tracker </h1>

Link to the GitHub Repo
https://github.com/ksfallon/Employee-Tracker

Link to a video reviewing the basic requirements
https://youtu.be/qjnVly4MVM4

Link to a video reviewing the **BONUS** requirements
https://youtu.be/-_OqtR_g-2M

### **TABLE OF CONTENTS:**
1. [Overview of Employee-Tracker](#1-overview-of-tasks)
2. [Getting Started and the Setup](#2-files-and-modules-needed-to-start)
3. [Creating Main function with inquirer](#3-creating-viewandmanage-using-inquirer-and-switch-cases)
4. [Creating the connection queries](#4-creating-the-view-connection-queries-in-js-and-mysql)
5. [ADD with MySQL and JS](#5-add-an-employee-role-or-department-with-js-and-mysql)
6. [UPDATE an employee's role with node js and MySQL](#6-update-an-employees-role-with-node-js-and-mysql)
7. [Bonus Functions](#7-bonus-functions)
8. [License for Repository](#8-license)

<br>

## 1. Overview of Tasks
- The goal is to build a system for a company to manage their employees.
- To create this system we must use node js, MySQL, npm Inquirer, npm Console Table.
- The database is based on 3 things: departments, roles and employees
<br>
- The minimum requirements are giving the user the ability to: 
1. Add: employees, departments and roles
2. View: employees, departments and roles
3. Updae an employee's role
<br>
- The bonus features are:
1. Delete: employees, departments and roles
2. Update employee's manager
3. View employee by manager
4. View total utilized budget by department (salary combo)

## 2. Files and Modules Needed to Start
**MySQL** needed to be connected to my Employee-Tracker work, so I created two files: **server.js** and **empTrackerDB.sql**

1. in my terminal I did npm init, npm i, then imported these three modules: 
- Imported [inquirer](https://www.npmjs.com/package/inquirer)
- Imported [MySQL](https://www.npmjs.com/package/mysql) 
- Imported [console.table](https://www.npmjs.com/package/console.table) 
<br>
2. In my **empTrackerDB.sql** file the first two lines of code are 
`DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;`

- And in the **server.js** file has a const that requires mysql and a const connection that creates the mysql connection by calling on the host, port, user, my *MySQL* password and the *emp_trackerDB*.
  - I also went ahead and create const for and required *inquirer* and *console.table*
- Then I can start building my *emp_trackerDB* and **seed.sql** file which i'll use to add value's into my tables.

3. My **empTrackerDBsql** holds my *empTrackerDB* and I need to create 3 tables within it: *employee*, *role* and *department*.

- for each table I need to create the *keys* for my key value pairs in these arrays. I also need to do them in the correct order. *department* is the grandparent table, this is because the *role* table calls on information from it and *employee* will call on information from within *role*. They are connected by foreign keys to each other to allow this onnection call.

- The *department* table has two keys: id and name. id is a primary key and is called as a foreign key in the roles table (rold.department_id = department.id). id is set to autoincrement so no two departments will ever have the same id. Both name and id are set to NOT NULL.

- The *role* table has four keys: id, title, salary and department_id. Then a line of code is needed to connect *role* and *department* tables at rold.department_id = department.id and this is the **FOREIGN KEY**
<br>
`CONSTRAINT FK_department FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL`

 - IT CAN'T BE NULL
- again id is autoincremented, title, salary, and department_id
- the *employee* table has five keys: id, first_name, last_name, role_id and manager_id. just like departmnet employee.role_id = role.id so a similar foriegn key is created here:
`CONSTRAINT FK_role FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
  - which calls on the role table and the id key, and the role_id is established as a FK. IT CAN'T BE NULL
- I also created the manager_id as a foreign key even though it is within the same table. employee.manager_id = manager.id. The code is:
`CONSTRAINT FK_employee FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL'
  - So we call the employee table and call the id on that table. *manager* is our new variable or 'pseudo' table. And an employee's id is ALSO their manager.id(employee.manager_id) if ther are a manager.
- Again, id is autoincremented, first_name, last_name, which are both NOT NULL, and FKs role_id and department_id 
- Finally, to connect the tables to **MySQL** workbench before the tables but after my first two lines of code (DROP and CREATE) i have:
`USE emp_trackerDB;`
- And this line tells  **MySQL** to use the emp_trackerBD to create my tables. 
- I have to do them in order: First *department*, then *role* and then *employee* because they have keys that are dependent on each other.
<brb>
4. The **seeds.sql** table for inserting values and creating key value pairs in my tables
 - This file contained the values for *department*, *role* and *employee* for a starting place to help see how my functions and queries run.
 - Again, we need to have the *department* first because *role* is depedent on *department*, *role* next and then *employee* last because it is dependent on *role*
 - the id doesn't have to be entered because it is automatically generated, but I put notes next to all of my new values in each table so i know what ID they will be.
 - I created 4 departments, 8 roles and 11 employees and gave them all the other values that I needed to have.
 - Also the managers had to be added before the other other employees, so I could give the other employees ids for their managers.
5. To add them we use INSERT which designates the table you want to use and the key's. Then you have VALUE which are the values you want for each individual object. Here is an example for an employee:
`INSERT into employee (first_name, last_name, role_id, manager_id) VALUE("Ken", "Masters", 2, 1)`
- You can do mulitple objects they just need to be in their own set of paranthesis.
<brb>
6. Once my Employee Tracker files are connected to *MySQL* workbench and my database, then my tables and finally my seeds have been inserted I can test out my queries that I need to create to ADD, VIEW, replace roles and the bonus, DELETE, view employee by manager, etc.

</brb>

## 3. Creating viewAndManage() using inquirer and switch cases
    
- My main function that gives the user the option to choose from all of the functions that will add and view employes, roles and departments and all my other functions is called *viewAndManage*
- I first call it in my connection.connect which will through an error if one is encountered during the connection to **MySQL** or if no error is found than *viewAndManage* is called.

1. The first part of my function is using inquirer prompt to provide a single question: 'What would you like to do?" and from there are all the choices that are given in key value pairs.
`inquirer.prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { name: "View All Employees",
          value: "VIEW_EMPLOYEES"}`

2. Next is *then* that deals with the answers and the answer is run through a long set of *switch cases* 
- *switch (answers.action)* is what moves us through the function call
- Each question is its own *case*, and it calls on a specific function and then is followed by a *break;*. 
- The value from the choice list is what is plugged into *case*. 
- There is a case that ends the node js connection *connection.end()* when the case "QUIT" is called. - Also a default that will console log 'invalid action' if the answer.action is not something from the list.

## 4. Creating the VIEW connection queries in JS and MySQL
1. I focused first on my *View* functions because I just needed to display a table with *console.table*
2. A query holds the code that is used in **MySQL** to call certain functions from the values within the tables stored there.
- To create the table I use the 'SELECT* function because I want to select specific values from specific tables.
- The most basic is 'view all departments' and 'view all roles' because I do not need to connect tables with primary keys. My SELECT is as follows:
`SELECT role.title AS "Role Titles" FROM role ORDER BY role.id`
   - I only want the titles, so i select 'role.title' and call it "Role Titles" which is the header for that column in the table. 
   - Then I state FROM which is the *role* table and I want them in ORDER BY role.id
   - *department* is very similar, i just want department.name and call the *department* table.
- To get all employees I need to create JOINs and this is when I use the foreign keys.
  - to JOIN department to roles here is my code:
  `LEFT JOIN department ON role.department_id = department.id`
  - which is basically saying connect these two tables on the value they share (department.id the FK)
  - to get the manager for each employee a LEFT JOIN is needed to, and the variable 'manger' is created again:
  `LEFT JOIN employee manager ON manager.id = employee_id`
  - So again this pseudo manager table is created using the employee_id to create another set of ids for managers, using the same numbers. If an employee is also a manager, their personal manager.id is the same as their personal employee.id
  - I used LEFT on all of the JOINS because _____
3. With VIEW, The JS function is straight forward once the query is established.
- I set my query equal to a const called 'query' and then I call it in my connection function:
`connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    viewAndManage();
  });`

- the connection takes the 'query' and then calls with 'err' or 'result'. If the connection encounters an error, it will throw an error. Otherwise, it will console.table the results from the query and then it will call the function *viewAndManager()* and take the user back to the main function prompt.
- All of the other functions have this basic part to the function:
  `connection.query(query, (err, result) => {
    if (err) throw err;
  });`
  - It establishes you are calling for a connection to **MySQL** using a 'query' and you want the 'result'. If you can't get that result, through an error.
  -Instead of setting a const query = to your **MySQL** query, you can also just insert the **MySQL** code directly inot the connection.query funtion where 'query' is located in the paranthesis.

## 5. ADD an employee, role or department with JS and MySQL

1. To add to the *employee*, *role*, and *department* requires more code than just calling the query and displaying the result. It is easiest with *department* so I will show that first.
- I need to use inquirer to ask the user "What is the new department name?" and The type this time is input.
- in *then* whatever was input is the 'answer' and that needs to be SET into departments with connection.query.
`INSERT into department SET?`
- We know the 'answer' needs to be inserted into departments, but MySQL wants to know where it will be SET. So we use a key value pair object to show this:
`{name: answer.name}`
  - The first 'name' is the key from the deparment table, so we've established where the answer will go.
  - The "answer.name" is the answer from the prompt questions named 'name'. This is the what that is going to be the value in our key value pair.
  - Again the error is called, and if nothing is thrown, we console.log "Department added successfully" to allow the user to know its be added.
2. When adding to *role* or *employee* I have to call the LEFT JOINS again, so when you create a role the user can choose the correct department id it will be placed in and for employee the correct role and manager ids will be generated.
- For employee, I created two connection queries:
    1. calls to select from all (*) from role. This way I can display all roles and their ids as a list choice for the user.
    2. calls all from employee, so a total list of employees with their IDs are shown in a list to the user.
- The connection queries use for loops, using 'map' and 'forEach' to get all of the information needed from the specific table, and set these arrays equal to a const (roleChoices and managerArr)
  - In the map I make the id and role.title an object.
  - in the forEach I pushed the id, first_name and last_name as a single string into the array.
- In the inquirer.prompt I ask 4 questions:
    1. Employees first name which is an input.
    2. Employees last name which is an input.
    3. Ask what the employee role is, which is a list with choices from the const *roleChoices*
    4. Ask who the employee's manager is, which is a list with choices from the const *managerArr*
- In 'then' I need to place all 4 of those answers into the employee table. 
  - First, I need to create a new const *managerId* which is created when the answer for the question 'manager' is split, so the id, first name and last name are all their own strings in the array. 
  - Then i call my third connection.query `INSERT into employee SET?` and I create an array with my keys - "first_name: answer.first", "last_name: answer.last", "role_id: answer.role", and "manager_id: managerId[0]"
    - managerId is on the 0 part of the array because that is the location of the id
- Next our error is called, if its not thrown, a console.log will say "Employee added successfully" and then **viewAndManage** is called.
-**addRole** is very similar to **addEmployee** its just not as complicated, it only has to connection.query department before the prompt section to get department names and ids.

## 6. UPDATE an employee's role with node js and MySQL
- Updating an employee's role is very similar to adding an employee in many ways. 
1. I call the same two connection queries, `SELECT * FROM employee` and `SELECT * FROM ROLE`.
 - For these I used the *forEach* loop to create *roleArr* and *employeeArr* and push each role.id and role.title as a single string, and did the same for with the *employee* first, last names and id.
2. The inquirer.prompt has two questions that they are both lists:
  - Which employee would you like to update? and the choices are from the *employeeArr* array
  - What is the new role? and the choices are from the *roleArr* array.
3. In my *then* again I created a const to hold the answer that is split into mulitple strings: *employeeId* and *roleId*
4. My connection query called to UPDATE employee (since it already has a role, we just want to change it) and its wants to know what to SET? and WHERE?
  - On *employee.id* that equals *employeeId[0]*, I want to change their *employee.role_id* from the current integer to *roleId[0]*
5. Next our error is called, if its not thrown, a console.log will say "Employee Role successfully updated" and then **viewAndManage** is called.

## 7. Bonus Functions
1. Employees by Deparment:
  - The function is setup the same way at the start as addRole. 
    - A connection query calls for all departments, they are put into a list array with map and that map is then put into the inquirer prompt.
  - When the user choose which department they want to view it is put directly into the connection query as a variable: `SELECT department.name AS "Deparment", CONCAT(employee.first_name, " ", employee.last_name) AS "Employee Name" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${answer.department}`
    - I have the department name in one column and then the employee first and last names are concated so its one columns 
    - I do left JOINs from employee to role with FK, role to department with FKs 
    - Most importantly  then I say I want all the SELECT variables from WHERE deparment.id = answer.deparment which is the department the user chose.
 <br>
 2. Employee by Manager
 - Again the function is like addRole but I'm looking at the connection query for `SELECT * FROM employee*
 - I use forEach this time to create a managerArr that is and array made up of single strings that contain the employees id + first name + last name
 - The user than chooses from the list of employees, at first i had it as just the existing managers, but that can always change.
 - in the *then* section i split the answer so it is 3 strings instead of one and it is const *managerId* and *managerId[0]* is placed into my query:
  `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS "${managerId[1]} ${managerId[2]}'s Employees" FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ${managerId[0]}`
   - For the title of the table I wanted the manager choosen's name to be at the top thats why it is in the AS section
   - LEFT JOIN employee on manager
   - the variables are SELECTed WHERE employee.manager.id = managerId[0]
  
  3. Remove Employee
  - This function starts out like *employeeByManager()* calling a connection query to SELECT all from employee which is made into an employee array *employeeArr* the same was as *managerArr* which is placed in the choices key of a list of employees.
  - In the *then* section of inquirer i split the answer like all of the other functions and call on employeeId[0] in my const query:
  `DELETE FROM employee WHERE employee.id = ${employeeId[0]}`
    - the DELETE for **MySQL** is very straightforward. I want to delete FROM employee where employee.id equals employeeId[0].
  
  4. Remove Role and Remove Department
  - They are done just like *removeEmployee* except the connection.queries are specific to those tables:
  - Queries before inquirer.prompt: `SELECT * FROM role` and `SELECT * FROM deparment`
  - Queries in Inquirer.then: `DELETE FROM role WHERE role.id = ${roleId[0]}` and `DELETE FROM department WHERE role.id = ${departmentId[0]}`
  
  
 
  

## 8. LICENSE
Licensed under the [MIT License](https://choosealicense.com/licenses/mit/#).
