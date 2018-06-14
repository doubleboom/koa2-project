-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: koadb
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `bannerimage` varchar(300) NOT NULL,
  `bannerorder` int(11) NOT NULL,
  `bannername` varchar(45) NOT NULL,
  `createtime` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userid_idx` (`userid`),
  CONSTRAINT `FK_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `categoryimage` varchar(300) DEFAULT NULL,
  `categoryorder` int(11) NOT NULL,
  `categoryname` varchar(45) NOT NULL,
  `createtime` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userid_idx` (`userid`),
  CONSTRAINT `FK_touserid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `discountname` varchar(45) NOT NULL,
  `discountprice` float DEFAULT NULL,
  `discountoriginalprice` float NOT NULL,
  `discountexpirydate` varchar(500) NOT NULL,
  `discountcategory` varchar(45) NOT NULL,
  `createtime` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `discountname_UNIQUE` (`discountname`),
  KEY `FK_discountuserid_idx` (`userid`),
  CONSTRAINT `FK_discountuserid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `good`
--

DROP TABLE IF EXISTS `good`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `good` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodcategoryid` int(11) NOT NULL,
  `goodname` varchar(45) NOT NULL,
  `goodimage` varchar(1000) NOT NULL,
  `goodorder` int(11) NOT NULL,
  `gooddescription` varchar(1000) DEFAULT NULL,
  `goodprice` float NOT NULL,
  `goodoriginalprice` float NOT NULL,
  `goodstock` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `createtime` date NOT NULL,
  `gooddetailimage` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_gooduserid_idx` (`userid`),
  KEY `FK_categoryid_idx` (`goodcategoryid`),
  CONSTRAINT `FK_categoryid` FOREIGN KEY (`goodcategoryid`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quality`
--

DROP TABLE IF EXISTS `quality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quality` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qualityimage` varchar(300) NOT NULL,
  `qualityname` varchar(45) NOT NULL,
  `userid` int(11) NOT NULL,
  `qualityorder` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_qualityuserid_idx` (`userid`),
  CONSTRAINT `FK_qualityuserid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `shopposition` varchar(200) NOT NULL,
  `shopphonenumber` varchar(20) NOT NULL,
  `shopdescription` varchar(500) NOT NULL,
  `shopname` varchar(45) NOT NULL,
  `shopimage` varchar(300) DEFAULT NULL,
  `createtime` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_userid_idx` (`userid`),
  CONSTRAINT `FK_id` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `uploadimage`
--

DROP TABLE IF EXISTS `uploadimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uploadimage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imageurl` varchar(300) NOT NULL,
  `imagename` varchar(45) NOT NULL,
  `tablename` varchar(45) NOT NULL,
  `itemid` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tablename_UNIQUE` (`tablename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `useracount` varchar(45) NOT NULL,
  `userpassword` varchar(256) NOT NULL,
  `createtime` date NOT NULL,
  `level` int(11) NOT NULL,
  `modifytime` date DEFAULT NULL,
  `modifyuser` varchar(45) NOT NULL,
  `userexcel` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `useracount_UNIQUE` (`useracount`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-14 16:59:06
