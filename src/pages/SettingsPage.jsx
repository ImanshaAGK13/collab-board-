import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Shield, Key, RefreshCw, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';

export function SettingsPage() {
  const { currentUser, updateProfile } = useAuth();
  const { activeWorkspace } = useWorkspace();

  const [name, setName] = useState(currentUser?.name || '');
  const [title, setTitle] = useState(currentUser?.title || '');
  const [color, setColor] = useState(currentUser?.color || '#ffbf00');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, title, color });
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
          ⚙️ Station Settings & Astronaut Profile HUD
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Configure officer callsign, telemetry theme, and workspace station link.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Profile Settings */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', color: 'var(--liquid-gold)', marginBottom: 16 }}>
            ASTRONAUT PROFILE HUD
          </h3>

          <form onSubmit={handleSaveProfile}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Callsign / Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Operational Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                HUD Accent Color
              </label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['#ffbf00', '#ff9f00', '#00d2ff', '#ff4560', '#00e676', '#a855f7'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: c,
                      border: color === c ? '3px solid #fff' : 'none',
                      cursor: 'pointer',
                      boxShadow: color === c ? `0 0 12px ${c}` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                border: 'none',
                color: '#050508',
                fontWeight: 700,
                fontFamily: 'var(--font-header)',
                padding: '10px 20px',
                borderRadius: 8,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Save size={16} /> Save Profile Telemetry
            </button>
          </form>
        </div>

        {/* Workspace Station Info */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', color: '#00d2ff', marginBottom: 16 }}>
            CURRENT STATION WORKSPACE
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Station Name:</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginTop: 2 }}>{activeWorkspace?.name}</div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)' }}>Orbit Access Code:</span>
              <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--liquid-gold)', marginTop: 2 }}>
                {activeWorkspace?.code}
              </div>
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5 }}>
              Share this Orbit Access Code with fellow astronauts to grant them access to this station deck.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
