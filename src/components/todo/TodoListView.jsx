import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit3,
  Clock,
  AlertTriangle,
  Tag,
  Check,
  Sparkles
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { TaskModal } from '../kanban/TaskModal';

export function TodoListView() {
  const { tasks, addTask, updateTask, moveTaskColumn, deleteTask, crewMembers } = useWorkspace();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickTitle, setQuickTitle] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    addTask({
      title: quickTitle.trim(),
      description: 'Quick directive created from To-Do List view.',
      status: 'todo',
      priority: 'medium',
      assignee: currentUser?.id || 'nova',
      progress: 0,
      dueDate: new Date().toISOString().split('T')[0],
      timeEstimate: 2,
      tags: ['Directive']
    });

    setQuickTitle('');
    // Switch tab to 'all' or 'pending' so newly added task is immediately visible
    setActiveTab('all');
  };

  const handleOpenCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const toggleTaskDone = (task) => {
    if (task.status === 'done') {
      moveTaskColumn(task.id, 'in_progress');
      updateTask(task.id, { progress: 50 });
    } else {
      moveTaskColumn(task.id, 'done');
      updateTask(task.id, { progress: 100 });
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && t.status !== 'done') ||
      (activeTab === 'completed' && t.status === 'done') ||
      t.status === activeTab;

    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const priorityColors = {
    critical: '#ff4560',
    high: '#ff9f00',
    medium: '#ffbf00',
    low: '#00d2ff'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* ➕ Quick Add Input Bar & Full Modal Button */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <form
          onSubmit={handleQuickAdd}
          style={{
            flex: 1,
            background: 'rgba(15, 15, 20, 0.85)',
            border: '1px solid rgba(255, 191, 0, 0.3)',
            borderRadius: 14,
            padding: '8px 14px',
            backdropFilter: 'blur(15px)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            minWidth: 280
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(255,191,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Plus size={16} color="var(--liquid-gold)" />
          </div>

          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="Type a new task directive and press Enter..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              color: '#fff',
              outline: 'none',
              fontSize: '0.88rem',
              fontFamily: 'var(--font-body)'
            }}
          />

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
              border: 'none',
              color: '#050508',
              fontWeight: 700,
              fontFamily: 'var(--font-header)',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(255,191,0,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            + Quick Add
          </button>
        </form>

        {/* Detailed Modal Launcher */}
        <button
          onClick={handleOpenCreateModal}
          style={{
            background: 'rgba(255, 191, 0, 0.12)',
            border: '1px solid rgba(255, 191, 0, 0.3)',
            color: 'var(--liquid-gold)',
            fontWeight: 700,
            fontFamily: 'var(--font-header)',
            padding: '10px 18px',
            borderRadius: 14,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            whiteSpace: 'nowrap'
          }}
        >
          <Sparkles size={14} /> + Full Task Details
        </button>
      </div>

      {/* 🔍 Filter Tabs & Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap'
        }}
      >
        {/* Status Tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'pending', label: 'Pending' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(255, 191, 0, 0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeTab === tab.id ? 'rgba(255, 191, 0, 0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: activeTab === tab.id ? 'var(--liquid-gold)' : 'var(--text-muted)',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.78rem',
                fontFamily: 'var(--font-header)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 8,
            padding: '6px 12px',
            width: 220
          }}
        >
          <Search size={14} color="var(--text-muted)" style={{ marginRight: 8 }} />
          <input
            type="text"
            placeholder="Search list..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              outline: 'none',
              fontSize: '0.8rem',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* 📝 Task List Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredTasks.length === 0 ? (
          <div
            style={{
              background: 'rgba(15,15,20,0.6)',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: 14,
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.82rem'
            }}
          >
            No tasks found matching your filter criteria.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'done';
            const assigneeObj = crewMembers.find((c) => c.id === task.assignee) || { name: task.assignee, initials: 'CM' };
            const priorityColor = priorityColors[task.priority] || '#ffbf00';

            return (
              <div
                key={task.id}
                style={{
                  background: isDone ? 'rgba(15, 15, 20, 0.45)' : 'rgba(18, 18, 24, 0.75)',
                  border: `1px solid ${isDone ? 'rgba(255,255,255,0.05)' : 'rgba(255, 255, 255, 0.1)'}`,
                  borderLeft: `4px solid ${isDone ? '#00e676' : priorityColor}`,
                  borderRadius: 12,
                  padding: '12px 18px',
                  backdropFilter: 'blur(15px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 14,
                  transition: 'all 0.2s ease',
                  opacity: isDone ? 0.75 : 1
                }}
                className="todo-list-row"
              >
                {/* Left: Checkbox + Title + Tags */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                  {/* Custom Interactive Checkbox */}
                  <button
                    onClick={() => toggleTaskDone(task)}
                    title={isDone ? 'Mark as Pending' : 'Mark as Complete'}
                    style={{
                      background: isDone ? 'rgba(0, 230, 118, 0.15)' : 'transparent',
                      border: `2px solid ${isDone ? '#00e676' : priorityColor}`,
                      borderRadius: '50%',
                      width: 24,
                      height: 24,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isDone && <Check size={14} color="#00e676" />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: isDone ? 'var(--text-muted)' : '#fff',
                        textDecoration: isDone ? 'line-through' : 'none',
                        fontFamily: 'var(--font-header)',
                        marginBottom: 4
                      }}
                    >
                      {task.title}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span
                        style={{
                          background: `${priorityColor}15`,
                          color: priorityColor,
                          padding: '1px 6px',
                          borderRadius: 4,
                          fontFamily: 'var(--font-header)',
                          fontSize: '0.62rem',
                          fontWeight: 700
                        }}
                      >
                        {task.priority.toUpperCase()}
                      </span>

                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={11} /> {task.dueDate}
                      </span>

                      <span style={{ textTransform: 'uppercase', color: 'var(--liquid-gold)' }}>
                        [{task.status.replace('_', ' ')}]
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Assignee Avatar + Edit + Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Assignee Avatar */}
                  <div
                    title={`Assigned to ${assigneeObj.name}`}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: assigneeObj.color || priorityColor,
                      color: '#000',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {assigneeObj.initials || assigneeObj.name.charAt(0)}
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsModalOpen(true);
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: 'none',
                      color: '#aaa',
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Edit3 size={14} />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      background: 'rgba(255,69,96,0.1)',
                      border: 'none',
                      color: '#ff4560',
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Modal for Details/Edit */}
      {isModalOpen && (
        <TaskModal task={selectedTask} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
