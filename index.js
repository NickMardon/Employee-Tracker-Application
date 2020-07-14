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
          if(answers.userChoice==="View all employees"){
              // Make a get request to return all employees

          }
          if(answers.userChoice==="View all employees by department"){
              // Make a get request to return employees based on department id
              viewEmployees();
          }
          if(answers.userChoice==="View all employees by Manager"){
              // Make a get request to return employees based on manager id
          }
          if(answers.userChoice==="Add Employee"){
              // Ask user for first name, last name, role id, and manager id
              // Make a post request that adds an employee to the employee table
          }
          if(answers.userChoice==="Remove Employee"){
              // Provide user with list of employees
              // Remove choosen employee
          }
          if(answers.userChoice==="Update Employee Manager"){
              // Provide user with list of employees
              // Provide user with list of mangers
              // Change selected employees manager id based on choosen manager
          }

      })
  }

    function viewEmployees(){
        
    }