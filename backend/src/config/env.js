const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: Number(process.env.PORT || 3333),
  jwtSecret: process.env.JWT_SECRET || "dev_healthsphere_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  dataFilePath:
    process.env.DATA_FILE_PATH ||
    path.resolve(__dirname, "..", "data", "db.json"),
  corsOrigin: process.env.CORS_ORIGIN || "*",
};
