// ============================================
// HomeScreen - Main screen
// Shows list of all workouts with FlatList
// ============================================

import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import EmptyState from "../components/EmptyState";
import LoadingScreen from "../components/LoadingScreen";
import WorkoutCard from "../components/WorkoutCard";
import { COLORS, SIZES } from "../constants/theme";
import { useWorkouts } from "../context/WorkoutContext";

export default function HomeScreen() {
  const router = useRouter();
  const { state } = useWorkouts();

  // Show loading spinner while data is loading
  if (state.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.title}>My Workouts</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{state.workouts.length}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>
              {state.workouts.reduce((sum, w) => sum + w.duration, 0)}
            </Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
        </View>
      </View>

      {/* Error message */}
      {state.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {state.error}</Text>
        </View>
      )}

      {/* Workouts list */}
      <FlatList
        data={state.workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard
            workout={item}
            onPress={() => router.push(`/workout/${item.id}`)}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating add button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-workout")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.xl,
    paddingBottom: SIZES.md,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
    marginBottom: 4,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
  },
  statsContainer: {
    flexDirection: "row",
    gap: SIZES.sm,
    marginTop: SIZES.md,
  },
  statBox: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    minWidth: 90,
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: SIZES.fontXl,
    fontWeight: "800",
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontXs,
    marginTop: 2,
  },
  errorContainer: {
    marginHorizontal: SIZES.lg,
    padding: SIZES.sm,
    backgroundColor: COLORS.primaryDark,
    borderRadius: SIZES.radiusSm,
    marginBottom: SIZES.sm,
  },
  errorText: {
    color: COLORS.white,
    fontSize: SIZES.fontSm,
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "600",
    marginTop: -2,
  },
});
