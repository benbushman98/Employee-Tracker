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
        inquirer
        .prompt([
          {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName',
          },
          {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName',
          },
          {
            type: 'input',
            message: "What is the employee's role?",
            name: 'empRole',
          },
          {
            type: 'input',
            message: "Who is the employee's manager?",
            name: 'empManager',
          },
        ])
        .then((data) => {
          db.query('INSERT INTO employee (first_name, last_name) VALUES (?, ?)', [data.firstName, data.lastName], (err => {
            if (err) {
              console.err(err);
            }
          })
          )
          console.log('Employee Added Successfully')
          mainMenu();
        })
      } else if (answers.action === 'Action3') {

      } else if (answers.action === 'Action4') {
        db.query('SELECT * FROM role', function (err, results) {
          console.table(results);
          mainMenu();
        });
      } else if (answers.action === 'Action5') {
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
              name: 'salary',
            },
            {
              type: 'input',
              message: 'What department does the role belong to?',
              name: 'relDep',
            }
          ])
          .then((data) => {
            db.query('INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)', [data.addName, data.relDep, data.salary], (err => {
              if (err) {
                console.err(err);
              }
            })
            )
            console.log('Role Added Successfully')
            mainMenu();
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