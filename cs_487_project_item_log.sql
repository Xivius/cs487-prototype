-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: cs_487_project
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_log`
--

DROP TABLE IF EXISTS `item_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `item_log` (
  `timestamp` timestamp NOT NULL,
  `timestamp_claimed` timestamp NULL DEFAULT NULL,
  `itemname` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `item_photo` varchar(250) DEFAULT NULL,
  `userIDNumber` int(11) DEFAULT NULL,
  `photoID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_log`
--

LOCK TABLES `item_log` WRITE;
/*!40000 ALTER TABLE `item_log` DISABLE KEYS */;
INSERT INTO `item_log` VALUES ('2020-03-24 17:00:55',NULL,'Blue Waterbottle','Siegel Hall','Screw on metal cap','https://d34kame2p3gj5k.cloudfront.net/media/uploads/2018/09/05155415/ocean-blue-17oz-SWB-BLUE02.jpg',NULL,NULL),('2020-03-25 15:45:02',NULL,'Red Jansport Backpack','Keating Hall','Jansport backpack with tag on side.','https://images-na.ssl-images-amazon.com/images/I/61OrIBRQaAL._AC_SL1200_.jpg',NULL,NULL),('2020-03-25 21:27:23',NULL,'White iPhone','Siegel Hall','iPhone 7S with red phone case.','https://cdn.vox-cdn.com/thumbor/_yT8ZhwZ2nq8ANaVwm462DSpexo=/0x0:2400x1600/920x613/filters:focal(1008x608:1392x992):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/53827849/rediphoneiswhite.0.jpg',NULL,NULL),('2020-03-27 14:01:45','2020-03-28 15:03:23','Red Backpack','McCormick Tribute Campus Center','Laying on the floor in the male locker room.','img/red-backpack.jpg',1234567890,NULL);
/*!40000 ALTER TABLE `item_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-15  2:32:26
