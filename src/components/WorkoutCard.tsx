// ============================================
// WorkoutCard - Card component for workout list
// Shows activity, duration, intensity, date
// ============================================

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES, Workout } from "../constants/theme";
import ActivityIcon from "./ActivityIcon";
import IntensityBadge from "./IntensityBadge";

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
}

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left side: icon + info */}
      <View style={styles.leftSection}>
        <ActivityIcon activity={workout.activity} size={48} />
        <View style={styles.info}>
          <Text style={styles.activity}>{workout.activity}</Text>
          <Text style={styles.date}>{formatDate(workout.date)}</Text>
        </View>
      </View>

      {/* Right side: duration + intensity */}
      <View style={styles.rightSection}>
        <Text style={styles.duration}>{workout.duration} min</Text>
        <IntensityBadge intensity={workout.intensity} size="small" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  info: {
    flex: 1,
  },
  activity: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontLg,
    fontWeight: "700",
  },
  date: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    marginTop: 2,
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 6,
  },
  duration: {
    color: COLORS.primary,
    fontSize: SIZES.fontLg,
    fontWeight: "700",
  },
});
