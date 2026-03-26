const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, getProfile } = require("../services/authService");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password required" });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters" });
    }

    const result = await register({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const result = await login({ email, password });
    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

router.get("/me", authMiddleware, (req, res, next) => {
  try {
    const profile = getProfile(req.user.id);
    return res.json(profile);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
