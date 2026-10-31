import jwt from "jsonwebtoken";

export default function requireAuth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.json(null);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
