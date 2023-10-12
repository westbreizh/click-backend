
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
description_text    VARCHAR(255)
);

INSERT INTO ball (categorie, mark, model, price, packaging, sort, logoMark_url, image_url, description_text)
VALUES
('balle', 'Dunlop', 'Fort all court', 17.99, ' Bi-pack de tube de 4 balles', 'standard', 'http://localhost:3001/dunlop-logo.webp', '     http://localhost:3001/dunlop-championship.webp' ,
'La balle iconique de Dunlop. What else ...! '),

('balle', 'Head', 'Tour XT', 17.50, ' Bi-pack de tube de 4 balles', 'standard', ' http://localhost:3001/head-logo.webp', '     http://localhost:3001/head_tour_xt_tube_bi-pack.jpg' ,
' Elle se distingue par son meilleur contrôle et sa jouabilité accrue par rapport à la balle Tour classique, particulièrement sur les surfaces dures. De plus, la Tour XT est légèrement moins vive et offre une sensation légèrement plus souple que la Tour.'),

('balle', 'Tecnifibre', 'X-one', 17.50, 'Bi-pack de tube de 4 balles', 'standard', 'http://localhost:3001/logo-tecnifibre.webp', '     http://localhost:3001/bi-pack-tecnifibre-x-one.webp' ,
'La balle Tecnifibre X-One représente le summum de la gamme Tecnifibre. Elle est conçue avec un feutre de qualité supérieure de chez Miliken et un noyau intégrant la technologie Dynamic Core développée en collaboration avec Bridgestone');











