import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { TelemetryPage } from './pages/TelemetryPage';

export default function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Starter Sidebar */}
      <aside style={{ width: 220, background: '#0f0f14', borderRight: '1px solid rgba(255,255,255,0.1)', padding: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '0.9rem', color: 'var(--liquid-gold)', marginBottom: 20 }}>
          STARTER APP
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>Dashboard</Link>
          <Link to="/telemetry" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.85rem' }}>Telemetry</Link>
        </nav>
      </aside>

      {/* Main Content View */}
      <main style={{ flex: 1, background: 'var(--bg-dark)' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/telemetry" element={<TelemetryPage />} />
        </Routes>
      </main>
    </div>
  );
}
