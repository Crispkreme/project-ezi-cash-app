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
  database: 'project-soc-app',
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

// Register a user
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error while inserting user' });
      }
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error while hashing password' });
  }
});

// Login a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database query error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const user = result[0]; // Get the first result

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate a simple token (or use user ID, timestamp, etc.)
    const token = `${user.id}:${new Date().getTime()}`;
    
    // Set token in HTTP-only cookie (for security)
    res.cookie('auth_token', token, {
      httpOnly: true, // Ensures the cookie cannot be accessed via JavaScript
      secure: false,  // Set to true if using HTTPS
      maxAge: 3600000 // Expires in 1 hour
    });

    return res.json({ success: true, message: 'Login successful' });
  });
});

// Logout the user
app.post('/logout', (req, res) => {
  // Clear the auth token cookie
  res.clearCookie('auth_token');

  return res.json({ success: true, message: 'Logged out successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
