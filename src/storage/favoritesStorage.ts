// ============================================
// AsyncStorage layer for exercise favorites
// Stores an array of exercise ids.
// ============================================

import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "healthsphere_exercise_favorites";

/**
 * Load favorite exercise ids from storage.
 * Returns an empty array if nothing is stored yet.
 */
export const loadFavoriteExerciseIds = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as string[];
    }
    return [];
  } catch (error) {
    console.error("Error loading favorite exercises:", error);
    return [];
  }
};

/**
 * Persist favorite exercise ids in storage.
 */
export const saveFavoriteExerciseIds = async (
  favorites: string[]
): Promise<void> => {
  try {
    const serialized = JSON.stringify(favorites);
    await AsyncStorage.setItem(FAVORITES_KEY, serialized);
  } catch (error) {
    console.error("Error saving favorite exercises:", error);
  }
};

