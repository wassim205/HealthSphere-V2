// ============================================
// Drawer: About screen
// Explains what HealthSphere is and can be used
// during the presentation to justify choices.
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About HealthSphere</Text>
        <Text style={styles.text}>
          HealthSphere helps you track your workouts, explore exercises and monitor your progress.
          This V2 focuses on advanced navigation, API integration and offline-first behaviour.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SIZES.lg,
    marginTop: SIZES.xl,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
    marginBottom: SIZES.md,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    lineHeight: 20,
  },
});

