-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 07:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project-ezi-cash-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_details`
--

CREATE TABLE `admin_details` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_type` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_details`
--

INSERT INTO `admin_details` (`admin_id`, `admin_name`, `admin_type`, `user_id`, `updated_at`, `created_at`) VALUES
(9, 'melonandead', 'Finance Team', 30, '2024-12-10', '2024-12-10'),
(10, 'melonande', 'Partner Management', 32, '2024-12-12', '2024-12-12'),
(12, 'Silver', 'Admin', 33, '2024-12-12', '2024-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `business_hours`
--

CREATE TABLE `business_hours` (
  `business_hour_id` int(11) NOT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `isOpen` tinyint(1) NOT NULL DEFAULT 0,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') DEFAULT NULL,
  `open_at` time DEFAULT NULL,
  `close_at` time DEFAULT NULL,
  `business_date` date DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_hours`
--

INSERT INTO `business_hours` (`business_hour_id`, `partner_id`, `isOpen`, `day`, `open_at`, `close_at`, `business_date`, `created_at`, `updated_at`) VALUES
(1, 12, 1, 'Tuesday', '00:16:34', '20:16:34', '2024-12-16', '2024-12-10 07:46:24', '2024-12-10 07:46:24'),
(2, 13, 1, 'Tuesday', '00:16:34', '16:16:34', '2024-12-16', '2024-12-10 07:47:01', '2024-12-10 07:47:01'),
(3, 9, 1, 'Tuesday', '00:30:00', '05:30:00', '2024-12-16', '2024-12-16 05:50:57', '2024-12-16 05:50:57');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `user_detail_id` int(11) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `user_detail_id` int(11) NOT NULL,
  `partner_id` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `transaction_status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `user_detail_id`, `partner_id`, `service`, `amount`, `transaction_status`, `created_at`, `updated_at`) VALUES
(6, 20, 0, 'Cash In', 800.00, 'Pending', '2024-12-13 09:10:43', '2024-12-13 09:10:43'),
(7, 20, 0, 'Cash In', 800.00, 'Pending', '2024-12-13 09:12:55', '2024-12-13 09:12:55'),
(8, 20, 0, 'Cash In', 900.00, 'Pending', '2024-12-13 09:15:24', '2024-12-13 09:15:24'),
(9, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 09:26:47', '2024-12-13 09:26:47'),
(10, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 09:28:51', '2024-12-13 09:28:51'),
(11, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 09:40:33', '2024-12-13 09:40:33'),
(12, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 10:05:52', '2024-12-13 10:05:52'),
(13, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 10:21:32', '2024-12-13 10:21:32'),
(14, 20, 0, 'Cash In', 580.00, 'Pending', '2024-12-13 10:24:10', '2024-12-13 10:24:10'),
(15, 20, 0, 'Cash In', 580.00, 'Pending', '2024-12-13 10:26:36', '2024-12-13 10:26:36'),
(16, 20, 0, 'Cash In', 580.00, 'Pending', '2024-12-13 10:30:44', '2024-12-13 10:30:44'),
(17, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 11:25:48', '2024-12-13 11:25:48'),
(18, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 11:27:15', '2024-12-13 11:27:15'),
(19, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 11:40:06', '2024-12-13 11:40:06'),
(20, 20, 0, 'Cash In', 604.00, 'Pending', '2024-12-13 12:17:24', '2024-12-13 12:17:24'),
(21, 20, 0, 'Cash In', 900.00, 'Pending', '2024-12-13 12:20:04', '2024-12-13 12:20:04'),
(22, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 15:05:50', '2024-12-13 15:05:50'),
(23, 20, 0, 'Cash In', 0.00, 'Pending', '2024-12-13 15:06:23', '2024-12-13 15:06:23'),
(24, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 15:11:05', '2024-12-13 15:11:05'),
(25, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 15:17:56', '2024-12-13 15:17:56'),
(26, 20, 0, 'Cash In', 777.00, 'Pending', '2024-12-13 15:20:19', '2024-12-13 15:20:19'),
(27, 20, 0, 'Cash In', 588.00, 'Pending', '2024-12-13 15:22:37', '2024-12-13 15:22:37'),
(28, 20, 0, 'Cash In', 588.00, 'Pending', '2024-12-13 15:25:58', '2024-12-13 15:25:58'),
(29, 20, 0, 'Cash In', 588.00, 'Pending', '2024-12-13 15:26:36', '2024-12-13 15:26:36'),
(30, 20, 0, 'Cash In', 500.00, 'Approved', '2024-12-13 15:30:39', '2024-12-13 15:30:39'),
(31, 20, 0, 'Cash In', 500.00, 'Approved', '2024-12-13 15:30:59', '2024-12-13 15:30:59'),
(32, 20, 0, 'Cash In', 0.00, 'Approved', '2024-12-13 15:31:01', '2024-12-13 15:31:01'),
(33, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 15:47:35', '2024-12-13 15:47:35'),
(34, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 15:49:43', '2024-12-13 15:49:43'),
(35, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 15:50:03', '2024-12-13 15:50:03'),
(36, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-13 15:52:21', '2024-12-13 15:52:21'),
(37, 20, 0, 'Cash In', 900.00, 'Pending', '2024-12-13 16:18:33', '2024-12-13 16:18:33'),
(38, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 16:35:23', '2024-12-13 16:35:23'),
(39, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-13 16:36:00', '2024-12-13 16:36:00'),
(40, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 04:50:25', '2024-12-14 04:50:25'),
(41, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 06:38:01', '2024-12-14 06:38:01'),
(42, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 06:40:27', '2024-12-14 06:40:27'),
(43, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 06:50:38', '2024-12-14 06:50:38'),
(44, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 07:17:23', '2024-12-14 07:17:23'),
(45, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 07:27:21', '2024-12-14 07:27:21'),
(46, 20, 0, 'Cash In', 555.00, 'Pending', '2024-12-14 07:32:45', '2024-12-14 07:32:45'),
(47, 20, 0, 'Cash In', 555.00, 'Pending', '2024-12-14 07:35:25', '2024-12-14 07:35:25'),
(48, 20, 0, 'Cash In', 555.00, 'Pending', '2024-12-14 07:41:06', '2024-12-14 07:41:06'),
(49, 20, 0, 'Cash In', 88.00, 'Pending', '2024-12-14 07:44:35', '2024-12-14 07:44:35'),
(50, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 08:03:14', '2024-12-14 08:03:14'),
(51, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 08:07:19', '2024-12-14 08:07:19'),
(52, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 08:07:47', '2024-12-14 08:07:47'),
(53, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 08:46:57', '2024-12-14 08:46:57'),
(54, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 08:59:05', '2024-12-14 08:59:05'),
(55, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 09:36:56', '2024-12-14 09:36:56'),
(56, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 10:39:22', '2024-12-14 10:39:22'),
(57, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 10:45:36', '2024-12-14 10:45:36'),
(58, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 10:57:18', '2024-12-14 10:57:18'),
(59, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 11:03:00', '2024-12-14 11:03:00'),
(60, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 11:10:52', '2024-12-14 11:10:52'),
(61, 20, 0, 'Cash In', 555.00, 'Pending', '2024-12-14 11:12:45', '2024-12-14 11:12:45'),
(62, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 11:18:44', '2024-12-14 11:18:44'),
(63, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 11:36:24', '2024-12-14 11:36:24'),
(64, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 11:48:41', '2024-12-14 11:48:41'),
(65, 20, 0, 'Cash In', 900.00, 'Pending', '2024-12-14 11:51:07', '2024-12-14 11:51:07'),
(66, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 12:32:55', '2024-12-14 12:32:55'),
(67, 20, 0, 'Cash In', 200.00, 'Pending', '2024-12-14 12:59:11', '2024-12-14 12:59:11'),
(68, 20, 0, 'Cash In', 200.00, 'Pending', '2024-12-14 13:14:29', '2024-12-14 13:14:29'),
(69, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 13:20:23', '2024-12-14 13:20:23'),
(70, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 13:34:31', '2024-12-14 13:34:31'),
(71, 20, 0, 'Cash In', 800.00, 'Pending', '2024-12-14 13:47:15', '2024-12-14 13:47:15'),
(72, 20, 0, 'Cash In', 555.00, 'Pending', '2024-12-14 19:59:25', '2024-12-14 19:59:25'),
(73, 20, 0, 'Cash In', 521.00, 'Pending', '2024-12-14 20:03:03', '2024-12-14 20:03:03'),
(74, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 20:17:42', '2024-12-14 20:17:42'),
(75, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 20:19:16', '2024-12-14 20:19:16'),
(76, 20, 0, 'Cash In', 50.00, 'Pending', '2024-12-14 20:20:56', '2024-12-14 20:20:56'),
(77, 20, 0, 'Cash In', 500.00, 'Pending', '2024-12-14 21:14:11', '2024-12-14 21:14:11'),
(78, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 22:53:15', '2024-12-14 22:53:15'),
(79, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 22:58:16', '2024-12-14 22:58:16'),
(80, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 23:01:58', '2024-12-14 23:01:58'),
(81, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 23:02:46', '2024-12-14 23:02:46'),
(82, 20, 0, 'Cash In', 560.00, 'Pending', '2024-12-14 23:11:51', '2024-12-14 23:11:51'),
(83, 20, 0, 'Cash In', 600.00, 'Pending', '2024-12-14 23:16:30', '2024-12-14 23:16:30'),
(84, 20, 0, 'Cash In', 665.00, 'Pending', '2024-12-15 00:36:33', '2024-12-15 00:36:33');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `notification` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `store_id`, `individual_id`, `notification`, `updated_at`, `created_at`) VALUES
(1, 22, 21, 'has Cash In with the total amount of 1015.00 with a transactionId of PAYID-M5KBN3I8W56129395516112W on 2024-12-07T09:36:15.949Z', '2024-12-07 09:36:15', '2024-12-07 09:36:15'),
(2, 22, 21, 'has Cash In with the total amount of 515.00 with a transactionId of PAYID-M5KG7DQ5BX6556082377610S on 2024-12-07T15:54:11.146Z', '2024-12-07 15:54:11', '2024-12-07 15:54:11'),
(3, 19, 13, 'Request from 13 was approved by partner 19.', '2024-12-16 08:24:21', '2024-12-16 08:24:24'),
(4, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:15:34', '2024-12-16 09:15:36'),
(5, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:16:11', '2024-12-16 09:16:13'),
(6, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:17:40', '2024-12-16 09:17:42'),
(7, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:19:28', '2024-12-16 09:19:30'),
(8, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:22:25', '2024-12-16 09:22:27'),
(9, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:23:59', '2024-12-16 09:24:01'),
(10, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:25:25', '2024-12-16 09:25:27'),
(11, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:26:06', '2024-12-16 09:26:09'),
(12, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:27:28', '2024-12-16 09:27:30'),
(13, 19, 20, 'Request from 20 was approved by partner 19.', '2024-12-16 09:28:35', '2024-12-16 09:28:37');

-- --------------------------------------------------------

--
-- Table structure for table `partnership_application`
--

CREATE TABLE `partnership_application` (
  `partner_application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `legal_name` varchar(100) NOT NULL,
  `partnership_type` varchar(100) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `legal_address` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `business_location` varchar(100) NOT NULL,
  `business_city` varchar(100) NOT NULL,
  `business_state` varchar(100) NOT NULL,
  `business_zip` varchar(10) NOT NULL,
  `business_permit` varchar(100) NOT NULL,
  `government_id` varchar(100) NOT NULL,
  `proof_of_address` varchar(100) NOT NULL,
  `business_permit_verify` tinyint(4) NOT NULL DEFAULT 0,
  `government_id_verify` tinyint(4) NOT NULL DEFAULT 0,
  `proof_of_address_verify` tinyint(4) NOT NULL DEFAULT 0,
  `is_suspended` tinyint(2) NOT NULL,
  `bank` varchar(100) NOT NULL,
  `bank_account_id` varchar(50) NOT NULL,
  `account_id` varchar(50) NOT NULL,
  `card_no` varchar(50) NOT NULL,
  `card_holder` varchar(50) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partnership_application`
--

INSERT INTO `partnership_application` (`partner_application_id`, `user_id`, `legal_name`, `partnership_type`, `phone_no`, `email`, `legal_address`, `city`, `state`, `zip`, `business_location`, `business_city`, `business_state`, `business_zip`, `business_permit`, `government_id`, `proof_of_address`, `business_permit_verify`, `government_id_verify`, `proof_of_address_verify`, `is_suspended`, `bank`, `bank_account_id`, `account_id`, `card_no`, `card_holder`, `updated_at`, `created_at`) VALUES
(6, 21, 'Marvin Ramos', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Lapu Lapu City', 'Cebu', 'Cebu', '6000', 'Cebu', 'Cebu', 'Cebu', '6000', '1733995250480-_13_IMG-9cc9f0694acbda56acaeae53bebce927-V.jpg', '1733995250458-_13_IMG-f07055207b5961e063b5363a6e67086c-V.jpg', '1733995250450-_13_IMG-3b2492fbbb8087326eb4487bd3d18ec4-V.jpg', 1, 1, 1, 1, 'Ahshahah', 'bank', 'Bsbshshs', 'Jsjsjsjs', 'Bsjsjsb', '2024-11-01 00:00:00', '2024-11-01 00:00:00'),
(7, 22, 'John Doe', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Cebi', 'Cebu', 'Cebu', '6000', 'Cebu', 'Cebi', 'Cebu', '6000', '1733998103300-_13_IMG-9cc9f0694acbda56acaeae53bebce927-V.jpg', '1733998099822-_13_IMG-f07055207b5961e063b5363a6e67086c-V.jpg', '1733998099822-_13_IMG-3b2492fbbb8087326eb4487bd3d18ec4-V.jpg', 2, 2, 2, 0, 'Sbshsjsbz', 'bank', 'Hshshshs', 'Sjsjshs', 'Jsjshsh', '2024-11-05 00:00:00', '2024-11-05 00:00:00'),
(8, 41, 'Stan Lee', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Cebu', 'Cebu', 'Cebu', '6000', 'Cebu', 'Cebu', 'Cebu', '6000', '1734000297408-_13_IMG-9cc9f0694acbda56acaeae53bebce927-V.jpg', '1734000299320-_13_IMG-a9dad26eff105496ab632ac61b1f5499-V.jpg', '1734000295477-_13_IMG-f07055207b5961e063b5363a6e67086c-V.jpg', 1, 1, 1, 0, 'Hshshshs', 'bank', 'Jsjsjshz', 'Jzjsjsjs', 'Hshshshsh', '2024-12-14 00:00:00', '2024-12-14 00:00:00'),
(9, 32, 'Vi tor Chiong', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Lapu Lapu City', 'Lapu Lapu City', 'Cebu', '6015', 'Lapu Lapu City', 'Lapu Lapu City', 'Cebu', '6015', '1734004069895-_13_IMG-3210eda81f93677559bf1992e9e0a81a-V.jpg', '1734004069985-_13_IMG-9df63dfff2215d9269e4bc3d8a90d5ad-V.jpg', '1734004069891-_13_IMG-88088c6989f028a13995b9deb35d2318-V.jpg', 1, 1, 1, 0, 'Hshshshshs', 'bank', 'Hshshshs', 'Shshshs', 'Shshshsh', '2024-12-14 00:00:00', '2024-12-14 00:00:00'),
(10, 33, 'Jhyra Shynne Canada', 'Store', '09672510357', 'cjvicro@gmail.com', 'Carcar City', 'CarCar City', 'Cebu', '6000', 'Carcar City', 'Cebu City', 'Cebu', '6000', '1734019144577-_13_IMG-f1be473c4333ac480009f658a382798a-V.jpg', '1734019144562-_13_IMG-0ece6fb7c33f0dbd731bef1826109471-V.jpg', '1734019144563-_13_IMG-879f5af10b339d51a050f6b78e31b288-V.jpg', 1, 2, 2, 0, 'Hshsjsjsjsj', 'bank', 'Sjsjsjsjs', 'Sjsjsjsjs', 'Shshshsh', '2024-12-14 00:00:00', '2024-12-14 00:00:00'),
(12, 39, 'Victor Chiong', 'Individual', '09672510357', 'cjvicro@gmail.com', '', 'Cenu City', 'Cebu', '6000', 'Cebu City', 'Cebu', 'Cebu', '6000', '1734327350958-_19_IMG-e204a3e80073db1e4f1c263aa7a533ad-V.jpg', '1734327350920-_19_IMG-216825b617ae159923c425ba1eddda6f-V.jpg', '1734327351288-_19_video-3fca35a49130a766d9985b8ed50fb80c-V.mp4', 1, 1, 1, 0, 'Hzjzhzh', 'bank', 'Jsjshsh', 'Jsjsbs', 'Hsjshhs', '2024-12-16 13:35:51', '2024-12-16 13:35:51'),
(13, 31, 'Legal Name', 'Individual', '09672510358', 'cjvicro@gmail.com', '', 'alcantara', 'Cebu', '6036', 'Jajajanan', 'Jsjahaha', 'Hahahaha', '6000', '1734348017184-_21_IMG-8aa784dc3880cc4c04be025b4320dece-V.jpg', '1734348017239-_21_IMG-216825b617ae159923c425ba1eddda6f-V.jpg', '1734348017226-_21_IMG-8dd0a6ea82e457de3dc8d82298d2cbee-V.jpg', 0, 0, 0, 0, 'Jsnsbabs', 'bank', 'Bsnsjss', 'Wjsnsns', 'Jsjsbsbs', '2024-12-16 19:20:17', '2024-12-16 19:20:17');

-- --------------------------------------------------------

--
-- Table structure for table `partner_wallets`
--

CREATE TABLE `partner_wallets` (
  `id` int(11) NOT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `earnings` double NOT NULL DEFAULT 0,
  `transaction_fees` double NOT NULL DEFAULT 0,
  `comission` double NOT NULL DEFAULT 0,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partner_wallets`
