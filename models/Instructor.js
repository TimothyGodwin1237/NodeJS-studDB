import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema({
  name: String,
  email: String,
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

export default mongoose.model("Instructor", instructorSchema);