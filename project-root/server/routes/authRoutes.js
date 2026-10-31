import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { query } from "../db.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function setAuthCookie(res, userId) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, { ...COOKIE_OPTIONS, maxAge: WEEK_MS });
}

function validateCredentials(email, password) {
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    return "Enter a valid email";
  }
  if (typeof password !== "string" || password.length < 5) {
    return "Password must be at least 5 characters";
  }
  if (password.length > 30) {
    return "Password must be at most 30 characters";
  }

  return null;
}

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationError = validateCredentials(email, password);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO users(email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email.trim(), passwordHash],
    );

    const user = result.rows[0];
    setAuthCookie(res, user.id);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "Email already registered" });
    }
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await query(
      "SELECT id, email, password_hash FROM users WHERE email = $1",
      [email.trim()],
    );

    const user = result.rows[0];
    const passwordMatches = user
      ? await bcrypt.compare(password, user.password_hash)
      : false;

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    setAuthCookie(res, user.id);
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(204).end();
});

router.get("/current", requireAuth, async (req, res) => {
  try {
    const result = await query("SELECT id, email FROM users WHERE id = $1", [
      req.user.id,
    ]);

    res.json(result.rows[0] ?? null);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
});

export default router;
