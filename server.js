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
      db.query(sql, answer.addDepartments, (err, res) => {
        if (err) throw err;
        console.log('You added' + answer.addDepartments)
        start();
      })
    });

};
  
   