INSERT into employee (first_name, last_name, role_id, manager_id)
VALUE ("Chun-Li", " Shinoda", 1, null), ("Ken", "Masters", 2, 1), ("Cammy", "White", 2, 1), ("Edomondo", "Honda", 2, 1), ("Sonya", "Blade", 3, null), ("Sub", "Zero", 4, 3), ("Lui", "Kang", 4, 3), ("Mario", "Plumber", 5, null), ("Luigi", "Plumber", 6, 5), ("Princess", "Peach", 7, null), ("Yoshi", "Peach", 8, 7);

INSERT into role (title, salary, department_id)
VALUE ("Sales Lead", 80000.00, 1), ("Salesperson", 70000.00, 1), ("Lead Engineer", 150000.00, 2), ("Software Engineer", 120000.00, 2), ("Account Manager", 130000.00, 3), ("Accountant", 110000.00, 3), ("Legal Team Lead", 190000.00, 4), ("Lawyer", 180000.00, 4);

INSERT into department (name)
VALUE ("Sales"), ("Engineer"), ("Finance"), ("Legal");