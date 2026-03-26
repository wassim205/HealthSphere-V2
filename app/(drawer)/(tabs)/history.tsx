import { useAuth } from "@/src/context/AuthContext";
import { COLORS, SIZES } from "@/src/constants/theme";
import { listSessions, type WorkoutSession } from "@/src/services/api";
import React, { useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Filter = "all" | "completed" | "active";

export default function HistoryScreen() {
  const { token } = useAuth();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  React.useEffect(() => {
    const load = async () => {
      if (!token) return;
      const data = await listSessions(token);
      setSessions(data);
    };
    void load();
  }, [token]);

  const filtered = useMemo(() => {
    if (filter === "all") return sessions;
    return sessions.filter((item) => item.status === filter);
  }, [sessions, filter]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style={styles.filters}>
        {(["all", "completed", "active"] as Filter[]).map((value) => (
          <TouchableOpacity
            key={value}
            style={[styles.filterBtn, filter === value && styles.filterBtnActive]}
            onPress={() => setFilter(value)}
          >
            <Text style={styles.filterText}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.activityType}</Text>
            <Text style={styles.cardMeta}>Status: {item.status}</Text>
            <Text style={styles.cardMeta}>
              Distance: {(item.distanceMeters / 1000).toFixed(2)} km
            </Text>
            <Text style={styles.cardMeta}>
              Duration: {Math.floor((item.durationSeconds || 0) / 60)} min
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No sessions yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.lg },
  title: { color: COLORS.textPrimary, fontSize: SIZES.fontTitle, fontWeight: "800" },
  filters: { flexDirection: "row", gap: SIZES.sm, marginVertical: SIZES.md },
  filterBtn: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radiusMd,
  },
  filterBtnActive: { backgroundColor: COLORS.primary },
  filterText: { color: COLORS.textPrimary, textTransform: "capitalize" },
  card: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
  },
  cardTitle: { color: COLORS.textPrimary, fontWeight: "700", marginBottom: 4 },
  cardMeta: { color: COLORS.textSecondary },
  empty: { color: COLORS.textSecondary, marginTop: SIZES.lg },
});

