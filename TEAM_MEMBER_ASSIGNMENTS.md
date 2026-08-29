# 🚀 CollabBoard - 8-Member Individual Task & Branch Guide (Frontend + Backend)

මෙම ලේඛනය CollabBoard ව්‍යාපෘතියේ කණ්ඩායම් සාමාජිකයින් 8 දෙනා සඳහා වෙන් වෙන් වශයෙන් සාදන ලද Frontend, Backend කාර්යභාර හා Git Branch උපදෙස් මාලාවයි.

කණ්ඩායම් සාමාජිකයින් 8 දෙනා සඳහාම වෙන් වෙන් Backend File Bundles `MEMBER_CODE_BUNDLES` directory එකෙහි සූදානම් කර ඇත.

---

## 📌 1. Member 1 - SK Kavindi
* **Module / Scope:** Authentication & Access Control (Login, Register & Route Guard)
* **Assigned Branch:** `feature/member-1-auth`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-1-sk-kavindi/`
* **Assigned Files:**
  * **Frontend:**
    * `src/pages/AuthPage.jsx`
    * `src/pages/ResetPasswordPage.jsx`
    * `src/context/AuthContext.jsx`
    * `src/components/common/AuthGuard.jsx`
    * `css/base-auth.css`
  * **Backend:**
    * `server/routes/authRoutes.js`
    * `server/controllers/authController.js`
    * `server/models/User.js`
    * `server/middleware/authMiddleware.js`

### 💻 Member 1 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-1-auth
git merge main
git add .
git commit -m "feat(auth): add frontend login flow & backend auth API endpoints with JWT"
git push origin feature/member-1-auth
```

---

## 📌 2. Member 2 - IDRT Sanjeewa
* **Module / Scope:** Kanban Mission Deck (Task Board & Edit Task Modal)
* **Assigned Branch:** `feature/member-2-kanban`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-2-idrt-sanjeewa/`
* **Assigned Files:**
  * **Frontend:**
    * `src/components/kanban/KanbanBoard.jsx`
    * `src/components/kanban/TaskCard.jsx`
    * `src/components/kanban/TaskModal.jsx`
    * `src/__tests__/TaskCard.test.jsx`
    * `src/__tests__/TaskModal.test.jsx`
  * **Backend:**
    * `server/routes/taskRoutes.js`
    * `server/controllers/taskController.js`
    * `server/models/Task.js`

### 💻 Member 2 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-2-kanban
git merge main
git add .
git commit -m "feat(kanban): add task board UI & task directives CRUD backend API"
git push origin feature/member-2-kanban
```

---

## 📌 3. Member 3 - WRN Wijesooriya
* **Module / Scope:** To-Do List Module & Main Mission Dashboard View
* **Assigned Branch:** `feature/member-3-todo`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-3-wrn-wijesooriya/`
* **Assigned Files:**
  * **Frontend:**
    * `src/pages/DashboardPage.jsx`
    * `src/components/todo/TodoListView.jsx`
    * `src/context/WorkspaceContext.jsx`
  * **Backend:**
    * `server/routes/taskRoutes.js`
    * `server/controllers/taskController.js`
    * `server/models/Task.js`

### 💻 Member 3 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-3-todo
git merge main
git add .
git commit -m "feat(todo): add todo list view, cockpit dashboard & task archive API"
git push origin feature/member-3-todo
```

---

## 📌 4. Member 4 - PO Karunapala
* **Module / Scope:** Crew Roster & Astronaut Directory Management
* **Assigned Branch:** `feature/member-4-crew`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-4-po-karunapala/`
* **Assigned Files:**
  * **Frontend:**
    * `src/pages/CrewPage.jsx`
    * `src/context/WorkspaceContext.jsx`
  * **Backend:**
    * `server/routes/crewRoutes.js`
    * `server/controllers/crewController.js`
    * `server/models/Crew.js`

### 💻 Member 4 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-4-crew
git merge main
git add .
git commit -m "feat(crew): add astronaut crew roster UI & crew backend API"
git push origin feature/member-4-crew
```

---

## 📌 5. Member 5 - KDP Udeepa
* **Module / Scope:** Telemetry Analytics & Real-Time System Metrics
* **Assigned Branch:** `feature/member-5-telemetry`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-5-kdp-udeepa/`
* **Assigned Files:**
  * **Frontend:**
    * `src/pages/TelemetryPage.jsx`
    * `src/hooks/useRealtimeSocket.js`
    * `src/components/common/ConflictWarningModal.jsx`
  * **Backend:**
    * `server/routes/telemetryRoutes.js`
    * `server/controllers/telemetryController.js`
    * `server/sockets/taskSocket.js`

### 💻 Member 5 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-5-telemetry
git merge main
git add .
git commit -m "feat(telemetry): add system metrics UI, telemetry API & Socket.io events"
git push origin feature/member-5-telemetry
```

---

## 📌 6. Member 6 - HMYN Madugalla
* **Module / Scope:** Mission Calendar & Event Scheduler
* **Assigned Branch:** `feature/member-6-calendar`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-6-hmyn-madugalla/`
* **Assigned Files:**
  * **Frontend:**
    * `src/pages/CalendarPage.jsx`
    * `src/context/WorkspaceContext.jsx`
  * **Backend:**
    * `server/routes/calendarRoutes.js`
    * `server/controllers/calendarController.js`
    * `server/models/Event.js`

### 💻 Member 6 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-6-calendar
git merge main
git add .
git commit -m "feat(calendar): add orbital calendar UI & mission events backend API"
git push origin feature/member-6-calendar
```

---

## 📌 7. Member 7 - MKI Dewmini
* **Module / Scope:** Document Repository & Mission Archives
* **Assigned Branch:** `feature/member-7-repository`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-7-mki-dewmini/`
* **Assigned Files:**
  * **Frontend:**
    * `src/pages/RepositoryPage.jsx`
    * `src/pages/ArchivePage.jsx`
    * `src/context/WorkspaceContext.jsx`
  * **Backend:**
    * `server/routes/documentRoutes.js`
    * `server/controllers/documentController.js`
    * `server/models/Document.js`

### 💻 Member 7 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-7-repository
git merge main
git add .
git commit -m "feat(repository): add document repository UI & documents backend API"
git push origin feature/member-7-repository
```

---

## 📌 8. Member 8 - AGK Imansha
* **Module / Scope:** Cockpit App Layout, Navigation, Settings & Global Themes
* **Assigned Branch:** `feature/member-8-layout`
* **Bundle Location:** `MEMBER_CODE_BUNDLES/member-8-agk-imansha/`
* **Assigned Files:**
  * **Frontend:**
    * `src/components/layout/AppLayout.jsx`
    * `src/components/layout/Sidebar.jsx`
    * `src/components/layout/Topbar.jsx`
    * `src/components/layout/Footer.jsx`
    * `src/pages/SettingsPage.jsx`
    * `src/pages/HelpPage.jsx`
    * `src/App.jsx`
    * `css/style.css`
  * **Backend:**
    * `server/server.js`
    * `server/package.json`
    * `server/.env`
    * `server/config/db.js`

### 💻 Member 8 Git Commands:
```bash
git checkout main
git pull origin main
git checkout feature/member-8-layout
git merge main
git add .
git commit -m "feat(layout): add app frame layout, sidebar, server.js entry & MongoDB config"
git push origin feature/member-8-layout
```