--

INSERT INTO `partner_wallets` (`id`, `partner_id`, `earnings`, `transaction_fees`, `comission`, `updated_at`, `created_at`) VALUES
(1, 6, 300, 200, 1500, '2024-12-13 11:06:59', '2024-12-13 11:06:59'),
(2, 7, 600, 15, 1370, '2024-12-13 11:06:59', '2024-12-13 11:06:59'),
(3, 8, 4500, 200, 2000, '2024-12-13 11:07:18', '2024-12-13 11:07:18'),
(4, 9, 45500, 15, 1370, '2024-12-13 11:07:18', '2024-12-13 11:07:18'),
(5, 10, 12000, 15, 1570, '2024-12-13 11:07:18', '2024-10-01 11:07:18'),
(10, 12, 0, 0, 0, '2024-12-16 13:38:03', '2024-12-16 13:38:03');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `user_detail_id` int(11) NOT NULL,
  `rating` decimal(15,2) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `service` varchar(255) NOT NULL,
  `amount` float NOT NULL DEFAULT 0,
  `total_amount` float NOT NULL DEFAULT 0,
  `balance` float NOT NULL DEFAULT 0,
  `transaction_status` varchar(255) NOT NULL,
  `payer_id` varchar(255) DEFAULT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `approved_at` datetime DEFAULT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `partner_id`, `type`, `bank`, `service`, `amount`, `total_amount`, `balance`, `transaction_status`, `payer_id`, `payment_id`, `approved_at`, `updated_at`, `created_at`) VALUES
