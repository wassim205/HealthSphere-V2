// ============================================
// Drawer: Settings screen
// Connected to UserContext to manage:
// - theme preference
// - how exercises are ordered (favorites first)
// ============================================

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";
import { useUser } from "@/src/context/UserContext";

export default function SettingsScreen() {
  const {
    state: { preferences },
    setTheme,
    setShowFavoritesFirst,
  } = useUser();

  const isDarkTheme = preferences.theme === "dark";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Dark theme</Text>
              <Text style={styles.helper}>
                HealthSphere is designed for dark mode. You can still switch to light if
                needed.
              </Text>
            </View>
            <Switch
              value={isDarkTheme}
              onValueChange={(value) => setTheme(value ? "dark" : "light")}
              thumbColor={COLORS.white}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>

          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.label}>Show favorites first</Text>
              <Text style={styles.helper}>
                When enabled, the exercises list will prioritize your favorite exercises.
              </Text>
            </View>
            <Switch
              value={preferences.showFavoritesFirst}
              onValueChange={setShowFavoritesFirst}
              thumbColor={COLORS.white}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.lg,
    marginTop: SIZES.xl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
    marginBottom: SIZES.xl,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: SIZES.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.md,
    paddingVertical: SIZES.sm,
  },
  rowText: {
    flex: 1,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontMd,
    fontWeight: "600",
  },
  helper: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    marginTop: 4,
  },
});

