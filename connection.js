const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employees_db"
});

connection.connect((err)=>{
    if (err)
    throw err
});

module.exports = connection;