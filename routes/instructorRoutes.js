import express from "express";
import Instructor from "../models/Instructor.js";

const router = express.Router();

/*
POST http://localhost:5000/instructor
{
  "name":"John",
  "email":"john@gmail.com",
  "departmentId":"PASTE_ID"
}
*/
router.post("/", async (req, res) => {
  const data = await Instructor.create(req.body);
  res.json(data);
});

/*
GET http://localhost:5000/instructor
*/
router.get("/", async (req, res) => {
  const data = await Instructor.find().populate("departmentId");
  res.json(data);
});

export default router;