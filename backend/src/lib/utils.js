import jwt from "jsonwebtoken";

// Generate JWT Token
export const generateAuthToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });

  res.cookie("token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevent XSS attacks
    sameSite: "strict", // Prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
  });

  return token;
};

export const tokenDecoder = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};