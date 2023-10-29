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
second_characteristic       VARCHAR(50),
third_characteristic        VARCHAR(50),
first_default               VARCHAR(50),
second_default              VARCHAR(50),
gauge                       VARCHAR(255),
color                       VARCHAR(20),
image_url                   VARCHAR(255),
logoMark_url                VARCHAR(255),
description_text            VARCHAR(500)
);
 

//tecnifibre

INSERT INTO `string`(categorie, mark, model, composition, packaging, price, first_characteristic, second_characteristic, third_characteristic, first_default, second_default, gauge, color, image_url, logoMark_url, description_text)
VALUES
('cordage', 'Tecnifibre', 'Ice code', 'Monofilament', 'garniture et pose', 28, 'Puissance', 'Confort', 'Tolérance', 'Contrôle', '', '1.25 mm', 'blanc', 'https://click-backend.herokuapp.com/tecnifibre-ice-code.jpg', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp',
 'Le cordage Ice Code est souple, offrant un contact prolongé avec la balle et une puissance facile. Sa sensation de frappe unique le distingue. Il offre une prise d\'effet moyenne, un contrôle légèrement en retrait, mais excelle en confort, même en cas de décentrage. Il est durable et maintient bien la tension.'),
('cordage', 'Tecnifibre', 'Black Code', 'Monofilament', 'garniture et pose', 28, 'Prise d\'effet', 'Puissance', 'Confort', 'Contrôle', '', '1.32 mm', 'noire', 'https://click-backend.herokuapp.com/tecnifibre-black-code.jpg', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp',
 'Le cordage Tecnifibre Black Code est un cordage en co-polyester pentagonal qui intègre la technologie Thermacore de Tecnifibre. Cette innovation apporte un confort exceptionnel pour un cordage monofilament, offrant à la fois souplesse, confort, et vitesse de balle. Sa forme pentagonale optimise également la prise d\'effet.'),
('cordage', 'Tecnifibre', 'Duramix', 'Multifilament', 'garniture et pose', 28, 'Contrôle', 'Confort', 'Résistance', 'Tolérance relative', '', '1.25 mm', 'blanc', 'https://click-backend.herokuapp.com/tecnifibre-duramix.jpg', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp',
 'Le Duramix est conçu pour offrir le meilleur compromis entre confort et contrôle. Malgré sa puissance modérée, il excelle par sa polyvalence.'),
('cordage', 'Tecnifibre', 'X-One Biphase', 'Multifilament', 'garniture et pose', 37, 'Puissance', 'Confort', 'Tenue de tension', 'Contrôle', 'Prix',  '1.24 mm', 'noir', ' https://click-backend.herokuapp.com/tecnifibre-biphase-12m.webp', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp', 
'Le cordage multifilament Xone Biphase est considéré comme le meilleur multifilament du marché par de nombreux joueurs de tennis. Il offre une combinaison exceptionnelle de durée de vie, de confort, de contrôle, d\'effets et de puissance.'),
('cordage', 'Tecnifibre', 'TGV', 'Multifilament', 'garniture et pose', 32, 'Contrôle','Confort', '', 'Puissnce', '',  '1.25 mm', 'blanc', 'https://click-backend.herokuapp.com/tecnifibre-tgv.jpg', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp',
 'Le cordage Tecnifibre TGV est un multifilament axé sur le confort et le contrôle, idéal pour les joueurs souffrant de tennis elbow, bien qu\'il ne soit pas très puissant. Il se distingue par sa stabilité de tension.'),
('cordage', 'Tecnifibre', 'Red code', 'Monofilament', 'garniture et pose', 23, 'Contrôle','Prise d\'effet','Confort', 'Puissance', '',  '1.25 mm', 'rouge', ' https://click-backend.herokuapp.com/tecnifibre-red-code.jpg', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp', 
'Le cordage Tecnifibre Red Code est un co-polyester réputé pour offrir un excellent contrôle et précision lors des frappes. Bien qu\'il soit rigide, il procure un bon confort et permet une prise d\'effet efficace.'),
('cordage', 'Tecnifibre', 'Razor code', 'Monofilament', 'garniture et pose', 28, 'Confort', 'Polyvalence', 'Contrôle/puuissnce', 'Prise d\'effet', '', '1.25 mm', 'gris', ' https://click-backend.herokuapp.com/tecnifibre-razor.jpg', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp', 
'Le cordage Tecnifibre Razor Code offre un contrôle élevé et de la puissance pour les frappes puissantes. Il favorise la prise d\'effet, malgré sa rigidité, offrant un confort surprenant. Il convient aux joueurs précis, a une longue durée de vie, maintient bien la tension, et est idéal pour ceux qui cherchent équilibre entre contrôle, puissance et tenue de tension. C\'est le plus rigide de la gamme Tecnifibre, offrant un excellent contrôle.'),
('cordage', 'Tecnifibre', 'Multi Feel', 'Multifilament', 'garniture et pose', 26, 'Confort','Puissance', 'Prix', 'Contrôle', '', '1.25 mm', 'blanc', ' https://click-backend.herokuapp.com/tecnifibre-multi-feel.webp', 'https://click-backend.herokuapp.com/logo-tecnifibre.webp', 
'Le cordage Tecnifibre Multifeel test test est un multifilament reconnu pour sa puissance et son confort.  Idéal pour les joueurs recherchant puissance, confort et longévité.');


