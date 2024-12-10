// require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const paypal = require('paypal-rest-sdk');

const app = express();

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

  console.log(req.body)

  // Validate required fields
  if ( !user_phone_no || !first_name || (!HasNoMiddleName && !middle_name) || !last_name, !birthdate, !email, !nationality, !main_source, !province, !city, !barangay, !zipcode, !HasNoMiddleName, !MPIN ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {

    db.query("SELECT user_phone_no FROM users_table WHERE user_phone_no= ?", user_phone_no, 

      (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error while saving user credentials.' });
        }

        if(result.length > 0) {
          console.log("already linked")
          return res.status(500).json({ message: 'The mobile number is already linked!.' });
        }

        const insQuery = `
          INSERT INTO users_table 
          (user_phone_no, user_mpin, updated_at, created_at) 
          VALUES (?, ?, ?, ?)
        `;

        db.query(
          insQuery,
          [
            user_phone_no,
            MPIN,
            new Date(),
            new Date()
          ],
          (err, result) => {
            if (err) {
              console.error('Database Error:', err);
              return res.status(500).json({ message: 'Error while saving user credentials.' });
            }
            
            const userId = result.insertId;

            const query = `
              INSERT INTO user_details 
              (first_name, middle_name, last_name, birthdate, email, nationality, main_source, province, city, barangay, zipcode, user_id, created_at, updated_at) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // Execute query
            db.query(
              query,
              [ first_name, middle_name || '', last_name, new Date(), email, nationality, main_source, province, city, barangay, zipcode, userId, new Date(), new Date() ],
              async (err, result) => {
                if (err) {
                  console.error('Database Error:', err);
                  return res.status(500).json({ message: 'Error while saving user details.' });
                }
                
                const data = await getUserData(userId);
                if(data.data !== -1) {
                  return res.status(200).json({message: "Login Successful!", data: data});
                } else {
                  return res.status(500).json({message: "Login unsuccessful!", data: undefined});
                }

              }
            );
          }
        );

      }
    );

  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});

const getUserData = async (userId) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user_details WHERE user_id = ? ", userId, (err, row) => {
      if(err) {
        console.error('Database Error:', err);
        reject(undefined);
      }
      
      resolve(row[0]) ;
    });
  })
}

const otps = new Map();
app.post('/otp', (req, res) => {
  const { mobileNumber } = req.body;

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
  const {phone, pin} = req.body;
  db.query("SELECT * FROM users_table WHERE user_phone_no= ? AND user_mpin= ?",[phone, pin],
  async (err, result) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ message: 'Error while checking user credentials.' });
    }
    
    if(result.length > 0) {
      const data = await getUserData(result[0].user_id);
      return res.status(200).json({ message: 'Proceed to login', data: {...data, ...result[0]} });
    } else {
      return res.status(500).json({ message: 'MPIN is incorrect', data: -1 });
    }
  });
})

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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});