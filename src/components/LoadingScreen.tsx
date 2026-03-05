// ============================================
// LoadingScreen - Shown while data is loading
// ============================================

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>Loading your workouts...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    gap: SIZES.md,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontMd,
  },
});
