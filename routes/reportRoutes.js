import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

/*
GET http://localhost:5000/report
*/
router.get("/", async (req, res) => {
  const data = await Student.aggregate([
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course"
      }
    },
    { $unwind: "$course" },
    {
      $group: {
        _id: "$course.title",
        totalStudents: { $sum: 1 }
      }
    }
  ]);

  res.json(data);
});

export default router;