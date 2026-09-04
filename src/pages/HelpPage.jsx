import React from 'react';
import { HelpCircle, BookOpen, Command, Terminal, Shield } from 'lucide-react';

export function HelpPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
          📖 Mission Control Manual & Help Guide
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Comprehensive operating instructions for the CollabBoard orbital terminal.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Manual Basics */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.98rem', color: 'var(--liquid-gold)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} /> OPERATIONAL PRINCIPLES
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: '0.82rem', color: '#ccc', lineHeight: 1.5 }}>
            <div>
              <strong style={{ color: '#fff' }}>1. Kanban Mission Columns</strong>
              <p>Tasks move across Backlog, To Do, In Progress, Review, and Done. Click any task to edit details, add comments, or adjust progress bars.</p>
            </div>

            <div>
              <strong style={{ color: '#fff' }}>2. Orbit Workspace Codes</strong>
              <p>Workspaces are identified by unique codes (e.g. ORBIT-9X7K2). Use the topbar button to copy and share codes with team members.</p>
            </div>

            <div>
              <strong style={{ color: '#fff' }}>3. Operational Ranks</strong>
              <p>Captains 👑 lead missions and manage workspaces, Co-Captains 🚀 direct flight operations, and Crew 👨‍🚀 execute payload directives.</p>
            </div>
          </div>
        </div>

        {/* Shortcuts */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.98rem', color: '#00d2ff', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Command size={18} /> TERMINAL SHORTCUTS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
              <span>New Task Modal</span>
              <kbd style={{ background: 'rgba(255,191,0,0.15)', color: 'var(--liquid-gold)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>Alt + N</kbd>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
              <span>Quick Telemetry Search</span>
              <kbd style={{ background: 'rgba(255,191,0,0.15)', color: 'var(--liquid-gold)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>Ctrl + K</kbd>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6 }}>
              <span>Switch Station Workspace</span>
              <kbd style={{ background: 'rgba(255,191,0,0.15)', color: 'var(--liquid-gold)', padding: '2px 6px', borderRadius: 4, fontFamily: 'monospace' }}>Alt + S</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
