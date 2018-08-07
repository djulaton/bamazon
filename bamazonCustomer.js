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
    afterConnection();
    queryAllProducts();
});  

function afterConnection() {
    connection.query(
        "SELECT * FROM products", function(err, res) {
            if (err) throw err;
            console.log(res);
            connection.end();
    });
}

function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        for(var i=0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-------------------------------");
    });
}

var query = "SELECT * FROM products";