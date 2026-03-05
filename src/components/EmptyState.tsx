// ============================================
// EmptyState - Shown when no workouts exist
// ============================================

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🏋️</Text>
      <Text style={styles.title}>No workouts yet</Text>
      <Text style={styles.subtitle}>
        Tap the + button to add your first workout session!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.xl,
    paddingTop: 100,
  },
  emoji: {
    fontSize: 64,
    marginBottom: SIZES.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontXl,
    fontWeight: "700",
    marginBottom: SIZES.sm,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
    textAlign: "center",
    lineHeight: 22,
  },
});
