const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const authMiddleware = require("../middleware/auth");

// GET all students
router.get("/", authMiddleware, async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// TOGGLE student status
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    student.status = req.body.status; // Active / Inactive
    await student.save();

    res.json({ status: student.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Status update failed" });
  }
});

module.exports = router;
