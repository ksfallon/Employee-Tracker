DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;
USE emp_trackerDB;

-- The manager id is in reference to the person who manages this employee, NOT the employee themselves, so it an be NULL
CREATE TABLE employee(
id INT auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
managerId INT NULL, 
CONSTRAINT FK_managerId_tbl_employeeTable FOREIGN KEY(managerId)
REFERENCES employee(id),
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT auto_increment NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL unsigned NULL,
departmentID INT NULL,
CONSTRAINT FK_departmentID_tbl_department FOREIGN KEY(departmentID)
REFERENCES department(id),
PRIMARY KEY(id)
);

CREATE TABLE department(
id INT auto_increment NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);


SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;