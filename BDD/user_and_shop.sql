DROP TABLE IF EXISTS `player`;

CREATE TABLE `player` (
    `id`                    int NOT NULL AUTO_INCREMENT,
    `civilite`              varchar(100) DEFAULT NULL,
    `lastname`              varchar(100) DEFAULT NULL,
    `forename`              varchar(100) DEFAULT NULL,
    `email`                 varchar(255) NOT NULL,
    `password_hash`        varchar(255) NOT NULL,
    `telephone`             varchar(20) DEFAULT NULL,
    `string_id`             varchar(100) DEFAULT NULL,
    `string_rope`           int DEFAULT NULL,
    `hub`                   varchar(100) DEFAULT NULL,
    `hubBack`               varchar(100) DEFAULT NULL,
    `userRole`              VARCHAR(50) NOT NULL DEFAULT 'player', 
    `racquet_player`        VARCHAR(255),
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
);






DROP TABLE IF EXISTS `stringer`;

CREATE TABLE stringer (
  id INT AUTO_INCREMENT   PRIMARY KEY,
  enterprise_name         VARCHAR(100) NOT NULL,
  referent_forename       VARCHAR(100),
  referent_lastname       VARCHAR(100),
  email                   VARCHAR(100),
  password_hash           VARCHAR(255) NOT NULL,
  road                    VARCHAR(255),
  postal_code             VARCHAR(10),
  city                    VARCHAR(100),
  telephone               VARCHAR(20),
  userRole                VARCHAR(50) NOT NULL DEFAULT 'stringer'
);




DROP TABLE IF EXISTS `hub`;

CREATE TABLE hub (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enterprise_name VARCHAR(100) NOT NULL,
  referent_forename VARCHAR(100),
  referent_lastname VARCHAR(100),
  email VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  road VARCHAR(255),
  postal_code VARCHAR(10),
  city VARCHAR(100),
  telephone VARCHAR(20),
  userRole VARCHAR(50) NOT NULL DEFAULT 'hub',
  collect BOOLEAN,
  withdrawal BOOLEAN
);




DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `articleList` TEXT,
  `orderDate` DATE,
  `racquetTakenDate` DATE,
  `orderReadyDate` DATE,
  `orderValidateDate` DATE,
  `statusOrder` VARCHAR(255),
  `totalPrice` DECIMAL(10, 2),
  `userInfo` TEXT,
  `hub` TEXT,
  `hubBack` TEXT
);



DROP TABLE IF EXISTS `invoices`;

CREATE TABLE IF NOT EXISTS invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_due_ DATE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);





DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
    `id` int NOT NULL AUTO_INCREMENT,
    `road` varchar(100) DEFAULT NULL,
    `city` varchar(100) DEFAULT NULL,
    `postalCode` varchar(100) DEFAULT NULL,
    `inHabitant` int NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`inHabitant`) REFERENCES `player`(`id`) ON DELETE CASCADE
) ;



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
('accessoire', 'Babolat',' My Overgrip 3 unités', 4.50, 'surgrip', '    http://localhost:3001/logo-babolat.webp', '    http://localhost:3001/3-surgrip-babolat.webp',
 'Le grip Babolat my overgrip est conçu pour offrir une excellente adhérence et une absorption optimale de la transpiration.'),

('accessoire', 'Tourna', 'Original 10 unités ', 19.90, 'surgrip','     http://localhost:3001/logo-tourna.webp', '    http://localhost:3001/10-tourna-surgrip.webp',
'Le surgrip Tourna Original est conçu pour offrir un excellent confort et une absorption optimale de la transpiration.'),

('accessoire', 'Tourna', 'Tuff 3 unités', 9.50, 'surgrip','     http://localhost:3001/logo-tourna.webp', '    http://localhost:3001/3-tourna-surgrip.webp',
'Le surgrip Tourna Tuff est conçu pour offrir un excellent confort et une absorption optimale de la transpiration.');





DROP TABLE IF EXISTS `tariffs`;

CREATE TABLE tariffs (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie_service   VARCHAR(50), 
price               DECIMAL(10,2),
description_text    VARCHAR(255)
);

INSERT INTO tariffs (categorie_service, price, description_text)
VALUES
('pose cordage', '1O', 'tarif pour un forfait de pose du un cordage'),
('dépot retrait', '1', 'tarif pour le service de collecte et retrait de la raquette');







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
('balle', 'Dunlop', 'ATP Championship', 6.50, 'Tube de 4 balles', 'standard', '     http://localhost:3001/dunlop-logo.webp', '     http://localhost:3001/dunlop-championship.webp' ,
'La balle Dunlop ATP Championship possède une enveloppe extérieure en Durafelt HD Cloth, un tissu de qualité premium qui offre une frappe consistante et une grande durabilité. '),

('balle', 'Dunlop', 'Fort all court', 16, ' Bipack de tube de 4 balles', 'standard', '     http://localhost:3001/dunlop-logo.webp', '     http://localhost:3001/bi-pack-dunlop-fort.webp' ,
'Ces balles de tennis pressurisées sont adaptées à tous les niveaux de jeu et à toutes les surfaces. Elles sont équipées de la technologie Dunlop HD Core, qui améliore leur résistance sans compromettre leur jouabilité. '),

('balle', 'Dunlop', 'Fort all court', 9, 'Tube de 4 balles', 'standard', '     http://localhost:3001/dunlop-logo.webp', '     http://localhost:3001/dunlop-fort.webp' ,
'Ces balles de tennis pressurisées sont adaptées à tous les niveaux de jeu et à toutes les surfaces. Elles sont équipées de la technologie Dunlop HD Core, qui améliore leur résistance sans compromettre leur jouabilité. ');



