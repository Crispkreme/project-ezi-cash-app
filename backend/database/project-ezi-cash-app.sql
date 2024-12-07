-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2024 at 10:38 AM
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
(1, 22, 21, 'has Cash In with the total amount of 1015.00 with a transactionId of PAYID-M5KBN3I8W56129395516112W on 2024-12-07T09:36:15.949Z', '2024-12-07 09:36:15', '2024-12-07 09:36:15');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `individual_id` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `bank` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `total_amount` float NOT NULL,
  `balance` float NOT NULL,
  `payer_id` varchar(255) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `store_id`, `individual_id`, `type`, `bank`, `service`, `amount`, `total_amount`, `balance`, `payer_id`, `payment_id`, `updated_at`, `created_at`) VALUES
(1, 22, 21, 'E-wallet', 'Paypal', 'Cash In', 1000, 1015, 0, 'YN4L3WPS6GK6E', 'PAYID-M5KBN3I8W56129395516112W', '2024-12-07 09:36:15', '2024-12-07 09:36:15');

-- --------------------------------------------------------

--
-- Table structure for table `users_table`
--

CREATE TABLE `users_table` (
  `user_id` int(11) NOT NULL,
  `user_phone_no` varchar(11) NOT NULL,
  `user_mpin` char(4) NOT NULL,
  `partner_type` varchar(100) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_table`
--

INSERT INTO `users_table` (`user_id`, `user_phone_no`, `user_mpin`, `partner_type`, `updated_at`, `created_at`) VALUES
(21, '9672510357', '1234', 'Individual', '2024-11-28 22:17:54', '2024-11-28 22:17:54'),
(22, '9052885214', '1234', 'Store', '2024-12-02 23:25:39', '2024-12-02 23:25:39'),
(23, '9654887548', '1996', 'Store', '2024-12-04 12:25:13', '2024-12-04 12:25:13'),
(24, '9878578546', '1234', 'Store', '2024-12-04 13:33:43', '2024-12-04 13:33:43');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_detail_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
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
(15, 'Gagahag', 'Bababhaa', 'Hahahaha', '2024-12-04 12:25:13', 'Marcinshmshs@gmail.ckm', 'Filipino', 'Allowance', 'Cebu', 'Cebu City (Capital)', 'Adlawon', '6000', 23, '2024-12-04 12:25:13', '2024-12-04 12:25:13'),
(16, 'NNN', 'JJjJ', 'Vabahaha', '2024-12-04 13:33:43', 'Samooo@gmail.com', 'Filipino', 'Allowance', 'Cebu', 'Cebu City (Capital)', 'Adlawon', '6000', 24, '2024-12-04 13:33:43', '2024-12-04 13:33:43');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_table`
--
ALTER TABLE `users_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
