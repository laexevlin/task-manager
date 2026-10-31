import express from "express";
import { query } from "../db.js";
import requireAuth from "../middleware/requireAuth.js";

const ALLOWED_STATUSES = ["todo", "in_progress", "done"];

const router = express.Router();

router.use(requireAuth);

// Getting all tasks
router.get("/", async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id],
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Adding a new task
router.post("/", async (req, res) => {
  const { title, description = "", status = "todo" } = req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title should be a non-empty string!" });
  }
  try {
    const result = await query(
      "INSERT INTO tasks (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, status, req.user.id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error!" });
  }
});

// Changing a task status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const result = await query(
      "UPDATE tasks SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      [status, req.params.id, req.user.id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "The task is not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Deleting a task
router.delete("/:id", async (req, res) => {
  try {
    const result = await query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, req.user.id],
    );
    if (result.rows.length === 0) {
      res.status(404).send({ error: "The task is not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
