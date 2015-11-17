-- MySQL dump 10.13  Distrib 5.6.27, for osx10.11 (x86_64)
--
-- Host: localhost    Database: xoundboy_dev
-- ------------------------------------------------------
-- Server version	5.6.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accesslevels`
--

DROP TABLE IF EXISTS `accesslevels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accesslevels` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `levelName` varchar(50) DEFAULT NULL,
  `levelRank` smallint(2) DEFAULT NULL,
  `levelNotes` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `acts`
--

DROP TABLE IF EXISTS `acts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acts` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `actName` varchar(50) DEFAULT NULL,
  `actTown` varchar(50) DEFAULT NULL,
  `actCountry` varchar(50) DEFAULT NULL,
  `label` varchar(50) DEFAULT NULL,
  `personID` smallint(5) unsigned DEFAULT NULL,
  `featured` enum('yes','no') DEFAULT 'no',
  `biog` text,
  `actNotes` longtext,
  `imgID` smallint(5) unsigned DEFAULT NULL,
  `website` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=110 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `datePosted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `headline` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `body` text CHARACTER SET utf8,
  `imgID` int(8) unsigned zerofill DEFAULT NULL,
  `imgLink` char(255) CHARACTER SET utf8 DEFAULT NULL,
  `imgPostn` enum('left','right') CHARACTER SET utf8 DEFAULT 'right',
  `imgCaption` text CHARACTER SET utf8 NOT NULL,
  `published` enum('yes','no') CHARACTER SET utf8 DEFAULT 'no',
  `archived` enum('yes','no') CHARACTER SET utf8 DEFAULT 'no',
  `pageID` smallint(19) DEFAULT NULL,
  `pageRank` smallint(3) DEFAULT NULL,
  `frontPageRank` int(3) DEFAULT NULL,
  `link` text CHARACTER SET utf8,
  `commentsDisplayed` enum('yes','no') CHARACTER SET utf8 DEFAULT 'yes',
  `onFrontPage` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=217 DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `creatives`
--

DROP TABLE IF EXISTS `creatives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `creatives` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `personID` smallint(19) unsigned NOT NULL DEFAULT '0',
  `artistName` varchar(50) DEFAULT NULL,
  `roleID` smallint(19) unsigned NOT NULL DEFAULT '0',
  `creativeNotes` text,
  `imgID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `credits`
--

