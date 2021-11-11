-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: ProjetStarWarsBDD
-- ------------------------------------------------------
-- Server version	10.5.9-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `CHASSEURS`
--

DROP TABLE IF EXISTS `CHASSEURS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CHASSEURS` (
  `ChasseurID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `Modele` varchar(20) DEFAULT NULL,
  `Etat` varchar(20) DEFAULT NULL,
  `PiloteID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ChasseurID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CHASSEURS`
--

/*!40000 ALTER TABLE `CHASSEURS` DISABLE KEYS */;
INSERT INTO `CHASSEURS` VALUES (5,'Y-Wing','detruit',0),(6,'X-Wing','detruit',0),(7,'Y-Wing','en maintenance',0),(8,'Y-Wing','detruit',0),(9,'Y-Wing','operationnel',1),(10,'Y-Wing','operationnel',0),(26,'Y-Wing','operationnel',0),(27,'Y-Wing','en maintenance',NULL),(28,'Y-Wing','operationnel',NULL),(29,'Y-Wing','detruit',0),(30,'Y-Wing','operationnel',NULL),(31,'Y-Wing','operationnel',NULL),(32,'Y-Wing','operationnel',NULL),(33,'Y-Wing','operationnel',NULL);
/*!40000 ALTER TABLE `CHASSEURS` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-23 14:42:24
