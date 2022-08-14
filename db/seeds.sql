INSERT INTO department
    (name)
VALUES
    ('Sales & Marketing'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, department_id, salary)
VALUES
    ('Sales Lead', 1, 100000),
    ('Salesperson', 1, 80000),
    ('Lead Engineer', 2, 150000),
    ('Software Engineer', 2, 120000),
    ('Account Manager', 3, 160000),
    ('Accountant', 3, 125000),
    ('Legal Team Lead', 4, 250000),
    ('Lawyer', 4, 190000);

INSERT INTO employee
    (first_name, last_name, role_id, department_id, manager_id)
VALUES
    ('Jane', 'Doe', 1, 1, NULL),
    ('John', 'Doe', 2, 1, 1),
    ('Bryant', 'Fowler', 3, 2, NULL),
    ('Labron', 'James', 2, 1, 3),
    ('Katrina', 'Collins', 5, 3, NULL),
    ('Mike', 'Lawry', 6, 3, 5),
    ('Kat', 'Williams', 7, 4, NULL),
    ('Kevin', 'Hart', 8, 4, 7);
    