// require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const paypal = require('paypal-rest-sdk');
const multer = require('multer');
const fs = require('fs');
const { Vonage } = require('@vonage/server-sdk')

const http = require('http');
const {Server} = require('socket.io');

const app = express();
const nodemailer = require('nodemailer');
const path = require('path');
const allowedStatuses = ["Approved", "Rejected"];

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET','POST']
  }
});

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AWRQNwYAQWpS59fjvbtupQcCKxvLIfvywjgKWpI3e_J-cvQg9yIOGW7-1DPOzIqxBsAUi-zU0r0L12B7',
  'client_secret': 'EG5czQetmcA7JlD2n04wivNvuX7xLxoEO2AYcbPfJfQWiZmQilfBvaCOCgbVkngxh8F309q4ht_o3oiO',
});

const vonage = new Vonage({
  apiKey: "4e2a6b4d",
  apiSecret: "FTf3i6bjKBr7opby"
});

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'project-ezi-cash-app',
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Register a user
app.post('/register', async (req, res) => {
  const { user_phone_no, first_name, middle_name, last_name, birthdate, email, nationality, main_source, province, city, barangay, zipcode, HasNoMiddleName, MPIN } = req.body;
  console.log(req.body);
  // Validate required fields
  if ( !user_phone_no || !first_name || (!HasNoMiddleName && !middle_name) || !last_name || !birthdate || !email || !nationality || !province || !city || !barangay || !zipcode || !MPIN ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if phone number is already linked
    db.query(
      'SELECT user_phone_no FROM users_table WHERE user_phone_no = ?',
      [user_phone_no],
      (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error while checking phone number.' });
        }

        if (result.length > 0) {
          return res.status(409).json({ message: 'The mobile number is already linked.' });
        }

        // Insert user credentials
        const insQuery = `
          INSERT INTO users_table (user_phone_no, user_mpin, updated_at, created_at)
          VALUES (?, ?, ?, ?)
        `;
        db.query(insQuery, [user_phone_no, MPIN, new Date(), new Date()], (err, result) => {
          if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ message: 'Error while saving user credentials.' });
          }

          const userId = result.insertId;

          // Insert user details
          const userDetailsQuery = `
            INSERT INTO user_details
            (first_name, middle_name, last_name, birthdate, email, nationality, main_source, province, city, barangay, zipcode, user_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          db.query(
            userDetailsQuery,
            [ first_name, middle_name || '', last_name, new Date(birthdate), email, nationality, main_source, province, city, barangay, zipcode, userId, new Date(), new Date() ],
            async (err, result) => {
              if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ message: 'Error while saving user details.' });
              }

              try {
                const data = await getUserData(userId);
                console.log(data);
                if (data.data !== -1) {
                  const userDetailId = data.user_detail_id;

                  // Create wallet
                  const walletQuery = `
                    INSERT INTO wallets (user_detail_id, balance, created_at, updated_at)
                    VALUES (?, ?, ?, ?)
                  `;
                  const initialBalance = 0;
                  db.query(
                    walletQuery,
                    [userDetailId, initialBalance, new Date(), new Date()],
                    (err, result) => {
                      if (err) {
                        console.error('Database Error:', err);
                        return res.status(500).json({ message: 'Error while creating the wallet.' });
                      }

                      res.status(201).json({ message: 'Registration successful!', data });
                    }
                  );
                } else {
                  res.status(500).json({ message: 'Failed to retrieve user data.' });
                }
              } catch (error) {
                console.error('Unexpected Error:', error);
                res.status(500).json({ message: 'An unexpected error occurred while retrieving user data.' });
              }
            }
          );
        });
      }
    );
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});
const getUserData = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        ut.user_id,
        ud.user_detail_id,
        CONCAT(ud.first_name, ' ', IFNULL(ud.middle_name, ''), ' ', ud.last_name) AS name,
        ut.partner_type,
        w.balance,
        ut.user_phone_no AS phone,
        CONCAT(ud.barangay, ', ', ud.city, ', ', ud.province, ', ', ud.zipcode) AS address,
        ud.city,
        ud.province,
        ud.barangay,
        ud.zipcode,
        ut.partner_type
      FROM 
        user_details ud
      JOIN 
        users_table ut ON ud.user_id = ut.user_id
      LEFT JOIN 
        wallets w ON ud.user_detail_id = w.user_detail_id
      WHERE 
        ud.user_id = ?;
    `;

    db.query(query, [userId], (err, rows) => {
      if (err) {
        console.error('Database Error:', err);
        return reject(undefined);
      }

      resolve(rows[0]);
    });
  });
};

