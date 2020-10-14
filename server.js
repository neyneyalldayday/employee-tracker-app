var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "FrankY242424!",
    database: "employeeTracker_db"
});


connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    
});


function startApp() {
    inquirer
        .prompt({
            name: "task",
            type: "list",
            message: "the choice is yours, what will you do?",
            choices: [
                "Add business role",
                "Add department",
                "Add employee",
                "view business roles",
                "view departments",
                "view employees",
                "update an employee",
                "employee kick rocks",
                "bye bye"
            ]
        })
        .then(function (answer){
            if (answer.task === "Add business role"){
                addBussinessRole();
            }else if (answer.task === "Add department"){
                addDepartment();
            }else if (answer.task === "Add employee"){
                addNewGuy();
            }else if (answer.task === "view business roles"){
                viewBussinessRoles();
            }else if (answer.task === "view departments"){
                viewDepartments();
            }else if (answer.task === "view employees"){
                viewEmployees();
            }else if (answer.task === "update an employee"){
                console.log("employee updated")
            }else if(answer.task === "employee kick rocks"){
                kickRocksEmployee();
            }else{
                connection.end();
            }
        })
}



function addBussinessRole() {
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "which title will we be adding?"
        },
        {
            name: "salary",
            type: "number",
            message: "how much is this joker gonna make?",
        },

    ]).then(function (answer){
        connection.query("INSERT INTO business_role SET ?",
        {
            title:answer.title,
            salary:answer.salary || 0,
        },
        function (err){
            if (err) throw err;
            console.log("you added that joker")
             startApp();
        })
       
    })
}
function addNewGuy(){
    inquirer
    .prompt([{
        name: "first",
        type:"input",
        message: "first name"
        
    },
    {
        name: "last",
        type: "input",
        message: "last name"
    }
]).then(function(answer){
    connection.query("INSERT INTO employees SET ?",{
        first_name: answer.first,
        last_name: answer.last,
        },
        function(err) {
            if (err) throw err;
            conTable = console.table("ya added a dude");
            startApp();
        })
})
}

function addDepartment() {
    inquirer
    .prompt([{
        name: "department",
        typer: "input",
        message: "department name please?"
    }]).then(function(answer){
        connection.query("INSERT INTO department (department_name) VALUES (?)"),
        (answer.department),
        function (err) {
            if (err) throw err;
            console.log("you have added a department");
            startApp();
        }
    })
}

function viewBussinessRoles() {
    connection.query("SELECT * FROM business_role",
    function(err,res){
        if (err) throw err;
        console.log("a list of roles...");
        console.table(res)
        startApp();
    })
}
function viewDepartments() {
    connection.query("SELECT * FROM department",
    function(err,res){
        if (err) throw err;
        console.log("a list of departments");
        console.table(res)
        startApp();
    })
}
function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, business_role.title, business_role.salary,department.department_name, AS department, CONCAT (manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN business_role ON role_id = business_role.id LEFT JOIN department ON business_role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id", 
    
    function(err,res){
        if (err) throw err;
        console.log("a list of all employees");
        console.table(res)
        startApp();
    })
}
function kickRocksEmployee() {
    console.log("employee is on the done-zo list");
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;

        inquirer
        .prompt([{
            name: "kick employee",
            type: "list",
            choices: function() {
                let disgruntledEmployee = [];
                for (let i = 0; i < res.length; i ++) {
                    disgruntledEmployee.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name);
                }
                return disgruntledEmployee;
            },
            message: "remove this clown or what?"
        }]).then(function(res){
            console.log(res.id);
            connection.query("DELETE FROM employee WHERE id = ${res.disgruntledEmployee}", function(err, res){
                if (err) throw err;
                console.log("employee kicked rocks!")
                

            })
            startApp();
        })
    })
}
startApp();


