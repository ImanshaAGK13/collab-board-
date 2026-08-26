import React, { useState } from 'react';
import { KanbanBoard } from '../components/kanban/KanbanBoard';
import { TodoListView } from '../components/todo/TodoListView';
import { useWorkspace } from '../context/WorkspaceContext';
import { useAuth } from '../context/AuthContext';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Users,
  Radio,
  Sparkles,
  TrendingUp,
  Clock,
  LayoutGrid,
  ListTodo
} from 'lucide-react';

export function DashboardPage() {
  const { tasks, crewMembers, activeWorkspace } = useWorkspace();
  const { currentUser } = useAuth();
  const [viewMode, setViewMode] = useState('todo'); // Default to To-Do List view!

  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const criticalTasks = tasks.filter((t) => t.priority === 'critical').length;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 🚀 Station Control Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(22, 22, 30, 0.85) 0%, rgba(15, 15, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 191, 0, 0.25)',
          borderRadius: 16,
          padding: '24px 28px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(255, 191, 0, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--liquid-gold)',
                background: 'rgba(255, 191, 0, 0.12)',
                border: '1px solid rgba(255, 191, 0, 0.3)',
                padding: '3px 10px',
                borderRadius: 20,
                fontFamily: 'var(--font-header)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Radio size={12} className="pulse-icon" /> LIVE TELEMETRY
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Clock size={12} style={{ display: 'inline', marginRight: 4 }} /> {currentDate}
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-header)',
              fontSize: '1.5rem',
              color: '#fff',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}
          >
            Welcome back, {currentUser?.name || 'Commander'}
            <Sparkles size={20} color="var(--liquid-gold)" />
          </h1>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Station: <strong style={{ color: '#fff' }}>{activeWorkspace?.name}</strong> &nbsp;|&nbsp;
            Rank: <strong style={{ color: 'var(--liquid-gold)' }}>{currentUser?.role || 'Captain'}</strong>
          </p>
        </div>

        {/* Orbit Code & View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* View Mode Toggle Buttons */}
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 191, 0, 0.25)',
              borderRadius: 10,
              padding: 4,
              display: 'flex',
              gap: 4
            }}
          >
            <button
              onClick={() => setViewMode('todo')}
              style={{
                background: viewMode === 'todo' ? 'linear-gradient(135deg, #ffbf00, #ff9f00)' : 'transparent',
                border: 'none',
                color: viewMode === 'todo' ? '#050508' : 'var(--text-muted)',
                borderRadius: 6,
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <ListTodo size={14} /> To-Do List
            </button>

            <button
              onClick={() => setViewMode('kanban')}
              style={{
                background: viewMode === 'kanban' ? 'linear-gradient(135deg, #ffbf00, #ff9f00)' : 'transparent',
                border: 'none',
                color: viewMode === 'kanban' ? '#050508' : 'var(--text-muted)',
                borderRadius: 6,
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-header)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <LayoutGrid size={14} /> Kanban Deck
            </button>
          </div>
        </div>
      </div>

      {/* 📊 Metrics HUD Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {/* Card 1 */}
        <div style={{ background: 'rgba(18, 18, 24, 0.75)', border: '1px solid rgba(255, 191, 0, 0.2)', borderRadius: 14, padding: '18px 20px', backdropFilter: 'blur(15px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-header)' }}>Active Directives</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255, 191, 0, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} color="var(--liquid-gold)" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{totalTasks}</div>
          <div style={{ fontSize: '0.72rem', color: '#00e676', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={12} /> {inProgressTasks} Currently In Progress
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'rgba(18, 18, 24, 0.75)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: 14, padding: '18px 20px', backdropFilter: 'blur(15px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-header)' }}>Mission Progress</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0, 210, 255, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={18} color="#00d2ff" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{completionRate}%</div>
          <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginTop: 10, overflow: 'hidden' }}>
            <div style={{ width: `${completionRate}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #00e5ff)' }} />
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'rgba(18, 18, 24, 0.75)', border: '1px solid rgba(255, 69, 96, 0.25)', borderRadius: 14, padding: '18px 20px', backdropFilter: 'blur(15px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-header)' }}>Critical Directives</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255, 69, 96, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={18} color="#ff4560" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', fontWeight: 800, color: '#ff4560' }}>{criticalTasks}</div>
          <div style={{ fontSize: '0.72rem', color: criticalTasks > 0 ? '#ff4560' : 'var(--text-muted)', marginTop: 6 }}>
            {criticalTasks > 0 ? 'Requires Immediate Attention' : 'All Critical Directives Clear'}
          </div>
        </div>

        {/* Card 4 */}
        <div style={{ background: 'rgba(18, 18, 24, 0.75)', border: '1px solid rgba(0, 230, 118, 0.2)', borderRadius: 14, padding: '18px 20px', backdropFilter: 'blur(15px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-header)' }}>Assigned Personnel</span>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0, 230, 118, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={18} color="#00e676" />
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-header)', fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{crewMembers.length}</div>
          <div style={{ fontSize: '0.72rem', color: '#00e676', marginTop: 6 }}>Station Squad Fully Active</div>
        </div>
      </div>

      {/* 📝 Main Task View (To-Do List or Kanban Deck) */}
      {viewMode === 'todo' ? <TodoListView /> : <KanbanBoard />}
    </div>
  );
}