// Auth
const otps = new Map();
app.post('/otp', (req, res) => {

  let { mobileNumber } = req.body;
  mobileNumber = String(mobileNumber).replace("+63","");

  if (!mobileNumber) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  if (mobileNumber.length !== 10) {
    return res.status(400).json({ error: 'Invalid mobile number format' });
  }

  const currentTime = Date.now();
  const otpData = otps.get(mobileNumber);

  if (otpData && currentTime < otpData.expiry) {
    return res.status(200).json({
      message: 'OTP is still valid, resent.',
      otp: otpData.otp,
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = Date.now() + 5 * 60 * 1000;

  otps.set(mobileNumber, { otp, expiry });

  console.log(`OTP for ${mobileNumber}: ${otp}, expires at: ${new Date(expiry)}`);

  res.status(200).json({
    message: 'OTP sent successfully',
    otp,
  });
});
const formatPhoneNumber = (number) => {
  const trimmedNumber = number.replace(/\D/g, "");
  if (trimmedNumber.startsWith("63")) {
    return trimmedNumber;
  }
  return "63" + trimmedNumber.replace(/^0/, "");
};
app.post('/send-sms-otp', async (req, res) => {
  const { mobileNumber, otp } = req.body;
 
  if (!mobileNumber || !otp) {
    return res.status(400).json({ message: 'Mobile number are required.' });
  }

  try {
    const from = "Vonage APIs";
    const to = formatPhoneNumber(mobileNumber);
    const text = `Welcome to Ezicash App! This is your OTP: ${otp}`;

    const response = await vonage.sms.send({ to, from, text });
    console.log("response", response);
    res.status(200).json({ message: 'SMS sent successfully!', response });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ message: 'Failed to send SMS.', error: error.message });
  }
});
app.get("/check-phone", async (req, res) => {
  const {phone} = req.query || {};
  db.query("SELECT user_phone_no FROM users_table WHERE user_phone_no= ?", phone, 
  (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while checking user credentials.' });
    }

    if(result.length > 0) {
      return res.status(200).json({ message: 'Proceed to login', data: result[0].user_phone_no });
    } else {
      return res.status(200).json({ message: 'Proceed to login', data: -1 });
    }
  });
});
app.post("/payment-transaction", async (req, res) => {

  const { formData, payment, partner } = req.body;
  const { user_detail_id, service } = formData;
  const { amount } = payment;
  const { store_id } = partner;
  const total_amount = parseFloat(amount) + 15;
  const defaults = {
    bank: "Paypal",
    total_amount: total_amount,
    balance: 0,
    transaction_status: "Pending",
    payer_id: null,
    payment_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    const checkPendingQuery = `
      SELECT COUNT(*) AS pendingCount 
      FROM transactions 
      WHERE user_id = ? AND transaction_status = 'Pending' AND service = ?
    `;
    const [pendingResult] = await db.promise().query(checkPendingQuery, [user_detail_id, service]);
    const pendingCount = pendingResult[0]?.pendingCount || 0;

    if (pendingCount > 0) {
      return res.status(400).json({
        message: `User already has a pending ${service} transaction.`,
      });
    }

    const insertTransactionQuery = `
      INSERT INTO transactions 
      (user_id, partner_id, type, bank, service, amount, total_amount, balance, transaction_status, payer_id, payment_id, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const transactionParams = [
      user_detail_id,
      store_id,
      payment.type,
      defaults.bank,
      service,
      amount,
      defaults.total_amount,
      defaults.balance,
      defaults.transaction_status,
      defaults.payer_id,
      defaults.payment_id,
      defaults.created_at,
      defaults.updated_at,
    ];
    const [transactionResult] = await db.promise().query(insertTransactionQuery, transactionParams);

    if (transactionResult.affectedRows === 0) {
      return res.status(500).json({ message: "Transaction failed to save!" });
    }

    const insertHistoryQuery = `
      INSERT INTO histories 
      (user_detail_id, service, amount, transaction_status, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const historyParams = [
      formData.user_detail_id,
      service,
      amount,
      defaults.transaction_status,
      defaults.created_at,
      defaults.updated_at,
    ];
    const [historyResult] = await db.promise().query(insertHistoryQuery, historyParams);

    if (historyResult.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to save transaction in histories!" });
    }

    const notificationMessage = `A new transaction of ${amount} for ${service} has been created.`;
    const insertNotificationQuery = `
      INSERT INTO notifications 
      (individual_id, notification, created_at, updated_at) 
      VALUES (?, ?, ?, ?)
    `;
    const notificationParams = [
      formData.user_id,
      notificationMessage,
      defaults.created_at,
      defaults.updated_at,
    ];

    const [notificationResult] = await db.promise().query(insertNotificationQuery, notificationParams);

    if (notificationResult.affectedRows === 0) {
      return res.status(500).json({ message: "Failed to save notification!" });
    }

    return res.status(200).json({
      message: "Transaction, history, and notification saved successfully",
      data: {
        transaction_id: transactionResult.insertId,
        history_id: historyResult.insertId,
        notification_id: notificationResult.insertId,
        ...req.body,
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ message: "An unexpected error occurred.", error: error.message });
  }
});

app.get('/get-pending-transaction/:user_id', async (req, res) => {
  try {

    db.query('SELECT * FROM transactions WHERE user_id = ? AND transaction_status = ?', [req.params.user_id, 'Pending'],
      (err, result) => {
        if(err) {
          console.log(err);
          return res.status(500).json({message:'Unsuccessful'});
        }
        return res.status(200).json({message: 'Successful!', data: result});
      }
    )
  } catch(e) {
    return res.status(500).json({message: 'Unsuccessful!'});
  }
});
app.post("/login", async (req, res) => {
  
  const { phone, pin } = req.body;

  db.query("SELECT * FROM users_table WHERE user_phone_no= ? AND user_mpin= ?", [phone, pin], async (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while checking user credentials.' });
    }

    if (result.length > 0) {

      try {

        const userData = await getUserData(result[0].user_id);
        
        if (!userData) {
        return res.status(404).json({ message: 'User details not found.' });
        }

        return res.status(200).json({ 
          message: 'Proceed to login', 
          data: {...userData, user_id: result[0].user_id} 
        });
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ message: 'Error while fetching user data.' });
      }
    } else {
      return res.status(400).json({ message: 'MPIN is incorrect', data: -1 });
    }
  });
});

