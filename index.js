const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

const userChoice = async () => {
  const mainMenu = await inquirer.prompt({
    type: "list",
    message: "what would you like to do?: \n",
    name: "chooseAction",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add A Department",
      "Add A Role",
      "Add An Employee",
      "Update An Employee Role",
      "Quit",
    ],
  });
  return mainMenu.chooseAction;
};

const viewAll = (userPick) => {
  if (userPick === "View All Departments") {
    var sql = "SELECT * FROM department";
  } else if (userPick === "View All Roles") {
    var sql = "SELECT * FROM roles";
  } else {
    var sql = "SELECT * FROM employee";
  }
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      console.log("\n");
      console.table(rows);
    }
  });
};

const addDepartment = async () => {
  const departmentInfo = await inquirer.prompt({
    type: "input",
    name: "departmentName",
    message: "Whats the department name?",
  });
  const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
  const params = [departmentInfo.departmentName];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${departmentInfo.departmentName} was added to Deparments`);
    }
  });
};

const addRole = async () => {
  const roleInfo = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the name of this role?: ",
    },
    {
      type: "number",
      name: "roleSalary",
      message: "What is the salary (in dollars) for this role?: ",
    },
    {
      type: "number",
      name: "departmentID",
      // area for refinement
      message: "What is the ID for the department this role is listed under?: ",
    },
  ]);
  const sql = `INSERT INTO roles (role_title, role_salary, department_id)
        VALUES (?,?,?)`;
  const params = [
    roleInfo.roleName,
    roleInfo.roleSalary,
    roleInfo.departmentID,
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
};

const addEmployee = async () => {
  const employeeInfo = await inquirer.prompt([
    {
      type: "input",
      name: "employeeFirstName",
      message: "What is their first name?: ",
    },
    {
      type: "input",
      name: "employeeLastName",
      message: "What is their last name?: ",
    },
    {
      type: "number",
      name: "roleID",
      message: "What is the ID of the role for this employee?: ",
    },
    {
      type: "number",
      name: "managerID",
      message: "What is the employee ID of the manager of this employee?: ",
    },
  ]);
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES(?,?,?,?)`;
  const params = [
    employeeInfo.employeeFirstName,
    employeeInfo.employeeLastName,
    employeeInfo.roleID,
    employeeInfo.managerID,
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
};

const updateEmployeeRole = async () => {
  const employeeToBeUpdated = await inquirer.prompt([
    {
      type: "number",
      name: "employeeID",
      message:
        "What is the ID of the employee whose role you would like to update?: ",
    },
    {
      type: "number",
      name: "newRoleID",
      message: "What is the ID of the employee's updated role?: ",
    },
  ]);
  const sql = `UPDATE employee SET role_id=? WHERE id=?`;
  const params = [
    employeeToBeUpdated.newRoleID,
    employeeToBeUpdated.employeeID,
  ];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
};

const init = async () => {
  let exit = false;
  while (exit === false) {
    let initialChoice = await userChoice();
    if (initialChoice === "quit") {
      exit = true;
      db.destroy();
      return;
    } else if (
      initialChoice === "View All Departments" ||
      initialChoice === "View All Roles" ||
      initialChoice === "View All Employees"
    ) {
      viewAll(initialChoice);
    } else if (initialChoice === "Add A Department") {
      let departmentAdded = await addDepartment();
    } else if (initialChoice === "Add A Role") {
      let roleAdded = await addRole();
    } else if (initialChoice === "Add An Employee") {
      let employeeAdded = await addEmployee();
    } else if (initialChoice === "Update An Employee Role") {
      let employeeUpdated = await updateEmployeeRole();
    }
  }
};

init();
