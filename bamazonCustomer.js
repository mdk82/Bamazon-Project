
const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazondb",
    port: 8889
  });

  connection.connect((error) => {
    if (error) {
      console.log("error connecting: " + error.stack);
    }
      console.log("listing on port 8889");

      products();
  });

  let products = () => {
    connection.query("SELECT * FROM products", function (error, response) {
        if (error) throw error; 
            
        console.log(response);

        customerOrder(response);
    })
};

  let customerOrder = (inventory) => {

    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Please select your item by id number, press q to quit.",
          validate: function (value) {
            return !isNaN(value) || value.toLowerCase() === "q";
          }
        }
      ])
      .then((value) => {
        userResponse(value.choice);
        let id = parseInt(value.choice);
        let product = itemQuantity(id, inventory);
  
        if (product) {
          customerQuantity(product);
        } else {
          console.log("That item is not in stock.");
          products();
        }
      });
  }

  let customerQuantity = (product) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "Select Purchase Quantity?",
          validate: function(value) {
            return value > 0 || value.toLowerCase() === "q";
          }
        }
      ])
      .then((value) => {
        userResponse(value.quantity);
        var quantity = parseInt(value.quantity);
  
        if (quantity > product.stock_quantity) {
          console.log("Insufficient quantity, order must be less than " + product.stock_quantity);
          products();
        } else {
          placeOrder(product, quantity);
        }
      });
  }
  
  let placeOrder = (product, quantity) => {
    connection.query(
      "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
      [quantity, product.item_id],
      (error, response) => {
        console.log(" You have purchased a quantity of " + quantity + " " + product.product_name);
        products();
      }
    );
  }
  
  let itemQuantity = (id, inventory) => {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].item_id === id) {
        return inventory[i];
      }
    }
    return null;
  }
  
  let userResponse = (choice) => {
    if (choice.toLowerCase() === "q") {
      console.log("Please comeback and buy something, we're desperate!");
      process.exit(0);
    }
  }
  
