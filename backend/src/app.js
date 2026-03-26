const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/env");
const { ensureDbFile } = require("./services/db");
const authRoutes = require("./routes/authRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

ensureDbFile();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "healthsphere-backend",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/sessions", sessionRoutes);

app.use(errorHandler);

module.exports = app;
