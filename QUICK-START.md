# 🚀 Quick Start Guide - Running Your E-commerce Application

## Prerequisites
- ✅ MySQL Server installed and running
- ✅ Node.js (v14 or higher) installed
- ✅ Java JDK 11+ installed (for Spring Boot backend)
- ✅ Maven installed

---

## 🗄️ Step 1: Set Up MySQL Database

### Option A: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Go to **File** → **Open SQL Script**
4. Select `ecommerce.sql` from your project root
5. Click **Execute** (⚡ icon) to run the script
6. Verify the database is created by running:
   ```sql
   SHOW DATABASES;
   USE ecommerce;
   SHOW TABLES;
   ```

### Option B: Using MySQL Command Line
```bash
# Navigate to project directory
cd "D:\Projeect\ecommerce(Kartik)"

# Run the SQL script (enter MySQL password when prompted)
mysql -u root -p < ecommerce.sql

# Verify
mysql -u root -p -e "USE ecommerce; SHOW TABLES;"
```

### Update Database Password
If your MySQL password is different from `Saanjali@2409`:

**For Node.js Backend:** Edit `ecommerce-backend/server.js`
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_PASSWORD_HERE',  // ← Change this
  database: 'ecommerce'
});
```

**For Spring Boot Backend:** Edit `src/main/resources/application.properties`
```properties
spring.datasource.password=YOUR_PASSWORD_HERE  # ← Change this
```

---

## 🖥️ Step 2: Choose Your Backend

You have **TWO backend options**. Choose ONE:

### Option A: Node.js Backend (Recommended for Quick Start)

#### Install Dependencies
```powershell
cd ecommerce-backend
npm install
```

#### Start the Server
```powershell
node server.js
```

✅ **Backend running at:** `http://localhost:5000`

#### Verify Backend
Open browser and check:
- `http://localhost:5000/api/products` - Should show products
- `http://localhost:5000/api/users` - Should show users

---

### Option B: Spring Boot Backend (Java)

#### Build the Project
```powershell
# From project root
mvn clean install
```

#### Run the Application
```powershell
mvn spring-boot:run
```

✅ **Backend running at:** `http://localhost:8080`

#### Verify Backend
Open browser and check:
- `http://localhost:8080/api/products`
- `http://localhost:8080/api/users`

**Note:** If using Spring Boot backend, update the frontend API URL in `ecommerce-frontend/src/` files from `http://localhost:5000` to `http://localhost:8080`.

---

## 🎨 Step 3: Run the React Frontend

### Install Dependencies
```powershell
cd ecommerce-frontend
npm install
```

### Start the Development Server
```powershell
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

### Open in Browser
The application will automatically open in your default browser at:
```
http://localhost:5173
```

---

## 🎯 Quick Verification Checklist

- [ ] MySQL database is running
- [ ] Database `ecommerce` exists with tables
- [ ] Backend server is running (port 5000 or 8080)
- [ ] Frontend development server is running (port 5173)
- [ ] Browser shows the home page
- [ ] Can navigate to products page
- [ ] Can see product listings

---

## 🔍 Troubleshooting

### Problem: "Cannot connect to MySQL"
**Solution:**
1. Verify MySQL is running:
   ```powershell
   # Check if MySQL service is running
   Get-Service MySQL*
   ```
2. Check credentials in backend files
3. Ensure database exists:
   ```sql
   SHOW DATABASES;
   ```

### Problem: "Port already in use"
**Solution:**
```powershell
# Kill process on port 5000 (Node.js)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Kill process on port 5173 (Vite)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### Problem: "Module not found"
**Solution:**
```powershell
# Delete node_modules and reinstall
rm -r node_modules
rm package-lock.json
npm install
```

### Problem: Frontend shows 404 errors
**Solution:**
1. Check backend is running
2. Verify API URLs in frontend match backend port
3. Check browser console for CORS errors

### Problem: CORS Error
**Solution:** Add CORS headers in backend:

**Node.js Backend** (`server.js`):
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**Spring Boot Backend**:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

---

## 🎨 Default Test Credentials

### Test User
- **Email:** test@example.com
- **Password:** password123

### Admin User
- **Email:** admin@example.com
- **Password:** admin123

*(Create these users in the database if they don't exist)*

---

## 📝 Running All Services at Once

### PowerShell Script (Recommended)
Create a file `start-app.ps1`:

```powershell
# Start MySQL (if not running)
Start-Service MySQL*

# Start Backend (Node.js)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\Projeect\ecommerce(Kartik)\ecommerce-backend'; node server.js"

# Wait for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'D:\Projeect\ecommerce(Kartik)\ecommerce-frontend'; npm run dev"

# Open browser
Start-Sleep -Seconds 5
Start-Process "http://localhost:5173"
```

Run it:
```powershell
.\start-app.ps1
```

---

## 🌐 Production Deployment

### Frontend Build
```powershell
cd ecommerce-frontend
npm run build
```
Output will be in `dist/` folder

### Backend Deployment
**Node.js:**
```powershell
# Use PM2 for process management
npm install -g pm2
pm2 start server.js
```

**Spring Boot:**
```powershell
mvn clean package
java -jar target/ecommerce-0.0.1-SNAPSHOT.jar
```

---

## 📊 Monitoring & Logs

### View Backend Logs
**Node.js:**
- Console output in terminal

**Spring Boot:**
- Logs in `logs/` folder or console

### View Frontend Logs
- Browser DevTools Console (F12)
- Network tab for API calls

---

## 🎉 You're All Set!

Your modern e-commerce platform should now be running smoothly. 

**Next Steps:**
1. Review the `ENHANCEMENTS.md` file for feature improvements
2. Customize the color scheme and branding
3. Add your own products and categories
4. Implement additional features from the enhancement list

**Need Help?**
- Check the troubleshooting section above
- Review error messages in console/terminal
- Verify all dependencies are installed
- Ensure all ports are available

Happy coding! 🚀
