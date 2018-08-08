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
    // afterConnection();
    queryAllProducts();
});  

// function afterConnection() {
//     connection.query(
//         "SELECT * FROM products", function(err, res) {
//             if (err) throw err;
//             console.log(res);
//             connection.end();
//     });
// }

function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        console.log("               WELCOME TO THE BAMAZON SF GIANTS DUGOUT STORE!!!              ")
        console.log("===================================================================================");
        console.log("                             List of products                         ");
        console.log("===================================================================================");

        for(var i=0; i < res.length; i++) {
            console.log(res[i].item_id + " | Product name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Qty: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------------------------------------------");
        // connection.end();
        shoppingCart();
    });
};

// Create prompts

var shoppingCart = function() {
    inquirer.prompt([{
        name: "ProductID",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        //Validate: checks weather or not the user typed a response
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "Quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {

        var query = 'SELECT * FROM Products WHERE item_id=' + answer.Quantity;
        connection.query(query, function(err, res) {
          if (answer.Quantity <= res) {
            for (var i = 0; i < res.length; i++) {
                console.log("We currently have " + res[i].stock_quantity + " " + res[i].product_name + ".");
                console.log("Thank you for your purchase! Your order of Qty. "+ answer.Quantity + " " + res[i].product_name + " is now being processed.");
              }
            } else {
              console.log("Not enough of this product in stock.");
            }
            queryAllProducts();
        })
    })
};

// -- Would you like to shop with us today?

// -- Enter the item number of the product you would like to purchase:

// create input validation for input item number

// -- How many would you like to buy?

// create input validation for how many to buy

// Display total cost

