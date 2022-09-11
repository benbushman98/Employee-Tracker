const mysql = require('mysql2');
const inquirer = require('inquirer')
require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'EgN0X4cX2eWt[9?tun.V',
    database: 'company_db'
  },
  mainMenu()
);

function mainMenu() {
  const questions = [
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        { name: "View All Employees", value: "Action1" },
        { name: "Add Employee", value: "Action2" },
        { name: "Update Employee Role", value: "Action3" },
        { name: "View All Roles", value: "Action4" },
        { name: "Add Role", value: "Action5" },
        { name: "View All Departments", value: "Action6" },
        { name: "Add Department", value: "Action7" },
        { name: "Quit", value: "Action8" },

      ]
    }
  ];
  inquirer
    .prompt(questions)
    .then(answers => {
      if (answers.action === 'Action1') {
        db.query('SELECT id, first_name, last_name, role_id, manager_id FROM employee', function (err, results) {
          console.table(results);
          mainMenu();
        });
      } else if (answers.action === 'Action2') {
        db.query("SELECT * FROM role", (err, results) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'firstName',
              },
              {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'lastName',
              },
              {
                type: 'list',
                message: 'What is the role of the employee?',
                name: 'roleID',
                choices: () => {
                  let roleDatabaseArray = [];
                  for (const role of results) {
                    roleDatabaseArray.push(role.id);
                  }
                  return roleDatabaseArray;
                }
              },
              {
                type: 'list',
                message: 'Manager ID for this employee?',
                name: 'managerID',
                choices: ["1", "3", "5", "7"]
              },
            ])
            .then((data) => {
              db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [data.firstName, data.lastName, data.roleID, data.managerID]);
              console.log("Employee Added Successfully")
              mainMenu();
            })
        })
      } else if (answers.action === 'Action3') {
        db.query("SELECT * FROM employee", (err, results) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: 'list',
                message: 'Which employee do you want to update?',
                name: 'updateEmployee',
                choices: () => {

                  let employeeArray = [];
                  for (const employeeName of results) {
                    employeeArray.push(employeeName.first_name);
                  }
                  return employeeArray;
                }
              },
              {
                type: 'list',
                message: 'Which role do you want to change to?',
                name: 'updateEmployeeRole',
                choices: () => {
                  let updateEmployeeRoleArray = [];
                  for (const employeeRole of results) {
                    updateEmployeeRoleArray.push(employeeRole.role_id);
                  }
                  return updateEmployeeRoleArray;
                }
              }
            ]).then((data) => {
              db.query("UPDATE employee SET ? WHERE first_name = ?",
                [
                  {
                    role_id: data.updateEmployeeRole
                  }, data.updateEmployee
                ],
                console.log("Role Updated Successfully"),
                mainMenu()
              )
            })
        })

      } else if (answers.action === 'Action4') {
        db.query('SELECT * FROM role', function (err, results) {
          console.table(results);
          mainMenu();
        });
      } else if (answers.action === 'Action5') {
        db.query("SELECT * FROM department", (err, results) => {
          if (err) throw err;
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'addName',
              },
              {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'addSalary',
              },
              {
                type: "list",
                message: "What is the department this role belongs to?",
                name: 'addDepartment_id',
                choices: () => {
                  let departmentsDatabaseArray = [];
                  for (const department of results) {
                    departmentsDatabaseArray.push(department.id);
                  }
                  return departmentsDatabaseArray;

                }
              }
            ])
            .then((data) => {
              db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [data.addName, data.addSalary, data.addDepartment_id]);
              console.log("Role Added Successfully")
              mainMenu();
            })
        })
      } else if (answers.action === 'Action6') {
        db.query('SELECT * FROM department', function (err, results) {
          console.table(results);
          mainMenu();
        });
      } else if (answers.action === 'Action7') {
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'What is the name of the department?',
              name: 'addName',
            }])
          .then((data) => {
            db.query('INSERT INTO department (name) VALUES  (?)', data.addName, (err => {
              if (err) {
                console.err(err);
              }
            })
            )
            console.log('Department Added Successfully')
            mainMenu();
          })
      } else if (answers.action === 'Action8') {
        process.exit();
      }
    })
};