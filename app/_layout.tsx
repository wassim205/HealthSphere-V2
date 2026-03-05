// ============================================
// Root Layout - Application entry point
// V2 navigation: Root Stack + Drawer + Tabs
// Wraps app with global providers (workouts +
// exercises catalogue).
// ============================================

import { WorkoutProvider } from "@/src/context/WorkoutContext";
import { ExercisesProvider } from "@/src/context/ExercisesContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <ExercisesProvider>
      <WorkoutProvider>
        {/* Root Stack navigator */}
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#0D0D0D" },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "700" },
            contentStyle: { backgroundColor: "#0D0D0D" },
          }}
        >
          {/* Main app shell: Drawer + Tabs (no header here) */}
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

          {/* Add workout screen (modal over the shell) */}
          <Stack.Screen
            name="add-workout"
            options={{
              title: "Add Workout",
              presentation: "modal",
            }}
          />

          {/* Workout details screen (push on top of shell) */}
          <Stack.Screen
            name="workout/[id]"
            options={{
              title: "Workout Details",
            }}
          />
        </Stack>

        {/* Global status bar styling */}
        <StatusBar style="light" />
      </WorkoutProvider>
    </ExercisesProvider>
  );
}
