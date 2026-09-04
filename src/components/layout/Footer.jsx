import React, { useState, useEffect } from 'react';
import { Radio, Shield, Palette, HardDrive, Cpu } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export function Footer() {
  const { activeWorkspace } = useWorkspace();
  const [theme, setTheme] = useState(() => localStorage.getItem('collabboard_theme') || 'gold');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('collabboard_theme', theme);
  }, [theme]);

  return (
    <footer
      style={{
        background: 'rgba(10, 10, 14, 0.85)',
        borderTop: '1px solid rgba(255, 191, 0, 0.15)',
        backdropFilter: 'blur(15px)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        marginTop: 'auto',
        zIndex: 80,
        flexWrap: 'wrap',
        gap: 12
      }}
    >
      {/* Left: Station Signal Live telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00e676', fontFamily: 'var(--font-header)', fontSize: '0.72rem' }}>
          <Radio size={12} style={{ animation: 'pulse 2s infinite' }} />
          <span>STATION LINK: ONLINE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
          <Cpu size={12} color="var(--liquid-gold)" />
          <span>LATENCY: 14ms</span>
        </div>

        {activeWorkspace && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--liquid-gold)', fontFamily: 'monospace' }}>
            <HardDrive size={12} />
            <span>{activeWorkspace.code}</span>
          </div>
        )}
      </div>

      {/* Center: System Title */}
      <div style={{ fontFamily: 'var(--font-header)', fontSize: '0.7rem', color: '#8e8e9c', letterSpacing: '0.5px' }}>
        COLLABBOARD ORBITAL v2.6.0 &copy; 2026 DEEP SPACE COMMAND
      </div>

      {/* Right: Theme Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Palette size={12} color="var(--liquid-gold)" /> Theme:
        </span>

        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setTheme('gold')}
            title="Liquid Gold Theme"
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#ffbf00',
              border: theme === 'gold' ? '2px solid #fff' : 'none',
              cursor: 'pointer'
            }}
          />
          <button
            onClick={() => setTheme('cyan')}
            title="Cyan Nebula Theme"
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#00d2ff',
              border: theme === 'cyan' ? '2px solid #fff' : 'none',
              cursor: 'pointer'
            }}
          />
          <button
            onClick={() => setTheme('crimson')}
            title="Crimson Alert Theme"
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#ff4560',
              border: theme === 'crimson' ? '2px solid #fff' : 'none',
              cursor: 'pointer'
            }}
          />
        </div>
      </div>
    </footer>
  );
}
