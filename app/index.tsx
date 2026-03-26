// ============================================
// Route: / (root)
// Redirects to the main Dashboard tab.
// This keeps the URL simple while using
// the new Drawer + Tabs structure.
// ============================================

import { Redirect } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

export default function IndexRoute() {
  const { token, isBootstrapping } = useAuth();
  if (isBootstrapping) return null;
  return <Redirect href={token ? "/(drawer)/(tabs)/dashboard" : "/(auth)/login"} />;
}