(7, 21, 10, '', 'Paypal', 'Cash In', 500, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-08 11:13:50', '2024-12-08 11:13:50'),
(8, 22, 6, '', '', 'Cash In', 800, 0, 0, 'Complete', NULL, NULL, NULL, '2024-12-10 01:47:40', '2024-10-16 01:47:40'),
(9, 22, 6, '', '', 'Cash Out', 5800, 0, 0, 'Complete', NULL, NULL, NULL, '2024-12-10 01:47:40', '2024-11-12 01:47:40'),
(10, 22, 10, '', '', 'Cash Out', 3800, 0, 0, 'Complete', NULL, NULL, NULL, '2024-12-10 01:47:40', '2024-11-05 01:47:40'),
(11, 21, 7, '', 'Paypal', 'Cash In', 200, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-08 11:13:50', '2024-12-16 11:13:50'),
(12, 21, 7, '', 'Paypal', 'Cash In', 1500, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-08 11:13:50', '2024-12-16 11:13:50'),
(13, 40, 12, '', 'Paypal', 'Cash In', 500, 0, 0, 'Approved', NULL, NULL, '2024-12-16 09:28:37', '2024-12-16 09:28:35', '2024-12-16 11:13:50');

-- --------------------------------------------------------

--
-- Table structure for table `users_table`
--

CREATE TABLE `users_table` (
  `user_id` int(11) NOT NULL,
  `user_phone_no` varchar(11) NOT NULL,
  `user_mpin` char(4) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_pass` varchar(255) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `partner_type` varchar(100) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_table`
--

INSERT INTO `users_table` (`user_id`, `user_phone_no`, `user_mpin`, `user_email`, `user_pass`, `user_name`, `partner_type`, `updated_at`, `created_at`) VALUES
(21, '9672510357', '1234', '', '', '', 'Individual', '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(22, '9052885214', '1234', '', '', '', 'Store', '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(31, '9999999999', '1234', '', '', '', 'Individual', '2024-12-12 11:17:32', '2024-12-12 11:17:32'),
(32, '', '', 'cjvicro@gmail.com', '$2a$10$.hLUegJvUDSVqc.WG2RkX.mgAFaw7c9PL0Rl5vW9VrA2HKMnd..B.', '', '', '2024-12-17 01:54:17', '2024-12-02 19:08:28'),
(33, '', '', 'chiong.vict@gmail.com', '$2a$10$AIVLWc0WnDGWs1O72NvHFe9BOarcWgR7UvKJfOZYn2f28g6mLObby', '', '', '2024-12-15 17:21:32', '2024-12-12 23:11:05'),
(39, '2222222222', '1234', '', '', '', 'Individual', '2024-12-16 01:03:27', '2024-12-16 01:03:27'),
(40, '3333333333', '1234', '', '', '', '', '2024-12-16 13:52:59', '2024-12-16 13:52:59'),
(41, '4444444444', '1234', '', '', '', '', '2024-12-16 17:45:36', '2024-12-16 17:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_detail_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `birthdate` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `nationality` varchar(100) NOT NULL,
  `main_source` varchar(100) NOT NULL,
  `province` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `barangay` varchar(100) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_detail_id`, `first_name`, `middle_name`, `last_name`, `birthdate`, `email`, `nationality`, `main_source`, `province`, `city`, `barangay`, `zipcode`, `user_id`, `created_at`, `updated_at`) VALUES
(13, 'Victor', 'Atay', 'Chiong', '2024-11-28 22:17:54', 'johndoe@gmail.com', 'Nationality', 'Main Source of Funds', 'Province', 'City/Municipality', 'Barangay', '6000', 21, '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(14, 'Marvin', 'Masaglang', 'Ramos', '2024-12-02 23:25:39', 'marvinramos.nutnull@gmail.com', 'Nationality', 'Main Source of Funds', 'Province', 'City/Municipality', 'Barangay', '6000', 22, '2024-12-02 23:25:39', '2024-12-02 23:25:39'),
(15, 'Gagahag', 'Bababhaa', 'Hahahaha', '2024-12-04 12:25:13', 'Marcinshmshs@gmail.ckm', 'Filipino', 'Allowance', 'Cebu', 'Cebu City (Capital)', 'Adlawon', '6000', 30, '2024-12-04 12:25:13', '2024-12-04 12:25:13'),
(17, 'Marvin', 'Masaglang', 'Ramos', '2024-12-12 11:17:32', 'sample@sample.com', 'Filipino', 'Job', 'Cebu', 'alcantara', 'Cabandiangan', '6000', 31, '2024-12-12 11:17:32', '2024-12-12 11:17:32'),
(19, 'Victor', 'Atay', 'Chiong', '1994-12-16 00:59:00', 'cjvicro@gmail.com', 'Filipino', 'Allowance', 'Cebu', 'alcantara', 'Cabandiangan', '6036', 39, '2024-12-16 01:03:27', '2024-12-16 01:03:27'),
(20, 'Hau', 'Mao', 'Zeog', '2000-12-21 13:51:00', 'cjvicro@gmail.com', 'Filipino', 'Job', 'Cebu', 'alcantara', 'Cabandiangan', '6036', 40, '2024-12-16 13:52:59', '2024-12-16 13:52:59'),
(21, 'Haha', 'Hehe', 'Hoho', '1981-12-16 17:44:00', 'cjvicro@gmail.com', 'Filipino', '', 'Cebu', 'alcantara', 'Cabandiangan', '6036', 41, '2024-12-16 17:45:36', '2024-12-16 17:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` int(11) NOT NULL,
  `user_detail_id` int(11) NOT NULL,
  `balance` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `user_detail_id`, `balance`, `created_at`, `updated_at`) VALUES
(1, 15, 10000.00, '2024-12-09 08:51:29', '2024-12-09 08:51:29'),
(3, 19, 0.00, '2024-12-16 01:03:27', '2024-12-16 01:03:27'),
(4, 20, 0.00, '2024-12-16 13:52:59', '2024-12-16 13:52:59'),
(5, 21, 0.00, '2024-12-16 17:45:36', '2024-12-16 17:45:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_details`
--
ALTER TABLE `admin_details`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `business_hours`
--
ALTER TABLE `business_hours`
  ADD PRIMARY KEY (`business_hour_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partnership_application`
--
ALTER TABLE `partnership_application`
  ADD PRIMARY KEY (`partner_application_id`);

--
-- Indexes for table `partner_wallets`
--
ALTER TABLE `partner_wallets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_table`
--
ALTER TABLE `users_table`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_detail_id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_details`
--
ALTER TABLE `admin_details`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `business_hours`
--
ALTER TABLE `business_hours`
  MODIFY `business_hour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `partnership_application`
--
ALTER TABLE `partnership_application`
  MODIFY `partner_application_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `partner_wallets`
--
ALTER TABLE `partner_wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users_table`
--
ALTER TABLE `users_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
