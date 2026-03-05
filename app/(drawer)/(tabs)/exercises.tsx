// ============================================
// Tab: Exercises
// Placeholder screen for V2 exercise catalogue.
// The API + offline logic will be plugged here later.
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";

export default function ExercisesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.subtitle}>
          The exercise catalogue (API + offline) will be implemented here in the next tasks.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
  },
  header: {
    marginTop: SIZES.xl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    marginTop: 8,
    lineHeight: 20,
  },
});

