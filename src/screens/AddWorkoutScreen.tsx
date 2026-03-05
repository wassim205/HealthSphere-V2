// ============================================
// AddWorkoutScreen - Form to create a workout
// Fields: activity, duration, intensity, notes
// ============================================

import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ACTIVITY_TYPES,
    ActivityType,
    COLORS,
    INTENSITY_LEVELS,
    IntensityLevel,
    SIZES,
    Workout,
} from "../constants/theme";
import { useWorkouts } from "../context/WorkoutContext";

export default function AddWorkoutScreen() {
  const router = useRouter();
  const { addWorkout } = useWorkouts();

  // Form state
  const [activity, setActivity] = useState<ActivityType>("Running");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState<IntensityLevel>("Medium");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate and submit the form
  const handleSubmit = async () => {
    // Validation
    if (!duration || parseInt(duration) <= 0) {
      Alert.alert("Error", "Please enter a valid duration (in minutes).");
      return;
    }

    if (parseInt(duration) > 600) {
      Alert.alert("Error", "Duration cannot exceed 600 minutes.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newWorkout: Workout = {
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        activity,
        duration: parseInt(duration),
        intensity,
        date: new Date().toISOString(),
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      };

      await addWorkout(newWorkout);
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save workout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get intensity color for button styling
  const getIntensityColor = (level: IntensityLevel) => {
    switch (level) {
      case "Low":
        return COLORS.intensityLow;
      case "Medium":
        return COLORS.intensityMedium;
      case "High":
        return COLORS.intensityHigh;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Page title */}
          <Text style={styles.title}>New Workout</Text>
          <Text style={styles.subtitle}>Record your training session</Text>

          {/* Activity type selector */}
          <Text style={styles.label}>Activity Type</Text>
          <View style={styles.chipContainer}>
            {ACTIVITY_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  activity === type && styles.chipSelected,
                ]}
                onPress={() => setActivity(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    activity === type && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Duration input */}
          <Text style={styles.label}>Duration (minutes)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="e.g. 45"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            maxLength={3}
          />

          {/* Intensity selector */}
          <Text style={styles.label}>Intensity</Text>
          <View style={styles.intensityContainer}>
            {INTENSITY_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.intensityButton,
                  intensity === level && {
                    backgroundColor: getIntensityColor(level),
                    borderColor: getIntensityColor(level),
                  },
                ]}
                onPress={() => setIntensity(level)}
              >
                <Text
                  style={[
                    styles.intensityText,
                    intensity === level && styles.intensityTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notes input */}
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="How did it go? Any details..."
            placeholderTextColor={COLORS.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Submit button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>
              {isSubmitting ? "Saving..." : "Save Workout"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontXxl,
    fontWeight: "800",
    marginTop: SIZES.md,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
    marginBottom: SIZES.lg,
    marginTop: 4,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontMd,
    fontWeight: "600",
    marginBottom: SIZES.sm,
    marginTop: SIZES.md,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SIZES.sm,
  },
  chip: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: COLORS.white,
    fontWeight: "700",
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    color: COLORS.textPrimary,
    fontSize: SIZES.fontLg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    paddingTop: SIZES.md,
  },
  intensityContainer: {
    flexDirection: "row",
    gap: SIZES.sm,
  },
  intensityButton: {
    flex: 1,
    paddingVertical: SIZES.sm + 4,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  intensityText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
    fontWeight: "600",
  },
  intensityTextSelected: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusMd,
    paddingVertical: SIZES.md,
    alignItems: "center",
    marginTop: SIZES.xl,
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: COLORS.white,
    fontSize: SIZES.fontLg,
    fontWeight: "700",
  },
});
