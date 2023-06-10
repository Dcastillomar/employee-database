const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = require("./connection.js");

//Questions
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
        name: "roleID",
        message: "Enter Role ID",
    },
    {
        type: "input",
        name: "managerID",
        message: "Enter Manager ID",
    },
];

const addRoleQuestions = [
    // {
    //     type: "input",
    //     name: "roleID",
    //     message: "Enter Role ID",
    // },

    {
        type: "input",
        name: "title",
        message: "Enter Title",
    },
    {
        type: "input",
        name: "salary",
        message: "Enter Salary",
    },
    {
        type: "input",
        name: "departmentID",
        message: "Enter Department ID",
    },
];

const addDepartmentQuestions = [
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
        name: "roleID",
        message: "Enter the new role ID for the employee:",
    },
];

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
//adds an employee and return to main prompts
function addEmployee() {
    return inquirer.prompt(employeeQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [userInput.firstName, userInput.lastName, userInput.roleID, userInput.managerID],
            (err, result) => {
                if (err) {
                    console.error("Error adding employee", err);
                } else {
                    console.log("Employee added", userInput);
                }
                loadPrompts();
            }
        );
    });
}
//adds a role and return to main prompts
function addRole() {
    return inquirer.prompt(addRoleQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO department_role (title, salary, department_id) VALUES (?, ?, ?)`,
            [userInput.title, userInput.salary, userInput.departmentID],
            (err, result) => {
                if (err) {
                    console.error("Error adding Role", err);
                } else {
                    console.log("Role added", userInput);
                }
                loadPrompts();
            }
        );
    });
}
//adds a department and return to main prompts
function addDepartment() {
    return inquirer.prompt(addDepartmentQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO department (department_name) VALUES (?)`,
            [userInput.departmentName],
            (err, result) => {
                if (err) {
                    console.error("Error adding department", err);
                } else {
                    console.log("Department added", userInput);
                }
                loadPrompts();
            }
        );
    });
}

//update employee function and return to main prompts
function updateEmployee() {
    return inquirer.prompt(updateEmployeeInfo).then((userInput) => {
        const { roleID, employeeId } = userInput;

        connection.query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [roleID, employeeId],
            (err, result) => {
                if (err) {
                    console.error("Error updating employee", err);
                } else {
                    console.log("Employee updated successfully");
                }
                loadPrompts();
            }
        );
    });
}

//lets you view employees and return to main prompts
function viewEmployees() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.error("Error viewing employees", err)
        } else {
            console.table(results);
        }
        loadPrompts();
    });

}
//lets you view departments and return to main prompts
function viewDepartments() {
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.error("Error viewing Departments", err)
        } else {
            console.table(results);
        }
        loadPrompts();
    });

}
//lets you view roles and return to main prompts
function viewRoles() {
    connection.query('SELECT * FROM department_role', function (err, results) {
        if (err) {
            console.error("Error viewing roles", err)
        } else {
            console.table(results);
        } loadPrompts();
    });
}

// Call the app
loadPrompts();