// TRANSACTIONS
app.get("/get-partners", async (req, res) => {
  try {
    const now = new Date();
    
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = dayNames[now.getDay()];
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0];
    const query = `
      SELECT 
        b.*, 
        ut.*, 
        pa.legal_name AS store_name, 
        pa.business_state, 
        pa.business_city
      FROM 
        business_hours b
      INNER JOIN 
        partnership_application pa 
        ON b.partner_id = pa.partner_application_id
      INNER JOIN 
        users_table ut 
        ON pa.user_id = ut.user_id
      WHERE 
        b.isOpen = 1
        AND ut.partner_type IN ('Individual', 'Store')
        AND b.day = ?
        AND b.business_date = ?
        AND b.open_at <= ?
        AND b.close_at >= ?;
    `;

    db.query(query, [currentDay, currentDate, currentTime, currentTime], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Error while fetching business hours." });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({
          message: "No open businesses found.",
          data: [],
        });
      }

      console.log(results);

      res.status(200).json({
        message: "Open businesses retrieved successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching business hours:", error);
    res.status(500).json({ message: "An error occurred while fetching business hours." });
  }
});
app.get("/get-transaction", async (req, res) => {
  const query = `
    SELECT 
      CONCAT(user_details.first_name, ' ', IFNULL(user_details.middle_name, ''), ' ', user_details.last_name) AS name,
      histories.created_at AS date,
      histories.service,
      histories.id,
      histories.amount,
      histories.transaction_status AS status,
      user_details.user_detail_id
    FROM histories
    INNER JOIN user_details ON histories.user_detail_id = user_details.user_detail_id
    WHERE histories.transaction_status = "Pending"
    ORDER BY histories.created_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error while fetching transactions." });
    }

    if (!results || results.length === 0) {
      return res.status(200).json({
        message: "No transactions found.",
        data: [],
      });
    }

    const groupedTransactions = results.reduce((groups, transaction) => {
      const dateKey = new Date(transaction.date).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
      return groups;
    }, {});

    const formattedResults = Object.entries(groupedTransactions).map(([date, transactions]) => ({
      date,
      transactions: transactions.map((transaction, index) => ({
        ...transaction,
        uniqueKey: `${transaction.id}-${index}`,
      })),
    }));

    return res.status(200).json({
      message: "Transactions retrieved successfully.",
      data: formattedResults,
    });
  });
});
app.get("/get-request", async (req, res) => {
  const query = `
    SELECT 
      CONCAT(user_details.first_name, ' ', IFNULL(user_details.middle_name, ''), ' ', user_details.last_name) AS name,
      transactions.created_at AS date,
      transactions.service,
      transactions.id,
      transactions.amount,
      transactions.transaction_status AS status,
      user_details.user_detail_id
    FROM transactions
    INNER JOIN users_table ON transactions.user_id = users_table.user_id
    INNER JOIN user_details ON user_details.user_id = users_table.user_id
    WHERE transactions.transaction_status = 'Pending'
    ORDER BY transactions.created_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error while fetching transactions." });
    }

    if (!results || results.length === 0) {
      return res.status(200).json({
        message: "No pending transactions found.",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Pending transactions retrieved successfully.",
      data: results,
    });
  });
});
app.get("/get-wallet/:user_detail_id", async (req, res) => {
  const { user_detail_id } = req.params;

  const query = `
    SELECT 
      wallets.id,
      wallets.balance,
      user_details.user_detail_id
    FROM wallets
    INNER JOIN user_details ON wallets.user_detail_id = user_details.user_detail_id
    WHERE user_details.user_detail_id = ? 
    ORDER BY wallets.id DESC;
  `;

  db.query(query, [user_detail_id], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error while fetching wallets." });
    }

    if (!results || results.length === 0) {
      return res.status(200).json({
        message: "No wallets found.",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Wallets retrieved successfully.",
      data: results,
    });
  });
});
app.post('/save-business-hours', (req, res) => {

  const { schedule } = req.body;

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const queries = [];
  const values = [];

  for (const [day, { partner_id, isOpen, open_at, close_at, business_date }] of Object.entries(schedule)) {
    const isOpenValue = isOpen ? 1 : 0;

    const openTime = new Date(`${business_date}T${open_at}`).toTimeString().slice(0, 8);
    const closeTime = new Date(`${business_date}T${close_at}`).toTimeString().slice(0, 8);

    if (!openTime || !closeTime) {
      return res.status(400).json({ message: `Invalid time format for ${day}.` });
    }

    queries.push(`
      INSERT INTO business_hours (partner_id, isOpen, day, open_at, close_at, business_date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    values.push(partner_id, isOpenValue, day, openTime, closeTime, business_date, createdAt, updatedAt);
  }

  db.query(queries.join(';'), values, (error, result) => {
    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ message: 'Database error occurred.', error });
    }

    res.json({ message: 'Business hours saved successfully.' });
  });
});
app.get('/get-total-transaction/:partner_id', async (req, res) => {

  const { partner_id } = req.params;
  const query = `SELECT * FROM partner_wallets WHERE partner_id = ?`;

  db.query(query, [partner_id], (err, results) => {

    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while fetching transactions.' });
    }

    if (!results || results.length === 0) {
      return res.status(200).json({
        message: 'No transactions found.',
        data: [],
      });
    }
    return res.status(200).json({
      data: results,
    });
  });
});
app.get('/get-store-rating/:user_detail_id', async (req, res) => {
  const { user_detail_id } = req.params;

  const query = `
    SELECT AVG(rating) as overall_rating
    FROM ratings
    WHERE user_detail_id = ?
  `;

  db.query(query, [user_detail_id], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while fetching ratings.' });
    }

    if (!results || results.length === 0 || results[0].overall_rating === null) {
      return res.status(200).json({
        message: 'No ratings found.',
        data: { overall_rating: 0 },
      });
    }

    return res.status(200).json({
      data: { overall_rating: results[0].overall_rating },
    });
  });
});
app.get('/get-all-success-transaction/:user_detail_id', async (req, res) => {
  const { user_detail_id } = req.params;

  // Query to count all transactions with 'Success' status for the given user_detail_id
  const query = `
    SELECT COUNT(*) as success_count
    FROM transactions
    WHERE partner_id = ? AND transaction_status = 'Success'
  `;

  db.query(query, [user_detail_id], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while fetching success transactions.' });
    }

    return res.status(200).json({
      data: { success_count: results[0].success_count },
    });
  });
});
app.get('/get-all-failed-transaction/:user_detail_id', async (req, res) => {
  const { user_detail_id } = req.params;

  // Query to count all transactions with 'Failed' status for the given user_detail_id
  const query = `
    SELECT COUNT(*) as failed_count
    FROM transactions
    WHERE partner_id = ? AND transaction_status = 'Failed'
  `;

  db.query(query, [user_detail_id], (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while fetching failed transactions.' });
    }

    return res.status(200).json({
      data: { failed_count: results[0].failed_count },
    });
  });
});
app.post("/approve-cash-request", (req, res) => {
  const { individual_id, partner_id, transaction_id, transaction_status, approved_at } = req.body;

  if (!individual_id || !partner_id || !transaction_id || !transaction_status || !approved_at) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  if (!allowedStatuses.includes(transaction_status)) {
    return res.status(400).json({ message: "Invalid transaction status." });
  }

  const updatedAt = new Date().toISOString();
  const updateTransactionQuery = `
    UPDATE transactions
    SET 
      transaction_status = ?, 
      approved_at = ?, 
      updated_at = ?
    WHERE id = ?
  `;
  const updateTransactionValues = [transaction_status, approved_at, updatedAt, transaction_id];

  db.query(updateTransactionQuery, updateTransactionValues, (updateError, updateResult) => {
    if (updateError) {
      return res.status(500).json({ message: "Failed to update the transaction.", error: updateError });
    }

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    const notificationMessage = `Request from ${individual_id} was approved by partner ${partner_id}.`;
    const insertNotificationQuery = `
      INSERT INTO notifications (store_id, individual_id, notification, updated_at, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    const notificationValues = [partner_id, individual_id, notificationMessage, updatedAt, approved_at];

    db.query(insertNotificationQuery, notificationValues, (notificationError, notificationResult) => {
      if (notificationError) {
        console.error("Database Error (Insert Notification):", notificationError);
        return res.status(500).json({ message: "Failed to save the notification.", error: notificationError });
      }
      return res.status(200).json({
        message: "Transaction approved and notification saved successfully.",
        transaction_id,
      });
    });
  });
});
app.get("/get-transaction-request/:user_detail_id", async (req, res) => {
  const { user_detail_id } = req.params;

  try {
    const query = `
      SELECT * 
      FROM transactions
      WHERE transactions.user_id = ?
        AND transactions.transaction_status = 'Approved'
      ORDER BY transactions.created_at DESC
      LIMIT 1;
    `;

    db.query(query, [user_detail_id], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Error while fetching transaction request." });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({
          message: "No approved transactions found.",
          data: [],
        });
      }

      res.status(200).json({
        message: "Latest approved transaction retrieved successfully.",
        data: results,
      });
    });
  } catch (error) {
    console.error("Error fetching transaction request:", error);
    res.status(500).json({ message: "An error occurred while fetching transaction request." });
  }
});
app.post('/send-message', (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  console.log([
    {sender_id: sender_id},
    {receiver_id: receiver_id},
    {message: message},
  ]);

  if (!sender_id || !receiver_id || !message) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const insertMessageQuery = `
    INSERT INTO messages (sender_id, receiver_id, message, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const messageValues = [sender_id, receiver_id, message, createdAt, updatedAt];

  db.query(insertMessageQuery, messageValues, (insertError, insertResult) => {
    if (insertError) {
      console.error("Database Error (Insert Message):", insertError);
      return res.status(500).json({ message: "Failed to send message.", error: insertError });
    }

    res.status(200).json({
      message: "Message sent successfully.",
      message_id: insertResult.insertId,
      sender_id,
      receiver_id,
      message,
      created_at: createdAt,
      updated_at: updatedAt
    });
  });
});
app.get("/get-user-transaction", async (req, res) => {
  const { transactionId } = req.query;

  try {
    const query = `
      SELECT * 
      FROM transactions
      WHERE id = ?
      LIMIT 1;
    `;

    db.query(query, [transactionId], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Error while fetching transaction." });
      }

      if (!results || results.length === 0) {
        return res.status(404).json({
          message: "Transaction not found.",
          data: [],
        });
      }

      const transaction = results[0];

      res.status(200).json({
        message: "Transaction fetched successfully.",
        data: transaction,
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});
app.get("/get-user-message", async (req, res) => {
  const { user_id, partner_id } = req.query;

  try {
    const query = `
      SELECT * 
      FROM messages
      WHERE 
        (sender_id = ? AND receiver_id = ?) 
        OR 
        (sender_id = ? AND receiver_id = ?)
    `;

    db.query(query, [user_id, partner_id, partner_id, user_id], (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ message: "Error while fetching messages." });
      }

      res.status(200).json({
        data: results,
      });
    });
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// paypal functionality
app.post('/paypal', (req, res) => {

  const { service, amount, total_amount } = req.body.transactionData;
  const { name, phone, balance, address, user_id } = req.body.formData;
  
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://192.168.1.24:3000/success',
      cancel_url: 'http://192.168.1.24:3000/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: service,
              sku: '001',
              price: (parseFloat(amount) + 15).toFixed(2),
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: (parseFloat(amount) + 15).toFixed(2),
        },
        description: `${name} has ${service} with a total amount of $${(parseFloat(amount) + 15).toFixed(2)}`,
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error('PayPal API Error:', error.response || error);
      return res.status(500).send('Error creating PayPal payment.');
    }

    const approvalUrl = payment.links.find((link) => link.rel === 'approval_url');
    if (approvalUrl) {
      res.json({
        approvalUrl: approvalUrl.href,
        body: req.body,
      });
    } else {
      res.status(500).send('Approval URL not found.');
    }
  });
});

app.post('/success', (req, res) => {
  const { PayerID, paymentId, data } = req.body;
  console.log("data:", data);
  if (!PayerID || !paymentId) {
    console.error("Missing payment information");
    return res.status(400).json({ message: 'Payment information is missing.' });
  }

  const payment = data?.body?.payment;
  
  if (!payment || typeof payment.total_amount === 'undefined') {
    console.error("Invalid data or payment structure:", data);
    return res.status(400).json({ message: 'Payment data is missing or malformed.' });
  }

  const execute_payment_json = {
    payer_id: PayerID,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: payment.total_amount,
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, paymentResult) => {
    if (error) {
      console.error('PayPal Execution Error:', error.response || error);
      return res.status(500).json({ message: 'Error executing PayPal payment.', error: error.response || error });
    }

    const { type, bank, service, amount, total_amount, balance } = payment || {};
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const transaction_status = "Success";

    const approved_at = new Date().toISOString(); 
    const transaction_id = payment.id;
    const store_id = payment.partner_id;
    const individual_id = payment.user_id;
    // const store_id = 

    if (!transaction_id) {
      console.error("Missing transaction ID.");
      throw new Error("Transaction ID is required to update the transaction.");
    }

    const updateTransactionQuery = `
      UPDATE transactions
      SET 
        transaction_status = ?, 
        approved_at = ?, 
        updated_at = ?
      WHERE id = ?
    `;
    const updateTransactionValues = [transaction_status, approved_at, updatedAt, transaction_id];

    console.log("Update Transaction Query:", updateTransactionQuery);
    console.log("Update Transaction Values:", updateTransactionValues);

    db.query(updateTransactionQuery, updateTransactionValues, (dbError1, dbResult1) => {
      if (dbError1) {
        console.error('Database Error (Transactions):', dbError1);
        return res.status(500).json({ message: 'Database error occurred while saving transaction.', error: dbError1 });
      }

      console.log('Transaction saved successfully:', dbResult1);

      const notification = `has ${service} with the total amount of ${total_amount} with a transactionId of ${paymentId} on ${createdAt}`;
      const query2 = `
        INSERT INTO notifications 
        (store_id, individual_id, notification, updated_at, created_at) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const values2 = [store_id, individual_id, notification, updatedAt, createdAt];

      db.query(query2, values2, (dbError2, dbResult2) => {
        if (dbError2) {
          console.error('Database Error (Notifications):', dbError2);
          return res.status(500).json({ message: 'Database error occurred while saving notification.', error: dbError2 });
        }

        console.log('Notification saved successfully:', dbResult2);

        res.json({
          message: 'Payment executed, transaction, and notification saved successfully.',
          payment: paymentResult,
          transactionId: dbResult1.insertId,
        });
      });
    });
  });
});
app.get('/cancel', (req, res) => res.send('Payment was cancelled.'));

