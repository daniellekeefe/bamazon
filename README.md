# bamazon
 
Through this assignment I created Bamazon (customer & manager). Bamazon is similar to Amazon in that a customer can purchase products, and a manager can keep track of stock and sales. This projected leveraged node.js, various packages and a database powered by mysql.  
 
**Bamazon** is a command line node app that takes customer or manager inquiries and returns data from Bamazon DB, which leverages MySQL workbench. Examples of the Schema and Seeds within my GitHub repo. 
 
**Bamazon** harnesses the power of JS, MySQL and node packages to return robust information to the user via the command line. 
 
Node Packages Leveraged:
* Packages
    * mysql: Schema and Seed data that populate the contents of the database. 
    * Inquirer: node package allowing the user to interact via terminal, robust questions and selections. 
 
 
**Project is organized into** two JS files bamazoncust.js & bamazonmgr.js. Each JS file has different permissions in what they are able to access and update in the Bamazon database and product supply manipulation. 
 
* **bamazoncust.js**: Customer view: 
in calling on bamazoncust.js through node command line, the user can look at products available and complete purchases. 
* **Command Line Questions**:User will indicate what product they would like to purchase and the quantity desired. 
* **Functions** Bamazon will query the inventory, and either indicate there is adequate stock and prompt that the order will be processed, or will let the user know there is not enough stock and the order will not be processed. 
* **Order Complete** If there was enough product to complete the transaction, the transaction will be completed. 
 
* **bamazonmgr.js**: in calling on bamazonmagr.js through node command line, the user can look at products, add to inventory, and introduce new products and departments, and corresponding product information.
* **Switch statement**: switch statement cycle through various functions, if a match message will prompt the user through desired function.
Manager: View Products for Sale, View Low Inventory, Add to Inventory and Add New Product. 
* **Functions** 
View Products for Sale: will return all products, prices and quantity in the current bamazon DB. 
View Low Inventory: will return all product information for products with less than 5 units in stock; product info includes prices and quantity in the current bamazon DB. 
Add to Inventory: will allow user to select product and quantity which should be added to database. 
Add New Product: Ability to add complete new product and department to the database. 
 
 
 
App Use: 
Open New Terminal ensure you are in the correct folder. 
**How to use**: Please refer to supporting documentation below.
 
* **GitHub Repo**: https://github.com/daniellekeefe/bamazon
* **Bamazon Video Link**: https://youtu.be/PDVjAk4s6so