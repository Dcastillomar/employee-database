INSERT INTO department (id, department_name)
VALUES
    (1, "HR"),
    (2, "Sales"),
    (3, "Production"),
    (4, "Legal"),
    (5, "IT"),
    (6, "Transport"),
    (7, "Accounting");

INSERT INTO department_role (id, title, salary, department_name, department_id)
VALUES
    (1, "Lawyer", "70000.00", "Legal", 4),
    (2, "Truck Driver", "80000.00", "Transport", 6),
    (3, "Payroll I", "40000.00", "Accounting", 7),
    (4, "Salesperson", "65000.00", "Sales", 2),
    (5, "HR Advisor", "63000.00", "HR", 1),
    (6, "Cybersecurity I", "45000.00", "IT", 5),
    (7, "Technician II", "38000.00", "Production", 3);


INSERT INTO employee (id, first_name, last_name, title, department_name, role_id, salary, manager_id)
VALUES
    (1, "Jack", "Black", "Lawyer", "Legal", 4, "70000.00", "Mary Robins"),
    (2, "Sherri", "Wack", "Technician II", "Production", 3, "38000.00", "Mark Judd"),
    (3, "Ronald", "Mcdonald", "HR Advisor", "HR", 1, "63000.00", "Tim Mosley"),
    (4, "Reggie", "Baker", "Cybersecurity I", "IT", 5, "45000.00", "Jessie James"),
    (5, "Donna", "Turner", "Truck Driver", "Transport", 6, "80000.00", "Jack Daniels"),
    (6, "Sheila", "Skark", "Payroll I", "Accounting", 7, "40000.00", "Robyn Robert"),
    (7, "Kelly", "Clark", "Salesperson", "Sales", 2, "65000.00", "Molly Shannon");


INSERT INTO manager (id, manager_name)
VALUES
    (1,"Mary Robins"),
    (2, "Mark Judd"),
    (3, "Tim Mosley"),
    (4, "Jessie James"),
    (5, "Jack Daniels"),
    (6, "Robyn Robert"),
    (7, "Molly Shannon");


    