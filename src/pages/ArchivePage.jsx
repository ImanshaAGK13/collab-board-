import React from 'react';
import { Archive, CheckCircle, Clock } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export function ArchivePage() {
  const { archivedTasks } = useWorkspace();

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
          📦 Mission Task Archives
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Historical record of completed directives and archived space telemetry.
        </p>
      </div>

      {archivedTasks.length === 0 ? (
        <div
          style={{
            background: 'rgba(15,15,20,0.6)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '60px 20px',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}
        >
          <Archive size={40} color="var(--liquid-gold)" style={{ marginBottom: 12, opacity: 0.7 }} />
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1rem', color: '#fff', marginBottom: 4 }}>
            Archives Chamber Empty
          </h3>
          <p style={{ fontSize: '0.8rem' }}>No tasks have been moved to the mission archive yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {archivedTasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: 'rgba(15,15,20,0.75)',
                border: '1px solid rgba(255,191,0,0.15)',
                borderRadius: 12,
                padding: 16,
                backdropFilter: 'blur(15px)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.72rem', color: 'var(--liquid-gold)' }}>
                <span>[{task.id}]</span>
                <span style={{ color: '#00e676', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={12} /> ARCHIVED
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.9rem', color: '#fff', marginBottom: 6 }}>
                {task.title}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                {task.description}
              </p>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                Archived: {new Date(task.archivedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
