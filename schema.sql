DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE department_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(7,2),
    department_name VARCHAR(30) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30),
    department_name VARCHAR(30) NOT NULL,
    role_id INT,
    salary INT,
    manager_id VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES department_role(id)
);

CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
    manager_name VARCHAR(30) NOT NULL
    
)