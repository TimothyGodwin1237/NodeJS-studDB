import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

/*
==================================================
CREATE COURSE
POST http://localhost:5000/course

{
  "title":"Node JS",
  "fees":5000,
  "departmentId":"PASTE_ID",
  "instructorId":"PASTE_ID"
}
==================================================
*/
router.post("/", async (req, res) => {
  const data = await Course.create(req.body);
  res.json(data);
});

/*
==================================================
GET ALL COURSES
GET http://localhost:5000/course
==================================================
*/
router.get("/", async (req, res) => {
  const data = await Course.find()
    .populate("departmentId")
    .populate("instructorId");

  res.json(data);
});

/*
==================================================
FILTERING EXAMPLES
==================================================

1. Search by title
GET /course/search?title=node

2. Fees greater than
GET /course/search?minFees=4000

3. Fees less than
GET /course/search?maxFees=8000

4. Fees between
GET /course/search?minFees=4000&maxFees=8000

5. Sort Low to High
GET /course/search?sort=asc

6. Sort High to Low
GET /course/search?sort=desc

7. Pagination
GET /course/search?page=1&limit=2

8. Combined Example
GET /course/search?title=node&minFees=1000&sort=asc&page=1&limit=5
==================================================
*/
router.get("/search", async (req, res) => {
  const { title, minFees, maxFees, sort, page = 1, limit = 5 } = req.query;

  const filter = {};

  // Search by title
  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  // Fees filter
  if (minFees || maxFees) {
    filter.fees = {};

    if (minFees) filter.fees.$gte = Number(minFees);
    if (maxFees) filter.fees.$lte = Number(maxFees);
  }

  // Sorting
  let sortOption = {};
  if (sort === "asc") sortOption.fees = 1;
  if (sort === "desc") sortOption.fees = -1;

  // Pagination
  const skip = (Number(page) - 1) * Number(limit);

  const data = await Course.find(filter)
    .populate("departmentId")
    .populate("instructorId")
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit))
    .lean();

  res.json(data);
});

/*
==================================================
GET SINGLE COURSE
GET /course/:id
==================================================
*/
router.get("/:id", async (req, res) => {
  const data = await Course.findById(req.params.id)
    .populate("departmentId")
    .populate("instructorId");

  res.json(data);
});

/*
==================================================
UPDATE COURSE
PUT /course/:id

{
  "fees":7000
}
==================================================
*/
router.put("/:id", async (req, res) => {
  const data = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(data);
});

/*
==================================================
DELETE COURSE
DELETE /course/:id
==================================================
*/
router.delete("/:id", async (req, res) => {
  const data = await Course.findByIdAndDelete(req.params.id);
  res.json(data);
});

export default router;
