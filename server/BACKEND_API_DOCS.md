# 🛠️ CollabBoard Express REST API & WebSockets Backend Documentation

CollabBoard backend server එක සාදා ඇත්තේ **Node.js, Express, MongoDB (Mongoose), JWT Auth, සහ Socket.io** භාවිතයෙනි.

## 🚀 How to Run the Backend Server Locally
```bash
# 1. Terminal එකේ server folder එකට යන්න
cd server

# 2. Dependencies Install කරගන්න
npm install

# 3. Server එක Run කරන්න
npm start
```
* **REST API Base URL:** `http://localhost:5000/api`
* **Socket.io WebSockets URL:** `http://localhost:5000`

---

## 📌 8-Member Backend API Endpoints & Responsibilities

### 1. Member 1 - SK Kavindi (Authentication & Access Control)
* `POST /api/auth/register` - අලුත් User කෙනෙකු Register කිරීම (Bcrypt Password Hashing)
* `POST /api/auth/login` - User Login වී JWT Token ලබා ගැනීම
* `POST /api/auth/forgot-password` - Password Reset Token එකක් Email හරහා Request කිරීම
* `POST /api/auth/reset-password` - Token verification හරහා අලුත් Password එක Update කිරීම

---

### 2. Member 2 - IDRT Sanjeewa (Kanban Mission Deck)
* `GET /api/tasks` - active Kanban task directives සියල්ල Load කර ගැනීම
* `POST /api/tasks` - අලුත් Task එකක් සෑදීම
* `PUT /api/tasks/:id` - Task එකක Data වෙනස් කිරීම හෝ Status (Column) මාරු කිරීම
* `DELETE /api/tasks/:id` - Task එකක් Delete කිරීම

---

### 3. Member 3 - WRN Wijesooriya (To-Do List & Dashboard)
* `GET /api/tasks` - To-Do List එක සඳහා Tasks fetch කිරීම
* `PUT /api/tasks/:id` - To-Do Task එකක් Complete / In-Progress කිරීම
* `PUT /api/tasks/:id/archive` - Completed Task එකක් Archive Vault එකට දැමීම

---

### 4. Member 4 - PO Karunapala (Crew Roster Directory)
* `GET /api/crew` - Station Crew Personnel Roster එක ලබා ගැනීම
* `POST /api/crew` - අලුත් Astronaut කෙනෙකු Commission (Add) කිරීම

---

### 5. Member 5 - KDP Udeepa (Telemetry Analytics & System Metrics)
* `GET /api/telemetry/stats` - Oxygen purity, Hull integrity, Power efficiency, Downlink speeds ලබා ගැනීම

---

### 6. Member 6 - HMYN Madugalla (Mission Calendar)
* `GET /api/events` - Scheduled Orbital Meetings, Spacewalks & Dockings ලබා ගැනීම
* `POST /api/events` - අලුත් Calendar Event එකක් Add කිරීම

---

### 7. Member 7 - MKI Dewmini (Document Repository & Archives)
* `GET /api/documents` - Safety Protocol Manuals, Telemetry Maps & Blueprints ලබා ගැනීම

---

### 8. Member 8 - AGK Imansha (App Layout, Workspaces & Socket.io Server)
* `GET /api/health` - Server Health Check
* **Socket.io WebSockets Server Events:**
  * `task:create` -> Broadcasts `task:created`
  * `task:update` -> Broadcasts `task:updated`
  * `task:move` -> Broadcasts `task:moved`
  * `task:delete` -> Broadcasts `task:deleted`
