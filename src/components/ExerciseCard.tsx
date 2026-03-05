// ============================================
// ExerciseCard - Card component for exercises list
// Shows name, category, difficulty and duration
// with a favorite toggle icon.
// ============================================

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES, Exercise } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface ExerciseCardProps {
  exercise: Exercise;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export default function ExerciseCard({
  exercise,
  isFavorite,
  onPress,
  onToggleFavorite,
}: ExerciseCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.name}>{exercise.name}</Text>
          <Text style={styles.meta}>
            {exercise.category} · {exercise.difficulty}
          </Text>
          <Text style={styles.duration}>{exercise.duration} min</Text>
        </View>

        <Pressable
          onPress={(event) => {
            // Prevent parent onPress from firing.
            event.stopPropagation();
            onToggleFavorite();
          }}
          style={({ pressed }) => [
            styles.favoriteButton,
            pressed && { transform: [{ scale: 0.9 }] },
          ]}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? COLORS.primary : COLORS.textSecondary}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.sm,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSection: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontLg,
    fontWeight: "700",
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
  },
  duration: {
    color: COLORS.primary,
    fontSize: SIZES.fontSm,
    fontWeight: "600",
  },
  favoriteButton: {
    padding: SIZES.sm,
  },
});

