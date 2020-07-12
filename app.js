// const Employee = require("./constructors/Employee");
// const Department = require("./constructors/Department");
// const Role = require("./constructors/Role");
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
			"Remove Employee", //NTH
			"Update Employee Role",
			"Update Employee Manager",
		],
	},
];

//startUp prints questions to console and choices
(function startUp() {
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
				case "Remove Employee":
					removeEmployee();
					break;
				case "Update Employee Role":
					updateEmployeeRole();
					break;
				case "Update Employee Manager":
					updateEmployeeManager();
					break;
			}
		});
})();

function viewAllEmployees() {
	console.log("done");
}

function viewAllEmployeesByDepartment() {
	console.log("viewAllEmployeesByDepartment");
}

function viewAllEmployeesByManager() {
	console.log("viewAllEmployeesByManager");
}

function addEmployee() {
	console.log("addEmployee");
}

function removeEmployee() {
	console.log("removeEmployee");
}

function updateEmployeeRole() {
	console.log("updateEmployeeRole");
}

function updateEmployeeManager() {
	console.log("updateEmployeeManager");
}
