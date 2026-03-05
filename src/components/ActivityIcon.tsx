// ============================================
// ActivityIcon - Returns emoji for each activity
// ============================================

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityType, COLORS } from "../constants/theme";

interface ActivityIconProps {
  activity: ActivityType;
  size?: number;
}

// Map each activity to an emoji
const ACTIVITY_EMOJIS: Record<ActivityType, string> = {
  Running: "🏃",
  Cycling: "🚴",
  Swimming: "🏊",
  Weightlifting: "🏋️",
  Yoga: "🧘",
  HIIT: "⚡",
  Walking: "🚶",
  Other: "💪",
};

export default function ActivityIcon({
  activity,
  size = 40,
}: ActivityIconProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.5 }}>
        {ACTIVITY_EMOJIS[activity] || "💪"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardLight,
    justifyContent: "center",
    alignItems: "center",
  },
});