// WEB
app.post("/web-login", async(req, res) => {
  try {
    const {email, password} = req.body;
    db.query("SELECT * FROM users_table u INNER JOIN admin_details a ON u.user_id = a.user_id WHERE u.user_email = ?", [email], async (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).json({message: err, data:{}});
      }
      const x = await bcrypt.compare(password, result[0].user_pass);
      if(x) {
        db.query('UPDATE users_table SET updated_at = ? WHERE user_email = ?', [new Date(), email],
          (err, _) => {
            if(err) {
              console.error(err);
              return res.status(500).json({message: err, data:{}});
            }

            return res.status(200).json({message: '', data: {...result[0], user_pass: ''}})
          }
        )
        
      } else {
        console.log('Wrong Password!');
        return res.status(500).json({message: 'Wrong Password', data: 'Wrong Password'});
      }
      
    });

  } catch(e) {
    console.log(e);
    // return res.status(500).json({message: e, data: {}});
  }
});
app.post('/web-verification-code', async (req, res) => {
  try {
    const {email} = req.body;
    const pin = Math.floor(1000 + Math.random() * 9000);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:465,
      secure: true,
      auth: {
        user: "cjvicro@gmail.com",
        pass: "ztbepsrmnypjjvyt"
      }
    });

    const mailOptions = {
      to: email,
      subject: 'Sending Email using Node JS!',
      text: "Welcome! Your verification code is " + pin
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        return res.status(500).json({message: error, data: undefined});
      } else {
        return res.status(200).json({message: 'Success!', data: pin});
      }
    });

    

  } catch(e) {
    return res.status(500).json({message:e.message, data: undefined});
  }
});
app.post("/web-signup", async (req, res) => {
  try {

    const {name, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    db.query("INSERT INTO users_table (user_phone_no, user_mpin, user_email, user_pass, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?)",[
      '',
      '',
      email,
      hash,
      new Date(),
      new Date()
    ], (err, result) => {
      if(err) throw new Error(err);
      
      const ut = result.insertId;
      db.query("INSERT INTO admin_details (admin_name, admin_type, user_id, updated_at, created_at) VALUES (?, ?, ?, ?, ?)", 
        [name, 'Admin', ut, new Date(), new Date()]
      , (err, result) => {
        if(err) throw new Error("There was an error inserting into admin details");
        
        db.query("SELECT admin_name, admin_type, user_id FROM admin_details WHERE user_id = ?",[ut], (err, result) => {
          if(err) throw new Error("There was an error looking for the admin details");

          return res.status(200).json({message:'Successfully registered!', data: result[0]});
        })

      })
      
    });

    
  } catch(e) {
    return res.status(500).json({message: e.message, data: undefined});
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/file-upload", upload.single('file'), async (req, res) => {
  try {
    return res.status(200).json({message:'Success!', data: req.file.filename});
  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'There was an error applying!'});
  }
});

