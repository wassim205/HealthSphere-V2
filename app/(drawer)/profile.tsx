// ============================================
// Drawer: Profile screen
// Simple placeholder that will later be connected
// to UserContext (user preferences, avatar, etc.).
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>
          This screen will display user information and profile settings in the next iteration.
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

