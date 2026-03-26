const { v4: uuidv4 } = require("uuid");
const { readDb, writeDb } = require("./db");

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function haversineDistanceMeters(a, b) {
  const earthRadius = 6371000;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLon = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return earthRadius * c;
}

function computeTotalDistanceMeters(points) {
  if (!points || points.length < 2) return 0;
  let total = 0;

  for (let i = 1; i < points.length; i += 1) {
    total += haversineDistanceMeters(points[i - 1], points[i]);
  }

  return Number(total.toFixed(2));
}

function createSession({ userId, activityType }) {
  const db = readDb();
  const session = {
    id: uuidv4(),
    userId,
    activityType: activityType || "running",
    status: "active",
    startedAt: new Date().toISOString(),
    pausedAt: null,
    endedAt: null,
    durationSeconds: 0,
    distanceMeters: 0,
    coordinates: [],
    photoUri: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.sessions.push(session);
  writeDb(db);
  return session;
}

function listSessionsByUser(userId) {
  const db = readDb();
  return db.sessions
    .filter((session) => session.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getSessionById(userId, sessionId) {
  const db = readDb();
  return db.sessions.find(
    (session) => session.id === sessionId && session.userId === userId
  );
}

function updateSession(userId, sessionId, updater) {
  const db = readDb();
  const index = db.sessions.findIndex(
    (session) => session.id === sessionId && session.userId === userId
  );

  if (index < 0) {
    const error = new Error("Session not found");
    error.status = 404;
    throw error;
  }

  const current = db.sessions[index];
  const updated = updater(current);
  updated.updatedAt = new Date().toISOString();
  db.sessions[index] = updated;
  writeDb(db);
  return updated;
}

function pauseSession(userId, sessionId) {
  return updateSession(userId, sessionId, (session) => ({
    ...session,
    status: "paused",
    pausedAt: new Date().toISOString(),
  }));
}

function resumeSession(userId, sessionId) {
  return updateSession(userId, sessionId, (session) => ({
    ...session,
    status: "active",
    pausedAt: null,
  }));
}

function stopSession(userId, sessionId) {
  return updateSession(userId, sessionId, (session) => {
    const endedAt = new Date().toISOString();
    const durationSeconds = Math.max(
      0,
      Math.floor((new Date(endedAt) - new Date(session.startedAt)) / 1000)
    );

    return {
      ...session,
      status: "completed",
      endedAt,
      durationSeconds,
      distanceMeters: computeTotalDistanceMeters(session.coordinates),
    };
  });
}

function addCoordinates(userId, sessionId, coordinates) {
  return updateSession(userId, sessionId, (session) => {
    const sanitizedCoordinates = coordinates.map((point) => ({
      latitude: Number(point.latitude),
      longitude: Number(point.longitude),
      timestamp: point.timestamp || new Date().toISOString(),
    }));

    const nextCoordinates = [...session.coordinates, ...sanitizedCoordinates];

    return {
      ...session,
      coordinates: nextCoordinates,
      distanceMeters: computeTotalDistanceMeters(nextCoordinates),
    };
  });
}

function attachPhoto(userId, sessionId, photoUri) {
  return updateSession(userId, sessionId, (session) => ({
    ...session,
    photoUri,
  }));
}

function getStats(userId) {
  const sessions = listSessionsByUser(userId).filter(
    (session) => session.status === "completed"
  );

  const totalSessions = sessions.length;
  const totalDurationSeconds = sessions.reduce(
    (sum, session) => sum + (session.durationSeconds || 0),
    0
  );
  const totalDistanceMeters = sessions.reduce(
    (sum, session) => sum + (session.distanceMeters || 0),
    0
  );

  return {
    totalSessions,
    totalDurationSeconds,
    totalDistanceMeters: Number(totalDistanceMeters.toFixed(2)),
    sessions,
  };
}

module.exports = {
  createSession,
  listSessionsByUser,
  getSessionById,
  pauseSession,
  resumeSession,
  stopSession,
  addCoordinates,
  attachPhoto,
  getStats,
};
