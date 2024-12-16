-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 06:23 AM
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
(9, 'melonandead', 'Admin', 30, '2024-12-10', '2024-12-10');

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
(1, 13, 1, 'Saturday', '01:30:34', '23:30:34', '2024-12-14', '2024-12-10 07:46:24', '2024-12-10 07:46:24'),
(2, 14, 1, 'Sunday', '00:00:34', '23:16:34', '2024-12-14', '2024-12-10 07:47:01', '2024-12-10 07:47:01');

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
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `updated_at`, `created_at`) VALUES
(1, 20, 14, 'Hi maam', '2024-12-14 02:41:30', '2024-12-14 02:41:30'),
(2, 20, 14, 'Hi would to ask po ', '2024-12-14 02:41:30', '2024-12-14 02:41:30'),
(3, 14, 20, 'Good morning po maam', '2024-12-14 02:42:38', '2024-12-14 02:42:38'),
(4, 14, 20, 'What would you want to ask?', '2024-12-14 02:42:38', '2024-12-14 02:42:38'),
(5, 20, 14, 'Do you cater na cash na bou lng po sana', '2024-12-14 02:43:57', '2024-12-14 02:43:57'),
(6, 14, 20, 'sure', '2024-12-14 02:43:57', '2024-12-14 02:43:57'),
(7, 14, 20, 'Thank you po', '2024-12-14 02:44:55', '2024-12-14 02:44:55'),
(8, 20, 14, 'Welcome po', '2024-12-14 02:44:55', '2024-12-14 02:44:55'),
(9, 20, 13, 'Hhhh', '2024-12-14 03:21:27', '2024-12-14 03:21:27'),
(10, 20, 13, 'Gagga', '2024-12-14 14:58:43', '2024-12-14 14:58:43'),
(11, 20, 14, 'Himaam', '2024-12-14 15:12:52', '2024-12-14 15:12:52');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `individual_id` int(11) DEFAULT NULL,
  `notification` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `store_id`, `individual_id`, `notification`, `updated_at`, `created_at`) VALUES
