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

async function handleJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // We assume the API always returns valid JSON here.
  return (await response.json()) as T;
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

