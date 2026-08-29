# CollabBoard - Member Git Commands & File Assignments

### Member 1 - SK Kavindi
**Branch:** `feature/member-1-auth`  
**Files to Add:**
- `src/pages/AuthPage.jsx`
- `src/pages/ResetPasswordPage.jsx`
- `src/context/AuthContext.jsx`
- `src/components/common/AuthGuard.jsx`
- `css/base-auth.css`
- `server/routes/authRoutes.js`
- `server/controllers/authController.js`
- `server/models/User.js`
- `server/middleware/authMiddleware.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-1-auth
git merge main
git add src/pages/AuthPage.jsx src/pages/ResetPasswordPage.jsx src/context/AuthContext.jsx src/components/common/AuthGuard.jsx css/base-auth.css server/routes/authRoutes.js server/controllers/authController.js server/models/User.js server/middleware/authMiddleware.js
git commit -m "feat(auth): add auth pages, route guard & authentication API"
git push origin feature/member-1-auth
```

---

### Member 2 - IDRT Sanjeewa
**Branch:** `feature/member-2-kanban`  
**Files to Add:**
- `src/components/kanban/KanbanBoard.jsx`
- `src/components/kanban/TaskCard.jsx`
- `src/components/kanban/TaskModal.jsx`
- `src/__tests__/TaskCard.test.jsx`
- `src/__tests__/TaskModal.test.jsx`
- `server/routes/taskRoutes.js`
- `server/controllers/taskController.js`
- `server/models/Task.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-2-kanban
git merge main
git add src/components/kanban/KanbanBoard.jsx src/components/kanban/TaskCard.jsx src/components/kanban/TaskModal.jsx src/__tests__/TaskCard.test.jsx src/__tests__/TaskModal.test.jsx server/routes/taskRoutes.js server/controllers/taskController.js server/models/Task.js
git commit -m "feat(kanban): add task board UI & task directives API"
git push origin feature/member-2-kanban
```

---

### Member 3 - WRN Wijesooriya
**Branch:** `feature/member-3-todo`  
**Files to Add:**
- `src/pages/DashboardPage.jsx`
- `src/components/todo/TodoListView.jsx`
- `src/context/WorkspaceContext.jsx`
- `server/routes/taskRoutes.js`
- `server/controllers/taskController.js`
- `server/models/Task.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-3-todo
git merge main
git add src/pages/DashboardPage.jsx src/components/todo/TodoListView.jsx src/context/WorkspaceContext.jsx server/routes/taskRoutes.js server/controllers/taskController.js server/models/Task.js
git commit -m "feat(todo): add todo list view & main cockpit dashboard API"
git push origin feature/member-3-todo
```

---

### Member 4 - PO Karunapala
**Branch:** `feature/member-4-crew`  
**Files to Add:**
- `src/pages/CrewPage.jsx`
- `src/context/WorkspaceContext.jsx`
- `server/routes/crewRoutes.js`
- `server/controllers/crewController.js`
- `server/models/Crew.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-4-crew
git merge main
git add src/pages/CrewPage.jsx src/context/WorkspaceContext.jsx server/routes/crewRoutes.js server/controllers/crewController.js server/models/Crew.js
git commit -m "feat(crew): add astronaut crew roster UI & crew API"
git push origin feature/member-4-crew
```

---

### Member 5 - KDP Udeepa
**Branch:** `feature/member-5-telemetry`  
**Files to Add:**
- `src/pages/TelemetryPage.jsx`
- `src/hooks/useRealtimeSocket.js`
- `src/components/common/ConflictWarningModal.jsx`
- `server/routes/telemetryRoutes.js`
- `server/controllers/telemetryController.js`
- `server/sockets/taskSocket.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-5-telemetry
git merge main
git add src/pages/TelemetryPage.jsx src/hooks/useRealtimeSocket.js src/components/common/ConflictWarningModal.jsx server/routes/telemetryRoutes.js server/controllers/telemetryController.js server/sockets/taskSocket.js
git commit -m "feat(telemetry): add system health gauges, telemetry API & socket events"
git push origin feature/member-5-telemetry
```

---

### Member 6 - HMYN Madugalla
**Branch:** `feature/member-6-calendar`  
**Files to Add:**
- `src/pages/CalendarPage.jsx`
- `src/context/WorkspaceContext.jsx`
- `server/routes/calendarRoutes.js`
- `server/controllers/calendarController.js`
- `server/models/Event.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-6-calendar
git merge main
git add src/pages/CalendarPage.jsx src/context/WorkspaceContext.jsx server/routes/calendarRoutes.js server/controllers/calendarController.js server/models/Event.js
git commit -m "feat(calendar): add mission calendar scheduler & event API"
git push origin feature/member-6-calendar
```

---

### Member 7 - MKI Dewmini
**Branch:** `feature/member-7-repository`  
**Files to Add:**
- `src/pages/RepositoryPage.jsx`
- `src/pages/ArchivePage.jsx`
- `src/context/WorkspaceContext.jsx`
- `server/routes/documentRoutes.js`
- `server/controllers/documentController.js`
- `server/models/Document.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-7-repository
git merge main
git add src/pages/RepositoryPage.jsx src/pages/ArchivePage.jsx src/context/WorkspaceContext.jsx server/routes/documentRoutes.js server/controllers/documentController.js server/models/Document.js
git commit -m "feat(repository): add document repository UI, archive vault & document API"
git push origin feature/member-7-repository
```

---

### Member 8 - AGK Imansha
**Branch:** `feature/member-8-layout`  
**Files to Add:**
- `src/components/layout/AppLayout.jsx`
- `src/components/layout/Sidebar.jsx`
- `src/components/layout/Topbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/pages/SettingsPage.jsx`
- `src/pages/HelpPage.jsx`
- `src/App.jsx`
- `css/style.css`
- `server/server.js`
- `server/package.json`
- `server/.env`
- `server/config/db.js`

**Git Commands:**
```bash
git checkout main
git pull origin main
git checkout feature/member-8-layout
git merge main
git add src/components/layout/AppLayout.jsx src/components/layout/Sidebar.jsx src/components/layout/Topbar.jsx src/components/layout/Footer.jsx src/pages/SettingsPage.jsx src/pages/HelpPage.jsx src/App.jsx css/style.css server/server.js server/package.json server/.env server/config/db.js
git commit -m "feat(layout): add cockpit app layout, server entry & database setup"
git push origin feature/member-8-layout
```
