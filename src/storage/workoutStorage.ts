// ============================================
// AsyncStorage layer for workout data
// Handles save, load, and delete operations
// ============================================

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../constants/theme";

const STORAGE_KEY = "healthsphere_workouts";

/**
 * Load all workouts from AsyncStorage
 * Returns empty array if no data found
 */
export const loadWorkouts = async (): Promise<Workout[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data !== null) {
      return JSON.parse(data) as Workout[];
    }
    return [];
  } catch (error) {
    console.error("Error loading workouts:", error);
    throw new Error("Failed to load workouts from storage");
  }
};

/**
 * Save the full workouts array to AsyncStorage
 */
export const saveWorkouts = async (workouts: Workout[]): Promise<void> => {
  try {
    const data = JSON.stringify(workouts);
    await AsyncStorage.setItem(STORAGE_KEY, data);
  } catch (error) {
    console.error("Error saving workouts:", error);
    throw new Error("Failed to save workouts to storage");
  }
};

/**
 * Add a single workout and persist
 */
export const addWorkout = async (workout: Workout): Promise<Workout[]> => {
  try {
    const workouts = await loadWorkouts();
    const updated = [workout, ...workouts];
    await saveWorkouts(updated);
    return updated;
  } catch (error) {
    console.error("Error adding workout:", error);
    throw new Error("Failed to add workout");
  }
};

/**
 * Delete a workout by id and persist
 */
export const deleteWorkout = async (id: string): Promise<Workout[]> => {
  try {
    const workouts = await loadWorkouts();
    const updated = workouts.filter((w) => w.id !== id);
    await saveWorkouts(updated);
    return updated;
  } catch (error) {
    console.error("Error deleting workout:", error);
    throw new Error("Failed to delete workout");
  }
};
