const express = require("express");
const { readDb } = require("../services/db");

const router = express.Router();

router.get("/", (req, res) => {
  const db = readDb();
  res.json(db.exercises);
});

router.get("/:id", (req, res) => {
  const db = readDb();
  const exercise = db.exercises.find((item) => item.id === req.params.id);

  if (!exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  return res.json(exercise);
});

module.exports = router;
