import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from "multer";
import fs from "fs";
import path from 'path';




dotenv.config();
const app = express();
const { Pool } = pg;  

app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));
app.use(cookieParser()); // Middleware to parse cookies
const isNeon = process.env.DATABASE_URL?.includes("neon.tech");
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true,
}));


const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: isNeon ? { rejectUnauthorized: false } : false,
        
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      }
);


// const local = new pg.Pool({
//   connectionString: process.env.LOCAL_UR,
// });
// Middleware to verify JWT from cookie
function authenticateToken(req, res, next) {
  const token = req.cookies.session_token;
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can access user info in req.user in the route
    next();
  } catch (err) {
      res.status(500).json({ error: err.message });
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}


// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username,  phonenumber, password } = req.body;

  if (!username  || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await pool.query(
      'INSERT INTO users (username, phonenumber, password) VALUES ($1, $2, $3)',
      [username, phonenumber, hashedPassword]
    );
    

    res.status(201).send({ message: 'User created successfully' });

  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique violation
      res.status(400).json({ message: 'Username or email already exists' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log('Login attempt, body:', req.body);

    const { phonenumber, password } = req.body;

    if (!phonenumber || !password) {
      console.log('Missing phonenumber or password');
      return res.status(400).json({ message: 'Phonenumber and password are required' });
    }

    console.log('Querying user...');
    const result = await pool.query('SELECT * FROM users WHERE phonenumber = $1', [phonenumber]);

    if (result.rows.length === 0) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid phonenumber or password' });
    }

    const user = result.rows[0];
    console.log('User found:', user);

    console.log('Checking password...');
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid phonenumber or password' });
    }

    console.log('Generating JWT token...');
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET not set in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign({ id: user.id, phonenumber: user.phonenumber }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('session_token', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ 
        message: 'Login successful' ,
        is_admin: user.is_admin
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// for admin
app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, phonenumber, password, created_at , is_admin FROM users'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// inserting categories
const storage = multer.diskStorage({
  destination: "./uploads/categories",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });
app.post("/api/categories", upload.single("image"), async (req, res) => {
  const { name } = req.body;

  if (!name || !req.file) {
    return res.status(400).json({ error: "Missing category name or image file" });
  }

  const imagePath = `/uploads/categories/${req.file.filename}`;

  try {
await pool.query(
  "INSERT INTO categories (category_name, category_icon) VALUES ($1, $2)",
  [name, imagePath]
);
    res.status(201).json({ message: "Category saved" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// selecting categories
app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// insert contact us endpoint
app.post('/api/contactus', async (req, res) => {
  console.log('Received data:', req.body);
  const { name, phoneNumber, email, message } = req.body;

  if (!name || !phoneNumber || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_us (name, phone_number, email, message) VALUES ($1, $2, $3, $4)',
      [name, phoneNumber, email, message]
    );
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// select data fromdb on contact us page
app.get('/api/contactus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contact_us');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching contact us messages:', err);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

