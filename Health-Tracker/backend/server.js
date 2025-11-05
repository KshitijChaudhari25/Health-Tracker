// 1. IMPORTS
require("dotenv").config(); // Loads .env file credentials
const express = require("express");
const mysql = require("mysql2/promise"); // Use the promise-based version
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 2. SETUP
const app = express();
const port = 3000;

// 3. MIDDLEWARE
app.use(cors()); // Allows cross-origin requests (from your frontend)
app.use(express.json()); // Parses incoming JSON request bodies

// 4. DATABASE CONNECTION POOL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 5. AUTH MIDDLEWARE (To protect routes)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer TOKEN"

  if (token == null) {
    return res.status(401).json({ error: "No token provided" }); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" }); // Forbidden
    }
    req.user = user;
    next();
  });
};

// 6. ROUTES

// --- AUTH ROUTES ---

// POST /register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Username or email already taken" });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Error registering user" });
  }
});

// POST /login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // User is valid! Create a JSON Web Token (JWT)
    const tokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send back token AND user object
    res.json({
      message: "Login successful",
      token: token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// --- MEAL ROUTES (PROTECTED) ---

// POST /meals (Add a new meal)
app.post("/meals", authenticateToken, async (req, res) => {
  try {
    // 'details' will now be a JSON string from the frontend
    const { meal_date, details } = req.body;
    const userId = req.user.id;

    if (!meal_date || !details) {
      return res.status(400).json({ error: "Date and details are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO meals (user_id, meal_date, details) VALUES (?, ?, ?)",
      [userId, meal_date, details]
    );

    res.status(201).json({ message: "Meal added successfully", id: result.insertId });
  } catch (error) {
    console.error("Add meal error:", error);
    res.status(500).json({ error: "Error adding meal" });
  }
});

// GET /meals (Get all meals for the logged-in user)
app.get("/meals", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all meals, not just today's, so the weekly chart works
    const [meals] = await pool.query(
      "SELECT id, meal_date, details, created_at FROM meals WHERE user_id = ? ORDER BY meal_date DESC, created_at DESC",
      [userId]
    );

    res.json(meals);
  } catch (error) {
    console.error("Get meals error:", error);
    res.status(500).json({ error: "Error fetching meals" });
  }
});

// *** NEW ROUTE ***
// DELETE /meals/:id (Delete a specific meal for the logged-in user)
app.delete("/meals/:id", authenticateToken, async (req, res) => {
    try {
        const mealId = req.params.id;
        const userId = req.user.id;

        // The 'user_id' check is crucial for security
        // It ensures a user can only delete their own meals
        const [result] = await pool.query(
            "DELETE FROM meals WHERE id = ? AND user_id = ?",
            [mealId, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Meal not found or you do not have permission to delete it" });
        }

        res.json({ message: "Meal deleted successfully" });

    } catch (error) {
        console.error("Delete meal error:", error);
        res.status(500).json({ error: "Error deleting meal" });
    }
});


// 7. START THE SERVER
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});