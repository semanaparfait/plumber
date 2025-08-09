import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();
const isNeon = process.env.DATABASE_URL?.includes("neon.tech");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const { Pool } = pg; // Destructure Pool from pg
// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isNeon
    ? { rejectUnauthorized: false }
    : false,
});

// const local = new pg.Pool({
//   connectionString: process.env.LOCAL_UR,
// });

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username,  phonenumber, password } = req.body;

  if (!username  || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    await pool.query(
      'INSERT INTO users (username, email, phonenumber, password) VALUES ($1, $2, $3, $4)',
      [username, email, phonenumber, password]
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
  const { username, password } = req.body;

  if (!phonenumber || !password)
    return res.status(400).json({ message: 'phonenumber and password are required' });

  try {
    // ✅ Find user in the correct table
    const result = await pool.query('SELECT * FROM accountusers WHERE username = $1', [username]);

    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Invalid username or password' });

    const user = result.rows[0];

    // ✅ Compare hashed password
    // const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ message: 'Invalid username or password' });

    // ✅ Login successful
    res.json({ message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// for admin
// app.get('/api/admin/users', async (req, res) => {
//   try {
//     const result = await pool.query(
//       'SELECT id, username, email, phonenumber, password, created_at FROM accountusers'
//     );
//     res.status(200).json(result.rows);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Server error fetching users' });
//   }
// });


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

