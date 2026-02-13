const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

module.exports = mongoose.model("Student", studentSchema);
