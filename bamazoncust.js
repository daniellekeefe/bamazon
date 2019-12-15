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

start()

function start (){
    connection.query('SELECT * FROM products', function (error, res) {
        if (error) throw error;
        // console.log(res);
        res.forEach(row => {
            console.log(`Id: ${row.id} Name: ${row.product_name} Price: $${row.price.toFixed(2)}\n` )
        });
        askQuestions()

        // connection.end()
    })
}

function askQuestions() {
    inquirer.prompt([
        {
            message: "Please type in the product id you would like to order.",
            type: "input",
            name: "prodId"
        },
        {
            message: "how many of this item would you like to purchase",
            type: "input",
            name: "prodQty"
        }
    ]).then(function (ans) {
        let prodId = ans.prodId;
        let prodQty = ans.prodQty;
        // let allProd = getAllProd();
        withdrawProd(prodId, prodQty)
    });
}

function withdrawProd(prodId, prodQty) {
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    let prod;
    // console.log(res);
    for (let i = 0; i < resp.length; i++) {
      if (resp[i].id == ans.prodId) {
        prod = resp[i]
      }
    }
    console.log(prod, "prod was found")
      if(prod.stock_quantity >= prodQty){
        orderComplete(prod, prodId, prodQty)
        connection.end()
      }else{
        console.log("sorry the order has been cancled, there was insuffecent stock of this purchase")
        connection.end()
      }
  })
};
function orderComplete (prodObj, prodId, prodQty) {
  let newQuantity = prodObj.stock_quantity - prodQty;
  let productSales = prodObj.price * prodQty;
  let queryOne = "UPDATE products SET stock_quantity = ? where ?";
  let queryTwo = "UPDATE products SET product_sales = ? where ?";
  connection.query(queryOne,[newQuantity, {item_id: prodId}], function (error, res) {
  })
  connection.query(queryTwo, [productSales, { item_id: prodId }], function (error, res) {
  })
}