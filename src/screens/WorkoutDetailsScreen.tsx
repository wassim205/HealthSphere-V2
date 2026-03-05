// ============================================
// WorkoutDetailsScreen - Shows full details
// of a single workout + delete option
// ============================================

import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ActivityIcon from "../components/ActivityIcon";
import IntensityBadge from "../components/IntensityBadge";
import { COLORS, SIZES } from "../constants/theme";
import { useWorkouts } from "../context/WorkoutContext";

export default function WorkoutDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, deleteWorkout } = useWorkouts();

  // Find the workout by id
  const workout = state.workouts.find((w) => w.id === id);

  // If workout not found, show error
  if (!workout) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={styles.notFoundText}>Workout not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle delete with confirmation
  const handleDelete = () => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteWorkout(workout.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Activity header card */}
        <View style={styles.headerCard}>
          <ActivityIcon activity={workout.activity} size={72} />
          <Text style={styles.activityName}>{workout.activity}</Text>
          <IntensityBadge intensity={workout.intensity} size="medium" />
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={styles.statValue}>{workout.duration}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statValue}>
              {new Date(workout.date).getDate()}
            </Text>
            <Text style={styles.statLabel}>
              {new Date(workout.date).toLocaleDateString("en-US", {
                month: "short",
              })}
            </Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{workout.intensity}</Text>
            <Text style={styles.statLabel}>Intensity</Text>
          </View>
        </View>

        {/* Details section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{formatDate(workout.date)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{formatTime(workout.date)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Duration</Text>
            <Text style={styles.detailValue}>{workout.duration} minutes</Text>
          </View>

          {workout.notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.notesContainer}>
                <Text style={styles.detailLabel}>Notes</Text>
                <Text style={styles.notesText}>{workout.notes}</Text>
              </View>
            </>
          ) : null}
        </View>

        {/* Delete button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteText}>🗑️  Delete Workout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  // Header card
  headerCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusXl,
    padding: SIZES.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SIZES.sm,
    marginTop: SIZES.md,
  },
  activityName: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontXxl,
    fontWeight: "800",
  },
  // Stats row
  statsRow: {
    flexDirection: "row",
    gap: SIZES.sm,
    marginTop: SIZES.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    color: COLORS.primary,
    fontSize: SIZES.fontXl,
    fontWeight: "800",
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontXs,
    marginTop: 2,
  },
  // Details section
  detailsSection: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginTop: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontLg,
    fontWeight: "700",
    marginBottom: SIZES.md,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.sm,
  },
  detailLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
  },
  detailValue: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontMd,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
  },
  notesContainer: {
    paddingVertical: SIZES.sm,
  },
  notesText: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontMd,
    lineHeight: 22,
    marginTop: SIZES.sm,
  },
  // Delete button
  deleteButton: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusMd,
    paddingVertical: SIZES.md,
    alignItems: "center",
    marginTop: SIZES.lg,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  deleteText: {
    color: COLORS.error,
    fontSize: SIZES.fontLg,
    fontWeight: "600",
  },
  // Not found state
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: SIZES.md,
  },
  notFoundEmoji: {
    fontSize: 48,
  },
  notFoundText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontLg,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMd,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
