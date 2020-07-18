const mysql = require('mysql');
const inquirer = require('inquirer');
const Employee = require('./constructors/employee');
const Role = require('./constructors/role');

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
          choices: ["View all employees", "View all departments", "View all Roles", "Add Employee", "Add a Department", "Add a Role", "Update Employee Role", "Quit"],
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
          if(answers.userChoice==="View all Roles"){
              // Make a get request to return employees based on manager id
              viewRoles()
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
          if(answers.userChoice==="Add a Role"){
              // Provide user with list of employees
              // Provide user with list of mangers
              // Change selected employees manager id based on choosen manager
              addRole();
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
        connection.query("SELECT * FROM employee",(err, data)=>{
            if (err) throw err;
            console.table(data);
            init()
        })
    }

    function viewDepartments(){
        connection.query("SELECT * FROM department",(err, data)=>{
            if (err) throw err;
            console.table(data);
            init();
        })
    }

    function viewRoles(){
        connection.query("SELECT * FROM role",(err, data)=>{
            if (err) throw err;
            console.table(data);
            init();
        })
    }

    function addEmployee(){
        inquirer.prompt([
                {
                    type: "input",
                    message: "What it the first name of the employee you would like to add?",
                    name: "firstName"
                },
                {
                    type: "input",
                    message: "What it the last name of the employee you would like to add?",
                    name: "lastName"
                },
                {
                    type: "input",
                    message: "What it the role of the employee you would like to add?",
                    name: "role"
                },
                {
                    type: "input",
                    message: "Who is the manager of the employee you would like to add?",
                    name: "manager"
                }
            ]).then(function(res){
                let firstName = res.firstName;
                let lastName = res.lastName;
                var role_id;
                var manager_id;
                let role = res.role;
                let manager = res.manager;
                convertNameId();
                function convertNameId(){
                    connection.query("SELECT id,title FROM role",(err, data)=>{
                        if (err) throw err;
                        for(let i = 0;i<data.length;i++){
                            if(role===data[i].title){
                                role_id = data[i].id;
                            }
                        }
                        connection.query("SELECT id,first_name FROM employee",(err, data)=>{
                            if (err) throw err;
                            for(let i = 0;i<data.length;i++){
                                if(manager===data[i].first_name){
                                    manager_id= data[i].id;
                                }
                            }
                            var newEmployee = new Employee(firstName,lastName,role_id,manager_id);
                            console.log(newEmployee);
                            connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)", [newEmployee.firstName,newEmployee.lastName,newEmployee.role_id,newEmployee.manager_id], function (err, data) {
                                if (err) throw err;
                                console.log(`added ${newEmployee.firstName} to employee database`);
                        })
                        })
                        init();
                    })
                }
            })
        }

    function addDepartment(){
            inquirer.prompt([
                    {
                        type: "input",
                        message: "What it the name of the department you would like to add?",
                        name: "name"
                    }
                ]).then(function(res){
                    // console.log(res.name)
                    connection.query("INSERT INTO department (name) VALUES(?)",[res.name],function(err,data){
                        if (err) throw err;
                        console.log(`added ${res.name} to department database`);
                    })
                    init();
                })
        }

    function addRole(){
        inquirer.prompt([
            {
                type: "input",
                message: "What it the title of the role you would like to add?",
                name: "title"
            },
            {
                type: "input",
                message: "What it the salary for this role?",
                name: "salary"
            },
            {
                type: "input",
                message: "What it the department of this role?",
                name: "department"
            }
        ]).then(function(res){
            let title = res.title;
            let salary = res.salary;
            let department = res.department;
            let department_id;
            convertDepartmentId();
            function convertDepartmentId(){
                connection.query("SELECT id,name FROM department",(err, data)=>{
                    if (err) throw err;
                    for(let i = 0;i<data.length;i++){
                        if(department===data[i].name){
                            department_id = data[i].id;
                        }
                    }
                    var newRole = new Role(title,salary,department_id);
                    console.log(newRole);
                    connection.query("INSERT INTO role (title,salary,department_id) VALUES(?,?,?)", [newRole.title,newRole.salary,newRole.department_id], function (err, data) {
                        if (err) throw err;
                        console.log(`added ${newRole.title} to role database`);
                })

            })
        }
    })
}   
    




  