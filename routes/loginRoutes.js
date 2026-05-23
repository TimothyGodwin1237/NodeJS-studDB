import express from "express";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { JWT_SECRET } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
POST http://localhost:5000/login
{
  "name":"Timothy",
  "password":"mypassword"
}
*/
router.post("/", async (req, res) => {
  const { name, password } = req.body;

  const student = await Student.findOne({ name, password });

  if (!student) {
    return res.status(401).json({ message: "Invalid name or password" });
  }

  const token = jwt.sign(
    { id: student._id, name: student.name },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
