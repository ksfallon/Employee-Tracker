DROP DATABASE IF EXISTS emp_trackerDB;
CREATE DATABASE emp_trackerDB;
USE emp_trackerDB;


CREATE TABLE department(
id INT auto_increment NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT auto_increment NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) UNSIGNED NOT NULL,
department_id INT NULL,
CONSTRAINT FK_department FOREIGN KEY(department_id)
REFERENCES department(id),
PRIMARY KEY(id)
);

-- The manager id is in reference to the person who manages this employee, NOT the employee themselves, so it an be NULL
CREATE TABLE employee(
id INT auto_increment NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
CONSTRAINT FK_role FOREIGN KEY (role_id)
REFERENCES role(id),
manager_id INT NULL, 
CONSTRAINT FK_employee FOREIGN KEY(manager_id)
REFERENCES employee(id),
PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;