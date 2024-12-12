// require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const paypal = require('paypal-rest-sdk');

const app = express();
const nodemailer = require('nodemailer');

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AWRQNwYAQWpS59fjvbtupQcCKxvLIfvywjgKWpI3e_J-cvQg9yIOGW7-1DPOzIqxBsAUi-zU0r0L12B7',
  'client_secret': 'EG5czQetmcA7JlD2n04wivNvuX7xLxoEO2AYcbPfJfQWiZmQilfBvaCOCgbVkngxh8F309q4ht_o3oiO',
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
  if ( !user_phone_no || !first_name || (!HasNoMiddleName && !middle_name) || !last_name || !birthdate || !email || !nationality || !main_source || !province || !city || !barangay || !zipcode || !MPIN ) {
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
        ud.user_detail_id,
        CONCAT(ud.first_name, ' ', IFNULL(ud.middle_name, ''), ' ', ud.last_name) AS name,
        ut.partner_type,
        w.balance,
        ut.user_phone_no AS phone,
        CONCAT(ud.barangay, ', ', ud.city, ', ', ud.province, ', ', ud.zipcode) AS address
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

const otps = new Map();
app.post('/otp', (req, res) => {
  let { mobileNumber } = req.body;
  console.log(mobileNumber);
  mobileNumber = String(mobileNumber).replace("+63","");
  console.log(mobileNumber);

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
app.get("/check-phone", async (req, res) => {
  const {phone} = req.query || {};
  console.log("phone: ", phone);
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
  try {
    const {
      user_detail_id: user_id,
      partner_type: type,
      service,
      amount,
    } = req.body;

    const bank = "";
    const total_amount = 0;
    const balance = 0;
    const transaction_status = "Pending";
    const payer_id = null;
    const partner_id = null;
    const payment_id = null;
    const created_at = new Date();
    const updated_at = new Date();

    const checkPendingQuery = `
      SELECT COUNT(*) AS pendingCount 
      FROM transactions 
      WHERE user_id = ? AND transaction_status = 'Pending'
    `;

    db.query(checkPendingQuery, [user_id], (err, result) => {
      if (err) {
        console.error("Database Error (Check Pending):", err);
        return res.status(500).json({
          message: "Error while checking pending transactions.",
          error: err.message,
        });
      }

      const pendingCount = result[0]?.pendingCount || 0;

      if (pendingCount > 0) {
        return res.status(400).json({
          message: "User already has a pending transaction.",
        });
      }

      const insertQuery = `
        INSERT INTO transactions 
        (user_id, partner_id, type, bank, service, amount, total_amount, balance, transaction_status, payer_id, payment_id, created_at, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const queryParams = [ user_id, partner_id, type, bank, service, amount, total_amount, balance, transaction_status, payer_id, payment_id, created_at, updated_at ];

      db.query(insertQuery, queryParams, (err, result) => {
        if (err) {
          console.error("Database Error (Insert Transaction):", err);
          return res.status(500).json({
            message: "Error while saving transaction details.",
            error: err.message,
          });
        }

        if (result.affectedRows > 0) {
          return res.status(200).json({
            message: "Transaction saved successfully",
            data: { id: result.insertId, ...req.body },
          });
        } else {
          return res.status(500).json({
            message: "Transaction failed to save!",
            data: undefined,
          });
        }
      });
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      message: "An unexpected error occurred.",
      error: error.message,
    });
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
          data: userData 
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

// get all partners
app.get("/get-partners", async (req, res) => {
  const query = `
    SELECT 
      CONCAT(ud.first_name, ' ', ud.middle_name, ' ', ud.last_name) AS store_name,
      ud.city,
      ud.barangay,
      ud.province,
      ut.partner_type,
      ut.user_id AS store_id
    FROM 
      users_table AS ut
    JOIN 
      user_details AS ud
    ON 
      ut.user_id = ud.user_id
    WHERE 
      ut.partner_type = ?;
    `;
  const values = ["Store"];
  
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Error fetching partners." });
    }
    console.log("Result:", result);
    res.status(200).json({ 
      message: "Partners retrieved successfully", 
      data: result 
    });
  });
});
app.get("/get-transaction", async (req, res) => {
  const query = `
    SELECT 
      CONCAT(user_details.first_name, ' ', IFNULL(user_details.middle_name, ''), ' ', user_details.last_name) AS name,
      transactions.created_at AS date,
      transactions.service,
      transactions.id,
      transactions.amount,
      transactions.bank,
      transactions.transaction_status AS status,
      user_details.user_id
    FROM transactions
    INNER JOIN user_details ON transactions.user_id = user_details.user_detail_id
    ORDER BY transactions.created_at DESC;
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

    // Group transactions by raw date (ISO format)
    const groupedTransactions = results.reduce((groups, transaction) => {
      const dateKey = new Date(transaction.date).toISOString().split("T")[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
      return groups;
    }, {});

    // Format grouped data into an array of groups
    const formattedResults = Object.entries(groupedTransactions).map(([date, transactions]) => ({
      date,
      transactions,
    }));

    return res.status(200).json({
      message: "Transactions retrieved successfully.",
      data: formattedResults,
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
    console.log("results", results);
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
app.get('/get-total-transaction/:user_detail_id', async (req, res) => {

  const { user_detail_id } = req.params;
  const query = `SELECT * FROM partner_wallets WHERE user_detail_id = ?`;

  db.query(query, [user_detail_id], (err, results) => {

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

    console.log("results", results);
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


// paypal functionality
app.post('/paypal', (req, res) => {
  const { first_name, middle_name, last_name, payment: { service, total_amount }} = req.body;

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
              price: parseFloat(total_amount).toFixed(2),
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: parseFloat(total_amount).toFixed(2),
        },
        description: `${first_name} ${middle_name} ${last_name} has ${service} with a total amount of $${parseFloat(total_amount).toFixed(2)}`,
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

    const { store_id, type, bank, service, amount, total_amount, balance } = payment;
    const individual_id = data.body.user_id;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query1 = `
      INSERT INTO transactions 
      (store_id, individual_id, type, bank, service, amount, total_amount, balance, payer_id, payment_id, updated_at, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values1 = [ store_id, individual_id, type, bank, service, amount, total_amount, balance, PayerID, paymentId, updatedAt, createdAt ];

    db.query(query1, values1, (dbError1, dbResult1) => {
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

// APP PARTNER


// WEB
app.post("/web-login", async(req, res) => {
  try {
    const {email, password} = req.body;
    db.query("SELECT user_email, user_pass FROM users_table WHERE user_email = ?", [email], async (err, result) => {
      if(err) {
        return res.status(500).json({message: err, data:{}});
      }
      const x = await bcrypt.compare(password, result[0].user_pass);
      if(x) {
        return res.status(200).json({message: '', data: result[0].user_email})
      } else {
        return res.status(500).json({message: '', data: ''});
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
        return res.status(500).json({message: error, data: info.response});
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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});