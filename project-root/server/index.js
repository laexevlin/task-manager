import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/taskRoutes.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
