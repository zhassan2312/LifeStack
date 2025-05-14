import jwt from "jsonwebtoken";
import { sql } from "../lib/db.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Use array destructuring for Neon's query results
    const [user] = await sql.query(
      `SELECT user_id, name, email, created_at FROM users WHERE user_id = $1`,
      [decoded.userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};