// ============================================
// Tab: Exercises
// Placeholder screen for V2 exercise catalogue.
// The API + offline logic will be plugged here later.
// ============================================

import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "@/src/constants/theme";
import { useExercises } from "@/src/context/ExercisesContext";

export default function ExercisesScreen() {
  const { state, toggleFavorite, isFavorite, reloadExercises } = useExercises();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.subtitle}>Catalogue from backend API</Text>
      </View>
      <FlatList
        data={state.exercises}
        keyExtractor={(item) => item.id}
        onRefresh={() => void reloadExercises()}
        refreshing={state.isLoading}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>{item.category}</Text>
            <Text style={styles.cardText}>{item.description}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteBtn}>
              <Text style={styles.favoriteText}>
                {isFavorite(item.id) ? "Remove favorite" : "Add favorite"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>
            {state.error ? `Error: ${state.error}` : "No exercises loaded."}
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
  },
  header: {
    marginTop: SIZES.xl,
    marginBottom: SIZES.md,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: SIZES.fontTitle,
    fontWeight: "800",
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.fontSm,
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  cardTitle: { color: COLORS.textPrimary, fontWeight: "700" },
  cardText: { color: COLORS.textSecondary, marginTop: 2 },
  favoriteBtn: {
    marginTop: SIZES.sm,
    backgroundColor: COLORS.primaryDark,
    padding: SIZES.sm,
    borderRadius: SIZES.radiusSm,
    alignItems: "center",
  },
  favoriteText: { color: COLORS.white, fontWeight: "600" },
});

