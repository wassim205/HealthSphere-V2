// ============================================
// Drawer: Profile screen
// Simple placeholder that will later be connected
// to UserContext (user preferences, avatar, etc.).
// ============================================

import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Name: {user?.name ?? "-"}</Text>
        <Text style={styles.text}>Email: {user?.email ?? "-"}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => void signOut()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  logoutButton: {
    marginTop: SIZES.lg,
    backgroundColor: COLORS.error,
    padding: SIZES.md,
    borderRadius: SIZES.radiusMd,
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: "700",
  },
});

