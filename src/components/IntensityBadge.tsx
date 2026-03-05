// ============================================
// IntensityBadge - Shows intensity level
// with matching color (green/orange/red)
// ============================================

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, IntensityLevel, SIZES } from "../constants/theme";

interface IntensityBadgeProps {
  intensity: IntensityLevel;
  size?: "small" | "medium";
}

export default function IntensityBadge({
  intensity,
  size = "small",
}: IntensityBadgeProps) {
  // Pick color based on intensity
  const getColor = () => {
    switch (intensity) {
      case "Low":
        return COLORS.intensityLow;
      case "Medium":
        return COLORS.intensityMedium;
      case "High":
        return COLORS.intensityHigh;
      default:
        return COLORS.textSecondary;
    }
  };

  const color = getColor();
  const isSmall = size === "small";

  return (
    <View style={[styles.badge, { borderColor: color }, isSmall && styles.badgeSmall]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text
        style={[styles.text, { color }, isSmall && styles.textSmall]}
      >
        {intensity}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1,
    gap: 6,
  },
  badgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: SIZES.fontSm,
    fontWeight: "600",
  },
  textSmall: {
    fontSize: SIZES.fontXs,
  },
});
