import { useAuth } from "@/src/context/AuthContext";
import { COLORS, SIZES } from "@/src/constants/theme";
import {
  attachSessionPhoto,
  createSession,
  patchSessionAction,
  sendCoordinates,
  type WorkoutSession,
} from "@/src/services/api";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TrackScreen() {
  const { token } = useAuth();
  const [locationPermission, setLocationPermission] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [distanceKm, setDistanceKm] = useState(0);
  const [isBusy, setIsBusy] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const watcherRef = useRef<Location.LocationSubscription | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const sessionStatusRef = useRef<WorkoutSession["status"] | null>(null);

  useEffect(() => {
    const askLocation = async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(result.granted);
    };
    void askLocation();
  }, []);

  useEffect(() => {
    return () => {
      watcherRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    sessionIdRef.current = session?.id ?? null;
    sessionStatusRef.current = session?.status ?? null;
  }, [session]);

  const requireToken = () => {
    if (!token) {
      throw new Error("Authentication required");
    }
    return token;
  };

  const startWatch = () => {
    watcherRef.current?.remove();
    void Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 5000,
      },
      async (position) => {
        if (!sessionIdRef.current || sessionStatusRef.current !== "active") return;
        try {
          const updated = await sendCoordinates(requireToken(), sessionIdRef.current, [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: new Date(position.timestamp).toISOString(),
            },
          ]);
          setSession(updated);
          setDistanceKm(Number((updated.distanceMeters / 1000).toFixed(2)));
        } catch {
          // Keep tracking alive and avoid noisy alerts every update.
        }
      }
    ).then((sub) => {
      watcherRef.current = sub;
    });
  };

  const onStart = async () => {
    if (!locationPermission) {
      Alert.alert("Location needed", "Please enable location permission.");
      return;
    }
    setIsBusy(true);
    try {
      const started = await createSession(requireToken(), "running");
      setSession(started);
      setDistanceKm(0);
      startWatch();
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to start session.");
    } finally {
      setIsBusy(false);
    }
  };

  const onPauseResume = async () => {
    if (!session) return;
    setIsBusy(true);
    try {
      const action = session.status === "active" ? "pause" : "resume";
      const updated = await patchSessionAction(requireToken(), session.id, action);
      setSession(updated);
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Action failed.");
    } finally {
      setIsBusy(false);
    }
  };

  const onStop = async () => {
    if (!session) return;
    setIsBusy(true);
    try {
      const updated = await patchSessionAction(requireToken(), session.id, "stop");
      watcherRef.current?.remove();
      watcherRef.current = null;
      setSession(updated);
      setDistanceKm(Number((updated.distanceMeters / 1000).toFixed(2)));
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Failed to stop.");
    } finally {
      setIsBusy(false);
    }
  };

  const onCapturePhoto = async () => {
    if (!session) return;
    if (!cameraPermission?.granted) {
      const granted = await requestCameraPermission();
      if (!granted.granted) return;
    }
    setShowCamera(true);
  };

  const onTakePicture = async () => {
    if (!session || !cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo?.uri) return;
      const updated = await attachSessionPhoto(requireToken(), session.id, photo.uri);
      setSession(updated);
      setShowCamera(false);
    } catch (error) {
      Alert.alert("Camera error", error instanceof Error ? error.message : "Capture failed.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>GPS Tracking</Text>
      <Text style={styles.subtitle}>
        Status: {session ? session.status.toUpperCase() : "NO SESSION"}
      </Text>
      <Text style={styles.metric}>Distance: {distanceKm} km</Text>
      <Text style={styles.metric}>
        Duration: {session ? Math.floor((session.durationSeconds || 0) / 60) : 0} min
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={onStart}
          disabled={isBusy || (!!session && session.status !== "completed")}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onPauseResume}
          disabled={!session || session.status === "completed" || isBusy}
        >
          <Text style={styles.buttonText}>
            {session?.status === "active" ? "Pause" : "Resume"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.button}
          onPress={onStop}
          disabled={!session || session.status === "completed" || isBusy}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={onCapturePhoto}
          disabled={!session || isBusy}
        >
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {session?.photoUri ? <Text style={styles.photoText}>Photo linked to session</Text> : null}

      {showCamera ? (
        <View style={styles.cameraWrap}>
          <CameraView style={styles.camera} ref={cameraRef} />
          <TouchableOpacity style={styles.captureButton} onPress={onTakePicture}>
            <Text style={styles.buttonText}>Take photo</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SIZES.lg },
  title: { color: COLORS.textPrimary, fontSize: SIZES.fontTitle, fontWeight: "800" },
  subtitle: { color: COLORS.textSecondary, marginTop: SIZES.sm, marginBottom: SIZES.lg },
  metric: { color: COLORS.textPrimary, fontSize: SIZES.fontLg, marginBottom: SIZES.sm },
  row: { flexDirection: "row", gap: SIZES.sm, marginTop: SIZES.md },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    alignItems: "center",
  },
  buttonText: { color: COLORS.white, fontWeight: "700" },
  photoText: { color: COLORS.success, marginTop: SIZES.md },
  cameraWrap: { marginTop: SIZES.lg, gap: SIZES.sm },
  camera: { height: 260, borderRadius: SIZES.radiusMd, overflow: "hidden" },
  captureButton: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    alignItems: "center",
  },
});

