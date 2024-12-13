-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 13, 2024 at 05:56 AM
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
(1, 15, 1, 'Friday', '08:30:34', '16:30:34', '2024-12-13', '2024-12-10 07:46:24', '2024-12-10 07:46:24'),
(2, 15, 1, 'Sunday', '16:16:34', '16:16:34', '2024-12-15', '2024-12-10 07:47:01', '2024-12-10 07:47:01');

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
(21, 20, 0, 'Cash In', 900.00, 'Pending', '2024-12-13 12:20:04', '2024-12-13 12:20:04');

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
(24, NULL, 20, 'A new transaction of 900 for Cash In has been created.', '2024-12-13 12:20:04', '2024-12-13 12:20:04');

-- --------------------------------------------------------

--
-- Table structure for table `partner_wallets`
--

CREATE TABLE `partner_wallets` (
  `id` int(11) NOT NULL,
  `user_detail_id` int(11) DEFAULT NULL,
  `earnings` decimal(15,2) NOT NULL DEFAULT 0.00,
  `transaction_fees` decimal(15,2) NOT NULL DEFAULT 0.00,
  `comission` decimal(15,2) NOT NULL DEFAULT 0.00,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partner_wallets`
--

INSERT INTO `partner_wallets` (`id`, `user_detail_id`, `earnings`, `transaction_fees`, `comission`, `updated_at`, `created_at`) VALUES
(1, 13, 300, 200, 1500, '2024-12-13 11:06:59', '2024-12-13 11:06:59'),
(2, 13, 600, 15, 1370, '2024-12-13 11:06:59', '2024-12-13 11:06:59'),
(3, 13, 4500, 200, 2000, '2024-12-13 11:07:18', '2024-12-13 11:07:18'),
(4, 13, 1500, 15, 1370, '2024-12-13 11:07:18', '2024-12-13 11:07:18'),
(5, 13, 12000, 15, 1570, '2024-12-13 11:07:18', '2024-10-01 11:07:18'),
(6, 13, 3300, 15, 10070, '2024-12-13 11:07:18', '2024-12-13 11:07:18'),
(7, 13, 45500, 15, 3070, '2024-12-13 11:07:18', '2024-11-02 11:07:18');

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
(35, 20, NULL, '', 'Paypal', 'Cash In', 580, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 10:26:36', '2024-12-13 10:26:36'),
(36, 20, NULL, '', 'Paypal', 'Cash In', 580, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 10:30:44', '2024-12-13 10:30:44'),
(37, 20, NULL, '', 'Paypal', 'Cash In', 500, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 11:25:48', '2024-12-13 11:25:48'),
(38, 20, NULL, '', 'Paypal', 'Cash In', 600, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 11:27:15', '2024-12-13 11:27:15'),
(39, 20, NULL, '', 'Paypal', 'Cash In', 600, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 11:40:06', '2024-12-13 11:40:06'),
(40, 20, NULL, '', 'Paypal', 'Cash In', 604, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 12:17:24', '2024-12-13 12:17:24'),
(41, 20, NULL, '', 'Paypal', 'Cash In', 900, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-13 12:20:04', '2024-12-13 12:20:04');

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
(34, '9222222222', '1111', '', '', '', '', '2024-12-12 14:09:45', '2024-12-12 14:09:45');

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
  `card_holder` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partnership_application`
--

INSERT INTO `partnership_application` (`partner_application_id`, `user_id`, `legal_name`, `partnership_type`, `phone_no`, `email`, `legal_address`, `city`, `state`, `zip`, `business_location`, `business_city`, `business_state`, `business_zip`, `business_permit`, `government_id`, `proof_of_address`, `business_permit_verify`, `government_id_verify`, `proof_of_address_verify`, `is_suspended`, `bank`, `bank_account_id`, `account_id`, `card_no`, `card_holder`) VALUES
(6, 21, 'Marvin Ramos', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Lapu Lapu City', 'Cebu', 'Cebu', '6000', 'Cebu', 'Cebu', 'Cebu', '6000', '1733995250480-_13_IMG-9cc9f0694acbda56acaeae53bebce927-V.jpg', '1733995250458-_13_IMG-f07055207b5961e063b5363a6e67086c-V.jpg', '1733995250450-_13_IMG-3b2492fbbb8087326eb4487bd3d18ec4-V.jpg', 1, 1, 1, 1, 'Ahshahah', 'bank', 'Bsbshshs', 'Jsjsjsjs', 'Bsjsjsb'),
(7, 22, 'John Doe', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Cebi', 'Cebu', 'Cebu', '6000', 'Cebu', 'Cebi', 'Cebu', '6000', '1733998103300-_13_IMG-9cc9f0694acbda56acaeae53bebce927-V.jpg', '1733998099822-_13_IMG-f07055207b5961e063b5363a6e67086c-V.jpg', '1733998099822-_13_IMG-3b2492fbbb8087326eb4487bd3d18ec4-V.jpg', 2, 2, 2, 0, 'Sbshsjsbz', 'bank', 'Hshshshs', 'Sjsjshs', 'Jsjshsh'),
(8, 31, 'Stan Lee', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Cebu', 'Cebu', 'Cebu', '6000', 'Cebu', 'Cebu', 'Cebu', '6000', '1734000297408-_13_IMG-9cc9f0694acbda56acaeae53bebce927-V.jpg', '1734000299320-_13_IMG-a9dad26eff105496ab632ac61b1f5499-V.jpg', '1734000295477-_13_IMG-f07055207b5961e063b5363a6e67086c-V.jpg', 0, 0, 0, 0, 'Hshshshs', 'bank', 'Jsjsjshz', 'Jzjsjsjs', 'Hshshshsh'),
(9, 32, 'Vi tor Chiong', 'Individual', '09672510357', 'cjvicro@gmail.com', 'Lapu Lapu City', 'Lapu Lapu City', 'Cebu', '6015', 'Lapu Lapu City', 'Lapu Lapu City', 'Cebu', '6015', '1734004069895-_13_IMG-3210eda81f93677559bf1992e9e0a81a-V.jpg', '1734004069985-_13_IMG-9df63dfff2215d9269e4bc3d8a90d5ad-V.jpg', '1734004069891-_13_IMG-88088c6989f028a13995b9deb35d2318-V.jpg', 1, 1, 1, 0, 'Hshshshshs', 'bank', 'Hshshshs', 'Shshshs', 'Shshshsh'),
(10, 33, 'Jhyra Shynne Canada', 'Store', '09672510357', 'cjvicro@gmail.com', 'Carcar City', 'CarCar City', 'Cebu', '6000', 'Carcar City', 'Cebu City', 'Cebu', '6000', '1734019144577-_13_IMG-f1be473c4333ac480009f658a382798a-V.jpg', '1734019144562-_13_IMG-0ece6fb7c33f0dbd731bef1826109471-V.jpg', '1734019144563-_13_IMG-879f5af10b339d51a050f6b78e31b288-V.jpg', 1, 2, 2, 0, 'Hshsjsjsjsj', 'bank', 'Sjsjsjsjs', 'Sjsjsjsjs', 'Shshshsh');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
