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
    connection.query('SELECT * FROM products', function (error, resp) {
        if (error) throw error;
        // console.log(resp);
        resp.forEach(row => {
            console.log(`Id: ${row.id} Name: ${row.product_name} Price: $${row.price.toFixed(2)} Quantity: ${row.stock}\n`)
        });
        askQuestions()

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
          },
        ])
        .then(function (answers){
        let prodId = answers.prodId;
        let prodQty = answers.prodQty;
        withdrawProd(prodId, prodQty)
    });
};

function withdrawProd(prodId, prodQty) {
  connection.query('SELECT * FROM products', function (error, resp) {
    if (error) throw error;
    let prod;
    // console.log(resp);
    for (let i = 0; i < resp.length; i++) {
      if (resp[i].id == prodId) {
        prod = resp[i]
      }
    }
    console.log(prod, "prod was found")
      if(prod.stock >= prodQty){
        orderComplete(prod, prodId, prodQty);
        connection.end()
      }
      else{
        console.log("sorry the order has been cancled, there was insuffecent stock of this purchase")
        connection.end()
      }
  })
};
function orderComplete (prod, prodId, prodQty) {
  let newQuantity = prod.stock - prodQty;
  let productSales = prod.price * prodQty;
  let queryOne = "UPDATE products SET stock = ? WHERE ?";
  let queryTwo = "UPDATE products SET total_sales = ? WHERE ?";

  connection.query(queryOne,[newQuantity, {id: prodId}], function (error, resp) {
  })
  connection.query(queryTwo, [productSales, {id: prod}], function (error, resp) {
  })

}