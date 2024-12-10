const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require("axios");
const cookieParser = require('cookie-parser');
const app = express();
const nodemailer = require('nodemailer');

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser());

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
});

app.post("/web-login", async(req, res) => {
  try {
    const {email, password} = req.body;
    db.query("SELECT user_email, user_pass FROM users_table WHERE user_email = ?", [email], async (err, result) => {
      if(err) {
        return res.status(500).json({message: err, data:{}});
      }
      const x = await bcrypt.compare(password, result[0].user_pass);
      console.log(x);
      console.log(result[0].user_pass);
      return res.status(200).json({message: '', data: result[0]})
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


