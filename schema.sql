DROP DATABASE IF EXISTS bamazon;
create DATABASE bamazon;

use bamazon;

create table products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

select * from products;

insert into products(product_name, department_name, price, stock_quantity)
values("Game of throns", "Movies", 14.99, 100),
    ("Air fryer", "Home-appliances", 79.99, 30),
    ("65inch UHD TV","Home-appliances", 999.99, 5),
    ("HP laptop 14.9 inch", "Electronics", 399, 10),
    ("Adidas Men's shoes", "Fashion", 69.99, 20);