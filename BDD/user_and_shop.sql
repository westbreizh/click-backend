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
description_text    VARCHAR(255),
);

INSERT INTO ball (categorie, mark, model, price, packaging, sort, logoMark_url, image_url, description_text)
VALUES
('balle', 'Dunlop', 'ATP Championship', 6.50, 'Tube de 4 balles', 'standard', ' https://click-backend.herokuapp.com/dunlop-logo.webp', ' https://click-backend.herokuapp.com/dunlop-championship.webp' ,
'La balle Dunlop ATP Championship possède une enveloppe extérieure en Durafelt HD Cloth, un tissu de qualité premium qui offre une frappe consistante et une grande durabilité. '),
('balle', 'Dunlop', 'Fort all court', 16, ' Bipack de tube de 4 balles', 'standard', ' https://click-backend.herokuapp.com/dunlop-logo.webp', ' https://click-backend.herokuapp.com/bi-pack-dunlop-fort.webp' ,
'Ces balles de tennis pressurisées sont adaptées à tous les niveaux de jeu et à toutes les surfaces. Elles sont équipées de la technologie Dunlop HD Core, qui améliore leur résistance sans compromettre leur jouabilité. '),
('balle', 'Dunlop', 'Fort all court', 9, 'Tube de 4 balles', 'standard', ' https://click-backend.herokuapp.com/dunlop-logo.webp', ' https://click-backend.herokuapp.com/dunlop-fort.webp' ,
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

('cordage', 'Yonex', 'Poly Tour Pro', 'Monofilament', 'garniture 12m', 10, 'Contrôle', 8, 6, 8, 5, 7, '1.25 mm', 'jaune', 'https://click-backend.herokuapp.com/yonex-poly-tour-pro-12m.webp', 'https://click-backend.herokuapp.com/yonex-logo.webp',
'Essayez le Yonex Poly Tour Pro, l\'un des meilleurs cordages en co-polyester sur le marché. Il se démarque par sa polyvalence et offre d\'exelentes prise d\'effets et un très bon contrôle. Achetez une garniture et nous vous rembourserons lorsque vous achèterez la bobine.'),

('cordage', 'Yonex', 'Poly Tour Pro', 'Monofilament', 'bobine 200m', 105, 'Contrôle', 8, 6, 8, 5, 7, '1.25 mm', 'jaune', 'https://click-backend.herokuapp.com/bobine-yonex-poly-tour-pro-200m.webp', 'https://click-backend.herokuapp.com/yonex-logo.webp',
'L\'un des meilleurs cordages en co-polyester sur le marché. Il se démarque par sa polyvalence et offre d\'exelentes prises d\'effets et un très bon contrôle.'),

('cordage', 'Yonex', 'Poly Tour Spin', 'Monofilament', 'garniture 12m', 10, 'Prise d\'effet', 9, 3, 9, 9, 8, '1.25 mm', 'bleu', 'https://click-backend.herokuapp.com/yonex_poly_tour_spin_garniture.webp', 'https://click-backend.herokuapp.com/yonex-logo.webp',
' Un cordage rigide orienté contrôle et prise d\'effets grâce à sa forme pentagonale. Achetez simplement une garniture et nous vous rembourserons le montant lors de l\'achat de la bobine complète !.'),

('cordage', 'Yonex', 'Poly Tour Spin', 'Monofilament', 'bobine 200m', 89, 'Prise d\'effet', 9, 3, 9, 3, 8, '1.25 mm', 'bleu', 'https://click-backend.herokuapp.com/yonex_poly_tour_spin_grand.webp', 'https://click-backend.herokuapp.com/yonex-logo.webp',
' Un cordage rigide orienté contrôle et prise d\'effets grâce à sa forme pentagonale. '),

('cordage', 'Babolat', 'RPM Blast', 'Monofilament', 'garniture 12m', 18, 'Prise d\'effet', 8, 4, 8, 3, 7, '1.25 mm', 'noir', 'https://click-backend.herokuapp.com/cordage-tennis-babolat-rpm-blast-12m.webp', 'https://click-backend.herokuapp.com/logo-babolat.webp',
'Le RPM Blast est un choix idéal pour les joueurs recherchant un cordage rigide offrant contrôle et prise d\'effet. Sa forme pentagonale permet d\'augmenter la rotation de la balle, tandis que sa composition monofilament assure durabilité et stabilité de tension.'),

('cordage', 'Babolat', 'RPM Blast', 'Monofilament', 'bobine 200m', 18, 'Prise d\'effet', 8, 4, 8, 3, 7, '1.25 mm', 'noir', 'https://click-backend.herokuapp.com/bobine-cordage-tennis-babolat-rpm-blast-200m.webp', 'https://click-backend.herokuapp.com/logo-babolat.webp',
'Le RPM Blast est un choix idéal pour les joueurs recherchant un cordage rigide offrant contrôle et prise d\'effet. Sa forme pentagonale permet d\'augmenter la rotation de la balle, tandis que sa composition monofilament assure durabilité et stabilité de tension.');

















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