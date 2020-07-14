const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });

  init();

  function init(){
      inquirer.prompt({
          type: "list",
          message: "What would you like to do?",
          choices: ["View all employees", "View all employees by department", "View all employees by Manager", "Add Employee", "Remove Employee", "Update Employee Manager"],
          name: "userChoice"
      }).then(function(answers){
          console.log(answers.userChoice);
      })
  }