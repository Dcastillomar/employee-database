const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = require("./connection.js");

// Start up questions for the user
init();

function init() {
    loadPrompts();
}

function loadPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What option would you like to start?",
            choices: [
                {
                    name: "view all departments",
                    value: "view_departments",
                },
                {
                    name: "view all roles",
                    value: "view_roles",
                },
                {
                    name: "view all employees",
                    value: "view_employees",
                },
                {
                    name: "add a department",
                    value: "add_department",
                },
                {
                    name: "add a role",
                    value: "add_role",
                },
                {
                    name: "add an employee",
                    value: "add_employee",
                },
                {
                    name: "update an employee role",
                    value: "update_employee",
                },
            ],
        },
    ]).then((userChoice) => {
        switch (userChoice.choice) {
            case "view_employees":
                viewEmployees();
                break;
            case "view_departments":
                viewDepartments();
                break;
            case "view_roles":
                viewRoles();
                break;
            case "add_department":
                addDepartment();
                break;
            case "add_role":
                addRole();
                break;
            case "add_employee":
                addEmployee();
                break;
            case "update_employee":
                updateEmployee();
                break;
        }
    });
}

const employeeQuestions = [
    {
        type: "input",
        name: "firstName",
        message: "Enter First Name",
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter Last Name",
    },
    {
        type: "input",
        name: "salary",
        message: "Enter Salary",
    },
    {
        type: "input",
        name: "department",
        message: "Enter Department",
    },
];

const addRoleQuestions = [
    {
        type: "input",
        name: "firstName",
        message: "Enter First Name",
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter Last Name",
    },
    {
        type: "input",
        name: "salary",
        message: "Enter Salary",
    },
    {
        type: "input",
        name: "department",
        message: "Enter Department",
    },
];

const addDepartmentQuestions = [
    {
        type: "input",
        name: "departmentId",
        message: "Enter Department ID",
    },
    {
        type: "input",
        name: "departmentName",
        message: "Enter Department Name",
    },
];

const updateEmployeeInfo = [
    {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee you want to update:",
    },
    {
        type: "input",
        name: "newSalary",
        message: "Enter the new salary for the employee:",
    },
    {
        type: "input",
        name: "newDepartment",
        message: "Enter the new department for the employee:",
    },
];

function addEmployee() {
    return inquirer.prompt(employeeQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO employee (firstName, lastName, salary, department) VALUES (?, ?, ?, ?)`,
            [userInput.firstName, userInput.lastName, userInput.salary, userInput.department],
            (err, result) => {
                if (err) {
                    console.error("Error adding employee", err);
                } else {
                    console.log("Employee added", userInput);
                }
            }
        );
    });
}

function addRole() {
    return inquirer.prompt(addRoleQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO department_role (firstName, lastName, salary, department_id) VALUES (?,?,?,?)`,
            [userInput.firstName, userInput.lastName, userInput.salary, userInput.department],
            (err, result) => {
                if (err) {
                    console.error("Error adding Role", err);
                } else {
                    console.log("Role added", userInput);
                }
            }
        );
    });
}

function addDepartment() {
    return inquirer.prompt(addDepartmentQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO department (id, department_name) VALUES (?,?)`,
            [userInput.departmentId, userInput.departmentName],
            (err, result) => {
                if (err) {
                    console.error("Error adding department", err);
                } else {
                    console.log("Department added", userInput);
                }
            }
        );
    });
}

//update employee function
function updateEmployee() {
    return inquirer.prompt(updateEmployeeInfo).then((userInput) => {
        const { employeeId, newSalary, newDepartment } = userInput;

        connection.query(
            `UPDATE employee SET salary = ?, department = ? WHERE id = ?`,
            [newSalary, newDepartment, employeeId],
            (err, result) => {
                if (err) {
                    console.error("Error updating employee", err);
                } else {
                    console.log("Employee updated successfully");
                }
            }
        );
    });
}

function viewEmployees() {
    connection.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
    });
}

function viewDepartments() {
    connection.query('SELECT * FROM department', function (err, results) {
        console.log(results);
    });
}

function viewRoles() {
    connection.query('SELECT * FROM department_role', function (err, results) {
        console.log(results);
    });
}

// Call the app
loadPrompts();


