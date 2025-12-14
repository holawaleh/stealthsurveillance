# Stealth Surveillance System (Silent Camera)

A modular motion-based surveillance dashboard built with **React + Vite**, designed to integrate with ESP32 motion cameras and a backend API.

This repository currently contains a **fully functional frontend MVP**, with mock authentication and in-memory data, ready for backend and device integration.

---

## 🚀 Features

### Frontend (Completed)

- Dashboard overview
- Camera management (Add / Edit / Delete)
- Motion alerts view
- System logs view
- User activity timeline
- Settings panel
- Clean UI with Tailwind CSS
- Mock authentication (no backend required)

### System Design (Ready)

- Clear separation between:
  - Logs (system/device events)
  - Activity (user actions)
- Camera-centric architecture
- Ready for:
  - REST API
  - WebSocket / MQTT events
  - ESP32 motion triggers

---

## 🧱 Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **State:** React hooks (local state)
- **Backend:** Planned (Node / Django / FastAPI)
- **Device:** ESP32 (motion detection, future OTA)

---

## 📁 Project Structure
