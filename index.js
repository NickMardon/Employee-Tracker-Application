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
          choices: ["View all employees", "View all departments", "View all Managers", "Add Employee", "Add a Department", "Add a Manager", "Update Employee Role", "Quit"],
          name: "userChoice"
      }).then(function(answers){
          console.log(answers.userChoice);
          if(answers.userChoice==="View all employees"){
              // Make a get request to return all employees
              viewEmployees();

          }
          if(answers.userChoice==="View all departments"){
              // Make a get request to return employees based on department id
              viewDepartments();
          }
          if(answers.userChoice==="View all Managers"){
              // Make a get request to return employees based on manager id
              viewManagers()
          }
          if(answers.userChoice==="Add Employee"){
              // Ask user for first name, last name, role id, and manager id
              // Make a post request that adds an employee to the employee table
              addEmployee();
          }
          if(answers.userChoice==="Add a Department"){
              // Provide user with list of employees
              // Remove choosen employee
              addDepartment();
          }
          if(answers.userChoice==="Add a Manager"){
              // Provide user with list of employees
              // Provide user with list of mangers
              // Change selected employees manager id based on choosen manager
              addManager();
          }
          if(answers.userChoice==="Update Employee Role"){
            // update employee role with put request
            updateEmployeeRole();
        }
          if(answers.userChoice==="Quit"){
              // quit app
              
          }

      })
  }

    function viewEmployees(){

    }