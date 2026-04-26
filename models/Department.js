import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: String,
  block: String,
});

export default mongoose.model("Department", departmentSchema);