//Babolat

INSERT INTO `string`(categorie, mark, model, composition, packaging, price, first_characteristic, second_characteristic, third_characteristic, first_default, second_default, gauge, color, image_url, logoMark_url, description_text)
VALUES


('cordage', 'Babolat', 'RPM Blast', 'Monofilament', 'garniture et pose', 31, 'Prise d\'effet', '','','','', '1.25 mm', 'blanc', ' https://click-backend.herokuapp.com/babolat-rpm-blast.jpg', 'https://click-backend.herokuapp.com/logo-babolat.webp', 
'Ce cordage est un monofilament en co-polyester haute densité avec une section octogonale et un revêtement "Cross-Linked Silicone" qui offre un retour rapide à la position normale pour un effet lift exceptionnel. Il est souvent associé au jeu de Rafael Nadal en raison de sa prise d\'effet incroyable.'),
('cordage', 'Babolat', 'Xcel Comfort', 'Multifilament', 'garniture et pose', 34, 'Confort', '', '',  'longévité', '', '1.30 mm', 'blanc', ' https://click-backend.herokuapp.com/babolat-xcel.jpg', 'https://click-backend.herokuapp.com/logo-babolat.webp', 
'Le cordage Babolat Xcel satifera les joueurs de multifilament à la recherche de confort, peu regardant sur la durée de vie du cordage.'),
('cordage', 'Babolat', 'VS Touch', 'Boyau', 'garniture et pose', 57, 'Confort', 'Puissance', 'Contrôle', 'Prix', '','1.25 mm', 'blanc', ' https://click-backend.herokuapp.com/babolat-boyau-naturel-vs-touch.jpg', 'https://click-backend.herokuapp.com/logo-babolat.webp', 
'Le VS Touch 1,30 mm est un cordage de tennis en boyau naturel de vache, fabriqué en France à Ploërmel, en Bretagne. Depuis sa création en 1925, le VS est reconnu comme la référence en matière de cordages en boyau naturel. '),

('cordage', 'Babolat', 'RPM Power', 'Monofilament', 'garniture et pose', 31, 'Puissance', 'Contrôle', 'Prise d\'effet', 'longévité', '',  '1.25 mm', 'blanc', ' https://click-backend.herokuapp.com/babolat-RPM-power.jpg', 'https://click-backend.herokuapp.com/logo-babolat.webp', 
'Le cordage Babolat RPM Power offre un équilibre entre puissance et contrôle, avec une excellente prise d\'effet malgré sa forme ronde. Il n\'est pas recommandé pour les casseurs fréquents. '),

('cordage', 'Babolat', 'RPM Soft', 'Multifilament', 'garniture et pose', 31, 'Confort', 'Contrôle', '', '', '', '1.25 mm', 'blanc', ' https://click-backend.herokuapp.com/babolat-RPM-power.jpg', 'https://click-backend.herokuapp.com/logo-babolat.webp', 
'Le cordage RPM Soft de Babolat est un monofilament rond conçu pour offrir un équilibre optimal entre confort et contrôle. Il répond aux besoins des joueurs qui recherchent un niveau élevé de confort tout en maintenant un bon contrôle.'),
('cordage', 'Babolat', ' Hurricane ', 'Multifilament', 'garniture et pose', 29, 'Contrôle', '','','','', '1.25 mm', 'blanc', 'https://click-backend.herokuapp.com/babolat-hurricane.jpg', 'https://click-backend.herokuapp.com/logo-babolat.webp',
 'Le Pro hurricane Tour est un monofilament en co-polyester qui vous apportera un maximum de contrôle sur des frappes à pleine puissance. ');


//Head

INSERT INTO `string`(categorie, mark, model, composition, packaging, price, first_characteristic, second_characteristic, third_characteristic, first_default, second_default, gauge, color, image_url, logoMark_url, description_text)
VALUES

