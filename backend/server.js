const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

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
    MobileNumber,
    FirstName,
    MiddleName,
    LastName,
    Birthdate,
    Email,
    Nationality,
    MainSource,
    Province,
    City,
    Barangay,
    ZipCode,
    HasNoMiddleName,
    MPIN
  } = req.body;

  console.log(req.body)

  // Validate required fields
  if (
    !MobileNumber ||
    !FirstName ||
    (!HasNoMiddleName && !MiddleName) || // Validate MiddleName only if not marked as "No Middle Name"
    !LastName ||
    !Birthdate ||
    !Email ||
    !Nationality ||
    !MainSource ||
    !Province ||
    !City ||
    !Barangay ||
    !ZipCode ||
    !MPIN
  ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {

    db.query("SELECT user_phone_no FROM users_table WHERE user_phone_no= ?", MobileNumber, 
      (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error while saving user credentials.' });
        }

        if(result.length > 0) {
          console.log("already linked bro")
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
            MobileNumber,
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
                FirstName,
                MiddleName || '', // Pass null if MiddleName is not provided
                LastName,
                new Date(), // TODO, since birthdate cannot be passed here
                Email,
                Nationality,
                MainSource,
                Province,
                City,
                Barangay,
                ZipCode,
                userId,
                new Date(),
                new Date()
              ],
              (err, result) => {
                if (err) {
                  console.error('Database Error:', err);
                  return res.status(500).json({ message: 'Error while saving user details.' });
                }
                console.log(result.insertId)
                db.query("SELECT * FROM user_details WHERE user_id = ? ", userId, (err, row) => {
                  if(err) {
                    console.error('Database Error:', err);
                    return res.status(500).json({ message: 'Error retrieving saving user details.' });
                  }
                  console.log(row);
                  return res.status(201).json({ message: 'User created successfully.', data: row[0]});
                });

                
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

app.get('/otp', (req, res) => {
  const mobileNumber = req.query.mobile;

  if (!mobileNumber) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  if (mobileNumber.length !== 10) {
    return res.status(400).json({ error: 'Invalid mobile number format' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(`OTP for ${mobileNumber}: ${otp}`);

  res.status(200).json({
    message: 'OTP sent successfully',
    otp,
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


