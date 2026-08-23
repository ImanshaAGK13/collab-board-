import React, { useState } from 'react';
import { Plus, Search, Filter, Layers, LayoutGrid, AlertCircle } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { useWorkspace } from '../../context/WorkspaceContext';

export function KanbanBoard() {
  const { tasks } = useWorkspace();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { id: 'backlog', title: 'Backlog', icon: '📥', color: '#8e8e9c', bg: 'rgba(142, 142, 156, 0.08)' },
    { id: 'todo', title: 'To Do', icon: '🎯', color: '#00d2ff', bg: 'rgba(0, 210, 255, 0.08)' },
    { id: 'in_progress', title: 'In Progress', icon: '⚡', color: '#ffbf00', bg: 'rgba(255, 191, 0, 0.08)' },
    { id: 'review', title: 'Review', icon: '🔍', color: '#ff9f00', bg: 'rgba(255, 159, 0, 0.08)' },
    { id: 'done', title: 'Done', icon: '✅', color: '#00e676', bg: 'rgba(0, 230, 118, 0.08)' }
  ];

  const handleOpenCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* 🛠️ Action Toolbar */}
      <div
        style={{
          background: 'rgba(15, 15, 20, 0.75)',
          border: '1px solid rgba(255, 191, 0, 0.15)',
          borderRadius: 14,
          padding: '14px 20px',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 300 }}>
          {/* Search Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 8,
              padding: '8px 14px',
              flex: 1
            }}
          >
            <Search size={15} color="var(--text-muted)" style={{ marginRight: 10 }} />
            <input
              type="text"
              placeholder="Search station tasks by title or specifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                outline: 'none',
                fontSize: '0.82rem',
                width: '100%',
                fontFamily: 'var(--font-body)'
              }}
            />
          </div>

          {/* Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={14} color="var(--liquid-gold)" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 191, 0, 0.3)',
                borderRadius: 8,
                color: '#fff',
                padding: '8px 12px',
                fontSize: '0.8rem',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Priorities</option>
              <option value="critical">🚨 Critical</option>
              <option value="high">⚠️ High</option>
              <option value="medium">⚡ Medium</option>
              <option value="low">🌱 Low</option>
            </select>
          </div>
        </div>

        {/* Add Directive Button */}
        <button
          onClick={handleOpenCreate}
          style={{
            background: 'linear-gradient(135deg, #ffbf00 0%, #ff9f00 100%)',
            border: 'none',
            color: '#050508',
            fontWeight: 700,
            fontFamily: 'var(--font-header)',
            padding: '10px 20px',
            borderRadius: 8,
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 0 20px rgba(255, 191, 0, 0.35)',
            transition: 'transform 0.2s ease'
          }}
        >
          <Plus size={16} />
          <span>New Directive</span>
        </button>
      </div>

      {/* 📊 Kanban Columns Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 16,
          alignItems: 'start'
        }}
      >
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div
              key={col.id}
              style={{
                background: 'rgba(14, 14, 18, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 14,
                padding: 14,
                minHeight: 520,
                backdropFilter: 'blur(15px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              {/* Column Header Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  padding: '8px 10px',
                  background: col.bg,
                  borderLeft: `3px solid ${col.color}`,
                  borderRadius: 8
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1rem' }}>{col.icon}</span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-header)',
                      fontSize: '0.85rem',
                      color: '#fff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {col.title}
                  </h3>
                </div>

                <span
                  style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    color: col.color,
                    border: `1px solid ${col.color}44`,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontFamily: 'var(--font-header)'
                  }}
                >
                  {colTasks.length}
                </span>
              </div>

              {/* Column Content */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {colTasks.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '40px 14px',
                      color: 'var(--text-muted)',
                      fontSize: '0.78rem',
                      border: '1px dashed rgba(255, 255, 255, 0.08)',
                      borderRadius: 10,
                      marginTop: 10
                    }}
                  >
                    No directives in {col.title}
                  </div>
                ) : (
                  colTasks.map((t) => (
                    <TaskCard key={t.id} task={t} onOpenDetail={handleOpenDetail} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail / Create Modal */}
      {isModalOpen && (
        <TaskModal task={selectedTask} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