app.get('/file/:filename', async (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  return res.sendFile(filePath, (err) => {
    if(err) {
      return res.status(404).json({message:'File not found!'});
    }
  })
});

app.get('/transactions', async (req, res) => {
  try {
    db.query('SELECT * FROM transactions', (err, result) => {
      if(err) {
        console.log(err);

        return res.status(500).json({message: err, data: []});
      }

      return res.status(200).json({message:'Success', data: result});
    })
  } catch(e) {
    console.log(e);
    return res.status(500).json({message:e, data: []});
  }
});

app.patch('/verification', async (req, res) => {
  try {
    const body = req.body;

    db.query(`UPDATE partnership_application SET ${body.column} = ? WHERE partner_application_id = ?`,
      [body.value, body.partner_application_id],
      (err, result) => {
        if(err) {
          return res.status(500).json({message: err});
        }

        db.query('SELECT user_id, business_permit_verify, government_id_verify, proof_of_address_verify, partnership_type, partner_application_id FROM partnership_application WHERE partner_application_id = ?', [body.partner_application_id],
          (err, verification) => {
            if(err) {
              console.log(err);
              return res.status(500).json({message: 'Unsuccessful!'});
            }
            const dt = verification[0];
            if(dt.business_permit_verify === 1 && dt.government_id_verify === 1 && dt.proof_of_address_verify === 1) {
              db.query('UPDATE users_table SET partner_type = ? WHERE user_id = ?',[dt.partnership_type, dt.user_id], 
                (err, _) => {
                  console.log(_);
                  if(err) {
                    console.log(err);
                    return res.status(500).json({message:'Unsuccessful!'});
                  }

                  db.query('INSERT INTO partner_wallets (partner_id, earnings, transaction_fees, comission, updated_at, created_at) VALUES (?, ?, ?, ?, ?, ?) ',
                    [dt.partner_application_id, 0, 0, 0, new Date(), new Date()], 
                    (err, _) => {
                      if(err) {
                        console.log(err);
                        return res.status(500).json({message: 'Unsuccessful!'});
                      }

                      console.log('Success!');
                      return res.status(200).json({message: 'Success updated the partner type!'});
                    }
                  )
                  
                }
              )
            } else {
              console.log('not yet updated');
              return res.status(200).json({message: 'Success!'});
            }
            
          }
        )
      }
    )
  } catch(e) {
    console.log(e);
    return res.status(500).json({message: 'Unsuccessful!'});
  }
});

