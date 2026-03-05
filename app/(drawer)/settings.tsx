// ============================================
// Drawer: Settings screen
// Will later be wired to UserContext to manage
// app preferences (theme, notifications, etc.).
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.text}>
          Here you will be able to configure app preferences such as theme, units and notifications.
        </Text>
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
    marginBottom: SIZES.md,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    lineHeight: 20,
  },
});

