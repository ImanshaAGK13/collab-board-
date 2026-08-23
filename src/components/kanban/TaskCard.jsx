import React from 'react';
import { Clock, MessageSquare, AlertTriangle, ChevronRight, User } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export function TaskCard({ task, onOpenDetail }) {
  const { crewMembers } = useWorkspace();
  const assigneeObj = crewMembers.find((c) => c.id === task.assignee) || { name: task.assignee, initials: 'CM', color: '#ffbf00' };

  const priorityMeta = {
    critical: { label: 'CRITICAL', color: '#ff4560', bg: 'rgba(255, 69, 96, 0.15)' },
    high: { label: 'HIGH', color: '#ff9f00', bg: 'rgba(255, 159, 0, 0.15)' },
    medium: { label: 'MEDIUM', color: '#ffbf00', bg: 'rgba(255, 191, 0, 0.15)' },
    low: { label: 'LOW', color: '#00d2ff', bg: 'rgba(0, 210, 255, 0.15)' }
  };

  const priorityInfo = priorityMeta[task.priority] || priorityMeta.medium;

  return (
    <div
      onClick={() => onOpenDetail(task)}
      style={{
        background: 'rgba(20, 20, 26, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderLeft: `4px solid ${priorityInfo.color}`,
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 14,
        cursor: 'pointer',
        backdropFilter: 'blur(15px)',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}
      className="task-card-item"
    >
      {/* Header Tags & Priority Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(task.tags || []).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.62rem',
                background: 'rgba(255, 191, 0, 0.08)',
                border: '1px solid rgba(255, 191, 0, 0.2)',
                color: 'var(--liquid-gold)',
                padding: '2px 7px',
                borderRadius: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <span
          style={{
            fontSize: '0.64rem',
            background: priorityInfo.bg,
            color: priorityInfo.color,
            border: `1px solid ${priorityInfo.color}44`,
            padding: '2px 8px',
            borderRadius: 12,
            fontFamily: 'var(--font-header)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          {task.priority === 'critical' && <AlertTriangle size={10} />}
          {priorityInfo.label}
        </span>
      </div>

      {/* Task Title */}
      <h4
        style={{
          fontFamily: 'var(--font-header)',
          fontSize: '0.88rem',
          color: '#fff',
          marginBottom: 6,
          lineHeight: 1.35,
          letterSpacing: '0.2px'
        }}
      >
        {task.title}
      </h4>

      {/* Task Description Snippet */}
      {task.description && (
        <p
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginBottom: 12,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {task.description}
        </p>
      )}

      {/* Telemetry Progress Bar */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#8e8e9c', marginBottom: 4 }}>
          <span>Telemetry Progress</span>
          <span style={{ color: task.progress === 100 ? '#00e676' : '#fff', fontWeight: 600 }}>{task.progress}%</span>
        </div>
        <div style={{ width: '100%', height: 5, background: 'rgba(255, 255, 255, 0.08)', borderRadius: 3, overflow: 'hidden' }}>
          <div
            style={{
              width: `${task.progress}%`,
              height: '100%',
              background: task.progress === 100 ? '#00e676' : `linear-gradient(90deg, ${priorityInfo.color}, #ffbf00)`,
              borderRadius: 3,
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Footer Info Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: 10,
          fontSize: '0.72rem',
          color: 'var(--text-muted)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <Clock size={12} color="var(--liquid-gold)" />
            {task.dueDate}
          </span>

          {task.comments && task.comments.length > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#00d2ff' }}>
              <MessageSquare size={12} />
              {task.comments.length}
            </span>
          )}
        </div>

        {/* Assignee Avatar Badge */}
        <div
          title={`Assigned to: ${assigneeObj.name}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: '2px 8px 2px 3px'
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: assigneeObj.color || priorityInfo.color,
              color: '#000',
              fontSize: '0.65rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {assigneeObj.initials || assigneeObj.name.charAt(0)}
          </div>
          <span style={{ fontSize: '0.68rem', color: '#eee' }}>{assigneeObj.name.split(' ')[0]}</span>
        </div>
      </div>
    </div>
  );
}
