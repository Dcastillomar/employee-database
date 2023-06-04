const inquirer = require("inquirer");
const mysql = require("mysql2")

const questions = [


    {
        type: "list",
        name: "startChoice",
        message: "What option would you like to start?",
        choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
    }];


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

const addDepartmentQuestions = [
    {type: "input",
     name: "department",
     message: "Enter Department",
    },
]
//functions to have the sub questions fire, need to add on the update employee
function addEmployee() {
    return inquirer.prompt(employeeQuestions).then((userInput) => {
        //function that writes this data into the database

    console.log("Employee added:", userInput);
    });

}

function addRole() {
    return inquirer.prompt(addRoleQuestions).then((userInput) => {
        //function that writes this data into the database

    console.log("Role added:", userInput);
    });

}

function addDepartment() {
    return inquirer.prompt(addDepartmentQuestions).then((userInput) => {
        //function that writes this data into the database

    console.log("Department added:", userInput);
    });

}

function beginQuestions() {
    return inquirer.prompt(questions).then(userInput => {
if(userInput.startChoice === "add an employee"){
    return addEmployee();
} else if (userInput.startChoice === "add a role"){
    return addRole();
} else if (userInput.startChoice === "add a department"){
    return addDepartment();
}
    });
}


             
          



//create a function to initialize app
// function showOption





// Function to initialize the app


// Call the app
beginQuestions();

//add sub questions depending on the choices picked
//create file with data base
//create file that contains the functions to add the functionality of the database