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


-- get sum of only active employees
SELECT first_name, active, SUM(annual_salary) AS salary_total
FROM employees
WHERE active = TRUE
GROUP BY active, first_Name;


SELECT SUM(annual_salary) FROM employees WHERE active = TRUE;

-- toggle boolean value
UPDATE employees SET active = NOT active WHERE id = 1;
