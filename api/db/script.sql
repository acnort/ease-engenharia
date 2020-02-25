DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registered` timestamp NULL DEFAULT NULL,
  `last_access` datetime DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `online` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Flag para indicar se usuário está logado no sistema',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update` timestamp NULL DEFAULT NULL,
  `deleted` timestamp NULL DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `observation` text COLLATE utf8_unicode_ci,
  `rating` tinyint(4) DEFAULT '0',
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `floor`;
CREATE TABLE `floor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `construction`;
CREATE TABLE `construction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `service_number` int(11) DEFAULT 0,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `construction_item_floor`;
CREATE TABLE `construction_item_floor` (
  `id_construction` int(11) NOT NULL,
  `id_floor` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  PRIMARY KEY (`id_construction`, `id_floor`, `id_item`) USING BTREE,
  CONSTRAINT `fk_item` FOREIGN KEY (`id_item`) REFERENCES `item` (`id`),
  CONSTRAINT `fk_construction` FOREIGN KEY (`id_construction`) REFERENCES `construction` (`id`),
  CONSTRAINT `fk_floor` FOREIGN KEY (`id_floor`) REFERENCES `floor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pdf` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `word` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `construction_report`;
CREATE TABLE `construction_report` (
  `id_construction` int(11) NOT NULL,
  `id_report` int(11) NOT NULL,
  PRIMARY KEY (`id_construction`, `id_report`) USING BTREE,
  CONSTRAINT `fk_cr_construction` FOREIGN KEY (`id_construction`) REFERENCES `construction` (`id`),
  CONSTRAINT `fk_cr_report` FOREIGN KEY (`id_report`) REFERENCES `report` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
