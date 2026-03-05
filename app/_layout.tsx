// ============================================
// Root Layout - App entry point
// Wraps the app with WorkoutProvider & Stack nav
// ============================================

import { WorkoutProvider } from "@/src/context/WorkoutContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <WorkoutProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0D0D0D" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#0D0D0D" },
        }}
      >
        {/* Home screen - no header (custom header inside) */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Add workout screen */}
        <Stack.Screen
          name="add-workout"
          options={{
            title: "Add Workout",
            presentation: "modal",
          }}
        />

        {/* Workout details screen */}
        <Stack.Screen
          name="workout/[id]"
          options={{
            title: "Workout Details",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </WorkoutProvider>
  );
}
