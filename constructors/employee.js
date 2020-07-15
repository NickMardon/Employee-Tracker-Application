const mysql = require('mysql');

function Employee(firstName,lastName,role_id,manager_id){
    this.firstName = firstName;
    this.lastName = lastName;
    this.role_id = role_id;
    this.manager_id = manager_id;
    // addToData(firstName,lastName,role_id,manager_id);
}

//  function addToData(firstName,lastName,role_id,manager_id){
//         connection.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)", [firstName,lastName,role_id,manager_id], function (err, data) {
//             if (err) throw err;
//             console.table(data);
//     })
//     }

    module.exports = Employee;