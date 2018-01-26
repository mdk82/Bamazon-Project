CREATE DATABASE bamazondb

USE bamazondb;

CREATE TABLE products
(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name varchar(50) NOT NULL,
	department_name varchar(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity int(20) NOT NULL,
	primary key(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('INSTANT PROGRAMING KNOWLEDGE', 'COOLEST DEPARTMENT EVER', 1000000.00, 1),
('POGOSTICK', 'TOYS', 29.99, 10),
('YETI RAMBLER', 'CUPS', 39.99, 30),
('DELL MONITIOR', 'COMPUTER ACCESSORIES', 129.59, 6),
('APPLE WATCH', 'SMART WATCH', 399.99, 65),
('BITCOIN', 'CRYPTO CURRENCY', 100000.00, 1),
('RAYBANS', 'SUNGLASSES', 200.00, 15),
('MARVEL COMIC', 'COMIC BOOKS', 15.99, 25),
('SONY 55in HDTV 4K', 'TVs', 899.99, 7),
('CALL OF DUTY WWII', 'VIDEO GAMES', 59.99, 40);

SELECT * FROM products
