import React, { useState, useEffect } from 'react';
import { X, Archive, Trash2, Send, Clock, User, Tag, AlertTriangle } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';

export function TaskModal({ task, onClose }) {
  const { addTask, updateTask, deleteTask, archiveTask, addComment, crewMembers } = useWorkspace();
  const { currentUser } = useAuth();

  const isEditing = Boolean(task);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    assignee: 'nova',
    progress: 0,
    dueDate: new Date().toISOString().split('T')[0],
    timeEstimate: 4,
    tags: 'Mission'
  });

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
        priority: task.priority || 'medium',
        assignee: task.assignee || 'nova',
        progress: task.progress || 0,
        dueDate: task.dueDate || new Date().toISOString().split('T')[0],
        timeEstimate: task.timeEstimate || 4,
        tags: Array.isArray(task.tags) ? task.tags.join(', ') : task.tags || 'Mission'
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map((t) => t.trim()).filter(Boolean);

    if (isEditing) {
      updateTask(task.id, {
        ...formData,
        progress: parseInt(formData.progress),
        timeEstimate: parseInt(formData.timeEstimate),
        tags: tagsArray
      });
    } else {
      addTask({
        ...formData,
        progress: parseInt(formData.progress),
        timeEstimate: parseInt(formData.timeEstimate),
        tags: tagsArray
      });
    }
    onClose();
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !task) return;
    addComment(task.id, currentUser?.name || 'Astronaut', commentText.trim());
    setCommentText('');
  };

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
          maxWidth: 680,
          maxHeight: '90vh',
          background: 'rgba(15, 15, 20, 0.95)',
          border: '1px solid rgba(255, 191, 0, 0.3)',
          borderRadius: 14,
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          overflowY: 'auto',
          padding: 24,
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'rgba(255,255,255,0.06)',
            border: 'none',
            color: '#8e8e9c',
            width: 32,
            height: 32,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '1.2rem', color: '#fff', marginBottom: 16 }}>
          {isEditing ? `Task Telemetry [${task.id}]` : 'Create New Orbital Task'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
              Task Title / Payload Objective
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Shield Emitter Calibration"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '10px 12px',
                color: '#fff',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
              Description & Specifications
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed technical instructions..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                padding: '10px 12px',
                color: '#fff',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Row 1: Status, Priority, Assignee */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Column Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                style={{
                  width: '100%',
                  background: '#121216',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '8px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                style={{
                  width: '100%',
                  background: '#121216',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '8px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              >
                <option value="critical">🚨 Critical</option>
                <option value="high">⚠️ High</option>
                <option value="medium">⚡ Medium</option>
                <option value="low">🌱 Low</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Assignee
              </label>
              <select
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                style={{
                  width: '100%',
                  background: '#121216',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '8px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              >
                {crewMembers.map((c) => (
                  <option key={c.id} value={c.id}>
                    👨‍🚀 {c.name} ({c.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Progress, Due Date, Tags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Progress ({formData.progress}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                style={{ width: '100%', accentColor: 'var(--liquid-gold)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '6px 8px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Hardware, Defense"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '6px 8px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Form Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
            <div>
              {isEditing && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => { archiveTask(task.id); onClose(); }}
                    style={{
                      background: 'rgba(255, 191, 0, 0.1)',
                      border: '1px solid rgba(255, 191, 0, 0.3)',
                      color: 'var(--liquid-gold)',
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Archive size={14} /> Archive
                  </button>
                  <button
                    type="button"
                    onClick={() => { deleteTask(task.id); onClose(); }}
                    style={{
                      background: 'rgba(255, 69, 96, 0.15)',
                      border: '1px solid rgba(255, 69, 96, 0.3)',
                      color: '#ff4560',
                      padding: '8px 12px',
                      borderRadius: 6,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ccc',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #ffbf00, #ff9f00)',
                  border: 'none',
                  color: '#050508',
                  fontWeight: 700,
                  fontFamily: 'var(--font-header)',
                  padding: '8px 20px',
                  borderRadius: 6,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(255,191,0,0.4)'
                }}
              >
                {isEditing ? 'Save Telemetry' : '🚀 Launch Task'}
              </button>
            </div>
          </div>
        </form>

        {/* Comments Section (If Editing) */}
        {isEditing && (
          <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
            <h4 style={{ fontFamily: 'var(--font-header)', fontSize: '0.85rem', color: 'var(--liquid-gold)', marginBottom: 12 }}>
              LOG COMMUNICATIONS & COMMENTS
            </h4>

            {/* List of comments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12, maxHeight: 150, overflowY: 'auto' }}>
              {(task.comments || []).length === 0 ? (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No logs posted yet.</div>
              ) : (
                task.comments.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: 6,
                      padding: '8px 12px',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--liquid-gold)', fontSize: '0.72rem', marginBottom: 2 }}>
                      <span>{c.author}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{new Date(c.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div style={{ color: '#eee' }}>{c.text}</div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Append telemetry log..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'rgba(255,191,0,0.15)',
                  border: '1px solid rgba(255,191,0,0.3)',
                  color: 'var(--liquid-gold)',
                  borderRadius: 6,
                  padding: '8px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Send size={14} /> Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
