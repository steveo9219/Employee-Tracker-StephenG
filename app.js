// const Employee = require("./constructors/Employee");
// const Department = require("./constructors/Department");
// const Role = require("./constructors/Role");
const connection = require("./js/connection");
const inquirer = require("inquirer");
const fs = require("fs");

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
			"Remove Employee",
			"Update Employee Role",
			"Update Employee Manager",
		],
	},
];

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
		choices: ["1", "Finance", "Engineering"],
	},
	{
		type: "list",
		name: "employeeManager",
		message: "Who is the employee's manager?",
		choices: ["1", "Bob Freedom", "Gingery Bern"],
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
			case "Update Employee Role":
				updateEmployeeRole();
				break;
			case "Update Employee Manager":
				updateEmployeeManager();
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
	connection.query("SELECT * FROM employee", function (err, employee) {
		console.table(employee);
		if (err) throw err;
	});
	inquirer
		.prompt(addEmployeeQuestions)
		//
		.then((employee) => {
			connection.query(
				"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?);",
				[
					{
						first_name: employee.employeeFirstName,
						last_name: employee.employeeLastName,
						role_id: employee.employeeRole,
						manager_id: employee.employeeManager,
					},
				]
			);
		});
}
//Update Employees Role function
function updateEmployeeRole() {
	// query the database for all employees and their roles
	connection.query("SELECT * FROM employee", function (err, employees) {
		if (err) throw err;
		// once you have them, prompt the user for which they'd like to edit
		inquirer
			.prompt([
				{
					name: "choice",
					type: "rawlist",
					employees: function () {
						var employeeArray = [];
						for (var i = 0; i < employees.length; i++) {
							choiceArray.push(employees[i].firstName + employees[i].lastName);
						}
						return employeeArray;
					},
					message: "Which employee needs to update role?",
				},
				{
					name: "newRole",
					type: "list",
					message: "What is this employee's new role?",
					choices: [
						"Sales Lead",
						"Salesperson",
						"Lead Engineer",
						"Software Engineer",
						"Accountant",
						"Lawyer",
					],
				},
			])
			.then(function (answer) {
				// get the information of the chosen person
				var chosenEmployee = answer.choice;
				var newRole = answer.newRole;
				connection.query(
					"UPDATE employees SET ? WHERE ?",
					[
						{
							id: chosenEmployee.id,
							role: newRole,
						},
					],
					function (error) {
						if (error) throw err;
						console.log("Employee's role has been updated.");
						start();
					}
				);
			});
	});
}

function updateEmployeeManager() {
	console.log("updateEmployeeManager");
}
