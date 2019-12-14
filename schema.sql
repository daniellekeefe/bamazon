-- products
-- create/drop DB in mysql
DROP DATABASE if exists bamazon;
CREATE DATABASE bamazon;
-- command to use the bamazon DB
USE bamazon;
-- product table creation
CREATE TABLE products(
    -- auto assigmed product ID
  id INT NOT NULL AUTO_INCREMENT,
  -- product details
  product_name varchar(40) not null,
  department varchar(40) not null,
  price decimal(3,2) not null,
  stock int not null,
  total_sales decimal(6,2) not null default 0.0,
  PRIMARY KEY (id)
);
