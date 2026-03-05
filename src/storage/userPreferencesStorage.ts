// ============================================
// AsyncStorage layer for user preferences
// Stores a small JSON object with settings.
// ============================================

import AsyncStorage from "@react-native-async-storage/async-storage";

const PREFERENCES_KEY = "healthsphere_user_preferences_v1";

export interface StoredUserPreferences {
  theme: "dark" | "light";
  showFavoritesFirst: boolean;
}

const DEFAULT_PREFERENCES: StoredUserPreferences = {
  theme: "dark",
  showFavoritesFirst: false,
};

export const loadUserPreferences =
  async (): Promise<StoredUserPreferences> => {
    try {
      const raw = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (!raw) {
        return DEFAULT_PREFERENCES;
      }
      const parsed = JSON.parse(raw) as Partial<StoredUserPreferences>;
      return {
        theme: parsed.theme ?? DEFAULT_PREFERENCES.theme,
        showFavoritesFirst:
          parsed.showFavoritesFirst ?? DEFAULT_PREFERENCES.showFavoritesFirst,
      };
    } catch (error) {
      console.error("Error loading user preferences:", error);
      return DEFAULT_PREFERENCES;
    }
  };

export const saveUserPreferences = async (
  prefs: StoredUserPreferences
): Promise<void> => {
  try {
    const serialized = JSON.stringify(prefs);
    await AsyncStorage.setItem(PREFERENCES_KEY, serialized);
  } catch (error) {
    console.error("Error saving user preferences:", error);
  }
};

