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
    type: 'list',
    name: 'action',
    message: 'What would you like to do?', 
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
      // ON DELETE SET NULL for manager id the rest or ON DELETE CASACADE**
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
      case 'VIEW_EMPLOYEES':
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
  connection.query('SELECT * FROM employees LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager on manager.id = employee.manager_id', (err, result) => {
    if (err) throw err;
};


const employeesByDept = (departmentId) => {
  const viewDepartments(departments)
  inquirer.prompt({
    type: 'list',
    name: 'departments',
    message: "Which department do you want"
  })
  connection.query('SELECT first_name AS Name, last_name, role_id FROM employees LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?', department.id (err, result) => {
    if (err) throw err;
};

const employeesByManager = () => {

}

const addEmployee = () => {
  connection.query('SELECT * from m.employees', (err, result) => {
    if (err) throw err;
  
inquirer.prompt([
  {
    name: "first",
    type: "input",
    message: "What is the employee's first name?"

  },
  {
    name: "last",
    type: "input",
    message: "What is the employee's last name?"

  },
  {
    name: "role",
    type: "list",
    message: "What is the employee's role?",
    choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]

  },
  {
    name: "manager",
    type: "rawlist",
    message: "Who is the employee's manager?",
    choices() {
      const managerArray = [];
    }
  
  }
])
.then((answers) => {
  connection.query('INSERT INTO employee SET ?',
  {
    first_name: answer.first,
    last_name: answer.last,
    role_id: answer.role,
    manager_id: answer.manager || null,
  },
  (err) => {
    if (err) throw err;
    console.log('Your employee was successfully added');
    viewAndManage();
  }
  );
});
});
};

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