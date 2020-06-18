## Exercise for managment employees using GraphQL and GNX library

#### Collections definitions

1 - Create collections employees, salaries, titles, departments, dept_manager, dept_employees
2 - Employee must have dni, birth_date, first_name, last_name, gender, hire_date
3 - Salaries must have empId, salary, from_date, to_date
4 - Titles must have empId, title, from_date, to_date
5 - Departments must have dept_name
6 - Dept_manager must have empId, deptId, from_date, to_date
7 - Dept_employee must have empId, deptId, from_date, to_date

#### Restrictions

1 - Can't exist more than one employee with the same dni
2 - Employee must have more than 18 years old
3 - In all the collections from_date must be smaller than to_date
4 - The same employee cannot have 2 titles with the same dept_name
5 - Gender must be implemented as Enum
6 - Cant't be 2 departments with the same dept_name
7 - Can't be 2 employees assigned to the same department in the same portion of time
8 - Can't be 2 managers assigned to the same department in the same portion of time
9 - Can't delete a child from a relation

##### Note:

1 - All the collections are independent
2 - All the collections can be query with the proper relations
3 - All the mutations have to implement the restrictions specified

### Steps for running Api

1- Clone repository git clone https://github.com/m0ns3/gnx-api.git
2- Enter to gnx-api directory
3- Run <code>npm install</code>
4- Run <code>run-rs</code>
5- Run project with: <code>npm run dev</code>
