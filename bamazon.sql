DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(3) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Barry Bonds Authentic Jersey", "Apparel", 300.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Flip Flops", "Apparel", 20.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Lanyard", "Accessories", 5.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Tie", "Accessories", 15.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Snapback Hat", "Hats", 35.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Sporty Shades", "Glasses", 29.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Batting Gloves", "Accesories", 5.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants BBQ Utensil Set", "Lawn and Garden", 25.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Framed AT&T Park Photo", "Collectibles", 40.00, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SF Giants Panda Hat", "Hats", 20.00, 50);








