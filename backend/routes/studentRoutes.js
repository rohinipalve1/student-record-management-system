const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ADD
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// UPDATE ✅ (THIS FIXES YOUR ERROR)
router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
