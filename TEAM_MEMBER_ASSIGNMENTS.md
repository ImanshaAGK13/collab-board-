# 🚀 CollabBoard - 8-Member Individual Task & Branch Guide

මෙම ලේඛනය CollabBoard ව්‍යාපෘතියේ කණ්ඩායම් සාමාජිකයින් 8 දෙනා සඳහා වෙන් වෙන් වශයෙන් සාදන ලද කාර්යභාර හා Git Branch උපදෙස් මාලාවයි.

---

## 📌 1. Member 1 - SK Kavindi
* **Module / Scope:** Authentication & Access Control (Login, Register & Route Guard)
* **Assigned Branch:** `feature/member-1-auth`
* **Assigned Files:**
  * `src/pages/AuthPage.jsx` (Sign In / Register double sliding panel, forgot password inline flow)
  * `src/pages/ResetPasswordPage.jsx` (Page 2 reset password with token validation)
  * `src/context/AuthContext.jsx` (JWT Auth Context & user session)
  * `src/components/common/AuthGuard.jsx` (Route Protection)
  * `css/base-auth.css` (Code Candy sliding card styling)

### 💻 Member 1 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-1-auth
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(auth): update login flow, sliding cards and route guard"

# 4. Push to GitHub
git push origin feature/member-1-auth
```

---

## 📌 2. Member 2 - IDRT Sanjeewa
* **Module / Scope:** Kanban Mission Deck (Task Board & Edit Task Modal)
* **Assigned Branch:** `feature/member-2-kanban`
* **Assigned Files:**
  * `src/components/kanban/KanbanBoard.jsx` (5-Column Drag/Drop Board View)
  * `src/components/kanban/TaskCard.jsx` (Reusable Directive Card Component)
  * `src/components/kanban/TaskModal.jsx` (Directive Creator & Editor Form Modal)
  * `src/__tests__/TaskCard.test.jsx` (Task Card Unit Test)
  * `src/__tests__/TaskModal.test.jsx` (Task Modal Integration Test)

### 💻 Member 2 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-2-kanban
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(kanban): update task board, modals and unit tests"

# 4. Push to GitHub
git push origin feature/member-2-kanban
```

---

## 📌 3. Member 3 - WRN Wijesooriya
* **Module / Scope:** To-Do List Module & Main Mission Dashboard View
* **Assigned Branch:** `feature/member-3-todo`
* **Assigned Files:**
  * `src/pages/DashboardPage.jsx` (Main Cockpit Dashboard, Quick Metrics & View Toggle)
  * `src/components/todo/TodoListView.jsx` (Interactive To-Do List View with Priority Badges & Actions)
  * `src/context/WorkspaceContext.jsx` (Shared Task & Directive State Management)

### 💻 Member 3 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-3-todo
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(todo): update todo list view and main cockpit dashboard"

# 4. Push to GitHub
git push origin feature/member-3-todo
```

---

## 📌 4. Member 4 - PO Karunapala
* **Module / Scope:** Crew Roster & Astronaut Directory Management
* **Assigned Branch:** `feature/member-4-crew`
* **Assigned Files:**
  * `src/pages/CrewPage.jsx` (Astronaut Personnel Cards, Rank Filters & Commission Modal)
  * `src/context/WorkspaceContext.jsx` (Crew Members Roster State `crewMembers`, `addCrewMember`)

### 💻 Member 4 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-4-crew
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(crew): update astronaut roster cards and commissioning modal"

# 4. Push to GitHub
git push origin feature/member-4-crew
```

---

## 📌 5. Member 5 - KDP Udeepa
* **Module / Scope:** Telemetry Analytics & Real-Time System Metrics
* **Assigned Branch:** `feature/member-5-telemetry`
* **Assigned Files:**
  * `src/pages/TelemetryPage.jsx` (System Health Gauges, Orbital Signal Speeds, Oxygen Purity Stats)
  * `src/hooks/useRealtimeSocket.js` (Real-Time WebSockets Listener Hook)
  * `src/components/common/ConflictWarningModal.jsx` (Real-time Concurrent Edit Conflict Resolution UI)

### 💻 Member 5 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-5-telemetry
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(telemetry): update telemetry metrics, sockets and conflict modal"

# 4. Push to GitHub
git push origin feature/member-5-telemetry
```

---

## 📌 6. Member 6 - HMYN Madugalla
* **Module / Scope:** Mission Calendar & Event Scheduler
* **Assigned Branch:** `feature/member-6-calendar`
* **Assigned Files:**
  * `src/pages/CalendarPage.jsx` (Orbital Calendar, Spacewalk Sync, Event Scheduler)
  * `src/context/WorkspaceContext.jsx` (Events State `events`, `addEvent`)

### 💻 Member 6 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-6-calendar
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(calendar): update mission calendar and event scheduler"

# 4. Push to GitHub
git push origin feature/member-6-calendar
```

---

## 📌 7. Member 7 - MKI Dewmini
* **Module / Scope:** Document Repository & Mission Archives
* **Assigned Branch:** `feature/member-7-repository`
* **Assigned Files:**
  * `src/pages/RepositoryPage.jsx` (Technical Documents & Safety Manuals)
  * `src/pages/ArchivePage.jsx` (Completed & Archived Directives Vault)
  * `src/context/WorkspaceContext.jsx` (Archived Tasks `archivedTasks` & Documents State `documents`)

### 💻 Member 7 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-7-repository
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(repository): update document repository and archived vault"

# 4. Push to GitHub
git push origin feature/member-7-repository
```

---

## 📌 8. Member 8 - AGK Imansha
* **Module / Scope:** Cockpit App Layout, Navigation, Settings & Global Themes
* **Assigned Branch:** `feature/member-8-layout`
* **Assigned Files:**
  * `src/components/layout/AppLayout.jsx` (Main Frame Container)
  * `src/components/layout/Sidebar.jsx` (Navigation Bar & Station Links)
  * `src/components/layout/Topbar.jsx` (User Profile Pill, Quick Search & Status Indicator)
  * `src/components/layout/Footer.jsx` (Station System Bar)
  * `src/pages/SettingsPage.jsx` (Station Theme Tokens & Preferences)
  * `src/pages/HelpPage.jsx` (Station Protocol Documentation & Guidelines)
  * `src/App.jsx` (Global Router Setup & Providers)
  * `css/style.css` (Global Theme Tokens & Dark/Gold CSS Rules)

### 💻 Member 8 Git Commands:
```bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Switch to your feature branch
git checkout feature/member-8-layout
git merge main

# 3. Save & Commit your changes
git add .
git commit -m "feat(layout): update cockpit app frame, sidebar, settings and global styles"

# 4. Push to GitHub
git push origin feature/member-8-layout
```
