import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Activity,
  Calendar,
  FolderGit2,
  Settings,
  HelpCircle,
  Archive,
  Rocket,
  Shield,
  Layers
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { workspaces, activeWorkspace, switchWorkspace, createWorkspace } = useWorkspace();
  const { currentUser } = useAuth();

  const handleCreateWorkspace = () => {
    const name = prompt('Enter New Mission Workspace Name:');
    if (name) {
      createWorkspace(name);
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Mission Board', icon: LayoutDashboard },
    { path: '/crew', label: 'Crew Roster', icon: Users },
    { path: '/telemetry', label: 'Telemetry', icon: Activity },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/repository', label: 'Repository', icon: FolderGit2 },
    { path: '/archive', label: 'Archives', icon: Archive },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/help', label: 'Manual Guide', icon: HelpCircle }
  ];

  return (
    <aside
      className="sidebar-container"
      style={{
        width: 240,
        background: 'rgba(12, 12, 16, 0.85)',
        borderRight: '1px solid rgba(255, 191, 0, 0.15)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          padding: '20px 18px',
          borderBottom: '1px solid rgba(255, 191, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(255, 191, 0, 0.4)'
          }}
        >
          <Rocket size={20} color="#050508" />
        </div>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1rem',
              color: '#fff',
              letterSpacing: '1px'
            }}
          >
            COLLABBOARD
          </h1>
          <span style={{ fontSize: '0.68rem', color: 'var(--liquid-gold)', textTransform: 'uppercase' }}>
            ORBITAL v2.6
          </span>
        </div>
      </div>

      {/* Workspace Switcher */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
          <span>Active Station</span>
          <button
            onClick={handleCreateWorkspace}
            style={{ background: 'none', border: 'none', color: 'var(--liquid-gold)', cursor: 'pointer', fontSize: '0.65rem' }}
          >
            + New
          </button>
        </div>
        <select
          value={activeWorkspace?.id || ''}
          onChange={(e) => switchWorkspace(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 191, 0, 0.25)',
            color: '#fff',
            borderRadius: 6,
            padding: '6px 8px',
            fontSize: '0.8rem',
            outline: 'none',
            fontFamily: 'var(--font-body)'
          }}
        >
          {workspaces.map((ws) => (
            <option key={ws.id} value={ws.id} style={{ background: '#121216', color: '#fff' }}>
              🛸 {ws.name} ({ws.code})
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active-nav-link' : ''}`
              }
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--liquid-gold)' : 'var(--text-muted)',
                background: isActive ? 'rgba(255, 191, 0, 0.12)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--liquid-gold)' : '3px solid transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Rank Footer Badge */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: currentUser?.color || '#ffbf00',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.8rem'
            }}
          >
            {currentUser?.name ? currentUser.name.charAt(0) : 'A'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {currentUser?.name || 'Astronaut'}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--liquid-gold)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Shield size={10} />
              <span>{currentUser?.role || 'Crew'}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
