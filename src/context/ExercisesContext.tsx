// ============================================
// Exercises Context - Global state for catalogue
// Handles:
// - list of exercises from API
// - favorite exercises
// - loading / error / retry state
// ============================================

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type { Exercise } from "../constants/theme";
import { fetchExercises, fetchExerciseById } from "../services/api";

// ------- State type -------
interface ExercisesState {
  exercises: Exercise[];
  favorites: string[]; // list of exercise ids
  isLoading: boolean;
  error: string | null;
}

// ------- Action types -------
type ExercisesAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Exercise[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "TOGGLE_FAVORITE"; payload: string }
  | { type: "CLEAR_ERROR" };

// ------- Initial state -------
const initialState: ExercisesState = {
  exercises: [],
  favorites: [],
  isLoading: false,
  error: null,
};

// ------- Reducer -------
function exercisesReducer(
  state: ExercisesState,
  action: ExercisesAction
): ExercisesState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, isLoading: true, error: null };
    case "LOAD_SUCCESS":
      return { ...state, isLoading: false, exercises: action.payload };
    case "LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "TOGGLE_FAVORITE": {
      const id = action.payload;
      const isFavorite = state.favorites.includes(id);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((favId) => favId !== id)
          : [...state.favorites, id],
      };
    }
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// ------- Context type -------
interface ExercisesContextType {
  state: ExercisesState;
  loadExercises: () => Promise<void>;
  reloadExercises: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  getExerciseById: (id: string) => Exercise | undefined;
}

// ------- Create context -------
const ExercisesContext = createContext<ExercisesContextType | undefined>(
  undefined
);

// ------- Provider component -------
export function ExercisesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(exercisesReducer, initialState);

  // Load exercises once on app startup.
  useEffect(() => {
    loadExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadExercises = async () => {
    // If we already have data, do not automatically reload here.
    if (state.exercises.length > 0 || state.isLoading) {
      return;
    }
    await reloadExercises();
  };

  const reloadExercises = async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const data = await fetchExercises();
      dispatch({ type: "LOAD_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "LOAD_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to load exercises",
      });
    }
  };

  const toggleFavorite = (id: string) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });
  };

  const isFavorite = (id: string) => state.favorites.includes(id);

  const getExerciseById = (id: string) => {
    const existing = state.exercises.find((item) => item.id === id);
    if (existing) return existing;

    // As a small convenience for the detail screen:
    // if the exercise is not yet loaded, try to fetch it.
    // This call does not change the main list; it is only
    // used by the screen that needs the single exercise.
    // The screen can decide how to show its own loading state.
    void fetchExerciseById(id).then(() => {
      // We could dispatch here to merge the item into the list
      // in a later iteration (offline-first work).
    });

    return undefined;
  };

  return (
    <ExercisesContext.Provider
      value={{
        state,
        loadExercises,
        reloadExercises,
        toggleFavorite,
        isFavorite,
        getExerciseById,
      }}
    >
      {children}
    </ExercisesContext.Provider>
  );
}

// ------- Custom hook -------
export function useExercises() {
  const context = useContext(ExercisesContext);
  if (!context) {
    throw new Error("useExercises must be used within an ExercisesProvider");
  }
  return context;
}

