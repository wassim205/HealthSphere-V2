// ============================================
// Exercise Detail Screen
// Shows full information about a single exercise
// and allows toggling it as favorite.
// ============================================

import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";
import { useExercises } from "@/src/context/ExercisesContext";
import { Ionicons } from "@expo/vector-icons";

export default function ExerciseDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, getExerciseById, toggleFavorite, isFavorite } = useExercises();

  if (!id) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Exercise id is missing.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const exercise = getExerciseById(id);
  const favorite = isFavorite(id);

  if (!exercise) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>
            This exercise could not be found. Please try again later.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.name}>{exercise.name}</Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(exercise.id)}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color={favorite ? COLORS.primary : COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.meta}>
          {exercise.category} · {exercise.difficulty}
        </Text>

        <View style={styles.durationBox}>
          <Text style={styles.durationLabel}>Estimated duration</Text>
          <Text style={styles.durationValue}>{exercise.duration} min</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{exercise.description}</Text>
        </View>

        {state.favorites.length > 0 && favorite && (
          <View style={styles.noticeBox}>
            <Ionicons
              name="star"
              size={18}
              color={COLORS.primaryLight}
              style={{ marginRight: SIZES.sm }}
            />
            <Text style={styles.noticeText}>
              This exercise is in your favorites and will be easy to find later.
            </Text>
          </View>
        )}
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
    paddingBottom: SIZES.xl,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.lg,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.fontMd,
    textAlign: "center",
    marginBottom: SIZES.md,
  },
  backButton: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.primary,
  },
  backButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SIZES.xl,
  },
  name: {
    flex: 1,
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
    marginRight: SIZES.md,
  },
  favoriteButton: {
    padding: SIZES.sm,
  },
  meta: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    marginTop: SIZES.sm,
  },
  durationBox: {
    marginTop: SIZES.lg,
    padding: SIZES.md,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "flex-start",
  },
  durationLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
  },
  durationValue: {
    color: COLORS.primary,
    fontSize: SIZES.fontXl,
    fontWeight: "800",
    marginTop: SIZES.xs,
  },
  section: {
    marginTop: SIZES.xl,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontLg,
    fontWeight: "700",
    marginBottom: SIZES.sm,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
    lineHeight: 22,
  },
  noticeBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.xl,
    padding: SIZES.md,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.cardLight,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },
  noticeText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    flex: 1,
  },
});

