

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
( 'cordage','Babolat','https://click-backend.herokuapp.com/logo-babolat.webp', 'RPM Blast', 'Monofilament de polyester', 'Contrôle', '1.25 mm', 'Noir', 14.90, 8, 7, 4, 6, 2, 'Garniture 12m', 'Le cordage RPM Blast est le cordage de référence des joueurs exigeants à la recherche de contrôle.',' https://click-backend.herokuapp.com/bobine.jpg  '  ),
( 'cordage','Babolat','https://click-backend.herokuapp.com/logo-babolat.webp  ' , 'Pro Hurricane Tour', 'Monofilament de polyester', 'Contrôle', '1.25 mm', 'Noir', 14.90, 8, 7, 4, 6, 2, 'Bobine 200m', 'Le Pro Hurricane Tour est un cordage idéal pour les joueurs recherchant un maximum de contrôle et de prise d''effet.', ' https://click-backend.herokuapp.com/bobine.jpg  ' ),
( 'cordage','Babolat',' /* https://click-backend.herokuapp.com/ */logo-babolat.webp  ' , 'VS Touch', 'Boyau naturel', 'Confort', '1.30 mm', 'Naturel', 72.90, 6, 5, 8, 7, 4, 'Garniture 12m', 'Le cordage VS Touch est le cordage de référence des joueurs recherchant un confort optimal et une excellente sensation de jeu.', ' https://click-backend.herokuapp.com/rpm.jpg '),
( 'cordage','Babolat',' https://click-backend.herokuapp.com/logo-babolat.webp  ' , 'XCel', 'Multifilament', 'Confort', '1.30 mm', 'Noir', 13.90, 6, 4, 7, 8, 4, 'Garniture 12m', 'Le cordage XCel est un cordage multifilament idéal pour les joueurs recherchant un maximum de confort et une bonne résistance.', '  https://click-backend.herokuapp.com/bobine.jpg' ),

INSERT INTO string (categorie, mark, logoMark_url, model,  composition, first_characteristic, gauge, color, price, control, power, spin, comfort, durability, packaging, description_text, image_url)VALUES
('cordage', 'Wilson',  ' https://click-backend.herokuapp.com/Wilson-logo.webp ', 'Sensation', 'Multifilament', 'Confort', '16', 'Naturel', 13.99, 8, 6, 7, 9, 8, 'Bobine 200m', 'Le cordage multifilament Wilson Sensation offre un excellent confort grâce à sa construction en fibres de polyamide.', ' https://click-backend.herokuapp.com/rpm.jpg'),
( 'cordage', 'Wilson', ' https://click-backend.herokuapp.com/Wilson-logo.webp  ','Revolve', 'Co-polyester', 'Contrôle', '17', 'Noir', 14.99, 9, 8, 9, 7, 6, 'Bobine 200m', 'Le cordage en co-polyester Wilson Revolve offre un excellent contrôle de balle et une grande précision.', ' https://click-backend.herokuapp.com/bobine.jpg  '),
('cordage', 'Wilson', ' https://click-backend.herokuapp.com/Wilson-logo.webp  ','Natural Gut', 'Boyau naturel', 'Sensation', '16', 'Naturel', 74.99, 9, 7, 8, 10, 5, 'Garniture 12m', 'Le cordage en boyau naturel Wilson Natural Gut offre un toucher exceptionnel et une grande puissance.', ' https://click-backend.herokuapp.com/bobine.jpg  ');

