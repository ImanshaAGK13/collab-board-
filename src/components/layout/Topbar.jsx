import React, { useState } from 'react';
import { Search, Bell, LogOut, Copy, Check, Radio } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useToast } from '../../context/ToastContext';

export function Topbar() {
  const { currentUser, logout } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleCopyCode = () => {
    if (activeWorkspace?.code) {
      navigator.clipboard.writeText(activeWorkspace.code);
      setCopied(true);
      showToast(`Orbit Code ${activeWorkspace.code} copied to clipboard!`, 'info');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header
      style={{
        height: 64,
        background: 'rgba(10, 10, 14, 0.7)',
        borderBottom: '1px solid rgba(255, 191, 0, 0.12)',
        backdropFilter: 'blur(15px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}
    >
      {/* Active Workspace Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Radio size={16} color="var(--liquid-gold)" style={{ animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', color: '#fff' }}>
            {activeWorkspace?.name || 'Mission Control'}
          </span>
        </div>

        {activeWorkspace?.code && (
          <button
            onClick={handleCopyCode}
            style={{
              background: 'rgba(255, 191, 0, 0.08)',
              border: '1px dashed rgba(255, 191, 0, 0.3)',
              borderRadius: 6,
              padding: '4px 8px',
              color: 'var(--liquid-gold)',
              fontSize: '0.72rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              fontFamily: 'monospace'
            }}
          >
            {copied ? <Check size={12} color="#00e676" /> : <Copy size={12} />}
            <span>{activeWorkspace.code}</span>
          </button>
        )}
      </div>

      {/* Right Controls: Search, Notifications, Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Quick Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 20,
            padding: '6px 12px',
            width: 220
          }}
        >
          <Search size={14} color="var(--text-muted)" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search telemetry..."
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              outline: 'none',
              fontSize: '0.78rem',
              width: '100%',
              fontFamily: 'var(--font-body)'
            }}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={16} />
            <span
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--liquid-gold)'
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 44,
                width: 280,
                background: 'rgba(15, 15, 20, 0.95)',
                border: '1px solid rgba(255, 191, 0, 0.25)',
                borderRadius: 10,
                padding: 14,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(20px)',
                zIndex: 100
              }}
            >
              <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.78rem', color: 'var(--liquid-gold)', marginBottom: 8 }}>
                STATION NOTIFICATIONS
              </div>
              <div style={{ fontSize: '0.75rem', color: '#ccc', marginBottom: 6 }}>
                🚀 Shield Emitter task status updated to In Progress.
              </div>
              <div style={{ fontSize: '0.75rem', color: '#ccc' }}>
                👨‍🚀 Nova Mitchell joined station deck.
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          title="Disconnect Terminal (Logout)"
          style={{
            background: 'rgba(255, 69, 96, 0.15)',
            border: '1px solid rgba(255, 69, 96, 0.3)',
            color: '#ff4560',
            borderRadius: 8,
            padding: '7px 12px',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={14} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
}
