import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  password: String,
  age: Number,
  email: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
});

export default mongoose.model("Student", studentSchema);