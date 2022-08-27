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

        
    