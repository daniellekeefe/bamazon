// Dependencies for various node packages
let mysql = require("mysql");
let inquirer = require("inquirer");
let http = require("http");
let fs = require("fs");

// create connection to the sql database
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // DK's username (from my SQL workbench)
  user: "root",

  // PW workbench to access DB schema & seed info from mySQL
  password: "847Fellsway",
  database: "bamazon"
});

//call on connection for mySQL and iinquirer node package allowing the user to interact via terminal and node
connection.connect();
askQs()

function askQs() {
  inquirer.prompt([{
      message: "What would you like to do?",
      type: "list",
      name: "managerAction",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }])
    //switch statement cycle through various functions, if a match message will prompt the user through desired function 
    //('switch statement to select one of many code blocks to be executed.'https://www.w3schools.com/js/js_switch.asp)
    .then(function (ans) {
      switch (ans.managerAction) {
        case "View Products for Sale":
          viewProducts()
          break;
        case "View Low Inventory":
          viewLowInventory()
          break;
        case "Add to Inventory":
          selectInventory()
          break;
        case "Add New Product":
          addProduct()
          break;
          //default keyword specifies the code to run if there is no case match
        default:
          break;
      }
    });
}
// view available products 
function viewProducts() {
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    // console.log(res);
    res.forEach(row => {
      //toFixed(2) allows the rats of the products to displaye properly (https://www.w3schools.com/jsref/jsref_tofixed.asp)
      console.log(`Id: ${row.id} Name: ${row.product_name} Price: $${row.price.toFixed(2)} Quantity: ${row.stock}\n`)
    });
    connection.end()
  })
}
// view products with less than 5 units in stock
function viewLowInventory() {
  connection.query('SELECT * FROM products WHERE stock < 5', function (error, res) {
    if (error) throw error;
    // console.log(res);
    res.forEach(row => {
      console.log(`Id: ${row.id} Name: ${row.product_name} Price: ${row.price} Quantity: ${row.stock}\n`)
    });
    connection.end()
  })
}
// funcation for retreiving data on inventory
function selectInventory(prodId, prodQty) {
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    // console.log(res);
    res.forEach(row => {
      console.log(`Id: ${row.id} Name: ${row.product_name} Price: ${row.price} Quantity: ${row.stock}\n`)
    });
// node.js command line interface that allows the user to interact and ask questions... etc (https://www.npmjs.com/package/inquirer)
//details around adding inventory below through various if and else statement
    inquirer.prompt([{
        message: "Please type in the id of the product you would like to add inventory to.",
        type: "input",
        name: "prodId"
      },
      {
        message: "what is the quantity you are adding to this item's stock.",
        type: "input",
        name: "prodQty"
      }
    ]).then(function (ans) {

      connection.query('SELECT * FROM products', function (error, resp) {
        if (error) throw error;
        let prod;
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].id == ans.prodId) {
            prod = resp[i]
          }
        }
        console.log(prod, "prod was found")
        if (prod !== undefined) {
          addToInventory(prod, ans.prodId, parseInt(ans.prodQty))
          connection.end()
        } else {
          console.log("sorry that item doesn't exist")
          connection.end()
        }
      })
    })
  })
};
//function to add to existing inventory
function addToInventory(prodObj, prodId, prodQty) {
  let newQuantity = prodObj.stock + prodQty
  let query = "update products Set stock = ? where ?";
  connection.query(query, [newQuantity, {
    id: prodId
  }], function (error, res) {})
}
//ability to add new products to inventory, and details for the new product
function addProduct(params) {
  inquirer.prompt([{
      message: "What is the name of this product?",
      type: "input",
      name: "prodName"
    },
    {
      message: "What department does this product belong to?",
      type: "input",
      name: "prodDept"
    },
    {
      message: "What is the price of this product?",
      type: "input",
      name: "prodPrice"
    },
    {
      message: "how much of this item do you have to add to stock?",
      type: "input",
      name: "prodQty"
    }
  ]).then(function (ans) {
    let query = "Insert Into products (product_name, department, price, stock) VAlUES (?, ?, ?, ?)";
    console.log(ans)
    if (ans.prodName !== '' && ans.prodDept !== '' && ans.prodPrice !== '' && ans.prodQty !== '') {
      console.log('product info validated')
      connection.query(query, [ans.prodName, ans.prodDept, ans.prodPrice, ans.prodQty], function (error, res) {
        if (error) console.log(error)
        console.log(res)
      })
      connection.end()
    } else {
      console.log("ERROR: Product info is incomplete. Please fill all prompts with complete product info!")
      connection.end()
    }
  })
}