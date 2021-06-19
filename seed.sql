INSERT into department (name)
VALUE 
("Sales"),  --id:1
("Engineer"), --id:2
("Finance"), --id:3
("Legal"); --id:4

INSERT into role (title, salary, department_id)
VALUE 
("Sales Lead", 80000.00, 1), --id:1
("Salesperson", 70000.00, 1), --id:2
("Lead Engineer", 150000.00, 2), --id:3
("Software Engineer", 120000.00, 2), --id:4
("Account Manager", 130000.00, 3), --id:5
("Accountant", 110000.00, 3), --id:6
("Legal Team Lead", 190000.00, 4), --id:7
("Lawyer", 180000.00, 4); --id:8

INSERT into employee (first_name, last_name, role_id, manager_id)
VALUE 
("Chun-Li", "Shinoda", 1, null), --id:1
("Sonya", "Blade", 3, null), --id:2
("Mario", "Plumber", 5, null), --id:3
("Princess", "Peach", 7, null), --id:4
("Ken", "Masters", 2, 1), --id:5
("Cammy", "White", 2, 1), --id:6
("Edomondo", "Honda", 2, 1), --id:7
("Sub", "Zero", 4, 2), --id:8
("Lui", "Kang", 4, 2), --id:9
("Luigi", "Plumber", 6, 3), --id:10
("Yoshi", "Peach", 8, 4); --id:11






SELECT 
    CONCAT(m.lastName, ', ', m.firstName) AS Manager,
    CONCAT(e.lastName, ', ', e.firstName) AS 'Direct report'
FROM
    employees e
INNER JOIN employees m ON 
    m.employeeNumber = e.reportsTo
ORDER BY 
    Manager;