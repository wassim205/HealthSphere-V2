import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0D0D0D" },
        headerTintColor: "#FFFFFF",
        contentStyle: { backgroundColor: "#0D0D0D" },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="register" options={{ title: "Create account" }} />
    </Stack>
  );
}

