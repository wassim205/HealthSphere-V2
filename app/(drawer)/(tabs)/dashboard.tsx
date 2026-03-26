// ============================================
// Tab: Dashboard
// Simple V2 dashboard that can later show
// summaries, trends and shortcuts.
// For now it displays basic information
// about the user's workouts.
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/src/context/AuthContext";
import { COLORS, SIZES } from "@/src/constants/theme";
import { fetchStats } from "@/src/services/api";

export default function DashboardScreen() {
  const { token } = useAuth();
  const [totalSessions, setTotalSessions] = React.useState(0);
  const [totalMinutes, setTotalMinutes] = React.useState(0);
  const [totalKm, setTotalKm] = React.useState(0);

  React.useEffect(() => {
    const load = async () => {
      if (!token) return;
      const stats = await fetchStats(token);
      setTotalSessions(stats.totalSessions);
      setTotalMinutes(Math.floor(stats.totalDurationSeconds / 60));
      setTotalKm(Number((stats.totalDistanceMeters / 1000).toFixed(2)));
    };
    void load();
  }, [token]);

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
      <View style={[styles.card, { marginTop: SIZES.md }]}>
        <Text style={styles.cardLabel}>Total Distance (km)</Text>
        <Text style={styles.cardValue}>{totalKm}</Text>
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

