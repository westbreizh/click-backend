
DROP TABLE IF EXISTS `ball`;

CREATE TABLE ball (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie           VARCHAR(50), 
mark                VARCHAR(50),
model               VARCHAR(50),
price               DECIMAL(10,2),
packaging           VARCHAR(50),
sort                VARCHAR(50),
logoMark_url        VARCHAR(255),
image_url           VARCHAR(255),
description_text    VARCHAR(500)
);

INSERT INTO ball (categorie, mark, model, price, packaging, sort, logoMark_url, image_url, description_text)
VALUES


('balle', 'Tecnifibre', 'X-one', 8.5, 'tube de 4 balles', 'standard', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp', 'https://click-backend.herokuapp.com/balle-xone.jpg' ,
'La X-One est la balle haut de gamme de Tecnifibre. La X-One est une balle vive, ultra performante et qui possède une excellente longévité. On a testé et aimé particulièrement sa longévité'),

('balle', 'Dunlop', 'Championship', 7, 'tube de 4 balles', 'standard', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp', 'https://click-backend.herokuapp.com/balles-dunlop-championship.jpg' ,
'Un peu moins résistante et qualitative que la Xone de tecnifibre, cette balle garde néanmoins de très bonne qualités et un rapport qualité prix imbattable');









