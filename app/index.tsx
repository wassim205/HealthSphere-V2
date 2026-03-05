// ============================================
// Route: / (root)
// Redirects to the main Dashboard tab.
// This keeps the URL simple while using
// the new Drawer + Tabs structure.
// ============================================

import { Redirect } from "expo-router";

export default function IndexRoute() {
  return <Redirect href="/(drawer)/(tabs)/dashboard" />;
}
