// ============================================
// Drawer Layout - Global navigation (V2)
// Contains:
// - Main tabs (Dashboard / Exercises / History)
// - Profile / Settings / About screens
// ============================================

import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#0D0D0D" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "700" },
        drawerStyle: { backgroundColor: "#121212" },
        drawerInactiveTintColor: "#BBBBBB",
        drawerActiveTintColor: "#FFFFFF",
      }}
    >
      {/* Main app area: bottom tabs */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "HealthSphere",
          drawerLabel: "Dashboard",
        }}
      />

      {/* Drawer-only screens */}
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />

      <Drawer.Screen
        name="about"
        options={{
          title: "About",
        }}
      />
    </Drawer>
  );
}

