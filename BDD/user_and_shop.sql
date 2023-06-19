

USE click_and_raquette ;

SHOW DATABASES ;

 SHOW tables;

DROP TABLE IF EXISTS `player`;

CREATE TABLE
    `player` (
        `id` int NOT NULL AUTO_INCREMENT,
        `civilite` varchar(100) DEFAULT NULL,
        `lastname` varchar(100) DEFAULT NULL,
        `forename` varchar(100) DEFAULT NULL,
        `email` varchar(255) NOT NULL,
        `password` varchar(255) NOT NULL,
        `telephone` varchar(20) DEFAULT NULL,
        `address_id` int DEFAULT NULL,
        `club_id` int DEFAULT NULL,
        `shop_id` int DEFAULT NULL,
        `string_id` int DEFAULT NULL,
        `string_rope` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ;

DROP TABLE IF EXISTS `address`;



CREATE TABLE 
    `address` (
        `id` int NOT NULL AUTO_INCREMENT,
        `road` varchar(100) DEFAULT NULL,
        `city` varchar(100) DEFAULT NULL,
        `postalCode` varchar(100) DEFAULT NULL,
        `inHabitant` int NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB  DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `club`;

CREATE TABLE
    `club` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) DEFAULT NULL,
        `number_player` int NOT NULL ,
        `road` varchar(100) DEFAULT NULL,
        `city` varchar(100) DEFAULT NULL,
        `postalCode` varchar(100) DEFAULT NULL,
        `email` varchar(255) NOT NULL,
        `Phone_number` varchar(20) DEFAULT NULL,

        PRIMARY KEY (`id`)


    ) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO club ( name, number_player, road,city, postalCode, email, Phone_number  )VALUES
( 'TC Quimper', 525, '131 boulevard de Créac\'h Gwen', 'Quimper', '29 000','contact@tcquimper.fr', '02 98 90 42 66'   ),
( 'TC Penmach', 100, 'stade municipal', '29 760', 'Penmach',  '@contact...', '06 49 51 01 59' );




 DROP TABLE IF EXISTS `shop`;

