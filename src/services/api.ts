// ============================================
// API service - Exercises catalogue (V2)
// All HTTP calls are isolated here so that
// UI components and contexts never call fetch
// directly. This makes it easier to test and
// to swap the backend implementation.
// ============================================

import type { Exercise } from "../constants/theme";

// Base URL of the backend API.
// You can override this value using
// EXPO_PUBLIC_API_BASE_URL in app config.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3333";

const EXERCISES_ENDPOINT = `${API_BASE_URL}/exercises`;
const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;
const SESSIONS_ENDPOINT = `${API_BASE_URL}/sessions`;

export interface AuthPayload {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  token: string;
}

export interface SessionCoordinate {
  latitude: number;
  longitude: number;
  timestamp?: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  activityType: string;
  status: "active" | "paused" | "completed";
  startedAt: string;
  pausedAt: string | null;
  endedAt: string | null;
  durationSeconds: number;
  distanceMeters: number;
  coordinates: SessionCoordinate[];
  photoUri: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SessionStats {
  totalSessions: number;
  totalDurationSeconds: number;
  totalDistanceMeters: number;
  sessions: WorkoutSession[];
}

async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // We assume the API always returns valid JSON here.
  return (await response.json()) as T;
}

function authHeaders(token?: string): HeadersInit {
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

/**
 * Fetch all exercises from the backend.
 */
export async function fetchExercises(): Promise<Exercise[]> {
  const response = await fetch(EXERCISES_ENDPOINT);
  return handleJsonResponse<Exercise[]>(response);
}

/**
 * Fetch a single exercise by id.
 */
export async function fetchExerciseById(id: string): Promise<Exercise> {
  const response = await fetch(`${EXERCISES_ENDPOINT}/${id}`);
  return handleJsonResponse<Exercise>(response);
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<AuthPayload> {
  const response = await fetch(`${AUTH_ENDPOINT}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleJsonResponse<AuthPayload>(response);
}

export async function login(
  email: string,
  password: string
): Promise<AuthPayload> {
  const response = await fetch(`${AUTH_ENDPOINT}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleJsonResponse<AuthPayload>(response);
}

export async function fetchProfile(token: string): Promise<AuthPayload["user"]> {
  const response = await fetch(`${AUTH_ENDPOINT}/me`, {
    headers: authHeaders(token),
  });
  return handleJsonResponse<AuthPayload["user"]>(response);
}

export async function listSessions(token: string): Promise<WorkoutSession[]> {
  const response = await fetch(SESSIONS_ENDPOINT, {
    headers: authHeaders(token),
  });
  return handleJsonResponse<WorkoutSession[]>(response);
}

export async function createSession(
  token: string,
  activityType: string
): Promise<WorkoutSession> {
  const response = await fetch(SESSIONS_ENDPOINT, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ activityType }),
  });
  return handleJsonResponse<WorkoutSession>(response);
}

export async function patchSessionAction(
  token: string,
  sessionId: string,
  action: "pause" | "resume" | "stop"
): Promise<WorkoutSession> {
  const response = await fetch(`${SESSIONS_ENDPOINT}/${sessionId}/${action}`, {
    method: "PATCH",
    headers: authHeaders(token),
  });
  return handleJsonResponse<WorkoutSession>(response);
}

export async function sendCoordinates(
  token: string,
  sessionId: string,
  coordinates: SessionCoordinate[]
): Promise<WorkoutSession> {
  const response = await fetch(`${SESSIONS_ENDPOINT}/${sessionId}/coordinates`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ coordinates }),
  });
  return handleJsonResponse<WorkoutSession>(response);
}

export async function attachSessionPhoto(
  token: string,
  sessionId: string,
  photoUri: string
): Promise<WorkoutSession> {
  const response = await fetch(`${SESSIONS_ENDPOINT}/${sessionId}/photo`, {
    method: "POST",
    headers: { ...authHeaders(token), "Content-Type": "application/json" },
    body: JSON.stringify({ photoUri }),
  });
  return handleJsonResponse<WorkoutSession>(response);
}

export async function fetchStats(token: string): Promise<SessionStats> {
  const response = await fetch(`${SESSIONS_ENDPOINT}/stats`, {
    headers: authHeaders(token),
  });
  return handleJsonResponse<SessionStats>(response);
}

