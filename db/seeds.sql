INSERT INTO departments (department_name)
VALUES 
    ("Engineering"),
    ("Finance"),
    ("Sales"),
    ("Legal");

SELECT * FROM departments;

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Software Engineer", 120000, 1),
    ("Lead Engineer", 150000, 1),
    ("Leagal Team Leader", 225000, 4),
    ("Accountant", 90000, 2),
    ("Accounting Manager", 160000, 2),
    ("Lawyer", 150000, 4),
    ("Sales reginal manager", 100000, 3),
    ("Assist to the reginal manager", 80000, 3);

SELECT * FROM roles;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 3, NULL),
    ("Dwight", "Schute", 3, 1),
    ("Angela", "Martin", 2, NULL),
    ("Kevin", "Malone", 2, 3),
    ("Jim", "Halpert", 1, NULL),
    ("Stanley", "Hudson", 1, 5),
    ("Pam", "Beesly", 4, NULL),
    ("Ryan", "Howard", 4, 7);

SELECT * FROM employees; 