CREATE TABLE
    `shop` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) DEFAULT NULL,
        `email` varchar(255) NOT NULL,
        `address_id` int DEFAULT NULL,
        `password` varchar(255) NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `email` (`email`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;



DROP TABLE IF EXISTS `club_shop`;


CREATE TABLE `club_shop` (
    `club_id` int NOT NULL,
    `shop_id` int NOT NULL,
    PRIMARY KEY (`club_id`, `shop_id`),
    FOREIGN KEY (`club_id`) REFERENCES `club` (`id`),
    FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





 DROP TABLE IF EXISTS `string`;

CREATE TABLE string (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie VARCHAR(50), 
mark VARCHAR(50),
logoMark_url VARCHAR(255),
model VARCHAR(50),
composition VARCHAR(50),
first_characteristic VARCHAR(50),
gauge VARCHAR(10),
color VARCHAR(20),
price DECIMAL(10,2),
control INT,
power INT,
spin INT,
comfort INT,
durability INT,
packaging VARCHAR(50),
description_text VARCHAR(255),
image_url VARCHAR(255)
);


INSERT INTO string (categorie, mark, logoMark_url, model,  composition, first_characteristic, gauge, color, price, control, power, spin, comfort, durability, packaging, description_text, image_url)VALUES
( 'cordage','Yonex', ' https://click-backend.herokuapp.com/yonex-logo.webp ','Poly Tour Pro', 'Co-polyester', 'Controle effet', '1.25 mm', 'jaune', 105, 8, 6, 8, 5, 7, 'Bobine 200m', 'Cordage co-polyester pour une bonne combinaison de prise d\'effet et de contrôle.', ' https://click-backend.herokuapp.com/bobine-yonex-poly-tour-pro-200m.webp ');



 DROP TABLE IF EXISTS `ball`;

CREATE TABLE ball (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie VARCHAR(50), 
mark VARCHAR(50),
logoMark_url VARCHAR(255),
model VARCHAR(50),
price DECIMAL(10,2),
packaging VARCHAR(50),
sort VARCHAR(50),
description_text VARCHAR(255),
image_url VARCHAR(255)
);







INSERT INTO ball (categorie, mark, logoMark_url, model, price, packaging, sort, description_text, image_url)
VALUES
('balle', 'Dunlop',' https://click-backend.herokuapp.com/dunlop-logo.webp', 'Fort Elite', 3.99, 'Carton de tubes', 'standard', 'Balle de tennis en caoutchouc haute performance', ' https://click-backend.herokuapp.com/dunlop-ball.jpg  '),
('balle', 'Dunlop',' https://click-backend.herokuapp.com/dunlop-logo.webp', 'Pro Tour', 4.99, 'Tube de balles', 'standard', 'Balle de tennis professionnelle pour les tournois', ' https://click-backend.herokuapp.com/dunlop-ball.jpg ');

INSERT INTO ball (categorie, mark, logoMark_url, model, price, packaging, sort, description_text, image_url)
VALUES
('balle', 'Wilson',' https://click-backend.herokuapp.com/Wilson-logo.webp ', 'US Open', 5.99, 'Tube de balles', 'Balles oranges', 'Balle de tennis officielle de l\'US Open', ' https://click-backend.herokuapp.com/WILSON_BALLES_ORANGE_X3.jpg');


INSERT INTO ball (categorie, mark, logoMark_url, model, price, packaging, sort, description_text, image_url)
VALUES
('balle', 'Technifibre', ' https://click-backend.herokuapp.com/tecnifibre.webp ', 'Pro Red Code', 6.99, 'Tube de balles', 'standard', 'Balle de tennis de qualité supérieure pour les tournois', ' https://click-backend.herokuapp.com/thballe.jpeg');



 DROP TABLE IF EXISTS `accessories`;

CREATE TABLE accessories (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie VARCHAR(50),  
mark VARCHAR(50),
logoMark_url VARCHAR(255),
model VARCHAR(50),
price DECIMAL(10,2),
product VARCHAR(50),
description_text VARCHAR(255),
image_url VARCHAR(255)
);




INSERT INTO accessories (categorie, mark,logoMark_url, model, price, product, description_text, image_url) VALUES
('accessoire', 'Babolat', 'https://click-backend.herokuapp.com/logo-babolat.webp','Syntec Pro', 7.99, 'grip', 'Le grip Babolat Syntec Pro est conçu pour offrir une excellente adhérence et une absorption optimale de la transpiration.', 'https://click-backend.herokuapp.com/surgrip.webp'),
('accessoire','Babolat','https://click-backend.herokuapp.com/logo-babolat.webp', 'VS Original', 12.99, 'anti-vibrateur', 'L\'anti-vibrateur Babolat VS Original est conçu pour offrir une réduction des vibrations et une meilleure stabilité.', 'https://click-backend.herokuapp.com/antivibe2.webp');
                            https://click-backend.herokuapp.com/antivibe2.webp'
INSERT INTO accessories (categorie, mark,logoMark_url, model, price, product, description_text, image_url) VALUES
('accessoire', 'Head',' https://click-backend.herokuapp.com/head-logo.webp', 'Super Comp', 4.99, 'surgrip', 'Le surgrip Head Super Comp est conçu pour offrir un excellent confort et une absorption optimale de la transpiration.', 'https://click-backend.herokuapp.com/surgrip.webp'),
('accessoire', 'Head', ' https://click-backend.herokuapp.com/head-logo.webp','Smartsorb', 9.99, 'anti-vibrateur', 'L\'anti-vibrateur Head Smartsorb est conçu pour offrir une réduction des vibrations et une meilleure stabilité.', 'https://click-backend.herokuapp.com/antivibrateur.jpg');