app.get('/get-admins', async (req, res) => {
  try {
    db.query(`SELECT * FROM admin_details a INNER JOIN users_table b ON a.user_id = b.user_id`, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).json({message: err, data: []});
      }
      
      console.log(result);
      return res.status(200).json({message: 'Success', data: result});
    })
  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'Unsuccessful', data: []});
  }
});

app.patch('/add-admins', async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    db.query(`UPDATE admin_details SET admin_type = ? WHERE admin_id = ?`,[body.department, body.admin_id],
      (err, result) => {
        if(err) {
          console.log(err);
          return res.status(500).json({message: 'Failed!'});
        }

        return res.status(200).json({message:'Success Update!'});
      }
    )


  } catch(e) {
    console.log(e);
    return res.status(500).json({message: e});
  }
});

app.get('/partner-application-list', async (req, res) => {
  try {
    db.query(`SELECT * FROM partnership_application ORDER BY partner_application_id desc`, (err, info) => {
      if(err) {
        console.log(err);
        return res.status(500).json({message: err, data: []});
      }

      return res.status(200).json({message: 'Successful!', data: info});
    });
  } catch(e) {
    console.log(e);
    return res.status(500).json({message: e, data: []});
  }
});

app.get('/ezicash-partners', async (req, res) => {
  try {
    db.query(`SELECT * FROM users_table a INNER JOIN partnership_application b ON a.user_id = b.user_id 
      WHERE b.business_permit_verify = 1 AND b.government_id_verify = 1 AND b.proof_of_address_verify = 1`, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).json({message:'Error!' + err, data: []});
      }

      return res.status(200).json({message: 'Successful!', data: result});
    });

  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'Unsuccessful!', data:[]});
  }
});

