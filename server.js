const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
// const Classes = require('./classes')

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "emp_trackerDB",

  // multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  viewAndManage();
});

const viewAndManage = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees", //DONE - MUST HAVE
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Employees By Department", // DONE - BONUS
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View All Employees By Manager", // DONE - BONUS
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee", //DONE- MUST HAVE
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee", // DONE - BONUS
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role", //MUST HAVE
          value: "UPDATE_EMPLOYEE_ROLE",
        },

        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View All Roles", //DONE - MUST HAVE
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role", //DONE - MUST HAVE
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role", //DONE - BONUS
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments", //DONE - MUST HAVE
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department", //DONE - MUST HAVE
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department", //DONE - BONUS
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    })
    .then((answers) => {
      switch (answers.action) {
        case "VIEW_EMPLOYEES":
          viewAllEmployees();
          break;

        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
          employeesByDept();
          break;

        case "VIEW_EMPLOYEES_BY_MANAGER":
          employeesByManager();
          break;

        case "ADD_EMPLOYEE":
          addEmployee();
          break;

        case "REMOVE_EMPLOYEE":
          removeEmployee();
          break;

        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;

        case "UPDATE_EMPLOYEE_MANAGER":
          updateEmployeeManager();
          break;

        case "VIEW_ROLES":
          viewRoles();
          break;

        case "ADD_ROLE":
          addRole();
          break;

        case "REMOVE_ROLE":
          removeRole();
          break;

        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;

        case "ADD_DEPARTMENT":
          addDepartment();
          break;

        case "REMOVE_DEPARTMENT":
          removeDepartment();
          break;

        case "QUIT":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answers.action}`);
          break;
      }
    });
};

// DONE MUST HAVE
const viewAllEmployees = () => {
  const query = `SELECT employee.id AS "id", employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title AS "Title", department.name AS "Department", role.salary AS "Salary", CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY id`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    return viewAndManage();
  });
};

// DONE BONUS 
const employeesByDept = () => {
  connection.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    const departmentChoices = result.map(function (department) {
      return {
        value: department.id,
        name: department.name,
      };
    });
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          choices: departmentChoices,
          message: "Which department would you like view?",
        },
      ])
      .then((answer) => {
        connection.query(
          `SELECT department.name AS "Deparment", CONCAT(employee.first_name, " ", employee.last_name) AS "Employee Name" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${answer.department}`,
          // [
          //   {
          //     name: answer.department,
          //   },
          // ],
          (err, result) => {
            if (err) throw err;
            console.log(" ");
            console.table(result);
            viewAndManage();
          }
        );
      }); //end of first then statement
  }); // End of department connection query
};

// DONE - BONUS
const employeesByManager = () => {
  // const query = `SELECT DISTINCT CONCAT(manager.first_name, " ", manager.last_name) AS "Manager" FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id`;
  connection.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    const managerArr = [];
    result.forEach(({ first_name, last_name, id }) => {
      managerArr.push(id + " " + first_name + " " + last_name);
    });
    inquirer
      .prompt({
        type: "list",
        name: "managerList",
        message: "Please Choose a Manager",
        choices: managerArr,
      })
      .then((answer) => {
        let managerId = answer.managerList.split(" ");
        connection.query(
          `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS "${managerId[1]} ${managerId[2]}'s Employees" FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE employee.manager_id = ${managerId[0]}`,
          (err, result) => {
            if (err) throw err;
            console.table(result);
            return viewAndManage();
          }
        );
      });
  }); // End of first connection.query SELECT * FROM employee
}; //End of employeesByManager()

// DONE MUST HAVE
const addEmployee = () => {
  connection.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    const roleChoices = result.map(function (role) {
      return {
        value: role.id,
        name: role.title,
      };
    });
    connection.query(`SELECT * FROM employee`, (err, result) => {
      if (err) throw err;
      const managerArr = [];
      result.forEach(({ first_name, last_name, id }) => {
        managerArr.push(id + " " + first_name + " " + last_name);
        // console.log(managerArr);
      });
      inquirer
        .prompt([
          {
            name: "first",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "last",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            choices: roleChoices,
            message: "What is the employee's role?",
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managerArr,
          },
        ])
        // end of prompt section
        .then((answer) => {
          let managerId = answer.manager.split(" ");
          connection.query(
            `INSERT into employee SET?`,
            [
              {
                first_name: answer.first,
                last_name: answer.last,
                role_id: answer.role,
                manager_id: managerId[0],
              },
            ],
            (err) => {
              if (err) throw err;
            }
          );
          //   }
          // });
          console.log("Employee added successfully");

          viewAndManage();
        });
      //end of first then statement
    });
    //end of second connection.query with employee
  });
  //end of first connection.query with role
}; // end of the function

// DONE - BONUS
const removeEmployee = () => {
  connection.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    const employeeArr = [];
    result.forEach(({ first_name, last_name, id }) => {
      employeeArr.push(id + " " + first_name + " " + last_name);
      // console.log(managerArr);
    });
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee would you like to delete?",
          choices: employeeArr,
        },
      ])
      // end of prompt section
      .then((answer) => {
        let employeeId = answer.employee.split(" ");
        connection.query(
          `DELETE FROM employee WHERE employee.id = ${employeeId[0]}`,
          (err) => {
            if (err) throw err;
          }
        );
        //   }
        // });
        console.log("Employee successfully deleted");

        viewAndManage();
      }); //end of first then statement
  }); //end of second connection.query with employee
}; //end of removeEmployee()

// DONE MUST HAVE
const updateEmployeeRole = () => {
  connection.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    const roleArr = [];
    result.forEach(({ title, id }) => {
      roleArr.push(id + " " + title);
      // console.log(roleArr);
    });
    connection.query(`SELECT * FROM employee`, (err, result) => {
      if (err) throw err;
      const employeeArr = [];
      result.forEach(({ first_name, last_name, id }) => {
        employeeArr.push(id + " " + first_name + " " + last_name);
        // console.log(employeeArr);
      });
      inquirer
        .prompt([
          {
            name: "employees",
            type: "list",
            choices: employeeArr,
            message: "Which Employee would you like to update?",
          },
          {
            name: "roles",
            type: "list",
            choices: roleArr,
            message: "What is their new role?",
          },
        ])
        .then((answer) => {
          // console.log('answer.role: ', answer.role)
          let employeeId = answer.employees.split(" ");
          // console.log(employeeId[0]);
          // result.forEach(({ id }) => {
            // if (id == employeeId[0]) {
            // }

            let roleId = answer.roles.split(" ");

            // result.forEach(({ id }) => {
              // if (id == roleId[0]) {
              // }

              // const query = `SELECT DISTINCT department.id FROM department WHERE department.name = ${answer.department}`
              connection.query(
                `UPDATE employee SET? WHERE?`,
                [
                  {
                    role_id: roleId[0],
                  },
                  {
                    id: employeeId[0],
                  },
                ],

                (err) => {
                  if (err) throw err;
                }
              );
            // }); //second forEach end
          // }); //first forEach end
          console.log("Employee Role successfully updated");
          viewAndManage();
        });
    });
    // });
  });
  // connection.query(`SELECT * FROM employee`, (err, result) => {
  //   if (err) throw err;

  // })
};


const updateEmployeeManager = () => {};

// DONE - MUST HAVE
const viewRoles = () => {
  const query = `SELECT role.title AS "Role Titles" FROM role ORDER BY role.id`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    return viewAndManage();
  });
};

// DONE MUST HAVE
const addRole = () => {
  connection.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    const departmentChoices = result.map(function (department) {
      return {
        value: department.id,
        name: department.name,
      };
    });
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the role title?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary?",
        },
        {
          name: "department",
          type: "list",
          choices: departmentChoices,
          message: "Which department is this new role in?",
        },
      ])
      // end of prompt section
      .then((answer) => {
        // const query = `SELECT DISTINCT department.id FROM department WHERE department.name = ${answer.department}`
        connection.query(
          `INSERT into role SET?`,
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department,
          },
          (err) => {
            if (err) throw err;
            console.log("Role added successfully");

            return viewAndManage();
          }
        );
      });
  });
};

// DONE - BONUS
const removeRole = () => {
  connection.query(`SELECT * FROM role`, (err, result) => {
    if (err) throw err;
    const roleArr = [];
    result.forEach(({ title, id }) => {
      roleArr.push(id + " " + title );
    });
    inquirer
      .prompt([
        {
          name: "role",
          type: "list",
          message: "Which role would you like to remove?",
          choices: roleArr,
        },
      ]) // end of prompt section
      .then((answer) => {
        let roleId = answer.role.split(" ");
        connection.query(
          `DELETE FROM role WHERE role.id = ${roleId[0]}`,
          (err) => {
            if (err) throw err;
          }
        );

        console.log("Role successfully deleted");

        viewAndManage();
      }); //end of first then statement
  }); //end of second connection.query with role
};

// DONE MUST HAVE
const viewDepartments = () => {
  const query = `SELECT department.name AS "Departments" FROM department ORDER BY department.id`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    console.table(result);
    return viewAndManage();
  });
};

// DONE MUST HAVE
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the new department name?",
      },
    ])
    // end of prompt section
    .then((answer) => {
      // const query = `SELECT DISTINCT department.id FROM department WHERE department.name = ${answer.department}`
      connection.query(
        `INSERT into department SET?`,
        {
          name: answer.name,
        },
        (err) => {
          if (err) throw err;
          console.log("Department added successfully");

          return viewAndManage();
        }
      );
    });
};

// DONE BONUS
const removeDepartment = () => {
  connection.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    const departmentArr = [];
    result.forEach(({ name, id }) => {
      departmentArr.push(id + " " + name );
    });
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          message: "Which department would you like to remove?",
          choices: departmentArr,
        },
      ]) // end of prompt section
      .then((answer) => {
        let departmentId = answer.department.split(" ");
        connection.query(
          `DELETE FROM department WHERE department.id = ${departmentId[0]}`,
          (err) => {
            if (err) throw err;
          }
        );

        console.log("Department successfully deleted");

        viewAndManage();
      }); //end of first then statement
  }); //end of second connection.query with employee
};

// PROMPT SHOULD ALLOW USER TO DO AT LEAST:
// 1 - ADD departments ROLES and EMPLOYEES
// 2 - VIEW departments ROLES and EMPLOYEES
// 3 - UPDATE employee ROLES

// BONUS
// UPDATE employee MANAGERS
// VIEW employees by MANAGER
// DELETE departments, roles, and employees
// VIEW the total utililized budget of department (combined salaries of all employee in department)