('cordage', 'Head', 'Rip Control', 'Multifilament', 'garniture et pose', 28, 'Prise d\'effet', 'Contrôle','','Confort','Tenue de tension', '1.25 mm', 'noire', ' https://click-backend.herokuapp.com/head-rip-control-black.jpg', 'https://click-backend.herokuapp.com/head-logo.webp', 
' Sa surface texturée offre une excellente adhérence, favorisant ainsi la prise d\'effet et le contrôle de la balle. Il parvient à atteindre un équilibre optimal entre puissance, contrôle, résistance et effets.'),

('cordage', 'Head', 'Velocity', 'Multifilament', 'garniture et pose', 28, 'Puissance', 'Confort','','','', '1.25 mm', 'noire', ' https://click-backend.herokuapp.com/head-velocity-noir.jpg', 'https://click-backend.herokuapp.com/head-logo.webp', 
' Le cordage Head Velocity offre un équilibre optimal entre contrôle, puissance et durabilité. Cette combinaison garantit des performances de haute qualité, adaptées aux joueurs recherchant un cordage confortable et réactif, idéal pour les frappeurs'),

('cordage', 'Head', 'Lynx Tour', 'Monofilament', 'garniture et pose', 29, 'Contrôle', 'Prise d\'effet', '','Puissance','', '1.25 mm', 'bronze', ' https://click-backend.herokuapp.com/head-lynx-tour-champagne.jpg', 'https://click-backend.herokuapp.com/head-logo.webp', 
' Sa structure hexagonale lui confère un équilibre entre contrôle et prise d\'effet, tout en offrant un niveau de confort supérieur à la moyenne. C\'est le choix idéal pour les joueurs qui frappent fort dans la balle, cherchent à maîtriser leur puissance et souhaitent optimiser leurs effets.'),

('cordage', 'Head', 'Graviy', 'Monofilament', 'garniture et pose', 28, 'Prise d\'effet', 'Contrôle','','Puissance','', '1.25 mm', 'noire', ' https://click-backend.herokuapp.com/head-gravity.jpg', 'https://click-backend.herokuapp.com/head-logo.webp', 
' Ce cordage combine une corde triangulaire sur les montants pour une excellente adhérence et une corde ronde sur les travers pour un retour rapide des cordes. Cela se traduit par un contrôle accru et une meilleure rotation de la balle.');



//Dunlop

INSERT INTO `string`(categorie, mark, model, composition, packaging, price, first_characteristic, second_characteristic, third_characteristic, first_default, second_default, gauge, color, image_url, logoMark_url, description_text)
VALUES

('cordage', 'Dunlop', 'NTMax plus', 'Monofilament', 'garniture et pose', 30,  'Contrôle','Tenue de tension','','Puissance','', '1.25 mm', 'noire', ' https://click-backend.herokuapp.com/dunlop-ntmax.jpg', 'https://click-backend.herokuapp.com/dunlop-logo.webp', 
'Ce cordage monofilament se distingue par sa souplesse, en particulier adaptée aux joueurs plus jeunes qui découvrent les monofilaments. Il offre un équilibre amélioré entre contrôle et puissance, grâce à sa grande élasticité. '),

('cordage', 'Dunlop', 'Explosive', 'Monofilament', 'garniture et pose', 30, 'Puissance', 'Confort','Tolérance','Longévité','Prise d\'effet', '1.25 mm', 'noire', ' https://click-backend.herokuapp.com/dunlop-explosive.jpg', 'https://click-backend.herokuapp.com/dunlop-logo.webp', 
' Le Dunlop Explosive est un cordage axé sur la puissance avec un contrôle suffisant. Il convient aux joueurs qui préfèrent les frappes à plat et ne recherchent pas une forte prise d\'effet.'),


//Yonex

INSERT INTO `string`(categorie, mark, model, composition, packaging, price, first_characteristic, second_characteristic, third_characteristic, first_default, second_default, gauge, color, image_url, logoMark_url, description_text)
VALUES

('cordage', 'Yonex', 'PolyTour Pro', 'Monofilament', 'garniture et pose', 28, 'Puissance', 'Confort','','Tolérance','', '1.25 mm', 'jaune', ' https://click-backend.herokuapp.com/yonex-poly-tour-pro-jaune.jpg', 'https://click-backend.herokuapp.com/yonex-logo.webp', 
'Le cordage Yonex Poly Tour Pro est un monofilament de forme ronde qui offre une sensation feutrée lors de la frappe. Il se distingue par un excellent équilibre entre contrôle et puissance, dépassant la moyenne dans ce domaine.'),

