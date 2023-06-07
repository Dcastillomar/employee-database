const express = require('express');
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "employees_db"
},
console.log('Connected to the employees_db database')
);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = db;
