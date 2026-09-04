import React from 'react';
import { AlertTriangle, RefreshCw, Save, X } from 'lucide-react';

export function ConflictWarningModal({ isOpen, localData, serverData, onOverwrite, onReload, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 5, 8, 0.85)',
        backdropFilter: 'blur(15px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <div
        style={{
          width: 500,
          maxWidth: '100%',
          background: 'rgba(18, 18, 24, 0.95)',
          border: '1px solid rgba(255, 69, 96, 0.4)',
          borderRadius: 20,
          padding: '28px 24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255, 69, 96, 0.2)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#8e8e9c',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'rgba(255, 69, 96, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 69, 96, 0.3)'
            }}
          >
            <AlertTriangle size={24} color="#ff4560" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', color: '#ff4560' }}>
              Real-Time Conflict Detected!
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Concurrent Edit Warning
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: '#ccc', lineHeight: 1.5, marginBottom: 18 }}>
          Another team member recently modified this task on the station network while you were editing.
        </p>

        {/* Side-by-side comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--liquid-gold)', fontFamily: 'var(--font-header)', marginBottom: 4 }}>
              YOUR LOCAL DRAFT
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{localData?.title || 'Draft Task'}</div>
            <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 4 }}>Status: {localData?.status}</div>
          </div>

          <div style={{ background: 'rgba(255, 69, 96, 0.08)', padding: 12, borderRadius: 10, border: '1px solid rgba(255, 69, 96, 0.25)' }}>
            <div style={{ fontSize: '0.7rem', color: '#ff4560', fontFamily: 'var(--font-header)', marginBottom: 4 }}>
              SERVER UPDATED DATA
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{serverData?.title || 'Server Task'}</div>
            <div style={{ fontSize: '0.72rem', color: '#aaa', marginTop: 4 }}>Status: {serverData?.status}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onReload}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: 10,
              padding: '10px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <RefreshCw size={14} /> Reload Latest
          </button>

          <button
            onClick={onOverwrite}
            style={{
              flex: 1.2,
              background: 'linear-gradient(135deg, #ff4560, #ff2a4b)',
              border: 'none',
              color: '#fff',
              borderRadius: 10,
              padding: '10px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              boxShadow: '0 0 15px rgba(255,69,96,0.4)'
            }}
          >
            <Save size={14} /> Overwrite Server
          </button>
        </div>
      </div>
    </div>
  );
}
