-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 13, 2025 at 11:58 AM
-- Server version: 8.0.40
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coach_now`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `total_price` float NOT NULL,
  `coach_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `end_date`, `is_active`, `start_date`, `total_price`, `coach_id`, `user_id`) VALUES
('051096d5-4446-4bc9-aea2-29eff8fb2622', '2025-06-23 13:00:00.000000', b'1', '2025-06-23 12:00:00.000000', 85, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '7b3f88b9-1da4-4e71-b07c-b173127599eb'),
('164c2dc3-e4cd-45da-9189-482675106ccb', '2025-07-11 11:00:00.000000', b'1', '2025-07-11 10:00:00.000000', 75, 'c272f64b-a3c2-4465-a452-198e772ac643', '5d236e28-d195-4cbc-8697-6c8f6768d644'),
('1c08a383-847c-4602-8e7b-4883cdc3f26d', '2025-06-13 11:00:00.000000', b'1', '2025-06-13 10:00:00.000000', 320, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'eb38184c-a257-42ce-990b-27cd5ea08384'),
('1e2e0e44-015c-4800-b10d-b9b1fddff8da', '2025-07-17 11:00:00.000000', b'1', '2025-07-17 10:00:00.000000', 85, '400a193b-535f-4d1b-89c1-5b1dfe08b402', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('25282ff2-4bf4-4991-ae77-c4e8b9d36689', '2025-06-20 12:00:00.000000', b'1', '2025-06-20 11:00:00.000000', 85, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '5d236e28-d195-4cbc-8697-6c8f6768d644'),
('2d6952bc-cf7f-44c9-94a3-9dab832e35da', '2025-06-30 23:59:59.000000', b'1', '2025-06-28 00:00:00.000000', 0, '29641a44-ca17-4ef2-bce2-a231221135d2', '838d7c72-1d33-496e-8d11-1b8deadaee40'),
('2e95f2a0-3cde-4a7c-8644-344503202a5e', '2025-06-26 12:00:00.000000', b'1', '2025-06-26 11:00:00.000000', 58, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('2f5f12cf-810d-4993-97fe-a3ad2bb7b497', '2025-07-15 11:00:00.000000', b'1', '2025-07-15 10:00:00.000000', 130, '2d9ab6f4-6668-4880-a46d-0772391aa349', '7b3f88b9-1da4-4e71-b07c-b173127599eb'),
('2fe83323-a724-4672-9a18-e2b0a5a192e8', '2025-06-12 10:00:00.000000', b'1', '2025-06-12 09:00:00.000000', 320, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('3baeca3f-0b52-420d-b584-364350280fa4', '2025-07-18 11:00:00.000000', b'1', '2025-07-18 10:00:00.000000', 58, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', 'eb38184c-a257-42ce-990b-27cd5ea08384'),
('423033eb-cc8b-4325-ab72-b84bf701ca30', '2025-06-18 10:00:00.000000', b'1', '2025-06-18 09:00:00.000000', 85, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '20533e43-618a-48b0-ae02-1518f8ce1fa2'),
('49b9ec28-6d71-4629-b1bf-5e89001575a7', '2025-06-13 12:00:00.000000', b'1', '2025-06-13 11:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('54aca83c-48d4-4283-bbb1-e45c953056fa', '2025-07-08 11:00:00.000000', b'1', '2025-07-08 10:00:00.000000', 320, '37527d38-3935-4b43-b9e0-73ea8e90a951', '23706edb-975c-47be-825e-c806e1dcf98e'),
('786b445e-fb5d-4333-81f9-8702aa9ba7ec', '2025-06-18 14:00:00.000000', b'1', '2025-06-18 13:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('79cfd0da-be9a-420b-b397-fb08192703ef', '2025-06-06 10:00:00.000000', b'1', '2025-06-06 09:00:00.000000', 130, '2d9ab6f4-6668-4880-a46d-0772391aa349', '500c82b9-31f9-470f-bd07-847ce817708b'),
('7db1de32-3473-4f57-ac11-3adfe62d566e', '2025-06-24 10:00:00.000000', b'1', '2025-06-24 09:00:00.000000', 58, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '5d236e28-d195-4cbc-8697-6c8f6768d644'),
('81ab1153-1e5a-4f78-85f8-3bec63172a36', '2025-06-03 11:00:00.000000', b'1', '2025-06-03 10:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', '23706edb-975c-47be-825e-c806e1dcf98e'),
('81aedbae-54c0-492a-854c-c5fa08eb401a', '2025-06-11 12:00:00.000000', b'1', '2025-06-11 11:00:00.000000', 65, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('83d5b05c-786c-423a-b1e3-054db7ce4cd1', '2025-07-10 11:00:00.000000', b'1', '2025-07-10 10:00:00.000000', 58, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '500c82b9-31f9-470f-bd07-847ce817708b'),
('8ac1dd06-ef87-4f04-bf49-459a71337bd9', '2025-06-19 11:00:00.000000', b'1', '2025-06-19 10:00:00.000000', 85, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '44da51e0-4234-459a-8ad4-caa981f56bfa'),
('92be841c-71fe-4d4b-b7c2-6ee96f2954ee', '2025-06-27 13:00:00.000000', b'1', '2025-06-27 12:00:00.000000', 58, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('9394ecf0-b7cd-43a7-9ec0-066f8eb26899', '2025-06-13 17:00:00.000000', b'0', '2025-06-13 16:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('a0b33fb7-c004-4ae8-a236-f3db5ca79a57', '2025-06-02 10:00:00.000000', b'1', '2025-06-02 09:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('a4911cce-5b15-4939-a689-319eaa383244', '2025-07-14 11:00:00.000000', b'1', '2025-07-14 10:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', '797f7e90-d56e-4b14-a487-54f76f44606f'),
('aebbfa2e-5edd-4f6c-bd11-7dc4f4171535', '2025-06-17 13:00:00.000000', b'1', '2025-06-17 12:00:00.000000', 320, '37527d38-3935-4b43-b9e0-73ea8e90a951', '44da51e0-4234-459a-8ad4-caa981f56bfa'),
('b26bfa25-e900-448d-b58d-ad09d2e3a5bb', '2025-07-02 12:00:00.000000', b'1', '2025-07-02 11:00:00.000000', 75, 'c272f64b-a3c2-4465-a452-198e772ac643', '23706edb-975c-47be-825e-c806e1dcf98e'),
('b45d8ddb-1063-46e0-9292-91a12a6ce26b', '2025-06-30 10:00:00.000000', b'1', '2025-06-30 09:00:00.000000', 75, 'c272f64b-a3c2-4465-a452-198e772ac643', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('b598b7b7-b4bf-4ad0-b110-b89e8437c357', '2025-06-16 12:00:00.000000', b'1', '2025-06-16 11:00:00.000000', 320, '37527d38-3935-4b43-b9e0-73ea8e90a951', '20533e43-618a-48b0-ae02-1518f8ce1fa2'),
('b5f5c448-5cdd-4629-ad7e-cf34e909ec40', '2025-06-10 12:00:00.000000', b'1', '2025-06-10 11:00:00.000000', 130, '2d9ab6f4-6668-4880-a46d-0772391aa349', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('b9adb649-e826-4455-bd94-423fb77d82ca', '2025-06-28 23:59:59.000000', b'1', '2025-06-21 00:00:00.000000', 0, '29641a44-ca17-4ef2-bce2-a231221135d2', '838d7c72-1d33-496e-8d11-1b8deadaee40'),
('c7368ac0-7db0-40f9-8a84-a3a191fe2086', '2025-06-05 13:00:00.000000', b'1', '2025-06-05 12:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', '797f7e90-d56e-4b14-a487-54f76f44606f'),
('d0038e00-a665-4f07-8322-a33747bcbe69', '2025-07-03 13:00:00.000000', b'1', '2025-07-03 12:00:00.000000', 75, 'c272f64b-a3c2-4465-a452-198e772ac643', '500c82b9-31f9-470f-bd07-847ce817708b'),
('d4054af8-4128-481f-946d-be2a0287eaa3', '2025-07-07 11:00:00.000000', b'1', '2025-07-07 10:00:00.000000', 130, '2d9ab6f4-6668-4880-a46d-0772391aa349', '20533e43-618a-48b0-ae02-1518f8ce1fa2'),
('dcb526f4-87b8-4005-8f48-1754ccb110c4', '2025-06-04 12:00:00.000000', b'1', '2025-06-04 11:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', '500c82b9-31f9-470f-bd07-847ce817708b'),
('e1f1dcee-87e5-4057-9702-4d9f16b471b1', '2025-06-09 11:00:00.000000', b'1', '2025-06-09 10:00:00.000000', 130, '2d9ab6f4-6668-4880-a46d-0772391aa349', '797f7e90-d56e-4b14-a487-54f76f44606f'),
('e2f33ad2-623e-480c-a022-8b084a5bbdb0', '2025-07-09 11:00:00.000000', b'1', '2025-07-09 10:00:00.000000', 85, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '44da51e0-4234-459a-8ad4-caa981f56bfa'),
('e8de50c9-a4a6-4ce8-ba46-7738c42d1d34', '2025-07-16 11:00:00.000000', b'1', '2025-07-16 10:00:00.000000', 320, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('eb4016f7-ad39-43fa-8cb7-284a873aa5dc', '2025-07-04 11:00:00.000000', b'1', '2025-07-04 10:00:00.000000', 65, '29641a44-ca17-4ef2-bce2-a231221135d2', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('edf1d76d-fa45-4ec5-a386-858dcb2bd030', '2025-07-01 11:00:00.000000', b'1', '2025-07-01 10:00:00.000000', 75, 'c272f64b-a3c2-4465-a452-198e772ac643', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('f0dcd880-c452-4aa6-b62d-5236b66a17fb', '2025-06-11 13:00:00.000000', b'1', '2025-06-11 12:00:00.000000', 130, '2d9ab6f4-6668-4880-a46d-0772391aa349', 'eb38184c-a257-42ce-990b-27cd5ea08384'),
('f40ee73a-9601-40d0-9aa4-0feeae5a452f', '2025-06-25 11:00:00.000000', b'1', '2025-06-25 10:00:00.000000', 58, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '7b3f88b9-1da4-4e71-b07c-b173127599eb');

-- --------------------------------------------------------

--
-- Table structure for table `coach`
--

CREATE TABLE `coach` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `birthdate` date NOT NULL,
  `gender` enum('FEMALE','MALE') COLLATE utf8mb4_general_ci NOT NULL,
  `hourly_rate` float NOT NULL,
  `profile_picture_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`id`, `birthdate`, `gender`, `hourly_rate`, `profile_picture_url`, `user_id`) VALUES
('29641a44-ca17-4ef2-bce2-a231221135d2', '2004-07-09', 'MALE', 65, 'https://benoit.fun/coachnow/benoit.webp', '838d7c72-1d33-496e-8d11-1b8deadaee40'),
('2d9ab6f4-6668-4880-a46d-0772391aa349', '2003-05-15', 'FEMALE', 130, 'https://static1.purepeople.com/uploads/30/0c/f4/be/5daacb573e230e98-580x0-2.jpg', 'fe46bcb0-3ca0-426e-8e02-0a263c710f7a'),
('37527d38-3935-4b43-b9e0-73ea8e90a951', '1986-10-08', 'FEMALE', 320, 'https://static1.purepeople.com/uploads/10/6a/81/f8/88da5195ea7c9120-580x0-2.jpg', '879f7f4c-469a-4641-9cf8-781089b1ab82'),
('400a193b-535f-4d1b-89c1-5b1dfe08b402', '2000-05-22', 'MALE', 85, 'https://lckingscourier.net/wp-content/uploads/2022/08/8vmg1zi4nz391.jpg', '79592a11-284b-4ca8-a63d-265976261972'),
('bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '2000-08-27', 'MALE', 58, 'https://benoit.fun/coachnow/kilian.jpg', '3c688647-39e3-4f85-ba29-44fc9eedf8f3'),
('c272f64b-a3c2-4465-a452-198e772ac643', '2005-04-03', 'MALE', 75, 'https://benoit.fun/coachnow/raphael.webp', '9ec7df80-8003-49e6-bca4-700eeebcc473');

-- --------------------------------------------------------

--
-- Table structure for table `coach_levels`
--

CREATE TABLE `coach_levels` (
  `coach_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `levels` enum('BEGINNER','HIGHLEVEL','MEDIUM') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_levels`
--

INSERT INTO `coach_levels` (`coach_id`, `levels`) VALUES
('29641a44-ca17-4ef2-bce2-a231221135d2', 'MEDIUM'),
('c272f64b-a3c2-4465-a452-198e772ac643', 'HIGHLEVEL'),
('bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', 'MEDIUM'),
('37527d38-3935-4b43-b9e0-73ea8e90a951', 'HIGHLEVEL'),
('2d9ab6f4-6668-4880-a46d-0772391aa349', 'HIGHLEVEL'),
('400a193b-535f-4d1b-89c1-5b1dfe08b402', 'HIGHLEVEL');

-- --------------------------------------------------------

--
-- Table structure for table `coach_sports`
--

CREATE TABLE `coach_sports` (
  `coach_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `sports` enum('BASKETBALL','FITNESS','FOOTBALL','RUNNING','SWIMMING','CYCLING','TENNIS','RUGBY','HANDBALL','BOXING','HORSE_RIDING','YOGA') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coach_sports`
--

INSERT INTO `coach_sports` (`coach_id`, `sports`) VALUES
('29641a44-ca17-4ef2-bce2-a231221135d2', 'SWIMMING'),
('29641a44-ca17-4ef2-bce2-a231221135d2', 'RUNNING'),
('29641a44-ca17-4ef2-bce2-a231221135d2', 'FITNESS'),
('c272f64b-a3c2-4465-a452-198e772ac643', 'FITNESS'),
('c272f64b-a3c2-4465-a452-198e772ac643', 'BASKETBALL'),
('bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', 'FITNESS'),
('37527d38-3935-4b43-b9e0-73ea8e90a951', 'SWIMMING'),
('2d9ab6f4-6668-4880-a46d-0772391aa349', 'TENNIS'),
('400a193b-535f-4d1b-89c1-5b1dfe08b402', 'FITNESS');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `comment` text COLLATE utf8mb4_general_ci,
  `date` datetime(6) NOT NULL,
  `rating` float NOT NULL,
  `coach_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`id`, `comment`, `date`, `rating`, `coach_id`, `user_id`) VALUES
('02d04d85-1192-4451-8f35-61d8402ec70e', 'Séance automatique du 2025-07-08', '2025-07-08 11:00:00.000000', 3.4, '37527d38-3935-4b43-b9e0-73ea8e90a951', '23706edb-975c-47be-825e-c806e1dcf98e'),
('04935c57-6231-4652-bb3b-e4e70e73c26d', 'Séance automatique du 2025-07-03', '2025-07-03 13:00:00.000000', 5, 'c272f64b-a3c2-4465-a452-198e772ac643', '500c82b9-31f9-470f-bd07-847ce817708b'),
('2b94fecb-6f98-4ec4-a362-094fd4b0566b', 'Séance automatique du 2025-06-20', '2025-06-20 12:00:00.000000', 4, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '5d236e28-d195-4cbc-8697-6c8f6768d644'),
('2dd1c136-b184-4918-b2ee-029940d16af1', 'Séance automatique du 2025-06-11', '2025-06-11 13:00:00.000000', 5, '2d9ab6f4-6668-4880-a46d-0772391aa349', 'eb38184c-a257-42ce-990b-27cd5ea08384'),
('31cc373f-78f3-4a11-9544-243fe50539c4', 'Séance automatique du 2025-07-17', '2025-07-17 11:00:00.000000', 5, '400a193b-535f-4d1b-89c1-5b1dfe08b402', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('35722088-cf29-4046-bbaa-3864843a6d8b', 'Séance automatique du 2025-07-18', '2025-07-18 11:00:00.000000', 1.8, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', 'eb38184c-a257-42ce-990b-27cd5ea08384'),
('378278da-7857-4c99-b058-566799548697', 'Séance automatique du 2025-07-11', '2025-07-11 11:00:00.000000', 1.8, 'c272f64b-a3c2-4465-a452-198e772ac643', '5d236e28-d195-4cbc-8697-6c8f6768d644'),
('39225230-0c91-44a4-9f1e-bd97c01827c1', 'Séance automatique du 2025-06-12', '2025-06-12 10:00:00.000000', 2, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('3ed69b3a-18bd-4046-8f0e-2e07437bc694', 'Séance automatique du 2025-06-03', '2025-06-03 11:00:00.000000', 3, '29641a44-ca17-4ef2-bce2-a231221135d2', '23706edb-975c-47be-825e-c806e1dcf98e'),
('466d8c67-d53e-4e31-9b39-e31122907dc1', 'Séance automatique du 2025-06-19', '2025-06-19 11:00:00.000000', 3, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '44da51e0-4234-459a-8ad4-caa981f56bfa'),
('487e1c2f-f401-487f-8bc1-fdb551fbefd1', 'Séance automatique du 2025-07-01', '2025-07-01 11:00:00.000000', 3, 'c272f64b-a3c2-4465-a452-198e772ac643', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('4cd67a66-4c20-4ea1-bf5a-37f03d4106c2', 'Séance automatique du 2025-06-05', '2025-06-05 13:00:00.000000', 5, '29641a44-ca17-4ef2-bce2-a231221135d2', '797f7e90-d56e-4b14-a487-54f76f44606f'),
('56888578-b50e-4664-975f-a8e8c0603efc', 'Séance automatique du 2025-07-02', '2025-07-02 12:00:00.000000', 4, 'c272f64b-a3c2-4465-a452-198e772ac643', '23706edb-975c-47be-825e-c806e1dcf98e'),
('5c551146-03dc-4b28-98ba-94e1076fff66', 'Séance automatique du 2025-06-09', '2025-06-09 11:00:00.000000', 3, '2d9ab6f4-6668-4880-a46d-0772391aa349', '797f7e90-d56e-4b14-a487-54f76f44606f'),
('5dfa7ddd-83ed-4b6f-a757-697261eeb162', 'Séance automatique du 2025-06-10', '2025-06-10 12:00:00.000000', 4, '2d9ab6f4-6668-4880-a46d-0772391aa349', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('65db882c-7057-46c7-8dea-d7997a2471e7', 'Séance automatique du 2025-06-24', '2025-06-24 10:00:00.000000', 2, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '5d236e28-d195-4cbc-8697-6c8f6768d644'),
('6bd79a52-b2f5-49c8-be42-45b4aed26ab8', 'Séance automatique du 2025-07-15', '2025-07-15 11:00:00.000000', 3.4, '2d9ab6f4-6668-4880-a46d-0772391aa349', '7b3f88b9-1da4-4e71-b07c-b173127599eb'),
('6f26d993-c9a4-499c-b024-6bd734d3e46a', 'Séance automatique du 2025-06-04', '2025-06-04 12:00:00.000000', 4, '29641a44-ca17-4ef2-bce2-a231221135d2', '500c82b9-31f9-470f-bd07-847ce817708b'),
('7032eecf-8aba-4b13-89f2-9869be5a596a', 'Séance automatique du 2025-06-23', '2025-06-23 13:00:00.000000', 5, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '7b3f88b9-1da4-4e71-b07c-b173127599eb'),
('71347270-09d7-4a8b-80c7-f04af58bc013', 'Séance automatique du 2025-06-02', '2025-06-02 10:00:00.000000', 2, '29641a44-ca17-4ef2-bce2-a231221135d2', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('7c6b2171-bc6d-4615-80c6-f5f2be36e381', 'Séance automatique du 2025-06-17', '2025-06-17 13:00:00.000000', 5, '37527d38-3935-4b43-b9e0-73ea8e90a951', '44da51e0-4234-459a-8ad4-caa981f56bfa'),
('8c669971-308b-4fc5-a158-7c742c3aa4bf', 'Séance automatique du 2025-06-25', '2025-06-25 11:00:00.000000', 3, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '7b3f88b9-1da4-4e71-b07c-b173127599eb'),
('9e313992-f065-4098-a31d-50608c7f65f1', 'Séance automatique du 2025-07-07', '2025-07-07 11:00:00.000000', 2.6, '2d9ab6f4-6668-4880-a46d-0772391aa349', '20533e43-618a-48b0-ae02-1518f8ce1fa2'),
('a0785bbf-915a-427f-b21e-2fed0860f54f', 'Séance automatique du 2025-06-06', '2025-06-06 10:00:00.000000', 2, '2d9ab6f4-6668-4880-a46d-0772391aa349', '500c82b9-31f9-470f-bd07-847ce817708b'),
('a4cffa1a-aa76-4a48-8e05-31cd94545cbb', 'Séance automatique du 2025-06-26', '2025-06-26 12:00:00.000000', 4, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('bc36589f-805a-4b71-b833-30842b4cf442', 'Séance automatique du 2025-07-04', '2025-07-04 11:00:00.000000', 1.8, '29641a44-ca17-4ef2-bce2-a231221135d2', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('c3cab431-bf89-4b15-86d7-4fc8a8d4827b', 'Séance automatique du 2025-06-27', '2025-06-27 13:00:00.000000', 5, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '19a890d2-2846-442e-a5b7-3c93e8d2ff0b'),
('c7ad7d91-ab77-4e80-b4fd-93d4e4c22ce3', 'Séance automatique du 2025-06-30', '2025-06-30 10:00:00.000000', 2, 'c272f64b-a3c2-4465-a452-198e772ac643', 'bfbe57b2-aae8-47d7-925c-f05f0f3e1e26'),
('c80be627-d682-4956-a10f-90a326c97e51', 'Séance automatique du 2025-06-13', '2025-06-13 11:00:00.000000', 3, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'eb38184c-a257-42ce-990b-27cd5ea08384'),
('c8262cf8-2ac6-41f7-9ac3-2bbe8efe8d32', 'Séance automatique du 2025-06-18', '2025-06-18 10:00:00.000000', 2, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '20533e43-618a-48b0-ae02-1518f8ce1fa2'),
('d4f78ab0-ff20-4930-88b5-c353a1eb095c', 'Séance automatique du 2025-07-16', '2025-07-16 11:00:00.000000', 4.2, '37527d38-3935-4b43-b9e0-73ea8e90a951', 'a560a444-0441-455d-a45d-03c55ed85a9c'),
('d5468204-ee42-4ee6-9308-cf38143c76d1', 'Séance automatique du 2025-06-16', '2025-06-16 12:00:00.000000', 4, '37527d38-3935-4b43-b9e0-73ea8e90a951', '20533e43-618a-48b0-ae02-1518f8ce1fa2'),
('dd48f48f-54e3-4133-8c9c-23ef16e2fdbb', 'Séance automatique du 2025-07-09', '2025-07-09 11:00:00.000000', 4.2, '400a193b-535f-4d1b-89c1-5b1dfe08b402', '44da51e0-4234-459a-8ad4-caa981f56bfa'),
('e9084eeb-1d31-418a-9ff5-85d63918ec9d', 'Séance automatique du 2025-07-10', '2025-07-10 11:00:00.000000', 5, 'bcaa35d5-88f8-4bb1-b7eb-94169faa1d0e', '500c82b9-31f9-470f-bd07-847ce817708b'),
('ea6e2042-f33b-4e81-be83-4ec74dee91ec', 'Séance automatique du 2025-07-14', '2025-07-14 11:00:00.000000', 2.6, '29641a44-ca17-4ef2-bce2-a231221135d2', '797f7e90-d56e-4b14-a487-54f76f44606f');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('ADMIN','COACH','USER') COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `role`) VALUES
('19a890d2-2846-442e-a5b7-3c93e8d2ff0b', 'cesar@moreau.fr', 'César', 'Moreau', '$2a$10$mP/yo/jSO.HQBAETeLagVe7q1vwD33SVq03wEvuH3qJJfAR.647va', 'USER'),
('20533e43-618a-48b0-ae02-1518f8ce1fa2', 'guillaume@samsonrichert.fr', 'Guillaume', 'Samson-Richert', '$2a$10$XSuVg25EXSJjC0MLy.uyDej6mUC7uwmiQUMph1WAcHhOjrjSoZvm.', 'USER'),
('23706edb-975c-47be-825e-c806e1dcf98e', 'pablo@deteba.fr', 'Pablo', 'De Teba', '$2a$10$Y2TqXk11vPgmMiseqNW1XO3z6Cumtg4ZaFe/nayYwk8.a5MJjFqzO', 'USER'),
('3c688647-39e3-4f85-ba29-44fc9eedf8f3', 'kilian@coachnow.fr', 'Kilian', 'Olry', '$2a$10$5W2mQWJmZuGtb4EVzh1kouvTQD4KDYoMHUa9u47BQgcw9BAJBG7je', 'COACH'),
('44da51e0-4234-459a-8ad4-caa981f56bfa', 'richard@cambe.fr', 'Richard', 'Cambe', '$2a$10$35La.7DVi2wEn0wlKRm7W.bxkxPn7eP8JZlpC1Sg8UlfdKXKLIa6q', 'USER'),
('500c82b9-31f9-470f-bd07-847ce817708b', 'mael@langlois.fr', 'Maël', 'Langlois', '$2a$10$irqCFwIcOCy.Y7Ob1tmgpO0dwA2xTKPiGDkWtIfisTeZFYbNp0r2O', 'USER'),
('5d236e28-d195-4cbc-8697-6c8f6768d644', 'sarah@leconte.fr', 'Sarah', 'Leconte', '$2a$10$eOS9stE/TP.YKbb7rUqwTOtdb4.FmsQmgXfodWZFqizSasqFJx4Mu', 'USER'),
('79592a11-284b-4ca8-a63d-265976261972', 'alex@eubank.fr', 'Alex', 'Eubank', '$2a$10$oazgFVJczvnpoNRkc.WWV.xz./pcKMzAQve7rnZnDqymlmjxKXj3q', 'COACH'),
('797f7e90-d56e-4b14-a487-54f76f44606f', 'lucas@narguet.fr', 'Lucas', 'Narguet', '$2a$10$XHXvOyrc1D/3lWaZFJ.qp.vZW45aCAYmjt3hudAtCsjY/J54lQhvu', 'USER'),
('7b3f88b9-1da4-4e71-b07c-b173127599eb', 'marc@loulembo.fr', 'Marc', 'Loulembo', '$2a$10$8/37eOuoxx8WIBnrj0NqU.JB89JEaWNhiTw1NERT3A.yKPPBoXNae', 'USER'),
('838d7c72-1d33-496e-8d11-1b8deadaee40', 'hello@benoit.fun', 'Benoît', 'Parmentier', '$2a$10$Vezp3ok9KZYJmxzw0gmph.eI.2ZvISTJBuvO38jGGydfDeGhNP9xy', 'COACH'),
('879f7f4c-469a-4641-9cf8-781089b1ab82', 'laure@manaudou.fr', 'Laure', 'Manaudou', '$2a$10$hZzKoZhmn8fw/zggGUSMOu3W63Xm2OuurDgNxawMdvW9XM9ZsQm.i', 'COACH'),
('9ec7df80-8003-49e6-bca4-700eeebcc473', 'raphael@coachnow.fr', 'Raphaël', 'Raclot', '$2a$10$cqm4ST5Pobpq6Iq9I2wU5ewtkI89C9bF1ByxmgNVP4t7y.RlEtoYq', 'COACH'),
('a560a444-0441-455d-a45d-03c55ed85a9c', 'alexandre@ribeiro.fr', 'Alexandre', 'Ribeiro', '$2a$10$QtnHupJ/t93XEYJSvY5.JO2vNjioNJPyqHUg4TIEBdX7MAPHcH/1O', 'USER'),
('bfbe57b2-aae8-47d7-925c-f05f0f3e1e26', 'mateo@grange.fr', 'Matéo', 'Grange', '$2a$10$ggFwSOMsoBbYovu0tUDOx.tzNQeHukoWBWShC8yOEvSaE72EYN0iW', 'USER'),
('ca8aa093-9678-425f-8860-c4992dac2395', 'kilian@poussard.fr', 'Kilian', 'Poussard', '$2a$10$6w4mPUEb/9ynYOG3XeNbzuHSkJBxOmpoPEdlVUPItaGhp0qIhfKB6', 'USER'),
('d5fe47e5-0df1-4b09-8cc9-5d78f2284ea8', 'admin@coachnow.fr', 'Administrateur', 'CoachNow', '$2a$10$CDXj//c1VFn1itNMvlfqKeJVTFHbEEoE1dA1LP53jKK.gg9GAkV/i', 'ADMIN'),
('eb38184c-a257-42ce-990b-27cd5ea08384', 'yasmina@bravo.fr', 'Yasmina', 'Bravo', '$2a$10$Y0r3F5EOhPuwFb.i8LYlWON3tyz7mLeZQSNtdBimj44aF9C8/NwFy', 'USER'),
('fe46bcb0-3ca0-426e-8e02-0a263c710f7a', 'lois@boisson.fr', 'Loïs', 'Boisson', '$2a$10$uSm.NquNl2mwCGLsKpba2OFA/DmxBHL/vxdKNEzXIiG3DfZ0yT2zm', 'COACH');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlx03fqdb0xo0jbxe2f07g8uf5` (`coach_id`),
  ADD KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`);

--
-- Indexes for table `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKbf8qggp2dw21lvbe4tskf1k20` (`user_id`);

--
-- Indexes for table `coach_levels`
--
ALTER TABLE `coach_levels`
  ADD KEY `FK4bcvb5hsqh8mt8pdhgn03fh2a` (`coach_id`);

--
-- Indexes for table `coach_sports`
--
ALTER TABLE `coach_sports`
  ADD KEY `FK2r2uxq1t11g4f65tve1hwdm30` (`coach_id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKhqkdvxxad1w2bot39xx13vlkg` (`coach_id`),
  ADD KEY `FKpn05vbx6usw0c65tcyuce4dw5` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKlx03fqdb0xo0jbxe2f07g8uf5` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`);

--
-- Constraints for table `coach`
--
ALTER TABLE `coach`
  ADD CONSTRAINT `FKhqmhbftifijvxtv3ibspvqm9c` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `coach_levels`
--
ALTER TABLE `coach_levels`
  ADD CONSTRAINT `FK4bcvb5hsqh8mt8pdhgn03fh2a` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`);

--
-- Constraints for table `coach_sports`
--
ALTER TABLE `coach_sports`
  ADD CONSTRAINT `FK2r2uxq1t11g4f65tve1hwdm30` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `FKhqkdvxxad1w2bot39xx13vlkg` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`),
  ADD CONSTRAINT `FKpn05vbx6usw0c65tcyuce4dw5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
