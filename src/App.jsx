import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { AuthGuard } from './components/common/AuthGuard';
import { AppLayout } from './components/layout/AppLayout';

import { AuthPage } from './pages/AuthPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { CrewPage } from './pages/CrewPage';
import { TelemetryPage } from './pages/TelemetryPage';
import { CalendarPage } from './pages/CalendarPage';
import { RepositoryPage } from './pages/RepositoryPage';
import { ArchivePage } from './pages/ArchivePage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <WorkspaceProvider>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            <Route
              element={
                <AuthGuard>
                  <AppLayout />
                </AuthGuard>
              }
            >
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/crew" element={<CrewPage />} />
              <Route path="/telemetry" element={<TelemetryPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/repository" element={<RepositoryPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </WorkspaceProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
