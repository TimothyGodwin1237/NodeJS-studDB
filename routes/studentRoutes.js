import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

/*
POST http://localhost:5000/student
{
  "name":"Timothy",
  "password":"mypassword",
  "age":22,
  "email":"tim@gmail.com",
  "courseId":"PASTE_ID"
}
*/
router.post("/", async (req, res) => {
  const data = await Student.create(req.body);
  res.json(data);
});

/*
GET http://localhost:5000/student
Header: Authorization: Bearer <token>
*/
// router.get("/", async (req, res) => {
//   const data = await Student.find().populate({
//     path: "courseId",
//     populate: [
//       { path: "departmentId" },
//       { path: "instructorId" }
//     ]
//   });

// populate: [
//   {
//     path: "departmentId",
//     select: "name block",
//   },
//   {
//     path: "instructorId",
//     select: "name email",
//   },
// ];

//   res.json(data);
// });
router.get("/", async (req, res) => {
  console.log("req.student : ", req.student);
  const data = await Student.find().populate("courseId");
  res.json(data);
});

/*
PUT http://localhost:5000/student/:id
Header: Authorization: Bearer <token>
{
  "age":25
}
*/
router.put("/:id", async (req, res) => {
  const data = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(data);
});

/*
DELETE http://localhost:5000/student/:id
Header: Authorization: Bearer <token>
*/
router.delete("/:id", async (req, res) => {
  const data = await Student.findByIdAndDelete(req.params.id);
  res.json(data);
});

export default router;
