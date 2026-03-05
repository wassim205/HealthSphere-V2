// ============================================
// Tab: Dashboard
// Simple V2 dashboard that can later show
// summaries, trends and shortcuts.
// For now it displays basic information
// about the user's workouts.
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useWorkouts } from "@/src/context/WorkoutContext";
import { COLORS, SIZES } from "@/src/constants/theme";

export default function DashboardScreen() {
  const { state } = useWorkouts();

  const totalSessions = state.workouts.length;
  const totalMinutes = state.workouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Your fitness overview</Text>
      </View>

      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Sessions</Text>
          <Text style={styles.cardValue}>{totalSessions}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Minutes</Text>
          <Text style={styles.cardValue}>{totalMinutes}</Text>
        </View>
      </View>

      <View style={styles.hintBox}>
        <Text style={styles.hintTitle}>What&apos;s coming next?</Text>
        <Text style={styles.hintText}>
          In V2, this dashboard can show weekly progress, favorite exercises and personalized
          recommendations based on your activity.
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
    marginBottom: SIZES.lg,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    marginTop: 4,
  },
  cardsRow: {
    flexDirection: "row",
    gap: SIZES.md,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
  },
  cardValue: {
    marginTop: SIZES.sm,
    color: COLORS.primary,
    fontSize: SIZES.fontXl,
    fontWeight: "800",
  },
  hintBox: {
    marginTop: SIZES.xl,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hintTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontMd,
    fontWeight: "700",
    marginBottom: SIZES.sm,
  },
  hintText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    lineHeight: 20,
  },
});

