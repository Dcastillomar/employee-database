INSERT INTO department (id, department_name)
VALUES
    (1, "HR"),
    (2, "Sales"),
    (3, "Production"),
    (4, "Legal"),
    (5, "IT"),
    (6, "Transport"),
    (7, "Accounting");

INSERT INTO department_role (id, title, salary, department_id)
VALUES
    (20, "Lawyer", "70000.00", 4),
    (30, "Truck Driver", "80000.00", 6),
    (40, "Payroll I", "40000.00", 7),
    (50, "Salesperson", "65000.00", 2),
    (60, "HR Advisor", "63000.00", 1),
    (70, "Cybersecurity I", "45000.00", 5),
    (80, "Technician II", "38000.00", 3);


INSERT INTO employee (id, first_name, last_name, title, role_id, salary, manager_id)
VALUES
    (100, "Jack", "Black", "Lawyer", 20, "70000.00", 180),
    (101, "Sherri", "Wack", "Technician II", 80, "38000.00", 181),
    (102, "Ronald", "Mcdonald", "HR Advisor", 60, "63000.00", 182),
    (103, "Reggie", "Baker", "Cybersecurity I", 70, "45000.00", 183),
    (104, "Donna", "Turner", "Truck Driver", 30, "80000.00", 184),
    (105, "Sheila", "Skark", "Payroll I", 40, "40000.00", 185),
    (106, "Kelly", "Clark", "Salesperson", 50, "65000.00", 186);