app.patch("/suspend-partner", async (req, res) => {
  try {
    const body = req.body;

    db.query(`UPDATE partnership_application SET is_suspended = ? WHERE partner_application_id = ?`,[body.is_suspended, Number(body.partner_application_id)], (err, _) => {
      if(err) {
        return res.status(500).json({message: 'Unsuccessful!'});
      }

      return res.status(200).json({message: 'Success!'});
    });
  } catch(e) {
    return res.status(500).json({message: 'Unsuccessful!'});
  }
});

app.patch("/reset-password", async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(req.body); 
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    db.query('UPDATE users_table SET user_pass = ? WHERE user_email = ?', [hash, email], 
      (err, result) => {
        if(err) {
          console.log(err);
          return res.status(500).json({message: 'Unsuccessful!'});
        }

        return res.status(200).json({message: 'Successful!'});
      }
    )

  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'Unsuccessful!'});
  }
});

app.get('/get-transactions', async (req, res) => {
  try {
    db.query('SELECT * FROM transactions a INNER JOIN user_details b ON a.user_id = b.user_id INNER JOIN partnership_application c ON a.partner_id = c.partner_application_id', (err, result) => {
      if(err) {
        return res.status(500).json({message: 'Unsuccessful!' + err, data: []});
      }

      return res.status(200).json({message:'Successful!', data: result});
    });
  } catch(e) {
    return res.status(500).json({message: err, data: []});
  }
});

