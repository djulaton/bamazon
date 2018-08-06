var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "mateo",
    database: "bamazon_db"
});

//connect to sql database

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});  

var query = "SELECT * FROM products";