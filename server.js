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
        
    