DROP TABLE IF EXISTS `string`;

CREATE TABLE string (
id INT PRIMARY KEY AUTO_INCREMENT,
categorie                   VARCHAR(25), 
mark                        VARCHAR(25),
model                       VARCHAR(50),
composition                 VARCHAR(25),
packaging                   VARCHAR(25),
price                       DECIMAL(10,2),
first_characteristic        VARCHAR(50),
control_rating              INT,
power_rating                INT,
spin                        INT,
comfort                     INT,
durability_rating           INT,
gauge                       VARCHAR(10),
color                       VARCHAR(20),
image_url                   VARCHAR(255),
logoMark_url                VARCHAR(255),
description_text            VARCHAR(255)
);


INSERT INTO string (categorie, mark, model, composition, packaging, price, first_characteristic, control_rating, power_rating, spin, comfort, durability_rating, gauge, color, image_url, logoMark_url, description_text)
VALUES 

('cordage', 'Yonex', 'Poly Tour Pro', 'Monofilament', 'garniture 12m', 10, 'Contrôle', 8, 6, 8, 5, 7, '1.25 mm', 'jaune', '    http://localhost:3001/yonex-poly-tour-pro-12m.webp', '    http://localhost:3001/yonex-logo.webp',
'Essayez le Yonex Poly Tour Pro, l\'un des meilleurs cordages en co-polyester sur le marché. Il se démarque par sa polyvalence et offre d\'exelentes prise d\'effets et un très bon contrôle. Achetez une garniture et nous vous rembourserons lorsque vous achèterez la bobine.'),

('cordage', 'Yonex', 'Poly Tour Pro', 'Monofilament', 'bobine 200m', 105, 'Contrôle', 8, 6, 8, 5, 7, '1.25 mm', 'jaune', '    http://localhost:3001/bobine-yonex-poly-tour-pro-200m.webp', '    http://localhost:3001/yonex-logo.webp',
'L\'un des meilleurs cordages en co-polyester sur le marché. Il se démarque par sa polyvalence et offre d\'exelentes prises d\'effets et un très bon contrôle.'),

('cordage', 'Yonex', 'Poly Tour Spin', 'Monofilament', 'garniture 12m', 10, 'Prise d\'effet', 9, 3, 9, 9, 8, '1.25 mm', 'bleu', '    http://localhost:3001/yonex_poly_tour_spin_garniture.webp', '    http://localhost:3001/yonex-logo.webp',
' Un cordage rigide orienté contrôle et prise d\'effets grâce à sa forme pentagonale. Achetez simplement une garniture et nous vous rembourserons le montant lors de l\'achat de la bobine complète !.'),

('cordage', 'Yonex', 'Poly Tour Spin', 'Monofilament', 'bobine 200m', 89, 'Prise d\'effet', 9, 3, 9, 3, 8, '1.25 mm', 'bleu', '    http://localhost:3001/yonex_poly_tour_spin_grand.webp', '    http://localhost:3001/yonex-logo.webp',
' Un cordage rigide orienté contrôle et prise d\'effets grâce à sa forme pentagonale. '),

('cordage', 'Babolat', 'RPM Blast', 'Monofilament', 'garniture 12m', 18, 'Prise d\'effet', 8, 4, 8, 3, 7, '1.25 mm', 'noir', '    http://localhost:3001/cordage-tennis-babolat-rpm-blast-12m.webp', '    http://localhost:3001/logo-babolat.webp',
'Le RPM Blast est un choix idéal pour les joueurs recherchant un cordage rigide offrant contrôle et prise d\'effet. Sa forme pentagonale permet d\'augmenter la rotation de la balle, tandis que sa composition monofilament assure durabilité et stabilité de tension.'),

('cordage', 'Babolat', 'RPM Blast', 'Monofilament', 'bobine 200m', 18, 'Prise d\'effet', 8, 4, 8, 3, 7, '1.25 mm', 'noir', '    http://localhost:3001/bobine-cordage-tennis-babolat-rpm-blast-200m.webp', '    http://localhost:3001/logo-babolat.webp',
'Le RPM Blast est un choix idéal pour les joueurs recherchant un cordage rigide offrant contrôle et prise d\'effet. Sa forme pentagonale permet d\'augmenter la rotation de la balle, tandis que sa composition monofilament assure durabilité et stabilité de tension.'),

('cordage', 'Technifibre', 'X-One Biphase', 'Multifilament', 'bobine 200m', 325, 'Confort', 7, 8, 6, 9, 5, '1.24 mm', 'noir', '    http://localhost:3001/technifibre-biphase-bobine.webp', '    http://localhost:3001/logo-technifibre.webp',
'Le cordage multifilament Xone Biphase est considéré comme le meilleur multifilament du marché par de nombreux joueurs de tennis. Il offre une combinaison exceptionnelle de durée de vie, de confort, de contrôle, d\'effets et de puissance. '),

('cordage', 'Technifibre', 'X-One Biphase', 'Multifilament', 'garniture 12m', 22, 'Confort', 7, 8, 6, 9, 5, '1.24 mm', 'noir', '    http://localhost:3001/technifibre-biphase-12m.webp', '    http://localhost:3001/logo-technifibre.webp',
'Le cordage multifilament Xone Biphase est considéré comme le meilleur multifilament du marché par de nombreux joueurs de tennis. Il offre une combinaison exceptionnelle de durée de vie, de confort, de contrôle, d\'effets et de puissance. ');















