const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: ''
    },
    console.log(`Connected to the movies_db database.`)
  );

  module.exports=db;
