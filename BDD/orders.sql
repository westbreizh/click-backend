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

























