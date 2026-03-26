import { useAuth } from "@/src/context/AuthContext";
import { COLORS, SIZES } from "@/src/constants/theme";
import { Link, Redirect } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const { token, signIn, isSubmitting, isBootstrapping } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isBootstrapping) return null;
  if (token) return <Redirect href="/(drawer)/(tabs)/dashboard" />;

  const onSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Missing fields", "Please provide email and password.");
      return;
    }

    try {
      await signIn(email.trim(), password);
    } catch (error) {
      Alert.alert("Login failed", error instanceof Error ? error.message : "Try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>HealthSphere</Text>
        <Text style={styles.subtitle}>Sign in to track your workouts</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={COLORS.textMuted}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? "Loading..." : "Login"}</Text>
        </TouchableOpacity>

        <Link href="/(auth)/register" style={styles.link}>
          No account? Create one
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, padding: SIZES.lg, justifyContent: "center", gap: SIZES.md },
  title: { color: COLORS.textPrimary, fontSize: SIZES.fontTitle, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, marginBottom: SIZES.md },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    alignItems: "center",
  },
  buttonText: { color: COLORS.white, fontWeight: "700" },
  link: { color: COLORS.primaryLight, textAlign: "center", marginTop: SIZES.sm },
});

