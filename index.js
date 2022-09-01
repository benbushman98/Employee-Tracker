const mysql = require('mysql2');
const inquirer = require('inquirer')


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
        
      } else if (answers.action === 'Action2') {
        console.log('View All Roles')
        mainMenu();
      } else if (answers.action === 'Action3') {
        console.log('View All Employees')
        mainMenu();
      } else if (answers.action === 'Action4') {
        console.log('Add a Department')
        mainMenu();
      } else if (answers.action === 'Action5') {
        console.log('Add a Role')
        mainMenu();
      } else if (answers.action === 'Action6') {
        db.query('SELECT * FROM department', function (err, results) {
          console.log(results);
          mainMenu();
        });
      } else if (answers.action === 'Action7') {
        console.log('Update an Employee Role')
        mainMenu();
      }
    })
};