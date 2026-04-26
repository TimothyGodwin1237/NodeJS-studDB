import express from "express";
import Department from "../models/Department.js";

const router = express.Router();

/*
POST http://localhost:5000/department
{
  "name":"Computer Science",
  "block":"A"
}
*/
router.post("/", async (req, res) => {
  const data = await Department.create(req.body);
  res.json(data);
});

/*
GET http://localhost:5000/department
*/
router.get("/", async (req, res) => {
  const data = await Department.find();
  res.json(data);
});

export default router;
