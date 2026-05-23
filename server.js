import express from "express";
import connectDB from "./config/db.js";

import departmentRoutes from "./routes/departmentRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());

connectDB();

app.use("/department", departmentRoutes);
app.use("/instructor", instructorRoutes);
app.use("/course", courseRoutes);
app.use("/login", loginRoutes);
app.use("/student", (req, res, next) => {
  if (req.method === "POST" && req.path === "/") {
    return next();
  }
  authMiddleware(req, res, next);
}, studentRoutes);
app.use("/report", reportRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});