// ============================================
// Theme constants for HealthSphere app
// Dark theme with red accent (matching design)
// ============================================

export const COLORS = {
  // Main backgrounds
  background: "#0D0D0D",
  card: "#1A1A1A",
  cardLight: "#242424",

  // Accent colors
  primary: "#E53935",
  primaryLight: "#FF5252",
  primaryDark: "#B71C1C",

  // Text colors
  textPrimary: "#FFFFFF",
  textSecondary: "#9E9E9E",
  textMuted: "#666666",

  // Status colors
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#E53935",

  // Intensity colors
  intensityLow: "#4CAF50",
  intensityMedium: "#FF9800",
  intensityHigh: "#E53935",

  // Borders & dividers
  border: "#2A2A2A",
  divider: "#1F1F1F",

  // Other
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
};

export const SIZES = {
  // Padding & margin
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Border radius
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusFull: 999,

  // Font sizes
  fontXs: 10,
  fontSm: 12,
  fontMd: 14,
  fontLg: 16,
  fontXl: 20,
  fontXxl: 28,
  fontTitle: 32,
};

// Workout activity types
export const ACTIVITY_TYPES = [
  "Running",
  "Cycling",
  "Swimming",
  "Weightlifting",
  "Yoga",
  "HIIT",
  "Walking",
  "Other",
] as const;

// Workout intensity levels
export const INTENSITY_LEVELS = ["Low", "Medium", "High"] as const;

// Types
export type ActivityType = (typeof ACTIVITY_TYPES)[number];
export type IntensityLevel = (typeof INTENSITY_LEVELS)[number];

export interface Workout {
  id: string;
  activity: ActivityType;
  duration: number; // in minutes
  intensity: IntensityLevel;
  date: string; // ISO string
  notes: string;
  createdAt: string; // ISO string
}
