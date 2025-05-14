import { sql } from "../lib/db.js"; // Import your database connection
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing
import { generateAuthToken } from "../lib/utils.js"; // Import utility functions

export const signup = async (req, res) => {
  console.log("Signup request received:", req.body);
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check for existing user
    const existingUsers = await sql.query(
      `SELECT * FROM users WHERE email = $1`, 
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    const newUsers = await sql.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) 
       RETURNING user_id, name, email, created_at`,
      [name, email, hashedPassword]
    );

    const newUser = newUsers[0];
    generateAuthToken(newUser.user_id, res);

    res.status(201).json(newUser);

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await sql.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if (users.length === 0) {
      return res.status(401).json("Invalid Credentials");
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials");
    }

    generateAuthToken(user.user_id, res);
    res.json({ 
      user_id: user.user_id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json("Server error");
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }); // Clear the token cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    // Return the user data from the middleware
    res.status(200).json({
      user_id: req.user.user_id,
      name: req.user.name,
      email: req.user.email,
      created_at: req.user.created_at,
    });
  } catch (error) {
    console.error("Check auth error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};