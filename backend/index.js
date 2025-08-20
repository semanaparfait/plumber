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
app.use(cookieParser()); // Middleware to parse cookies

app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));
const isNeon = process.env.DATABASE_URL?.includes("neon.tech");
const router = express.Router();
app.use(router);

app.use(cors({
  origin: [
    'http://localhost:4173', // React preview
    'http://localhost:5173', // React dev
    'https://einstein-plumbers.onrender.com' // deployed frontend
  ],
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
  // 1. Check for a bearer token in the Authorization header.
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader && authHeader.split(' ')[1]; // Extracts the token after 'Bearer'

  // 2. Check for a token in the cookies.
  const cookieToken = req.cookies.session_token;

  // 3. Determine which token to use.
  const token = bearerToken || cookieToken;

  // 4. If no token is found in either location, deny access.
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // 5. Verify the token.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches user info to the request object
    next();
  } catch (err) {
    // This catch block handles invalid, expired, or malformed tokens.
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}


// Signup endpoint
// Signup endpoint with unique phone check
app.post('/api/signup', async (req, res) => {
  const { username, phonenumber, password } = req.body;

  // 1️⃣ Basic validation
  if (!username || !phonenumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  // Normalize phone number (remove spaces, ensure +)
  const normalizedPhone = phonenumber.replace(/\s+/g, '');

  try {
    // 2️⃣ Check if phone number already exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE phonenumber = $1',
      [normalizedPhone]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Phone number already in use.' });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Insert new user
    const result = await pool.query(
      'INSERT INTO users (username, phonenumber, password) VALUES ($1, $2, $3) RETURNING id, username, phonenumber',
      [username, normalizedPhone, hashedPassword]
    );

    res.status(201).json({
      message: 'User created successfully.',
      user: result.rows[0],
    });

  } catch (err) {
    console.error('Signup error:', err);

    // 5️⃣ Catch unique constraint violation just in case
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Phone number already exists.' });
    }

    res.status(500).json({ message: 'Server error.' });
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

    const token = jwt.sign({ id: user.id, phonenumber: user.phonenumber,username: user.username, }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    // console.log("JWT generated:", token);
// console.log("Setting cookie session_token...");
const isProduction = process.env.NODE_ENV === 'production';
res.cookie('session_token', token, {
  httpOnly: true,
  maxAge: 3600000, // 1 hour
  sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site prod, 'lax' for local
  secure: isProduction // must be true for 'none'
});
    res.json({ 
        message: 'Login successful' ,
        is_admin: user.is_admin
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// getting the logged in user
app.get("/api/me", authenticateToken, (req, res) => {
  const { id, username, phonenumber } = req.user;
  res.json({ id, username, phonenumber });
});

// -----logout-----------
app.post("/api/logout", (req, res) => {
  res.clearCookie("session_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.json({ message: "Logged out successfully" });
});

// for admin
app.get('/api/admin/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, phonenumber, password, created_at , is_admin FROM users WHERE is_admin = false ORDER BY username ASC'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// fetching only admins
app.get('/api/admin/admins', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, phonenumber, password, created_at , is_admin FROM users WHERE is_admin = true'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// PUT /api/users/:id/status
app.put('/api/users/:id/status', async (req, res) => {
  const { id } = req.params;
  const { is_admin } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET is_admin = $1 WHERE id = $2',
      [is_admin, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// admin deleting------
// DELETE /api/users/:id
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting user' });
  }
});

// ---------fetching all users------------
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error fetching users' });
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

// inserting subscribers for news letter
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await pool.query(
      'INSERT INTO news_letter (email) VALUES ($1)',
      [email]
    );
    res.status(201).json({ message: 'Subscription successful' });
  } catch (err) {
    console.error('Error inserting subscriber:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all subscribers
app.get('/api/subscribe', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news_letter');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching subscribers:', err);
    res.status(500).json({ message: 'Server error fetching subscribers' });
  }
});

// insering category


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/categories
app.post("/api/categories", upload.single("category_image"), async (req, res) => {
  try {
    const { category_name } = req.body;
    if (!category_name) return res.status(400).json({ error: "Category name is required" });

    const categoryImage = req.file ? req.file.filename : null;

    const result = await pool.query(
      `INSERT INTO categories (category_name, category_image)
       VALUES ($1, $2) RETURNING *`,
      [category_name, categoryImage]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading category:", err);
    res.status(500).json({ error: "Failed to upload category" });
  }
});

// GET /api/categories
app.get("/api/categories", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categories "
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
// -----------deleting category----------
app.delete('/api/category/:id', async (req, res) => {
  const { id } = req.params; // this is the product_id from the URL

  if (!id) {
    return res.status(400).json({ message: 'category ID is required' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM categories WHERE category_id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'category not found' });
    }

    res.status(200).json({ message: 'category deleted', category: result.rows[0] });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// upload products

// Set storage for uploaded files
const storageproduct = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadproduct = multer({ storage: storageproduct });
// POST /api/products
app.post("/api/products", uploadproduct.single("product_image1") , async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      product_newprice,
      product_oldprice,
      category_id

    } = req.body;

    if (!product_name || !product_description || !product_newprice  || !category_id) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }
    const productImage1 = req.file ? req.file.filename : null;

    const result = await pool.query(
      `INSERT INTO products 
        (product_name, product_description, product_newprice, product_oldprice, category_id, product_image1)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        product_name,
        product_description,
        product_newprice,
        product_oldprice,
        category_id,
        productImage1
      ]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error uploading product:", err);
    res.status(500).json({ error: "Failed to upload product" });
  }
});


// GET /api/product
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});
// ------------deleting product-------------
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params; // this is the product_id from the URL

  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM products WHERE product_id = $1 RETURNING *',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted', product: result.rows[0] });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


//insering to cart
// Add to cart
app.post("/api/cart", authenticateToken, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;
  if (!quantity || quantity <= 0) {
  return res.status(400).json({ error: "Quantity must be greater than 0" });
}

  try {
    // Check if product already in cart for this user
    const existing = await pool.query(
      "SELECT * FROM cart WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    if (existing.rows.length > 0) {
      // Product exists → increment quantity
      const newQty = existing.rows[0].quantity + quantity;
      const updated = await pool.query(
        "UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
        [newQty, user_id, product_id]
      );
      res.json({ message: "Cart updated", cart: updated.rows[0] });
    } else {
      // Product not in cart → insert new row
      const result = await pool.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [user_id, product_id, quantity]
      );
      res.json({ message: "Product added to cart", cart: result.rows[0] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

 // get the cart items for the user
 // Get cart items
app.get("/api/cart", authenticateToken, async (req, res) => {
  const user_id = req.user.id; // from JWT middleware

  try {
    const result = await pool.query(
`SELECT 
*
FROM cart c
JOIN products p 
  ON p.product_id = c.product_id
WHERE c.user_id = $1
  AND c.cart_status = 'pending'
ORDER BY c.cart_id DESC
`,
      [user_id]
    );

    res.json(result.rows); // returns an array
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Error fetching cart" });
  }
});
// delete the cart
app.delete("/api/cart/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `DELETE FROM cart 
       WHERE cart_id = $1 AND user_id = $2
       RETURNING *`,
      [id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Item not found or unauthorized" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Error removing item" });
  }
});

// getting all cart details to ceo
app.get('/api/admin/cart-details', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.id AS user_id,
        u.username,
        u.phonenumber,
        c.cart_id,
        c.quantity,
        c.cart_status,
        c.created_at,
        p.product_id,
        p.product_name,
        p.product_newprice,
        p.product_image1
      FROM cart c
      JOIN users u ON c.user_id = u.id
      JOIN products p ON c.product_id = p.product_id
      ORDER BY c.cart_id DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cart details:', err);
    res.status(500).send('Server error');
  }
});
// -----------deling on orders-------------
router.post("/checkout", async (req, res) => {
  const { userId, deliveryMethod } = req.body;

  try {
    // 1. Get cart items for the user
    const cartItems = await pool.query(
      `SELECT c.product_id, c.quantity, p.price 
       FROM cart c 
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`,
      [userId]
    );

    if (cartItems.rows.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 2. Calculate total amount
    let totalAmount = 0;
    cartItems.rows.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    // 3. Create order
    const order = await pool.query(
      `INSERT INTO orders (user_id, delivery_method, total_amount, status, created_at)
       VALUES ($1, $2, $3, 'pending', NOW())
       RETURNING id`,
      [userId, deliveryMethod, totalAmount]
    );

    const orderId = order.rows[0].id;

    // 4. Insert into order_items
    const insertPromises = cartItems.rows.map((item) => {
      return pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    });
    await Promise.all(insertPromises);

    // 5. Clear cart
    await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Something went wrong during checkout" });
  }
});




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

