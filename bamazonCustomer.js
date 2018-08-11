var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "",
    database: "bamazon_db"
});

//connect to sql database and display greeting message
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    greeting();
});


//Products table that will populate when HECK YES!! is selected
// shopping cart prompts will appear under table
function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("~._.~~._.~'~._.~'WELCOME TO THE BAMAZON SF GIANTS DUGOUT STORE!!!_.~'~._.'~~._.~")
        console.log("===================================================================================");
        console.log("                             List of products                         ");
        console.log("===================================================================================");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | Product name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Qty: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------------------------------------------");
        shoppingCart();
    });
};

// Create greeting prompt
var greeting = function () {
    inquirer.prompt([{
        name: "yesOrNo",
        type: "rawlist",
        message: "Would you like to buy some cool SF Giants gear?",
        choices: ["HECK YES!!!!!", "NO, I'M NOT A GIANTS FAN!"]
    }]).then(function (answer) {
        if (answer.yesOrNo.toUpperCase() === "HECK YES!!!!!") {
            console.log("-----------------------------------------------------------------------------------");
            queryAllProducts();
        } else {
            connection.end();
            console.log("Thank you, come again!");
            console.log("-----------------------------------------------------------------------------------");
        }
    });
}

// At the end of transaction, another prompt will populate asking the customer if they would like to make another purchase
var endOfTransaction = function () {
    inquirer.prompt([{
        name: "yayOrNay",
        type: "rawlist",
        message: "Wanna buy some more stuff?",
        choices: ["YES, TAKE SOME MORE OF MY MONEY!", "NOPE, I'M GOOD"]
    }]).then(function (answer) {
        if (answer.yayOrNay.toUpperCase() === "YES, TAKE SOME MORE OF MY MONEY!") {
            console.log("-----------------------------------------------------------------------------------");
            queryAllProducts();

        } else {
            connection.end();
            console.log("Thanks for shopping at Bamazon SF Giants. Come again!");
            console.log("-----------------------------------------------------------------------------------");
        }
    });
}

// prompts for user inputs
var shoppingCart = function () {
    inquirer.prompt([{
        name: "ProductID",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        //Validate: checks whether or not the user typed a response
        validate: function (value) {
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
        //Validate: checks whether or not the user typed a response
        validate: function (value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (answer) {
        // displays order total and purchase details

        var query = 'SELECT * FROM products WHERE item_id=' + answer.ProductID;
        connection.query(query, function (err, res) {
            if (answer.Quantity <= res[0].stock_quantity) {
                for (var i = 0; i < res.length; i++) {
                    // console.log(JSON.stringify(res[i]));
                    // console.log(res);
                    console.log("- We currently have " + res[i].stock_quantity + " " + res[i].product_name + ".");
                    console.log("- Your subtotal is $" + res[i].price * answer.Quantity);
                    console.log("- Thank you for your purchase! Your order of Qty.(" + answer.Quantity + ") " + res[i].product_name + "(s)" + " will ship in 3-5 business days.");
                    console.log("===================================================================================");
                }
            } else {
                console.log("Not enough of this product in stock.");
            }
            endOfTransaction();
        })
    })
};

