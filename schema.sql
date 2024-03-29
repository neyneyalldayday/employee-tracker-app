DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT ,
    department_name VARCHAR (30) NOT NULL
    ); 
    
    CREATE TABLE business_role (
    id INT PRIMARY KEY AUTO_INCREMENT ,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL (10,4) NOT NULL,
    department_id INT NOT NULL
    );
    
    CREATE TABLE employee (
		id INT PRIMARY KEY AUTO_INCREMENT ,
        first_name VARCHAR (30) NOT NULL,
        last_name VARCHAR (30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT
    
    );