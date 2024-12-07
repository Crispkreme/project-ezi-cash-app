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
  'client_id': 'AVTKCXUCj4hRObJfEaJr2nt4n_s6ouEAXsNqTZZnQbcfuTIirbm9ob4465jHqqSE1cIfVmG8LSilOwqn',
  'client_secret': 'EE34NfgcLZ4f6SEdo7fCz4AuFIDNLA32IKulXzAY8wR-U4KMIgxQuXzqtgXA3W9GmrlJTTfp0mw8DauW',
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
  const { 
    user_phone_no,
    first_name,
    middle_name,
    last_name,
    birthdate,
    email,
    nationality,
    main_source,
    province,
    city,
    barangay,
    zipcode,
    HasNoMiddleName,
    MPIN
  } = req.body;

  console.log(req.body)

  // Validate required fields
  if (
    !user_phone_no ||
    !first_name ||
    (!HasNoMiddleName && !middle_name) || // Validate MiddleName only if not marked as "No Middle Name"
    !last_name,
    !birthdate,
    !email,
    !nationality,
    !main_source,
    !province,
    !city,
    !barangay,
    !zipcode,
    !HasNoMiddleName,
    !MPIN
  ) {
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
              [
                first_name,
                middle_name || '', // Pass null if MiddleName is not provided
                last_name,
                new Date(), // TODO, since birthdate cannot be passed here
                email,
                nationality,
                main_source,
                province,
                city,
                barangay,
                zipcode,
                userId,
                new Date(),
                new Date()
              ],
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
      ut.partner_type
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

// paypal functionality
app.post('/paypal', (req, res) => {
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
              name: 'Red Hat',
              sku: '001',
              price: '100.00',
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: '100.00',
        },
        description: 'Hat for the best team ever',
      },
    ],
  };

  paypal.payment.create(create_payment_json, (error, payment) => {

    if (error) {
      console.error('PayPal API Error:', error.response || error);
      return res.status(500).send('Error creating PayPal payment.');
    }

    const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
    if (approvalUrl) {
      // console.log('PayPal Approve URL:', approvalUrl.href);
      // res.redirect(approvalUrl.href);
      res.json({ approvalUrl: approvalUrl.href });
    } else {
      res.status(500).send('Approval URL not found.');
    }
  });
});
app.post('/success', (req, res) => {
  
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  if (!payerId || !paymentId) {
    return res.status(400).send('Payment information is missing.');
  }

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '100.00',
        },
      },
    ],
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error('PayPal Execution Error:', error.response || error);
      return res.status(500).send('Error executing PayPal payment.');
    }
    console.log('Payment executed successfully:', payment);
    res.sendFile(path.join(__dirname, 'success.html'));
  });
  
});
app.get('/cancel', (req, res) => res.send('Payment was cancelled.'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