INSERT INTO string (categorie, mark, logoMark_url, model,  composition, first_characteristic, gauge, color, price, control, power, spin, comfort, durability, packaging, description_text, image_url)VALUES
( 'cordage', "Head", ' https://click-backend.herokuapp.com/head-logo.webp ',"Lynx Edge", "Co-polyester", "Contrôle", "1,25mm", "Noir", 159.90, 8, 6, 7, 5, 8, "Bobine de 200m", "Le cordage Head Lynx Edge est conçu pour les joueurs recherchant un maximum de contrôle et de précision dans leurs frappes. Sa composition en co-polyester offre une excellente durée de vie.", ' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage', "Head",' https://click-backend.herokuapp.com/head-logo.webp ', "Hawk", "Co-polyester", "Puissance", "1,25mm", "Noir", 159.90, 6, 8, 6, 7, 7, "Bobine de 200m", "Le cordage Head Hawk est conçu pour les joueurs recherchant une excellente puissance et un bon contrôle. Sa composition en co-polyester offre également une bonne durée de vie.", ' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage', "Head", ' https://click-backend.herokuapp.com/head-logo.webp',"Velocity MLT", "Multifilament", "Confort", "1,25mm", "Noir", 109.90, 6, 7, 6, 9, 6, "Garniture 12m", "Le cordage Head Velocity MLT est conçu pour les joueurs recherchant un maximum de confort dans leurs frappes. Sa composition en multifilament offre également une bonne puissance et une bonne prise d'effet.",' https://click-backend.herokuapp.com/head.jpg  ' );
INSERT INTO string ( categorie, mark, logoMark_url, model,  composition, first_characteristic, gauge, color, price, control, power, spin, comfort, durability, packaging, description_text, image_url)VALUES
( 'cordage','Technifibre',' https://click-backend.herokuapp.com/tecnifibre.webp ', 'X-One Biphase', 'Multifilament', 'Puissance', '1.24 mm', 'Naturel', 17.90, 7, 9, 8, 7, 5, 'Bobine 200m', 'Le cordage X-One Biphase de Technifibre est un cordage premium à multifilament.',' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage','Technifibre', ' https://click-backend.herokuapp.com/tecnifibre.webp ', 'Black Code', 'Monofilament', 'Contrôle', '1.18 mm', 'Noir', 14.90, 9, 6, 7, 8, 7, 'Bobine 200m', 'Le cordage Black Code de Technifibre est un cordage monofilament haut de gamme pour les joueurs qui recherchent un excellent contrôle.', ' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage','Technifibre', ' https://click-backend.herokuapp.com/tecnifibre.webp ', 'Razor Code', 'Monofilament', 'Prise d\'effet', '1.25 mm', 'Gris', 13.90, 8, 7, 9, 6, 7, 'Garniture 12m', 'Le cordage Razor Code de Technifibre est un cordage monofilament conçu pour offrir une excellente prise d\'effet.', ' https://click-backend.herokuapp.com/bobine.jpg  ');
INSERT INTO string (categorie, mark, logoMark_url, model,  composition, first_characteristic, gauge, color, price, control, power, spin, comfort, durability, packaging, description_text, image_url)VALUES
( 'cordage','Yonex', ' https://click-backend.herokuapp.com/yonex-logo.webp  ', 'Poly Tour Strike', 'Co-polyester', 'Contrôle', '1.20 mm', 'Noir', 16.99, 8, 8, 7, 6, 7, 'Bobine 200m', 'Cordage co-polyester pour un contrôle précis et une bonne durée de vie.', ' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage','Yonex', ' https://click-backend.herokuapp.com/yonex-logo.webp  ','Poly Tour Pro', 'Co-polyester', 'Puissance', '1.25 mm', 'Blanc', 16.99, 7, 9, 6, 7, 6, 'Garniture 12m', 'Cordage co-polyester pour une bonne combinaison de puissance et de contrôle.', ' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage','Yonex', ' https://click-backend.herokuapp.com/yonex-logo.webp  ', 'Poly Tour Spin G', 'Co-polyester', 'Prise effet', '1.25 mm', 'Bleu', 16.99, 8, 7, 9, 7, 6, 'Bobine 200m', 'Cordage co-polyester pour une excellente prise d\'effet et une bonne durée de vie.', ' https://click-backend.herokuapp.com/bobine.jpg  '),
( 'cordage','Yonex', ' https://click-backend.herokuapp.com/yonex-logo.webp  ', 'Poly Tour Fire', 'Co-polyester', 'Confort', '1.25 mm', 'Orange', 16.99, 6, 7, 6, 8, 6, 'Garniture 12m', 'Cordage co-polyester pour une bonne combinaison de contrôle et de confort.', ' https://click-backend.herokuapp.com/bobine.jpg  '); 



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

INSERT INTO accessories (categorie, mark,logoMark_url, model, price, product, description_text, image_url) VALUES
('accessoire', 'Head',' https://click-backend.herokuapp.com/head-logo.webp', 'Super Comp', 4.99, 'surgrip', 'Le surgrip Head Super Comp est conçu pour offrir un excellent confort et une absorption optimale de la transpiration.', 'https://click-backend.herokuapp.com/surgrip.webp'),
('accessoire', 'Head', ' https://click-backend.herokuapp.com/head-logo.webp','Smartsorb', 9.99, 'anti-vibrateur', 'L\'anti-vibrateur Head Smartsorb est conçu pour offrir une réduction des vibrations et une meilleure stabilité.', 'https://click-backend.herokuapp.com/antivibrateur.jpg');