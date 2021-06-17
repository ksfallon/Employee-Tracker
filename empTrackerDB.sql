DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;
USE emp_trackerDB;

-- The manager id is in reference to the person who manages this employee, NOT the employee themselves, so it an be NULL
CREATE TABLE employee(
id INT auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL, 
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT auto_increment NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NULL,
PRIMARY KEY(id)
);

CREATE TABLE department(
id INT auto_increment NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);