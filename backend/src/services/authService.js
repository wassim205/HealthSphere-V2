const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const config = require("../config/env");
const { readDb, writeDb } = require("./db");

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function generateToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );
}

async function register({ name, email, password }) {
  const db = readDb();
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = db.users.find(
    (user) => user.email.toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    const error = new Error("Email already used");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: uuidv4(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  writeDb(db);

  return {
    user: sanitizeUser(user),
    token: generateToken(user),
  };
}

async function login({ email, password }) {
  const db = readDb();
  const normalizedEmail = email.toLowerCase().trim();

  const user = db.users.find(
    (existingUser) => existingUser.email.toLowerCase() === normalizedEmail
  );

  if (!user) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  return {
    user: sanitizeUser(user),
    token: generateToken(user),
  };
}

function getProfile(userId) {
  const db = readDb();
  const user = db.users.find((existingUser) => existingUser.id === userId);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return sanitizeUser(user);
}

module.exports = {
  register,
  login,
  getProfile,
};
