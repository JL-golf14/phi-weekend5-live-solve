-- employee table
CREATE TABLE employees (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(80) NOT NULL,
	last_name VARCHAR(200) NOT NULL,
	title VARCHAR(80),
	employee_id VARCHAR(8) NOT NULL UNIQUE,
	annual_salary DECIMAL(10,2) NOT NULL,
	active BOOLEAN NOT NULL DEFAULT true
);
