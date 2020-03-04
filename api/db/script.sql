DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastAccess` datetime DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `construction`;
CREATE TABLE `construction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `clientName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `report`;
CREATE TABLE `report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `constructionId` int(11) NOT NULL,
  `serviceNumber` int(11) DEFAULT 0,
  `pdf` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `word` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `fk_r_construction` FOREIGN KEY (`constructionId`) REFERENCES `construction` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `floor`;
CREATE TABLE `floor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `constructionId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `fk_f_construction` FOREIGN KEY (`constructionId`) REFERENCES `construction` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `floorId` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `observation` text COLLATE utf8_unicode_ci,
  `rating` tinyint(4) DEFAULT '0',
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  CONSTRAINT `fk_i_floor` FOREIGN KEY (`floorId`) REFERENCES `floor` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- DROP TABLE IF EXISTS `construction_floor`;
-- CREATE TABLE `construction_floor` (
--   `id_construction` int(11) NOT NULL,
--   `id_floor` int(11) NOT NULL,
--   PRIMARY KEY (`id_construction`, `id_floor`) USING BTREE,
--   CONSTRAINT `fk_cf_construction` FOREIGN KEY (`id_construction`) REFERENCES `construction` (`id`) ON DELETE CASCADE,
--   CONSTRAINT `fk_cf_floor` FOREIGN KEY (`id_floor`) REFERENCES `floor` (`id`) ON DELETE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE PROCEDURE `user_add_or_edit` (
	IN _id INT,
    IN _name varchar(255),
    IN _email varchar(255),
    IN _password varchar(255),
    IN _last_access datetime,
    IN _admin tinyint(1)
)
BEGIN
	IF _id = 0 THEN
		INSERT INTO user(`name`, `email`, `password`, `lastAccess`, `admin`, `created`, `updated`)
        VALUES (_name, _email, _password, _last_access, _admin, CURRENT_TIME(), CURRENT_TIME());
        
        SET _id = LAST_INSERT_ID();
	ELSE
		UPDATE user
        SET 
        `name` = _name,
        `email` = _email,
        `password` = _password,
        `lastAccess` = _last_access,
        `admin` = _admin,
        `updated` = CURRENT_TIME()
        WHERE `id` = _id;
	END IF;
    
    SELECT _id AS 'id';
END


