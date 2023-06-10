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
        name: "title",
        message: "Enter the new title for the employee:",
    },
    {
        type: "list",
        name: "departmentName",
        message: "Which Department?",
        choices: ["Legal", "Production", "HR", "IT", "Transport", "Accounting", "Sales"]
    },
    {
        type: "list",
        name: "departmentID",
        message: "Which Department ID 1--HR, 2--Sales, 3--Production, 4--Legal, 5--IT, 6--Transport, 7--Accounting",
        choices: ['1', '2', '3', '4', '5', '6', '7']
    },
    {
        type: "input",
        name: "salary",
        message: "Enter the new salary for the employee:",
    },
    {
        type: "list",
        name: "managerID",
        message: "Enter Manager",
        choices: ["Mary Robins", "Mark Judd", "Tim Mosley", "Jessie James", "Jack Daniels", "Robyn Robert", "Molly Shannon"]
    },
];

const addRoleQuestions = [
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
        type: "list",
        name: "roleDepartmentName",
        message: "Enter Department",
        choices: ['Legal', 'Production', 'HR', 'IT', 'Transport', 'Accounting', 'Sales']
    },
    {
        type: "list",
        name: "roleDepartmentID",
        message: "Which Department ID 1--HR, 2--Sales, 3--Production, 4--Legal, 5--IT, 6--Transport, 7--Accounting",
        choices: ['1', '2', '3', '4', '5', '6', '7']
    },
];

const addDepartmentQuestions = [
    {
        type: "input",
        name: "addDepartmentName",
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
        name: "newTitle",
        message: "Enter the new title for the employee:",
    },
    {

        type: "list",
        name: "roleID",
        message: "Which Department?",
        choices: ["Legal", "Production", "HR", "IT", "Transport", "Accounting", "Sales"]

    },
    {
        type: "input",
        name: "newSalary",
        message: "Enter the new salary for the employee:",
    },
];

const updateManager = [
    {
        type: "input",
        name: "employeeIdToBeUpdated",
        message: "Enter the ID of the employee you want to update:",
    },

    {
        type: "list",
        name: "newManagerName",
        message: "Enter new manager",
        choices: ["Mary Robins", "Mark Judd", "Tim Mosley", "Jessie James", "Jack Daniels", "Robyn Robert", "Molly Shannon"]
    },
]

const viewByManagerQuestions = [
    {
        type: "list",
        name: "viewByManagerName",
        message: "What manager would you like to sort employees by?",
        choices: ["Mary Robins", "Mark Judd", "Tim Mosley", "Jessie James", "Jack Daniels", "Robyn Robert", "Molly Shannon"]
    },
]

const viewByDepartmentQuestions = [
    {
        type: "list",
        name: "viewByDepartmentName",
        message: "Which Department would you like to sort employees by?",
        choices: ["Legal", "Production", "HR", "IT", "Transport", "Accounting", "Sales"]
    },
]

// const deleteDepartmentQuestions = [
//     {
//         type: "list",
//         name: "deleteDepartmentByID",
//         message: "Which Department would you like to delete? 1--HR, 2--Sales, 3--Production, 4--Legal, 5--IT, 6--Transport, 7--Accounting",
//         choices: ['1', '2', '3', '4', '5', '6', '7']
//     },
// ]

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
                {
                    name: "update employee manager",
                    value: "update_manager",
                },
                {
                    name: "view by manager",
                    value: "view_by_manager",
                },
                {
                    name: "view by department",
                    value: "view_by_department",
                },
                // {
                //     name: "delete department",
                //     value: "delete_department",
                // },
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
            case "update_manager":
                updateEmployeeManager();
                break;
            case "view_by_manager":
                viewByManager();
                break;
            case "view_by_department":
                viewByDepartment();
                break;
                // case "delete_department":
                //     deleteDepartment();
                //     break;
        }
    });
}
//adds an employee and return to main prompts
function addEmployee() {
    return inquirer.prompt(employeeQuestions).then((userInput) => {
        connection.query(
            `INSERT INTO employee (first_name, last_name, title, department_name, role_id, salary, manager_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userInput.firstName, userInput.lastName, userInput.title, userInput.departmentName, userInput.departmentID, userInput.salary, userInput.managerID],
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
            `INSERT INTO department_role (title, salary, department_name, department_id) VALUES (?, ?, ?, ?)`,
            [userInput.title, userInput.salary, userInput.roleDepartmentName, userInput.roleDepartmentID],
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
            [userInput.addDepartmentName],
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
        const { newTitle, roleID, newSalary, employeeId } = userInput;

        connection.query(
            `UPDATE employee SET title = ?, department_name = ?, salary =? WHERE id = ?`,
            [newTitle, roleID, newSalary, employeeId],
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

//lets you update employee manager
function updateEmployeeManager() {
    return inquirer.prompt(updateManager).then((userInput) => {
        const { newManagerName } = userInput;

        connection.query(
            `UPDATE employee SET manager_id =? WHERE id = ?`,
            [newManagerName, userInput.employeeIdToBeUpdated],
            (err, result) => {
                if (err) {
                    console.error("Error updating employee manager", err);
                } else {
                    console.log("Employee manager updated successfully");
                }
                loadPrompts();
            }
        );
    });
}
//lets user view employees by manager
function viewByManager() {
    return inquirer.prompt(viewByManagerQuestions).then((userInput) => {
        connection.query('SELECT * FROM employee WHERE manager_id = ?',
            [userInput.viewByManagerName],
            (err, results) => {
                if (err) {
                    console.error("Error viewing by manager", err)
                } else {
                    console.table(results);
                } loadPrompts();
            });
    })
}

//lets user view employees by department
function viewByDepartment() {
    return inquirer.prompt(viewByDepartmentQuestions).then((userInput) => {
        connection.query('SELECT * FROM employee WHERE department_name = ?',
            [userInput.viewByDepartmentName],
            (err, results) => {
                if (err) {
                    console.error("Error viewing by department", err)
                } else {
                    console.table(results);
                } loadPrompts();
            });
    })
}

// function deleteDepartment() {
//     return inquirer.prompt(deleteDepartmentQuestions).then((userInput) => {
//         connection.query('Delete FROM department WHERE id = ?',
//             [userInput.deleteDepartmentByID],
//             (err, results) => {
//                 if (err) {
//                     console.error("Error deleting department", err)
//                 } else {
//                     console.table(results);
//                 } loadPrompts();
//             });
//     })
// }

// Call the app
loadPrompts();


