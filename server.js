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