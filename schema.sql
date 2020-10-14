CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department (
	id INT PRIMARY KEY NOT NULL,
    department_name VARCHAR (30) NOT NULL
    ); 
    
    CREATE TABLE business_role (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,4) NOT NULL,
    department_id INT NOT NULL
    );
    
    CREATE TABLE employee (
		id INT PRIMARY KEY NOT NULL,
        first_name VARCHAR (30) NOT NULL,
        last_name VARCHAR (30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT
    
    );