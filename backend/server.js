const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
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
    HasNoMiddleName
  } = req.body;

  // Validate required fields
  if (
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
    !ZipCode
  ) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // SQL Query
    const query = `
      INSERT INTO userdetails 
      (FirstName, MiddleName, LastName, Birthdate, Email, Nationality, MainSource, Province, City, Barangay, ZipCode, HasNoMiddleName) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute query
    db.query(
      query,
      [
        FirstName,
        MiddleName || null, // Pass null if MiddleName is not provided
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
      ],
      (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ message: 'Error while saving user details.' });
        }
        res.status(201).json({ message: 'User created successfully.' });
      }
    );
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
