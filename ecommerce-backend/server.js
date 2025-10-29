const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Saanjali@2409',  // change this
  database: 'ecommerce'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// 📦 Get all products
app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, minRating, search, sort } = req.query;
  
  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  // Filter by category
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  // Filter by price range
  if (minPrice) {
    query += ' AND price >= ?';
    params.push(minPrice);
  }
  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(maxPrice);
  }

  // Filter by rating
  if (minRating) {
    query += ' AND rating >= ?';
    params.push(minRating);
  }

  // Search by name or description
  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  // Sort products
  if (sort === 'price-low') {
    query += ' ORDER BY price ASC';
  } else if (sort === 'price-high') {
    query += ' ORDER BY price DESC';
  } else if (sort === 'rating') {
    query += ' ORDER BY rating DESC';
  } else if (sort === 'newest') {
    query += ' ORDER BY created_at DESC';
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 🔍 Search products with autocomplete
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);

  db.query(
    'SELECT id, name, price, image FROM products WHERE name LIKE ? LIMIT 10',
    [`%${q}%`],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// 🛒 Add to cart
app.post('/api/cart', (req, res) => {
  const { product_id, quantity } = req.body;
  db.query(
    'INSERT INTO cart (product_id, quantity) VALUES (?, ?)',
    [product_id, quantity],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// 📦 Place order
app.post('/api/orders', (req, res) => {
  const { total_amount, items } = req.body;

  db.query(
    'INSERT INTO orders (total_amount, status) VALUES (?, ?)',
    [total_amount, 'pending'],
    (err, result) => {
      if (err) return res.status(500).send(err);
      const orderId = result.insertId;

      const orderItems = items.map(i => [orderId, i.product_id, i.quantity]);
      db.query(
        'INSERT INTO order_items (order_id, product_id, quantity) VALUES ?',
        [orderItems],
        (err2) => {
          if (err2) return res.status(500).send(err2);
          res.sendStatus(200);
        }
      );
    }
  );
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));

// ❤️ Wishlist APIs
app.get('/api/wishlist/:userId', (req, res) => {
  const { userId } = req.params;
  db.query(
    `SELECT p.* FROM products p 
     INNER JOIN wishlist w ON p.id = w.product_id 
     WHERE w.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

app.post('/api/wishlist', (req, res) => {
  const { user_id, product_id } = req.body;
  db.query(
    'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
    [user_id, product_id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

app.delete('/api/wishlist/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  db.query(
    'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
    [userId, productId],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});

// ⭐ Reviews APIs
app.get('/api/reviews/:productId', (req, res) => {
  const { productId } = req.params;
  db.query(
    `SELECT r.*, u.name as user_name FROM reviews r 
     LEFT JOIN users u ON r.user_id = u.id 
     WHERE r.product_id = ? 
     ORDER BY r.created_at DESC`,
    [productId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

app.post('/api/reviews', (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;
  db.query(
    'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
    [user_id, product_id, rating, comment],
    (err) => {
      if (err) return res.status(500).send(err);
      
      // Update product average rating
      db.query(
        `UPDATE products SET rating = (
          SELECT AVG(rating) FROM reviews WHERE product_id = ?
        ) WHERE id = ?`,
        [product_id, product_id],
        (err2) => {
          if (err2) console.error(err2);
          res.sendStatus(200);
        }
      );
    }
  );
});

// 🎟️ Coupon APIs
app.post('/api/coupons/validate', (req, res) => {
  const { code } = req.body;
  db.query(
    `SELECT * FROM coupons 
     WHERE code = ? 
     AND valid_from <= CURDATE() 
     AND valid_until >= CURDATE() 
     AND (usage_limit IS NULL OR used_count < usage_limit)`,
    [code],
    (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) {
        return res.status(404).json({ error: 'Invalid or expired coupon' });
      }
      res.json(results[0]);
    }
  );
});

app.post('/api/coupons/apply', (req, res) => {
  const { code } = req.body;
  db.query(
    'UPDATE coupons SET used_count = used_count + 1 WHERE code = ?',
    [code],
    (err) => {
      if (err) return res.status(500).send(err);
      res.sendStatus(200);
    }
  );
});
