const connection = require("./js/connection");
const inquirer = require("inquirer");
//These are the questions the user will be asked after starting CLI
const mainMenu = [
	{
		type: "list",
		name: "mainMenuChoice",
		message: "What would you like to do?",
		choices: [
			"View All Employees",
			"View All Employees By Department",
			"View All Employees By Manager",
			"Add Employee",
			"Add Department",
			"Add Role",
			"Update Employee Role",
		],
	},
];
//These are the questions the user will be asked after choosing add Employee option
const addEmployeeQuestions = [
	{
		type: "input",
		name: "employeeFirstName",
		message: "What is the employee's first name?",
	},
	{
		type: "input",
		name: "employeeLastName",
		message: "What is the employee's last name?",
	},
	{
		type: "list",
		name: "employeeRole",
		message: "What is the employee's role?",
		choices: [1, 2, 3],
	},
	{
		type: "list",
		name: "employeeManager",
		message: "Who is the employee's manager?",
		choices: [1, 2, 3],
	},
];
//These are the questions the user will be asked after choosing to update Employee option
const updateEmployeeQuestions = [
	{
		type: "input",
		name: "employeeId",
		message: "What is the employee's ID?",
	},
	{
		type: "input",
		name: "newRole",
		message: "What is the employee's new role?",
		choices: [1, 2, 3],
	},
];
//These are the questions the user will be asked after choosing to add Department option
const addDepartmentQuestions = [
	{
		type: "input",
		name: "newDepartmentName",
		message: "What is the new department name?",
	},
];
//These are the questions the user will be asked after choosing to add Role option
const addRoleQuestions = [
	{
		type: "input",
		name: "newRoleTitle",
		message: "What is the new Title of the Role?",
	},
	{
		type: "input",
		name: "newRoleSalary",
		message: "What is the new Salary of the Role?",
	},
	{
		type: "rawlist",
		name: "newDepartmentId",
		message: "What is the new department id?",
		choices: [1, 2, 3],
	},
];
//inquirer starts and prints questions to console and choices
inquirer
	.prompt(mainMenu)
	//
	.then((answers) => {
		console.log(answers);
		switch (answers.mainMenuChoice) {
			case "View All Employees":
				viewAllEmployees();
				break;
			case "View All Employees By Department":
				viewAllEmployeesByDepartment();
				break;
			case "View All Employees By Manager":
				viewAllEmployeesByManager();
				break;
			case "Add Employee":
				addEmployee();
				break;
			case "Add Department":
				addDepartment();
				break;
			case "Add Role":
				addRole();
				break;
			case "Update Employee Role":
				updateEmployeeRole();
				break;
		}
	});
//View All Employees function
function viewAllEmployees() {
	console.log("viewAllEmployees");
	connection.query(
		"SELECT first_name, last_name, title, department_id, salary, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
		function (err, employee) {
			console.table(employee);
			if (err) throw err;
		}
	);
}

//View All Employees by department function
function viewAllEmployeesByDepartment() {
	connection.query(
		"SELECT first_name, last_name, department_id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
		function (err, employee) {
			console.table(employee);
			if (err) throw err;
		}
	);
	console.log("viewAllEmployeesByDepartment");
}

//View All Employees by manager function
function viewAllEmployeesByManager() {
	connection.query(
		"SELECT first_name, last_name, manager_id FROM employee",
		function (err, employee) {
			console.table(employee);
			if (err) throw err;
		}
	);
	console.log("viewAllEmployeesByManager");
}

//ADD employees function
function addEmployee() {
	inquirer
		.prompt(addEmployeeQuestions)
		//
		.then((employee) => {
			connection.query(
				`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${employee.employeeFirstName}", "${employee.employeeLastName}", ${employee.employeeRole}, ${employee.employeeManager});`
			);
			console.log(
				`"Added Employee ${employee.employeeFirstName} to Database!"`
			);
		});
}

//ADD department function
function addDepartment() {
	inquirer
		.prompt(addDepartmentQuestions)
		//
		.then((newDepartment) => {
			connection.query(
				`INSERT INTO department (name) VALUES ('${newDepartment.newDepartmentName}');`
			);
			console.log(
				`"Added department ${newDepartment.newDepartmentName} to Database!"`
			);
		});
}

//ADD role function
function addRole() {
	inquirer
		.prompt(addRoleQuestions)
		//
		.then((newRole) => {
			connection.query(
				`INSERT INTO role (title, salary, department_id) VALUES ('${newRole.newRoleTitle}', '${newRole.newRoleSalary}', ${newRole.newDepartmentId});`
			);
			console.log(`"Added role ${newRole.newRoleTitle} to Database!"`);
		});
}

//Update Employees Role function
function updateEmployeeRole() {
	inquirer
		.prompt(updateEmployeeQuestions)
		//
		.then((updateEmployee) => {
			connection.query(
				`UPDATE employee SET role_id = ${updateEmployee.newRole} WHERE id = ${updateEmployee.employeeId};`
			);
			console.log(
				`"Changed ${updateEmployee.newRole} to ${updateEmployee.employeeId}"`
			);
		});
}