(9, NULL, 20, 'A new transaction of 800 for Cash In has been created.', '2024-12-13 09:10:43', '2024-12-13 09:10:43'),
(10, NULL, 20, 'A new transaction of 800 for Cash In has been created.', '2024-12-13 09:12:55', '2024-12-13 09:12:55'),
(11, NULL, 20, 'A new transaction of 900 for Cash In has been created.', '2024-12-13 09:15:24', '2024-12-13 09:15:24'),
(12, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 09:26:47', '2024-12-13 09:26:47'),
(13, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 09:28:51', '2024-12-13 09:28:51'),
(14, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 09:40:33', '2024-12-13 09:40:33'),
(15, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 10:05:52', '2024-12-13 10:05:52'),
(16, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 10:21:32', '2024-12-13 10:21:32'),
(17, NULL, 20, 'A new transaction of 580 for Cash In has been created.', '2024-12-13 10:24:10', '2024-12-13 10:24:10'),
(18, NULL, 20, 'A new transaction of 580 for Cash In has been created.', '2024-12-13 10:26:36', '2024-12-13 10:26:36'),
(19, NULL, 20, 'A new transaction of 580 for Cash In has been created.', '2024-12-13 10:30:44', '2024-12-13 10:30:44'),
(20, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 11:25:48', '2024-12-13 11:25:48'),
(21, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 11:27:15', '2024-12-13 11:27:15'),
(22, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 11:40:06', '2024-12-13 11:40:06'),
(23, NULL, 20, 'A new transaction of 604 for Cash In has been created.', '2024-12-13 12:17:24', '2024-12-13 12:17:24'),
(24, NULL, 20, 'A new transaction of 900 for Cash In has been created.', '2024-12-13 12:20:04', '2024-12-13 12:20:04'),
(25, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:42:50', '2024-12-13 07:13:35'),
(26, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:46:17', '2024-12-13 07:17:03'),
(27, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:46:24', '2024-12-13 07:17:10'),
(28, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:46:32', '2024-12-13 07:17:17'),
(29, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:29'),
(30, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:38'),
(31, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:39'),
(32, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:39'),
(33, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:43'),
(34, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:43'),
(35, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:44'),
(36, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:58', '2024-12-13 07:19:44'),
(37, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:48:59', '2024-12-13 07:19:37'),
(38, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:49:00', '2024-12-13 07:19:30'),
(39, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:49:01', '2024-12-13 07:19:31'),
(40, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:49:03', '2024-12-13 07:19:33'),
(41, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:49:07', '2024-12-13 07:19:53'),
(42, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:49:12', '2024-12-13 07:19:58'),
(43, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 06:49:15', '2024-12-13 07:20:01'),
(44, 17, 20, '20 Request was approved with partner with the 17.', '2024-12-13 07:04:35', '2024-12-13 07:35:20'),
(45, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 15:05:50', '2024-12-13 15:05:50'),
(46, NULL, 20, 'A new transaction of 0 for Cash In has been created.', '2024-12-13 15:06:23', '2024-12-13 15:06:23'),
(47, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 15:11:05', '2024-12-13 15:11:05'),
(48, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 15:17:56', '2024-12-13 15:17:56'),
(49, NULL, 20, 'A new transaction of 777 for Cash In has been created.', '2024-12-13 15:20:19', '2024-12-13 15:20:19'),
(50, NULL, 20, 'A new transaction of 588 for Cash In has been created.', '2024-12-13 15:22:37', '2024-12-13 15:22:37'),
(51, NULL, 20, 'A new transaction of 588.00 for Cash In has been created.', '2024-12-13 15:25:58', '2024-12-13 15:25:58'),
(52, NULL, 20, 'A new transaction of 588.00 for Cash In has been created.', '2024-12-13 15:26:36', '2024-12-13 15:26:36'),
(53, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 15:30:39', '2024-12-13 15:30:39'),
(54, NULL, 20, 'A new transaction of 500.00 for Cash In has been created.', '2024-12-13 15:30:59', '2024-12-13 15:30:59'),
(55, NULL, 20, 'A new transaction of 0 for Cash In has been created.', '2024-12-13 15:31:01', '2024-12-13 15:31:01'),
(56, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 15:47:35', '2024-12-13 15:47:35'),
(57, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 15:49:43', '2024-12-13 15:49:43'),
(58, NULL, 20, 'A new transaction of 500.00 for Cash In has been created.', '2024-12-13 15:50:03', '2024-12-13 15:50:03'),
(59, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-13 15:52:21', '2024-12-13 15:52:21'),
(60, NULL, 20, 'A new transaction of 900 for Cash In has been created.', '2024-12-13 16:18:33', '2024-12-13 16:18:33'),
(61, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 16:35:23', '2024-12-13 16:35:23'),
(62, NULL, 20, 'A new transaction of 600 for Cash In has been created.', '2024-12-13 16:36:00', '2024-12-13 16:36:00'),
(63, NULL, 20, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 04:50:25', '2024-12-14 04:50:25'),
(64, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 06:38:01', '2024-12-14 06:38:01'),
(65, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 06:40:27', '2024-12-14 06:40:27'),
(66, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 06:50:38', '2024-12-14 06:50:38'),
(67, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 07:17:23', '2024-12-14 07:17:23'),
(68, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 07:27:21', '2024-12-14 07:27:21'),
(69, NULL, 34, 'A new transaction of 555 for Cash In has been created.', '2024-12-14 07:32:45', '2024-12-14 07:32:45'),
(70, NULL, 34, 'A new transaction of 555 for Cash In has been created.', '2024-12-14 07:35:25', '2024-12-14 07:35:25'),
(71, NULL, 34, 'A new transaction of 555 for Cash In has been created.', '2024-12-14 07:41:06', '2024-12-14 07:41:06'),
(72, NULL, 34, 'A new transaction of 88 for Cash In has been created.', '2024-12-14 07:44:35', '2024-12-14 07:44:35'),
(73, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 08:03:14', '2024-12-14 08:03:14'),
(74, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 08:07:19', '2024-12-14 08:07:19'),
(75, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 08:07:47', '2024-12-14 08:07:47'),
(76, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 08:46:57', '2024-12-14 08:46:57'),
(77, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 08:59:05', '2024-12-14 08:59:05'),
(78, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 09:36:56', '2024-12-14 09:36:56'),
(79, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 10:39:22', '2024-12-14 10:39:22'),
(80, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 10:45:36', '2024-12-14 10:45:36'),
(81, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 10:57:18', '2024-12-14 10:57:18'),
(82, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 11:03:00', '2024-12-14 11:03:00'),
(83, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 11:10:52', '2024-12-14 11:10:52'),
(84, NULL, 34, 'A new transaction of 555 for Cash In has been created.', '2024-12-14 11:12:45', '2024-12-14 11:12:45'),
(85, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 11:18:44', '2024-12-14 11:18:44'),
(86, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 11:36:24', '2024-12-14 11:36:24'),
(87, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 11:48:41', '2024-12-14 11:48:41'),
(88, NULL, 34, 'A new transaction of 900 for Cash In has been created.', '2024-12-14 11:51:07', '2024-12-14 11:51:07'),
(89, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 12:32:55', '2024-12-14 12:32:55'),
(90, NULL, 34, 'A new transaction of 200 for Cash In has been created.', '2024-12-14 12:59:11', '2024-12-14 12:59:11'),
(91, NULL, 34, 'A new transaction of 200 for Cash In has been created.', '2024-12-14 13:14:29', '2024-12-14 13:14:29'),
(92, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 13:20:23', '2024-12-14 13:20:23'),
(93, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 13:34:31', '2024-12-14 13:34:31'),
(94, NULL, 34, 'A new transaction of 800 for Cash In has been created.', '2024-12-14 13:47:15', '2024-12-14 13:47:15'),
(95, NULL, 34, 'A new transaction of 555 for Cash In has been created.', '2024-12-14 19:59:25', '2024-12-14 19:59:25'),
(96, NULL, 34, 'A new transaction of 521 for Cash In has been created.', '2024-12-14 20:03:03', '2024-12-14 20:03:03'),
(97, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 20:17:42', '2024-12-14 20:17:42'),
(98, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 20:19:16', '2024-12-14 20:19:16'),
(99, NULL, 34, 'A new transaction of 50 for Cash In has been created.', '2024-12-14 20:20:56', '2024-12-14 20:20:56'),
(100, NULL, 34, 'A new transaction of 500 for Cash In has been created.', '2024-12-14 21:14:11', '2024-12-14 21:14:11'),
(101, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 22:53:15', '2024-12-14 22:53:15'),
(102, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 22:58:16', '2024-12-14 22:58:16'),
(103, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 23:01:58', '2024-12-14 23:01:58'),
(104, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 23:02:46', '2024-12-14 23:02:46'),
(105, NULL, 34, 'A new transaction of 560 for Cash In has been created.', '2024-12-14 23:11:51', '2024-12-14 23:11:51'),
(106, NULL, 34, 'A new transaction of 600 for Cash In has been created.', '2024-12-14 23:16:30', '2024-12-14 23:16:30'),
(107, NULL, 34, 'A new transaction of 665 for Cash In has been created.', '2024-12-15 00:36:33', '2024-12-15 00:36:33'),
(108, 17, 20, 'Request from 20 was approved by partner 17.', '2024-12-16 02:14:28', '2024-12-16 02:45:15'),
(109, 17, 20, 'Request from 20 was approved by partner 17.', '2024-12-16 02:33:22', '2024-12-16 03:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `partner_wallets`
--

CREATE TABLE `partner_wallets` (
  `id` int(11) NOT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `earnings` decimal(15,2) NOT NULL DEFAULT 0.00,
  `transaction_fees` decimal(15,2) NOT NULL DEFAULT 0.00,
  `comission` decimal(15,2) NOT NULL DEFAULT 0.00,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partner_wallets`
--

INSERT INTO `partner_wallets` (`id`, `partner_id`, `earnings`, `transaction_fees`, `comission`, `updated_at`, `created_at`) VALUES
(1, 14, 0.00, 0.00, 0.00, '2024-12-12 15:40:06', '2024-12-12 15:40:06');

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

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `store_id`, `user_detail_id`, `rating`, `updated_at`, `created_at`) VALUES
(1, 14, 0, 0.00, '2024-12-12 09:05:43', '2024-12-12 09:05:43');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `partner_id` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `bank` varchar(255) DEFAULT 'Paypal',
  `service` varchar(255) NOT NULL,
  `amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `total_amount` decimal(15,2) NOT NULL DEFAULT 0.00,
  `balance` decimal(15,2) NOT NULL DEFAULT 0.00,
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
(104, 20, 14, 'E-wallet', 'Paypal', 'Cash In', 665.00, 680.00, 0.00, 'Approved', NULL, NULL, '2024-12-16 03:04:09', '2024-12-16 02:33:22', '2024-12-15 00:36:33');

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
(21, '9672510357', '1234', '', '', '', 'Store', '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(22, '9052885214', '1234', '', '', '', 'Partner', '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(30, '', '', 'cjvicro@gmail.com', '$2a$10$0U.mS2Wz9JI0I7w79fJ3huXGNqIA.tHJNMD2QCZYpcFHyLT32xRUS', '', '', '2024-12-10 17:19:00', '2024-12-10 17:19:00'),
(33, '9111111111', '1234', '', '', '', '', '2024-12-12 13:02:25', '2024-12-12 13:02:25'),
(34, '9923927522', '1111', '', '', '', '', '2024-12-12 14:09:45', '2024-12-12 14:09:45');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_detail_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
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
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_detail_id`, `user_id`, `first_name`, `middle_name`, `last_name`, `birthdate`, `email`, `nationality`, `main_source`, `province`, `city`, `barangay`, `zipcode`, `created_at`, `updated_at`) VALUES
(13, 21, 'Victor', 'Atay', 'Chiong', '2024-11-28 22:17:54', 'johndoe@gmail.com', 'Nationality', 'Main Source of Funds', 'Province', 'City/Municipality', 'Barangay', '6000', '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(14, 22, 'Marvin', 'Masaglang', 'Ramos', '2024-12-02 23:25:39', 'marvinramos.nutnull@gmail.com', 'Nationality', 'Main Source of Funds', 'Province', 'City/Municipality', 'Barangay', '6000', '2024-12-02 23:25:39', '2024-12-02 23:25:39'),
(15, 30, 'Gagahag', 'Bababhaa', 'Hahahaha', '2024-12-04 12:25:13', 'Marcinshmshs@gmail.ckm', 'Filipino', 'Allowance', 'Cebu', 'Cebu City (Capital)', 'Adlawon', '6000', '2024-12-04 12:25:13', '2024-12-04 12:25:13'),
(17, 22, 'Marvin', 'Masaglang', 'Ramos', '2024-12-12 11:17:32', 'sample@sample.com', 'Filipino', 'Job', 'Cebu', 'alcantara', 'Cabandiangan', '6000', '2024-12-12 11:17:32', '2024-12-12 11:17:32'),
(18, 32, 'Marianne ', 'Masaglang ', 'Ramos', '2024-12-12 12:57:00', 'marvinmramos.zuitt@gmail.com', 'Filipino', 'Allowance', 'Cebu', 'alcoy', 'Daang-Lungsod', '6063', '2024-12-12 12:57:00', '2024-12-12 12:57:00'),
(19, 33, 'Hhhh', 'Hhhh', 'Nnnjj', '2024-12-12 13:02:25', 'marvinramos.nutnull@gmail.com', 'Filipino', 'Allowance', 'Cebu', 'alcantara', 'Cabandiangan', '6090', '2024-12-12 13:02:25', '2024-12-12 13:02:25'),
(20, 34, 'Marianne', 'M.', 'Ramos', '1991-12-12 00:00:00', 'Ggggggg@hhhgga.con', 'Filipino', 'Allowance', 'Cebu', 'alcantara', 'Cabandiangan', '6088', '2024-12-12 14:09:45', '2024-12-12 14:09:45');

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
(1, 17, 10000.00, '2024-12-09 08:51:29', '2024-12-09 08:51:29'),
(2, 20, 0.00, '2024-12-12 14:09:45', '2024-12-12 14:09:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business_hours`
--
ALTER TABLE `business_hours`
  ADD PRIMARY KEY (`business_hour_id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `business_hours`
--
ALTER TABLE `business_hours`
  MODIFY `business_hour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `partner_wallets`
--
ALTER TABLE `partner_wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `users_table`
--
ALTER TABLE `users_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
