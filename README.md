# 🏋️ HealthSphere Mobile

A Health & Fitness mobile application built with **React Native** and **Expo**. Track your workout sessions, view history, and monitor your fitness progress.

## 📱 Features

- ➕ **Add Workouts** — Log your training sessions (type, duration, intensity, notes)
- 📋 **Workout List** — View all sessions with FlatList
- 📄 **Workout Details** — See full details of each session
- 🗑️ **Delete Workouts** — Remove sessions with confirmation
- 💾 **Data Persistence** — AsyncStorage keeps your data after restart
- 🌙 **Dark Theme** — Modern dark UI with red accents

## 🏗️ Architecture

```
src/
 ├── screens/           # App screens (Home, AddWorkout, WorkoutDetails)
 ├── components/        # Reusable UI components
 ├── context/           # Context API for global state (useReducer)
 ├── storage/           # AsyncStorage persistence layer
 └── constants/         # Theme colors, sizes, types

app/
 ├── _layout.tsx        # Root layout with Stack Navigator
 ├── index.tsx          # Home route
 ├── add-workout.tsx    # Add workout route
 └── workout/[id].tsx   # Workout details (dynamic route)
```

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React Native | Mobile framework |
| Expo (managed) | Development environment |
| Expo Router | File-based navigation (Stack) |
| AsyncStorage | Local data persistence |
| Context API + useReducer | State management |
| TypeScript | Type safety |
| StyleSheet | Styling |

## 📦 Installation

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app on your phone (for testing)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Ibrahim-Lmlilas/HealthSphere-Mobile.git

# 2. Navigate to project
cd HealthSphere-Mobile

# 3. Install dependencies
npm install

# 4. Start the app
npx expo start
```

### Run on device
- **Android**: Press `a` or scan QR code with Expo Go
- **iOS**: Press `i` or scan QR code with Camera app
- **Web**: Press `w` to open in browser

## 📂 Data Model

```typescript
interface Workout {
  id: string;               // Unique identifier
  activity: ActivityType;    // Running, Cycling, Swimming, etc.
  duration: number;          // Duration in minutes
  intensity: IntensityLevel; // Low, Medium, High
  date: string;              // ISO date string
  notes: string;             // Optional notes
  createdAt: string;         // Creation timestamp
}
```

## 🔀 Git Branching

- `main` — Production branch
- `develop` — Development branch
- `feature/*` — Feature branches

## 👤 Author

**Ibrahim Lmlilas**

## 📄 License

This project is part of a pedagogical brief — **Concepteur Développeur d'Applications (2023)**.
