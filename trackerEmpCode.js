const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'password',
  database: 'emp_trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
  viewAndManage();
});

const viewAndManage = () => {
  inquirer.prompt({
    name: 'action',
    type: 'list',
    message: '', 
    choices: [
      {
        name: "View All Employees",
        value: "VIEW_EMPLOYEES"
      },
      {
        name: "View All Employees By Department",
        value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
      },
      {
        name: "View All Employees By Manager",
        value: "VIEW_EMPLOYEES_BY_MANAGER"
      },
      {
        name: "Add Employee",
        value: "ADD_EMPLOYEE"
      },
      {
        name: "Remove Employee",
        value: "REMOVE_EMPLOYEE"
      },
      {
        name: "Update Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
      },
      {
        name: "Update Employee Manager",
        value: "UPDATE_EMPLOYEE_MANAGER"
      },
      {
        name: "View All Roles",
        value: "VIEW_ROLES"
      },
      {
        name: "Add Role",
        value: "ADD_ROLE"
      },
      {
        name: "Remove Role",
        value: "REMOVE_ROLE"
      },
      {
        name: "View All Departments",
        value: "VIEW_DEPARTMENTS"
      },
      {
        name: "Add Department",
        value: "ADD_DEPARTMENT"
      },
      {
        name: "Remove Department",
        value: "REMOVE_DEPARTMENT"
      },
      {
        name: "Quit",
        value: "QUIT"
      }
    ],
  })
  .then((answers) => {
    switch (answers.action) {
      case 'View All Employees':
        employeesSearch();
        break;
      
      case 'View All Employees By Department':
        employeesByDept();
        break;

      case 'View All Employees By Manager':
        employeesByManager();
        break;

      case 'Add Employee':
        addEmployee();
        break;
    
      case 'Remove Employee':
        removeEmployee();
        break;

      case 'View All Departments':
        viewDepartments();
        break;

      case 'Add Department':
        addDepartment();
        break;

      case 'Remove Department':
        removeDepartment();
        break;

      case 'Quit':
        connection.end();
        break;

      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
      
    }
  })
}

const employeesSearch = () => {

}

const employeesByDept = () => {

}

const employeesByManager = () => {

}

const addEmployee = () => {

}

const removeEmployee = () => {

}

const viewDepartments = () => {

}

const addDepartment = () => {

}

const removeDepartment = () => {

}

// PROMPT SHOULD ALLOW USER TO DO AT LEAST:
// 1 - ADD departments ROLES and EMPLOYEES
// 2 - VIEW departments ROLES and EMPLOYEES
// 3 - UPDATE employee ROLES 



// BONUS
// UPDATE employee MANAGERS 
// VIEW employees by MANAGER
// DELETE departments, roles, and employees
// VIEW the total utililized budget of department (combined salaries of all employee in department)