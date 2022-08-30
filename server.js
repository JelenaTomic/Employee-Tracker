const inquirer = require("inquirer");
const db = require('./connect');

const consoleTable = require('console.table');
const { addListener } = require("./connect");

//start server
db.connect(error => {
    if(error) throw error;
    console.log('Database connected');
    Start();
    getDepartments();
    getRoles();
    getEmployees();
});

function start() {
    inquirer.prompt({
      type : "list",
      name: "choices",
      message : "What would you like to do?",
      choices : [ "View" , "Update" , "Add" , "Delete" , "Exit"]
    }).then(answer =>{
        switch(answer.choices){
            case "View":
                views();
            break;
            case "Update":
                updates();
             break;
            case "Add":
                adds();
            break;
            case "Delete":
                deletes();
            break;
            case "Exit":
                db.end();
            break;
        }
    });
};

function views() {
    inquirer.prompt({
      type : "list",
      name: "viewChoices",
      message : "What would you like to see?",
      choices : [ "Departments" , "Roles" , "Employees" , "All" , "Exit"]
    }).then(answer =>{
        switch(answer.viewChoices){
            case "Departments":
                viewDepartments();
            break;
            case "Roles":
                viewRoles();
             break;
            case "Employees":
                viewEmployees();
            break;
            case "All":
                viewAll();
            break;
            case "Exit":
                db.end();
            break;
        }
    });
};

function viewDepartments(){
    let query = "SELECT * FROM departments";
    db.query(query, function (error, res) {
        console.table('All Departments', res);
        
        departmentArray = res;
        for(i=0; i<res.length; i++){
            newArray.push(res[i].department_name);
        };
        start();
      });

};

function viewRoles(){
    let query = "SELECT * FROM roles";
    db.query(query, function(error,res){
        console.table('All roles', res);
        start();
    });
};

function viewEmployees(){
    let query = "SELECT * FROM employees";
    db.query(query, function(error,res){
        console.table('All employees', res);
        start();
    });
};
        
function viewAll(){
    console.log('Showing all employees');
    let all = `
    SELECT employees.id, 
    employees.first_name,
    employees.last_name,
    roles.title,
    departments.department_name AS 'department',
    roles.salary,
    employees.manager_id
    FROM employees, roles, departments
    WHERE departments.id = roles.department_id
    AND roles.id = employees.role_id
    `;
    db.query(all,(error,res)=>{
        if (error) throw   error;
        console.table(res);
        start();
    });
};
    
function adds(){
    inquirer.prompt([
        {
            type: "list",
            name: "viewChoice",
            message: "What would you like to add?",
            choices: [ "Departments", "Roles" , "Employees" ,"Exit"]
        }
    ]).then(answer =>{
        switch(answer.viewChoice){
            case "Departments":
                viewDepartments();
            break;
            case "Roles":
                viewRoles();
             break;
            case "Employees":
                viewEmployees();
            break;
            case "Exit":
                db.end();
            break;
        }

    });

};
function addDepartments() {
    inquirer.prompt(
      {
        type: "input",
        name: "addDepartments",
        message: "What is the new department name?"
      }
    ).then(answer => {
      const sql = 'INSERT INTO departments (department_name) value (?)';
      db.query(sql, answer.addDepartments, (error, res) => {
         if (error) throw error;
         console.log('You added' + answer.addDepartments)
         start();
        })
    });

};
  
function addRoles() {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new role name?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the new role's salary?"
      },
      {
        type: "list",
        name: "id",
        message: "Which is the role's department",
        choices: newArray
      }
    ]).then(answer => {
      for (i = 0; i < newArray.length; i++) {
        if (departmentArray[i].department_name == answer.id) {
          answer.id = departmentArray[i].id
        }
      }
      const sql = 'INSERT INTO roles (title, salary, department_id ) value (?,?,?)';
      const params = [answer.title, answer.salary, answer.id];
      db.query(sql, params, (error, res) => {
          if (error) throw error;
          console.log('New role is made: ' + answer.title)
          start();
       });
    });
};

function addEmployees() {
    inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employees first name?"
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employees last name?"
      },
      {
        type: "list",
        name: "role_id",
        message: "Which is the employees role",
        choices: newRolesArray
      },
      {
        type: "list",
        name: "manager_id",
        message: "Which is the employees managers name",
        choices: ["Jen Levinson", "Oscar Martinez", "Meredith Palmer", "Phyllis Lapin-Vance", "Creed Bratton", "NULL"]
  
      }
    ]).then(answer => {
      for (i = 0; i < newRolesArray.length; i++) {
          if (roleArray[i].title == answer.role_id) {
             answer.role_id = roleArray[i].id;
            }
       }

       if (answer.manager_id === "Oscar Martinez") {
           answer.manager_id = 1;
        }
       else if (answer.manager_id === "Jen Levinson") {
           answer.manager_id = 3;
        }
       else if (answer.manager_id === "Creed Bratton") {
           answer.manager_id = 5;
        }
       else if (answer.manager_id === "Meredith Palmer") {
           answer.manager_id = 7;
        } 
       else { answer.manager_id = "NULL" }
  
      const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) value (?,?,?,?)';
      const par = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
      db.query(sql, par, (error, res) => {
           if (error) throw error;
           console.log('New employee: ' + answer.first_name + '' + answer.last_name)
           start();
        })
    })
  
};
  