DROP TABLE IF EXISTS `credits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credits` (
  `recID` smallint(19) unsigned NOT NULL DEFAULT '0',
  `creativeID` smallint(19) unsigned NOT NULL DEFAULT '0',
  `RoleID` smallint(254) unsigned NOT NULL DEFAULT '0',
  `rtyShare` int(19) NOT NULL DEFAULT '0',
  `creditNotes` longtext,
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=587 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `imgFile` varchar(100) NOT NULL DEFAULT '',
  `caption` varchar(255) NOT NULL DEFAULT 'none',
  `imgLocation` varchar(50) NOT NULL DEFAULT 'none',
  `imgDate` datetime DEFAULT NULL,
  `personID` smallint(254) unsigned NOT NULL DEFAULT '0',
  `imgNotes` longtext,
  `cameraID` smallint(5) unsigned NOT NULL DEFAULT '0',
  `thumb` enum('yes','no') DEFAULT 'no',
  PRIMARY KEY (`id`,`imgFile`)
) ENGINE=MyISAM AUTO_INCREMENT=2926 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `menuItem` char(255) DEFAULT NULL,
  `rank` smallint(3) DEFAULT NULL,
  `assignment` enum('page','file') DEFAULT 'page',
  `pageID` smallint(19) DEFAULT NULL,
  `file` char(255) DEFAULT NULL,
  `accessLevelID` smallint(3) DEFAULT NULL,
  `isPage` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `pageName` char(255) DEFAULT NULL,
  `pageAccessLevel` enum('administrator','trusted member','member','guest') DEFAULT NULL,
  `description` text,
  `keywords` text,
  `introText` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pe`
--

DROP TABLE IF EXISTS `pe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pe` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `pageID` smallint(19) DEFAULT NULL,
  `contentID` smallint(19) DEFAULT NULL,
  `position` smallint(19) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persons` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(20) NOT NULL DEFAULT '',
  `lastName` varchar(30) NOT NULL DEFAULT '',
  `address1` varchar(50) DEFAULT NULL,
  `address2` varchar(50) DEFAULT '',
  `town` varchar(50) DEFAULT '',
  `postCode` varchar(10) DEFAULT NULL,
  `country` varchar(25) NOT NULL DEFAULT '',
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(45) DEFAULT '',
  `sendEmail` enum('yes','no') NOT NULL DEFAULT 'no',
  `homePage` varchar(50) DEFAULT NULL,
  `personNotes` text,
  `actID` smallint(19) unsigned DEFAULT '1',
  `favArt` text,
  `feedback` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=191 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlists` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `actID` int(11) DEFAULT NULL,
  `yearPublished` varchar(50) DEFAULT NULL,
  `label` varchar(50) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isAlbum` varchar(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playlisttracks`
--

DROP TABLE IF EXISTS `playlisttracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlisttracks` (
  `playlistID` int(11) DEFAULT NULL,
  `recID` int(11) DEFAULT NULL,
  `position` varchar(15) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recordings`
--

DROP TABLE IF EXISTS `recordings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recordings` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `typeID` smallint(5) unsigned zerofill DEFAULT NULL,
  `audioFile` varchar(50) NOT NULL DEFAULT '',
  `filesize` int(11) DEFAULT NULL,
  `actID` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `recLocation` varchar(254) NOT NULL DEFAULT '',
  `recDate` datetime DEFAULT NULL,
  `setupID` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `imgID` smallint(5) unsigned DEFAULT NULL,
  `recNotes` text NOT NULL,
  `featured` enum('yes','no') DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=696 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `roleName` varchar(50) DEFAULT NULL,
  `roleNotes` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(50) DEFAULT NULL,
  `typeNotes` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `username` char(255) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  `personID` smallint(19) DEFAULT NULL,
  `accessLevelID` smallint(2) DEFAULT NULL,
  `dateRegistered` datetime DEFAULT NULL,
  `lastLogin` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'xoundboy_dev'
--
/*!50003 DROP PROCEDURE IF EXISTS `DeleteRecording` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteRecording`(IN idToDelete SMALLINT(5))
BEGIN
	DELETE FROM recordings
    WHERE id = idToDelete;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllArtists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllArtists`()
BEGIN
SELECT   *, a.id as id
FROM     acts a
    LEFT JOIN images i
ON       a.imgID = i.id
ORDER BY a.actName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllRecordings` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllRecordings`()
BEGIN
SELECT   *, r.id as id, DATE_FORMAT(recDate, "%D %M %Y") AS formattedDate
FROM     acts a, types t, recordings r
    LEFT JOIN images i
ON       r.imgID = i.id
WHERE    r.actID = a.id
AND      r.typeID = t.id
ORDER BY r.audioFile;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllTypes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllTypes`()
BEGIN
SELECT   *
FROM     types
ORDER BY typeName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertRecording` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertRecording`(
  IN audioFile VARCHAR(50),
  IN fileSize INT,
  IN typeID SMALLINT,
  IN actID SMALLINT,
  IN title VARCHAR(50),
  IN recLocation VARCHAR(254),
  IN recDate DATETIME,
  IN recNotes LONGTEXT
)
BEGIN
INSERT INTO recordings (
    audioFile,
    fileSize,
    typeID,
    actID,
    title,
    recLocation,
    recDate,
    recNotes
  )
  VALUES (
    audioFile,
    fileSize,
    typeID,
    actID,
    title,
    recLocation,
    recDate,
    recNotes
  );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateRecording` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateRecording`(
  IN idToUpdate SMALLINT,
  IN typeID SMALLINT,
  IN actID SMALLINT,
  IN title VARCHAR(50),
  IN recLocation VARCHAR(254),
  IN recDate DATETIME,
  IN recNotes LONGTEXT
)
BEGIN
UPDATE recordings r
  SET r.audioFile = audioFile,
    r.typeID = typeID,
    r.actID = actID,
    r.title = title,
    r.recLocation = recLocation,
    r.recDate = recDate,
    r.recNotes = recNotes
  WHERE r.id = idToUpdate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-17 17:22:46