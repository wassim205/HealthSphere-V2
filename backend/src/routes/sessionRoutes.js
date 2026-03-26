const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createSession,
  listSessionsByUser,
  getSessionById,
  pauseSession,
  resumeSession,
  stopSession,
  addCoordinates,
  attachPhoto,
  getStats,
} = require("../services/sessionService");

const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  const sessions = listSessionsByUser(req.user.id);
  res.json(sessions);
});

router.post("/", (req, res) => {
  const session = createSession({
    userId: req.user.id,
    activityType: req.body.activityType,
  });
  res.status(201).json(session);
});

router.get("/stats", (req, res) => {
  const stats = getStats(req.user.id);
  res.json(stats);
});

router.get("/:id", (req, res) => {
  const session = getSessionById(req.user.id, req.params.id);

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  return res.json(session);
});

router.patch("/:id/pause", (req, res, next) => {
  try {
    const session = pauseSession(req.user.id, req.params.id);
    return res.json(session);
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/resume", (req, res, next) => {
  try {
    const session = resumeSession(req.user.id, req.params.id);
    return res.json(session);
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id/stop", (req, res, next) => {
  try {
    const session = stopSession(req.user.id, req.params.id);
    return res.json(session);
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/coordinates", (req, res, next) => {
  try {
    const coordinates = req.body.coordinates;

    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      return res.status(400).json({ message: "coordinates must be a non-empty array" });
    }

    const session = addCoordinates(req.user.id, req.params.id, coordinates);
    return res.json(session);
  } catch (error) {
    return next(error);
  }
});

router.post("/:id/photo", (req, res, next) => {
  try {
    const { photoUri } = req.body;

    if (!photoUri) {
      return res.status(400).json({ message: "photoUri is required" });
    }

    const session = attachPhoto(req.user.id, req.params.id, photoUri);
    return res.json(session);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
