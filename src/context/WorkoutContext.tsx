// ============================================
// Workout Context - Global state management
// Provides workouts data to all screens
// ============================================

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Workout } from "../constants/theme";
import {
    loadWorkouts,
    addWorkout as storageAddWorkout,
    deleteWorkout as storageDeleteWorkout
} from "../storage/workoutStorage";

// ------- State type -------
interface WorkoutState {
  workouts: Workout[];
  isLoading: boolean;
  error: string | null;
}

// ------- Action types -------
type WorkoutAction =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Workout[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD_WORKOUT"; payload: Workout[] }
  | { type: "DELETE_WORKOUT"; payload: Workout[] }
  | { type: "CLEAR_ERROR" };

// ------- Initial state -------
const initialState: WorkoutState = {
  workouts: [],
  isLoading: true,
  error: null,
};

// ------- Reducer -------
function workoutReducer(
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, isLoading: true, error: null };
    case "LOAD_SUCCESS":
      return { ...state, isLoading: false, workouts: action.payload };
    case "LOAD_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "ADD_WORKOUT":
      return { ...state, workouts: action.payload };
    case "DELETE_WORKOUT":
      return { ...state, workouts: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

// ------- Context type -------
interface WorkoutContextType {
  state: WorkoutState;
  addWorkout: (workout: Workout) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  refreshWorkouts: () => Promise<void>;
}

// ------- Create context -------
const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// ------- Provider component -------
export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Load workouts on app start
  useEffect(() => {
    refreshWorkouts();
  }, []);

  // Refresh workouts from storage
  const refreshWorkouts = async () => {
    dispatch({ type: "LOAD_START" });
    try {
      const workouts = await loadWorkouts();
      dispatch({ type: "LOAD_SUCCESS", payload: workouts });
    } catch {
      dispatch({
        type: "LOAD_ERROR",
        payload: "Failed to load your workouts",
      });
    }
  };

  // Add a new workout
  const addWorkout = async (workout: Workout) => {
    try {
      const updated = await storageAddWorkout(workout);
      dispatch({ type: "ADD_WORKOUT", payload: updated });
    } catch {
      dispatch({ type: "LOAD_ERROR", payload: "Failed to add workout" });
    }
  };

  // Delete a workout
  const deleteWorkout = async (id: string) => {
    try {
      const updated = await storageDeleteWorkout(id);
      dispatch({ type: "DELETE_WORKOUT", payload: updated });
    } catch {
      dispatch({ type: "LOAD_ERROR", payload: "Failed to delete workout" });
    }
  };

  return (
    <WorkoutContext.Provider
      value={{ state, addWorkout, deleteWorkout, refreshWorkouts }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

// ------- Custom hook -------
export function useWorkouts() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
}
