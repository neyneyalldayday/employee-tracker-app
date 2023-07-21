USE employeeTracker_db;

INSERT INTO department (department_name)
VALUES ("sales"),
("Engineering"),
("finance"),
("support");

INSERT INTO business_role (title, salary, department_id)
VALUES ("legal team lead", "250000", 1),
("regional manager", "100000", 2),
("head Accountaint", "90000", 4),
("salesman", "40000", 2),
("customer service rep", "35000", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("sarah", "lourd", 4, NULL),
("val", "kilmer", 4, NULL),
("bobby", "bouchier", 4, NULL),
("taz", "the devil", 4, NULL),
("bill", "paxton", 4, NULL);


