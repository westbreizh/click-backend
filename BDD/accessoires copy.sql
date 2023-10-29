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
('accessoire', 'Babolat',' My Overgrip 3 unités', 8.50, 'surgrip', '    http://localhost:3001/logo-babolat.webp', '    http://localhost:3001/3-surgrip-babolat.webp',
 'Le grip Babolat my overgrip est conçu pour offrir une excellente adhérence et une absorption optimale de la transpiration.'),

('accessoire', 'Tourna', 'Mega Tac Blanc  ', 9.90, 'surgrip','     http://localhost:3001/logo-tourna.webp', '    http://localhost:3001/10-tourna-surgrip.webp',
'Les Surgrips Mega Tac possèdent un effet collant et sont très résistants. '),

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


















