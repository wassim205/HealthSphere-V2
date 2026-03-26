// ============================================
// Root Layout - Application entry point
// V2 navigation: Root Stack + Drawer + Tabs
// Wraps app with global providers:
// - User preferences
// - Exercises catalogue
// - Workout sessions
// ============================================

import { WorkoutProvider } from "@/src/context/WorkoutContext";
import { ExercisesProvider } from "@/src/context/ExercisesContext";
import { UserProvider } from "@/src/context/UserContext";
import { AuthProvider } from "@/src/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <ExercisesProvider>
          <WorkoutProvider>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: "#0D0D0D" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: { fontWeight: "700" },
                contentStyle: { backgroundColor: "#0D0D0D" },
              }}
            >
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
              <Stack.Screen
                name="add-workout"
                options={{
                  title: "Add Workout",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="workout/[id]"
                options={{
                  title: "Workout Details",
                }}
              />
            </Stack>
            <StatusBar style="light" />
          </WorkoutProvider>
        </ExercisesProvider>
      </UserProvider>
    </AuthProvider>
  );
}
