-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2024 at 11:07 PM
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
(1, 15, 1, 'Sunday', '16:16:34', '16:16:34', '2024-12-15', '2024-12-10 07:46:24', '2024-12-10 07:46:24'),
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
(3, 17, 34, '34 Request was approved with partner with the 17.', '2024-12-12 21:47:43', '2024-12-12 22:18:29');

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
(7, 21, NULL, '', 'Paypal', 'Cash In', 500, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-08 11:13:50', '2024-12-08 11:13:50'),
(8, 22, NULL, '', 'Paypal', 'Cash In', 800, 0, 0, 'Pending', NULL, NULL, NULL, '2024-12-10 01:47:40', '2024-12-10 01:47:40'),
(9, 20, 17, '', 'Paypal', 'Cash In', 1000, 0, 0, 'Approved', NULL, NULL, '2024-12-12 22:18:29', '2024-12-12 21:47:43', '2024-12-12 15:06:08');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
