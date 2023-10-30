DROP TABLE IF EXISTS `accessories`;

CREATE TABLE accessories (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie           VARCHAR(50),  
mark                VARCHAR(50),
model               VARCHAR(50),
price               DECIMAL(10,2),
type_product             VARCHAR(50),
logoMark_url        VARCHAR(255),
image_url           VARCHAR(255),
description_text    VARCHAR(255)
);


INSERT INTO accessories (categorie, mark, model, price, type_product, logoMark_url, image_url, description_text) VALUES

('accessoire', 'Wilson', 'Pro overgrip', 7, ' 3 surgrips','https://click-backend.herokuapp.com/Wilson-logo.webp', 'https://click-backend.herokuapp.com/wilson-pro-overgrip-blanc-x-3.jpg',
'Le Pro overgrip est conçu pour offrir un excellent confort et une absorption optimale de la transpiration.');

















