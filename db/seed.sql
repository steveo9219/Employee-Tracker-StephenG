USE lorem_ipsum_inc;
-- Departments Table Inserts
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Engineering");
-- Role Table Inserts
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', '80000', '1');

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', '80000', '2');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', '60000', '3');

-- Employee Table Inserts
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', '1', '1');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Chan', '2', '1');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Tupik', '3', '1');


