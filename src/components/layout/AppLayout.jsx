import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Footer } from './Footer';
import { StarfieldBg } from './StarfieldBg';

export function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
      <StarfieldBg />
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Topbar />
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

