const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
// const Classes = require('./classes')


const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,

  user: 'root',

  password: 'password',
  database: 'emp_trackerDB',

  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  viewAndManage();
});



// const testFunction = () => {
//   const query = `SELECT * FROM employee WHERE employee.id = 1`
//   connection.query(query, (err, result) => {
//     if (err) throw err;
//     console.table("Will i get CHUN? ", result)
//   })
// }

// testFunction()

const viewAndManage = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?', 
    choices: [
      {
        name: "View All Employees", //MUST HAVE
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
        name: "Add Employee", //MUST HAVE
        value: "ADD_EMPLOYEE"
      },
      {
        name: "Remove Employee",
        value: "REMOVE_EMPLOYEE"
      },
      {
        name: "Update Employee Role", //MUST HAVE
        value: "UPDATE_EMPLOYEE_ROLE"
      },
      
      {
        name: "Update Employee Manager",
        value: "UPDATE_EMPLOYEE_MANAGER"
      },
      {
        name: "View All Roles", //MUST HAVE
        value: "VIEW_ROLES"
      },
      {
        name: "Add Role", //MUST HAVE
        value: "ADD_ROLE"
      },
      {
        name: "Remove Role",
        value: "REMOVE_ROLE"
      },
      {
        name: "View All Departments", //MUST HAVE
        value: "VIEW_DEPARTMENTS"
      },
      {
        name: "Add Department", //MUST HAVE
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
      
      case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
        employeesByDept();
        break;

      case 'VIEW_EMPLOYEES_BY_MANAGER':
        employeesByManager();
        break;

      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
    
      case 'REMOVE_EMPLOYEE':
        removeEmployee();
        break;

      case 'UPDATE_EMPLOYEE_ROLE':
        updateEmployeeRole();
        break;
        
      case 'UPDATE_EMPLOYEE_MANAGER':
        updateEmployeeManager();
        break;
        
      case 'VIEW_ROLES':
        viewRoles();
        break;

      case 'ADD_ROLES':
        addRole();
        break;

      case 'REMOVE_ROLES':
        removeRole();
        break;

      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;

      case 'ADD_DEPARTMENT':
        addDepartment();
        break;

      case 'REMOVE_DEPARTMENT':
        removeDepartment();
        break;

      case 'QUIT':
        connection.end();
        break;

      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
      
    }
  })
};

const employeesSearch = () => {
  const query = `SELECT employee.id AS "id", employee.first_name AS "first name", employee.last_name AS "last name", role.title AS "title", department.name AS "department", role.salary AS "salary", CONCAT(manager.first_name, " ", manager.last_name) AS "manager" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY id`
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result)
    return viewAndManage();
  });
}

// BONUS
const employeesByDept = (departments) => {
  // const query = `SELECT DISTINCT department.name FROM department ORDER BY department.id`
  // connection.query(query, (err, result) => {
  //   if (err) throw err;
  //   let departmentList = []
  //   for (let i = 0; i < result.length; i++) {
  //     departmentList.push(result[i].department)
  //     console.table(departmentList)
  //   }
  // inquirer.prompt({
  //   type: 'list',
  //   name: 'departments',
  //   choices: departmentList,
    // choices() {
    //   const choiceArr = [];
    //   const query = `SELECT department.name FROM department ORDER BY department.id`
    //   connection.query(query, (err, result) => {
    //     if (err) throw err;
    //     result.map((department) => {
    //       choiceArr.push(department)
    //       console.log("Am i getting a department list??? ", (choiceArr))

    //     })
    //   });
    //   return choiceArr;
    //   },
  //     message: "Which department do you want",
  // })
  // .then((answer) => {
  //   const query = `SELECT employee.first_name AS "First Name", employee.last_name AS "Last Name", department.name AS "Deparment" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.name = ${answer.departments}`
  //   connection.query(query, (err, result) => {
  //     if (err) throw err;
  //     console.table(result)
  //     return viewAndManage();
  //   });
  // })
  // connection.query('SELECT first_name AS Name, last_name, role_id FROM employees LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?', department.id (err, result) => {
  //   if (err) throw err;
// })
};

// BONUS
const employeesByManager = () => {
const query = `SELECT DISTINCT CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id`
connection.query(query, (err, result) => {
  if (err) throw err;
  let managerArr = [];
  for (let i = 0; i < result.length; i++) {
    managerArr.push(result[i])
    console.table (managerArr)
  }
  inquirer.prompt({
    type: 'list',
    name: 'managerList',
    message: 'Please Choose a Manager',
    choices: managerArr,
  }).then(answer => {
    const query = `SELECT concat(employee.first_name, " ", employee.last_name) AS "${answer.managerList}'s Employees" FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ${answer.managerList}.id`
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.table(result)
      return viewAndManage();
    });
  })
})
}

// MUST HAVAE
const addEmployee = () => { 
  connection.query(`SELECT * FROM role, employee`, (err, result) => {
    if (err) throw err;
    });
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
    choices() {
        let roleArr = [];
        result.forEach(({id, title,}) => {
          roleArr.push(`${id} ${title}`);
        });
        return roleArr;
    },
    message: "What is the employee's role?"
  },
  {
    name: "manager",
    type: "list",
    choices() {
      const query = 'SELECT CONCAT(manager.first_name, " ", manager.last_name) FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id'
      connection.query(query, (err, result) => {
        if (err) throw err;
        let managerArr = [];
        result.forEach(({first_name, last_name}) => {
          managerArr.push(`${first_name} ${last_name}`);
        })
      })
      return managerArr;
    },
     message: "Who is the employee's manager?"
  }
]) 
// end of prompt section
.then((answer) => {
  connection.query(`INSERT into employee (first_name, last_name, role_id, manager_id) VALUE (first_name: ${answer.name}, last_name: ${anser.last}, role_id: SELECT role.id from role WHERE role.title = ${answer.role}, SELECT employee.id from employee WHERE concat(employee.first_name, " ", employee.last_name) = ${answer.manager})`, (err, result) => {
    if (err) throw err;
    console.log(result)
    return viewAndManage();
  })

 
})
 //end of first then statement
}; 
// end of the function



const removeEmployee = () => {

}

const updateEmployeeRole  = () => {

}

const updateEmployeeManager  = () => {

}

const viewRoles  = () => {
  const query = `SELECT role.title AS "role title" FROM role ORDER BY role.id`
  connection.query(query, (err, result) => {
    if (err) throw err;
    // const roles = Classes.getRoles()
    // console.table(JSON.stringify(roles))
    console.table(result);
    return viewAndManage();
  });
}

const addRole  = () => {

}

const removeRole  = () => {

}

const viewDepartments = () => {
  const query = `SELECT department.name AS "department" FROM department ORDER BY department.id`
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result)
    return viewAndManage();
  });
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