('cordage', 'Yonex', 'PolyTour Strike', 'Monofilament', 'garniture et pose', 30, 'Contrôle', 'Durabilité','','Tolérance','Confort', '1.25 mm', 'jaune', ' https://click-backend.herokuapp.com/yonex-poly-tour-strike.jpg', 'https://click-backend.herokuapp.com/yonex-logo.webp', 
'Cette corde est la plus rigide parmi les monofilaments de la gamme Yonex, ce qui en fait également la plus axée sur le contrôle. Elle est très appréciée par les joueurs qui frappent fort. Bien qu\'elle soit similaire au Poly Tour Fire, elle offre une meilleure capacité à générer de l\'effet. De plus, elle offre des sensations très nettes qui favorisent la vitesse de jeu.'),

('cordage', 'Yonex', 'PolyTour Spin', 'Monofilament', 'garniture et pose', 28, 'Prise d\'effet', 'Contrôle','','Puissance','', '1.25 mm', 'jaune', ' https://click-backend.herokuapp.com/yonex-poly-tour-spin.jpg', 'https://click-backend.herokuapp.com/yonex-logo.webp', 
'Ce cordage représente le parfait équilibre entre la capacité d\'adhérence à la balle et le contrôle parmi les cordages Yonex. Il se distingue par sa rigidité, ce qui implique qu\'il génère moins de puissance.'),

('cordage', 'Yonex', 'PolyTour Rev', 'Monofilament', 'garniture et pose', 28, 'Puissance', 'Contrôle','Polyvalence','Tolérance','', '1.25 mm', 'jaune', ' https://click-backend.herokuapp.com/yonex-poly-tour-rev.jpg', 'https://click-backend.herokuapp.com/yonex-logo.webp', 
'Ce cordage convient aux joueurs qui ont une frappe de balle de haute qualité et recherchent plus de précision et de rotation qu\'un monofilament classique. Il est idéal pour les joueurs puissants de fond de court qui aiment jouer en rythme et apprécient la précision offerte par ce cordage.');





//Luxillon

INSERT INTO `string`(categorie, mark, model, composition, packaging, price, first_characteristic, second_characteristic, third_characteristic, first_default, second_default, gauge, color, image_url, logoMark_url, description_text)
VALUES

('cordage', 'Luxilon', 'element', 'MonoFilament', 'garniture et pose', 30, 'Puissance', 'Confort','Tenue de tension','','', '1.30 mm', 'gris', ' https://click-backend.herokuapp.com/luxilon-element.jpg', 'https://click-backend.herokuapp.com/logo-luxilon.webp', 
' L\'avantage premier de cette corde est la puissance qu\'il délivre très facilement. En effet, la balle part rapidement du tamis. Le contrôle est donc en retrait sur cette référence.'),

('cordage', 'Luxilon', 'Alu Power', 'MonoFilament', 'garniture et pose', 30, 'Puissance', 'Confort','Tenue de tension','','', '1.30 mm', 'gris', ' https://click-backend.herokuapp.com/luxilon-alu-power.jpg', 'https://click-backend.herokuapp.com/logo-luxilon.webp', 
' Le cordage Luxilon Alu Power est un cordage en co-polyester qui associe à merveille la puissance, le contrôle, les sensations, la prise des effets et la tenue de tension.'),

('cordage', 'Luxilon', 'Original', 'MonoFilament', 'garniture et pose', 30, 'Puissance', 'Confort','Durabilité','','', '1.30 mm', 'gris', ' https://click-backend.herokuapp.com/luxilon-original.jpg', 'https://click-backend.herokuapp.com/logo-luxilon.webp', 
' Le Luxilon Original est idéal pour les joueurs puissants qui préfèrent imprimer un rythme soutenu depuis l\'arrière du court. En effet, les frappeurs apprécieront ses performances exceptionnelles et sa durabilité à long terme.'),

('cordage', 'Luxilon', '4G', 'MonoFilament', 'garniture et pose', 30, 'Puissance', 'Confort','Tenue de tension','','', '1.30 mm', 'gris', ' https://click-backend.herokuapp.com/luxilon-4g.jpg', 'https://click-backend.herokuapp.com/logo-luxilon.webp', 
'Le cordage Luxilon 4G, comme de nombreux autres cordages de la gamme Luxilon, se distingue par ses performances exceptionnelles en termes de sensation de la balle.
Il se positionne comme l\'un des choix les plus axés sur le contrôle, et surtout, il se démarque par sa capacité exceptionnelle à maintenir la tension.');




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


















