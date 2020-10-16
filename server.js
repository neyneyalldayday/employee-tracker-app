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


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);

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
                "employee kick rocks",
                "bye bye"
            ]
        })
        .then(function (answer) {
            if (answer.task === "Add business role") {
                addBussinessRole();
            } else if (answer.task === "Add department") {
                addDepartment();
            } else if (answer.task === "Add employee") {
                addNewGuy();
            } else if (answer.task === "view business roles") {
                viewBussinessRoles();
            } else if (answer.task === "view departments") {
                viewDepartments();
            } else if (answer.task === "view employees") {
                viewEmployees();
            } else if (answer.task === "employee kick rocks") {
                kickRocksEmployee();
            } else {
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

        ]).then(function (answer) {
            connection.query("INSERT INTO business_role SET ?", {
                    title: answer.title,
                    salary: answer.salary || 0,
                },
                function (err) {
                    if (err) throw err;
                    console.log("you added that joker")
                    startApp();
                })

        })
}

function addNewGuy() {
    connection.query("select * FROM business_role",
        function (err, res) {
            if (err) throw err;
            inquirer
                .prompt([{
                        name: "first_name",
                        type: "input",
                        message: "first name"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "last name"
                    },
                    {
                        name: "business_role",
                        type: "list",
                        message: "title of job:",
                        choices: function () {
                            let bRoles = [];
                            for (var i = 0; i < res.length; i++) {
                                bRoles.push(res[i].title);
                            }
                            return bRoles;
                        }
                    }
                ]).then(function (answer) {
                    let bRoleId = [];
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].title === answer.business_role) {
                            bRoleId = res[i].id;
                        }
                    }
                    connection.query("INSERT INTO employee SET ?", {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: bRoleId
                        },


                        function (err) {
                            if (err) throw err;
                            startApp();
                        })
                })
        })
}

function addDepartment() {
    inquirer
        .prompt([{
            name: "department",
            typer: "input",
            message: "department name please?"
        }]).then(function (answer) {
            connection.query("INSERT INTO department (department_name) VALUES (?)",
                [answer.department],
                function (err) {
                    if (err) throw err;
                    console.table(answer);
                    startApp();
                })
        })
}

function viewBussinessRoles() {
    connection.query("SELECT title, salary AS department_name FROM business_role INNER JOIN department ON business_role.department_id = department.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        })
}

function viewDepartments() {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        })
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, business_role.title, department.department_name  AS department, business_role.salary, CONCAT(employee.first_name, ' ', employee.last_name) as manager FROM employee LEFT JOIN business_role ON employee.role_id = business_role.id LEFT JOIN department ON business_role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        })
}

function kickRocksEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt({
                name: "byeEmploy",
                type: "rawlist",
                choices: function () {
                    let doneList = [];
                    for (let i = 0; i < res.length; i++) {
                        doneList.push(res[i].id);
                    }
                    return doneList;
                },
                message: "whos on the chopping block?"
            }).then(function (res) {
                console.log(res.byeEmploy);
                connection.query("DELETE FROM employee WHERE ?", {
                        id: res.byeEmploy
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.table("here we go again on our own, going down the only road weve ever known...")
                    })
                startApp();
            })
    })







}
startApp();