INSERT INTO department (name)
VALUES ("English"),
       ("Art"),
       ("Math"),
       ("Science"),
       ("History");

INSERT INTO role (title, department_id, salary)
VALUES ("Core Teacher", 1, 50000),
       ("Elective Teacher", 2, 50000),
       ("Core Teacher", 1, 50000),
       ("Elective Teacher", 2, 50000),
       ("Core Teacher", 1, 50000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Benjamin", "Bushman", 1, 101),
       ("Spencer", "Bushman", 2, 102),
       ("Kaddie", "Bushman", 1, 101),
       ("John", "Bushman", 2, 102),
       ("Adam", "Bushman", 1, 101);