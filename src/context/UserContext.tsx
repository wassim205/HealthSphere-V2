// ============================================
// UserContext - Global user preferences
// Manages:
// - UI theme preference (dark / light)
// - how exercises are ordered (favorites first)
// Preferences are persisted with AsyncStorage.
// ============================================

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  loadUserPreferences,
  saveUserPreferences,
  type StoredUserPreferences,
} from "../storage/userPreferencesStorage";

interface UserState {
  preferences: StoredUserPreferences;
  isLoading: boolean;
}

type UserAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: StoredUserPreferences }
  | {
      type: "UPDATE_PREFERENCES";
      payload: Partial<StoredUserPreferences>;
    };

const initialState: UserState = {
  preferences: {
    theme: "dark",
    showFavoritesFirst: false,
  },
  isLoading: true,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, isLoading: true };
    case "LOAD_SUCCESS":
      return { preferences: action.payload, isLoading: false };
    case "UPDATE_PREFERENCES": {
      const updated: StoredUserPreferences = {
        ...state.preferences,
        ...action.payload,
      };
      // Persist asynchronously (fire and forget).
      void saveUserPreferences(updated);
      return { ...state, preferences: updated };
    }
    default:
      return state;
  }
}

interface UserContextType {
  state: UserState;
  setTheme: (theme: "dark" | "light") => void;
  setShowFavoritesFirst: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const bootstrap = async () => {
      dispatch({ type: "LOAD_START" });
      const prefs = await loadUserPreferences();
      dispatch({ type: "LOAD_SUCCESS", payload: prefs });
    };

    void bootstrap();
  }, []);

  const setTheme = (theme: "dark" | "light") => {
    dispatch({ type: "UPDATE_PREFERENCES", payload: { theme } });
  };

  const setShowFavoritesFirst = (value: boolean) => {
    dispatch({
      type: "UPDATE_PREFERENCES",
      payload: { showFavoritesFirst: value },
    });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        setTheme,
        setShowFavoritesFirst,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

