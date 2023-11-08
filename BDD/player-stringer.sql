DROP TABLE IF EXISTS `player`;

CREATE TABLE `player` (
    `id`                          int NOT NULL AUTO_INCREMENT,
    `lastname`                    varchar(100) DEFAULT NULL,
    `forename`                    varchar(100) DEFAULT NULL,
    `email`                       varchar(255) NOT NULL,
    `road`                        varchar(255) DEFAULT NULL,
    `postal_code`                 varchar(10) DEFAULT NULL,
    `city`                        varchar(100) DEFAULT NULL,
    `telephone`                   varchar(20) DEFAULT NULL,
    `stringFromShop_id`           int DEFAULT NULL,
    `string_rope`                 int DEFAULT NULL,
    `hub_id`                      int DEFAULT NULL,
    `hubBack_id`                  int DEFAULT NULL,
    `userRole`                    VARCHAR(50) NOT NULL DEFAULT 'player',
    `racquet_player`              VARCHAR(255),
    `stringFromPlayer`            VARCHAR(255) DEFAULT NULL,
    `numberKnotChoice`            VARCHAR(50),
    `password_hash`               varchar(255) NOT NULL,
    `resetToken`                  VARCHAR(255) DEFAULT NULL,
    `resetTokenExpiry`            DATETIME DEFAULT NULL,

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




