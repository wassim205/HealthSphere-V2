const fs = require("fs");
const path = require("path");
const config = require("../config/env");
const defaultData = require("../data/defaultData");

const dbPath = config.dataFilePath;

function ensureDbFile() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

function readDb() {
  ensureDbFile();
  const fileContent = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(fileContent);
}

function writeDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  readDb,
  writeDb,
  ensureDbFile,
};
