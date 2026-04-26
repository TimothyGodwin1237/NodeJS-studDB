import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  fees: Number,
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor"
  }
});

export default mongoose.model("Course", courseSchema);