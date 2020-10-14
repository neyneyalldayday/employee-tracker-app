var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");
const { start } = require("repl");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "FrankY242424!",
    database: "employeeTracker_db"
});


connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    start();
});


function start() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "the choice is yours, what will you do?",
            choices: [
                "Add bussiness role",
                "Add department",
                "view bussiness roles",
                "view departments",
                "view employees",
                "update an employee",
                "bye bye"
            ]
        })
        .then(function (answer){
            if (answer.task === "Add bussiness role"){
                addBussinessRole();
            }else if (answer.task === "Add department"){
                addDepartment();
            }else if (answer.task === "view bussiness roles"){
                viewBussinessRoles();
            }else if (answer.task === "view departments"){
                viewDepartments();
            }else if (answer.task === "view employees"){
                viewEmployees();
            }else if (answer.task === "update an employee"){
                console.log("employee updated")
            }else{
                connection.end();
            }
        })
}