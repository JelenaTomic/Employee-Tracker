const inquirer = require("inquirer");
const db = require('./connect');

const consoleTable = require('console.table');

//start server
db.connect(error => {
    if(error) throw error;
    console.log('Database connected');
    Start();
    getDepartments();
    getRoles();
    getEmployees();
});