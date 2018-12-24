var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "root",

    password: "mani2703",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    loadProducts();
  });

function loadProducts(){
    connection.query("select * from products", function(err, res){
        if(err) throw err;

        console.table(res);
        callForItem(res);
    });
}

function callForItem(inventory){
    inquirer.
    prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
            validate: function(val) {
              return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ])
    .then(function(val){
        checkIfExit(val.choice);
        var inputId = parseInt(val.choice);
        var product = checkInventory(inputId, inventory);

        if(product){
            promptForQuantity(product);
        }
    })
}

function checkIfExit(choice){
    if(choice.toLowerCase() === "q"){
        console.log("Goodbye!");
        process.exit(0);
    }
}

function checkInventory(choice, inventory){
    for(var i=0; i<inventory.length; i++){
        if(inventory[i].item_id == choice){
            return inventory[i];
        }
    }
}

function promptForQuantity(product){
    inquirer.
    prompt([
        {
            type: "input",
            name: "quantity",
            message: "What is the quantity of the item you would you like to purchase? [Quit with Q]",
            validate: function(val) {
              return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ])
    .then(function(val){
        checkIfExit(val.quantity);
        var quantity = parseInt(val.quantity);
        
        if(quantity > product.stock_quantity){
            console.log("Insufficient quantity !!!");

            loadProducts();
        }
        else{
            // console.log("You have purchased the item successfully...");
            updateInventory(product, quantity);
        }
    })
}

function updateInventory(product, quantity){
    var updatedQuantity = product.stock_quantity - quantity;

    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [updatedQuantity, product.item_id],
        function(err, res) {
          // Let the user know the purchase was successful, re-run loadProducts
          console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
          loadProducts();
        }
      );
}
