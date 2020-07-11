USE lorem_ipsum_inc;

INSERT INTO department (id, name) VALUES (DEFAULT, "Hall of the Arcane");
INSERT INTO department (id, name) VALUES (DEFAULT, "Warriors Hall");
INSERT INTO department (id, name) VALUES (DEFAULT, "Crafters Guild");

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, manager, 120000, DEFAULT);

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, darkMage, 80000, DEFAULT);

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, redMage, 60000, DEFAULT);

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, knight, 650000, DEFAULT);

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, footman, 40000, DEFAULT);

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, blacksmith, 50000, DEFAULT);

INSERT INTO role (id, title, salary, department_id)
VALUES (DEFAULT, enchanter, 90000, DEFAULT);