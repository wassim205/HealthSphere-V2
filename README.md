# HealthSphere v3

Complete mobile fitness tracking app with React Native (Expo) + Express API.

## Features

- Authentication: register/login, JWT token storage, protected routes
- Outdoor tracking: location permission, start/pause/resume/stop session
- GPS data: coordinate recording and distance calculation
- Camera: take and attach a training photo to a session
- Dashboard: total sessions, total duration, total distance
- History: filterable sessions list
- Exercises catalogue: fetched from backend API + favorites persistence

## Stack

- Mobile: Expo, React Native, Expo Router, TypeScript, AsyncStorage
- Native modules: `expo-location`, `expo-camera`
- Backend: Node.js, Express, JWT, bcrypt, JSON file persistence
- Build: EAS (`eas.json` included)

## Project Structure

```txt
app/                Expo Router routes
src/                Mobile business logic (context, services, components)
backend/            Express API
  src/routes/       Auth, sessions, exercises
  src/services/     DB + domain services
```

## Run Locally

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default backend URL: `http://localhost:3333`

### 2) Mobile

From project root:

```bash
npm install
cp .env.example .env
```

Set your computer LAN IP in `.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://192.168.X.X:3333
```

Then start Expo:

```bash
npx expo start
```

## API Summary

- Public:
  - `POST /auth/register`
  - `POST /auth/login`
  - `GET /exercises`
  - `GET /exercises/:id`
  - `GET /health`
- Protected (Bearer token):
  - `GET /auth/me`
  - `POST /sessions`
  - `GET /sessions`
  - `PATCH /sessions/:id/pause`
  - `PATCH /sessions/:id/resume`
  - `PATCH /sessions/:id/stop`
  - `POST /sessions/:id/coordinates`
  - `POST /sessions/:id/photo`
  - `GET /sessions/stats`

## EAS Android Build

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile production
```

## Test Checklist

- Register and login successfully
- Reopen app and stay authenticated (token persisted)
- Start tracking and verify distance increases when moving
- Pause/resume tracking
- Stop session and verify it appears in history
- Capture photo and verify session has linked photo
- Check dashboard totals update after completed sessions

## Workflow Recommendation

- Branching: `main`, `develop`, `feature/*`
- One feature branch per user story
- Pull Request mandatory with review before merge
