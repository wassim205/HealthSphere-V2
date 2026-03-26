# HealthSphere Backend (Express)

Backend API for HealthSphere mobile app.

## Features

- JWT authentication (`register`, `login`, `me`)
- Protected routes with Bearer token
- GPS workout sessions (`start`, `pause`, `resume`, `stop`)
- Coordinate tracking and distance calculation (Haversine)
- Photo attachment per session
- Dashboard stats (`total sessions`, `duration`, `distance`)
- Exercise catalogue endpoint for mobile app

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Server URL by default: `http://localhost:3333`

## API Endpoints

### Public

- `GET /health`
- `GET /exercises`
- `GET /exercises/:id`
- `POST /auth/register`
- `POST /auth/login`

### Protected (Authorization: Bearer <token>)

- `GET /auth/me`
- `GET /sessions`
- `POST /sessions`
- `GET /sessions/:id`
- `PATCH /sessions/:id/pause`
- `PATCH /sessions/:id/resume`
- `PATCH /sessions/:id/stop`
- `POST /sessions/:id/coordinates`
- `POST /sessions/:id/photo`
- `GET /sessions/stats`

## Example payloads

`POST /auth/register`

```json
{
  "name": "Mehdi",
  "email": "mehdi@example.com",
  "password": "secret123"
}
```

`POST /sessions`

```json
{
  "activityType": "running"
}
```

`POST /sessions/:id/coordinates`

```json
{
  "coordinates": [
    { "latitude": 33.5731, "longitude": -7.5898 },
    { "latitude": 33.5735, "longitude": -7.5904 }
  ]
}
```

`POST /sessions/:id/photo`

```json
{
  "photoUri": "file:///path/to/photo.jpg"
}
```
