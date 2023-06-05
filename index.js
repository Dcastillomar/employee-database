//required apps
const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = require("./connection.js")

//start up questions for user
init();

function init(){
    loadPrompts();
};

function loadPrompts(){
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What option would you like to start?",
            choices: [
                {
                    name: "view all departments",
                    value: "view_employees",
                },

                {
                    name: "view all roles",
                    value: "view_roles"
                },
                {
                    name: "view all employees",
                    value: "view_employees"
                },
                {
                    name: "add a department",
                    value: "add_department"
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
                    value: "update_employee"
                }
            ]
        }
    ])
        .then((userChoice) => {
            switch (userChoice.choice) {
                case "view_employees":
                    viewEmployees();
                    break;
                case "view_departments":
                    viewDepartments();
                    break;
            }
        });

};


//questions if the user selects add employee
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
    }];

//questions for user if chooses add a role
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
]

// questions for user if chooses add a department
const addDepartmentQuestions = [
    {
        type: "input",
        name: "department",
        message: "Enter Department",
    },
]
//function to have the sub questions fire if add employee is chosen
function addEmployee() {
    return inquirer.prompt(employeeQuestions).then((userInput) => {
        //function that writes this data into the database

        console.log("Employee added:", userInput);
    });

}

//function to have the sub questions fire if add role is chosen

function addRole() {
    return inquirer.prompt(addRoleQuestions).then((userInput) => {
        //function that writes this data into the database

        console.log("Role added:", userInput);
    });

}

//function to have the sub questions fire if add department is chosen

function addDepartment() {
    return inquirer.prompt(addDepartmentQuestions).then((userInput) => {
        //function that writes this data into the database

        console.log("Department added:", userInput);
    });

}

//function to begin the questions and fire the sub questions if certain choices are selected
function beginQuestions() {
    return inquirer.prompt(questions).then(userInput => {
        if (userInput.startChoice === "add an employee") {
            return addEmployee();
        } else if (userInput.startChoice === "add a role") {
            return addRole();
        } else if (userInput.startChoice === "add a department") {
            return addDepartment();
        }
    });
}

const viewEmployees= ()=>{
var [results] = connection.query("SELECT * FROM employee;");
console.log(results)
}; 

//Call the app
//beginQuestions();

//create an update employee feature
//create file that contains the functions to add the functionality of the database