app.get("/get-finances", async (req, res) => {
  try {
    db.query('SELECT * FROM partner_wallets', (err, result) => {
      if(err) {
        return res.status(500).json({message: err, data: []});
      }

      db.query('SELECT * FROM transactions', (err, transactions) => {
        if(err) {
          return res.status(500).json({message: err, data: []});
        }

        return res.status(200).json({message: 'Success!', data: {result: result, transactions: transactions}});
      });
    });
  } catch(e) {
    return res.status(500).json({message: e, data: []});
  }
});

app.get('/partner-check/:user_id', async (req, res) => {
  try {

    db.query('SELECT COUNT(*) as exist FROM partnership_application WHERE user_id = ? ', [req.params.user_id],
      (err, _) => {
        if(err) {
          console.log(err);
          return res.status(400)
        }
        
        console.log(_);
        return res.status(200).json({message:'Success!', data: _[0]});
      }
    )
  } catch(e) {

    return res.status(500).json({message: 'Unsuccessful!'});
  }
});

app.post("/partner-application", upload.single('file'), async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    db.query(`INSERT INTO partnership_application (
      user_id, 
      legal_name,
      partnership_type, 
      phone_no, 
      email, 
      legal_address, 
      city, 
      state, 
      zip, 
      business_location,
      business_city,
      business_state,
      business_zip,
      business_permit,
      government_id,
      proof_of_address,
      business_permit_verify,
      government_id_verify,
      proof_of_address_verify,
      bank,
      bank_account_id,
      account_id,
      card_no,
      card_holder
    ) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )`, [
      body.user_id, 
      body.legal_name,
      body.partnership_type, 
      body.phone_no, 
      body.email, 
      '', 
      body.city, 
      body.state, 
      body.zip, 
      body.business_location,
      body.business_city,
      body.business_state,
      body.business_zip,
      body.business_permit,
      body.government_id,
      body.proof_of_address,
      0,
      0,
      0,
      body.bank,
      body.bank_account_id,
      body.account_id,
      body.card_no,
      body.card_holder
    ], async (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).json({message:'There was an error in the application!'});
      }

      return res.status(200).json({message:'Successful Application!'});
    });
  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'There was an error applying!'});
  }
});

app.get('/get-users', async (req, res) => {
  try {

    db.query('SELECT * FROM users_table a INNER JOIN user_details b ON a.user_id = b.user_id', (err, result) => {
      if(err) {
        return res.status(500).json({message: err, data: []});
      }

      return res.status(200).json({message: 'Successful!', data: result});
    });
  } catch(e) {
    return res.status(500).json({message:'Unsuccessful!', data: []});
  }
});

app.get('/get-customers', async (req, res) => {
  try {
    db.query('SELECT * FROM users_table WHERE partner_type = ? AND user_email = ?', ['', ''], 
      (err, result) => {
        if(err) {
          return res.status(500).json({message:'Unsuccessful!', data: []});
        }

        return res.status(200).json({message:'Successful!', data: result});
      }
    )
  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'Unsuccessful', data: []});
  }
});

app.get('/get-transactions', async (req, res) => {
  try {
    db.query('SELECT a.service, a.amount, a.created_at FROM transactions a INNER JOIN partnership_application b ON a.partner_id = b.partnership_application_id INNER JOIN user_details_id c ON a.user_id = c.user_id',
      (err, result) => {
        if(err) {
          return res.status(500).json({message: err, data: []});
        }

        return res.status(200).json({message: 'Successful', data: result});
      }
    )
  } catch(e) {
    return res.status(500).json({message: 'Unsuccessful!'});
  }
});

app.get('/get-partners-dashboard', async (req, res) => {
  try {
    db.query('SELECT a.partner_application_id, a.legal_name, b.partner_type, a.business_permit_verify, a.government_id_verify, a.proof_of_address_verify, a.updated_at, a.created_at FROM partnership_application a INNER JOIN users_table b ON a.user_id = b.user_id', (err, partner_applications) => {
      if(err) {
        return res.status(500).json({message: 'Unsuccessful ' + err, data: undefined});
      }

      db.query('SELECT * FROM partner_wallets a INNER JOIN partnership_application b ON a.partner_id = b.partner_application_id INNER JOIN transactions c ON a.partner_id = c.partner_id',
        (err, trans) => {
          if(err) {
            return res.status(500).json({message: 'Unsuccessful! ' + err, data: undefined});
          }

          return res.status(200).json({message: 'Successful', data: {partners: partner_applications, transactions: trans}})
        }
      )
    })
  } catch(e) {
    console.log(e);
    return res.status(500).json({message:'Unsuccessful!' + e, data: undefined});
  }
});

io.on('connection', (socket) => {
  console.log('New connection', socket.id);
  socket.on('message', (msg) => {
    console.log('Recieved');
  });
  socket.on('approve-request', (message) => {
    console.log(message);
    io.emit('recieve-request', message);
  });
  socket.on("join-room", (roomId) => {
    console.log('joined room socket', roomId);
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
  socket.on("send-message", (message) => {
    const { sender_id, receiver_id } = message;
    io.emit("receive-message", message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnect');
  });
}); 

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});