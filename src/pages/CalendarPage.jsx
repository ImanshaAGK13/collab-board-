import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, AlertCircle, X } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export function CalendarPage() {
  const { events, addEvent, tasks } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00 UTC',
    type: 'meeting'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    addEvent(formData);
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], time: '14:00 UTC', type: 'meeting' });
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '1.4rem', color: '#fff', marginBottom: 4 }}>
            📅 Mission Calendar & astral Schedule
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Schedule orbital maneuvers, docking windows, and squad sprint syncs.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
            border: 'none',
            color: '#050508',
            fontWeight: 700,
            fontFamily: 'var(--font-header)',
            padding: '8px 16px',
            borderRadius: 8,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 0 15px rgba(255, 191, 0, 0.4)'
          }}
        >
          <Plus size={16} /> Schedule Event
        </button>
      </div>

      {/* Events List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Scheduled Events */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 14, padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', color: 'var(--liquid-gold)', marginBottom: 16 }}>
            STATION EVENTS & SYNC WINDOWS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {events.map((ev) => (
              <div
                key={ev.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '0.88rem', color: '#fff', marginBottom: 4 }}>
                    {ev.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CalendarIcon size={12} color="var(--liquid-gold)" /> {ev.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} color="#00d2ff" /> {ev.time}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.65rem',
                    padding: '3px 8px',
                    borderRadius: 4,
                    textTransform: 'uppercase',
                    background: ev.type === 'critical' ? 'rgba(255,69,96,0.15)' : 'rgba(255,191,0,0.15)',
                    color: ev.type === 'critical' ? '#ff4560' : 'var(--liquid-gold)',
                    border: `1px solid ${ev.type === 'critical' ? '#ff4560' : 'var(--liquid-gold)'}`
                  }}
                >
                  {ev.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Task Deadlines Timeline */}
        <div style={{ background: 'rgba(15,15,20,0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '0.95rem', color: '#00d2ff', marginBottom: 16 }}>
            UPCOMING TASK DIRECTIVE DEADLINES
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {tasks.map((t) => (
              <div
                key={t.id}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 600 }}>{t.title}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Due: {t.dueDate}</div>
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--liquid-gold)', fontFamily: 'var(--font-header)' }}>
                  [{t.status.toUpperCase()}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(5,5,8,0.85)',
            backdropFilter: 'blur(15px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 420,
              background: 'rgba(15, 15, 20, 0.95)',
              border: '1px solid rgba(255, 191, 0, 0.3)',
              borderRadius: 14,
              padding: 24,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>

            <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.1rem', color: '#fff', marginBottom: 16 }}>
              Schedule Station Event
            </h2>

            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Solar Flare Deflection Test"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '8px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '8px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  Time Window
                </label>
                <input
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="14:00 UTC"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '8px', color: '#fff', fontSize: '0.82rem', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                  border: 'none',
                  color: '#050508',
                  fontWeight: 700,
                  fontFamily: 'var(--font-header)',
                  padding: '10px',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Schedule Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
