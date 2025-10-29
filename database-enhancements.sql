-- Enhanced E-commerce Database Schema
-- Run this after the initial ecommerce.sql

-- Add new columns to products table if they don't exist
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS review_count INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS category VARCHAR(100),
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS discount_percentage INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_wishlist (user_id, product_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  images JSON,
  verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type ENUM('percentage', 'fixed') NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  min_order_value DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  usage_limit INT,
  used_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Update products with sample data
UPDATE products SET 
  category = 'Electronics',
  rating = 4.5,
  review_count = 120,
  description = 'High-quality product with excellent features',
  discount_percentage = 10,
  is_featured = TRUE,
  is_new = TRUE
WHERE id = 1;

-- Insert sample coupons
INSERT INTO coupons (code, discount_type, discount_value, min_order_value, max_discount, valid_from, valid_until, usage_limit)
VALUES 
  ('WELCOME20', 'percentage', 20.00, 500.00, 200.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 100),
  ('SAVE100', 'fixed', 100.00, 1000.00, NULL, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 60 DAY), NULL),
  ('FLASH50', 'percentage', 50.00, 2000.00, 500.00, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 50)
ON DUPLICATE KEY UPDATE code=code;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);

-- Add sample categories to existing products
UPDATE products SET category = 
  CASE 
    WHEN name LIKE '%serum%' OR name LIKE '%cream%' OR name LIKE '%face%' OR name LIKE '%skin%' THEN 'Skincare'
    WHEN name LIKE '%shirt%' OR name LIKE '%jean%' OR name LIKE '%tee%' OR name LIKE '%cloth%' THEN 'Clothing'
    WHEN name LIKE '%phone%' OR name LIKE '%laptop%' OR name LIKE '%speaker%' OR name LIKE '%watch%' THEN 'Electronics'
    WHEN name LIKE '%lamp%' OR name LIKE '%vase%' OR name LIKE '%sofa%' OR name LIKE '%home%' THEN 'Home'
    ELSE 'Other'
  END
WHERE category IS NULL;

-- Add random ratings to products
UPDATE products 
SET 
  rating = 3.0 + (RAND() * 2.0),
  review_count = FLOOR(10 + (RAND() * 200))
WHERE rating IS NULL OR rating = 0;

COMMIT;
