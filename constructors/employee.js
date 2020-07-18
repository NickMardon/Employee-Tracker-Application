const mysql = require('mysql');

function Employee(firstName,lastName,role_id,manager_id){
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = role_id;
    this.manager_id = manager_id;
}
    module.exports = Employee;