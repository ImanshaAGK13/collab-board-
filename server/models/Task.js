import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema(
  {
    taskId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['backlog', 'todo', 'in_progress', 'review', 'done', 'archived'],
      default: 'todo'
    },
    priority: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'medium'
    },
    assignee: { type: String, default: 'nova' },
    progress: { type: Number, default: 0 },
    dueDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    timeEstimate: { type: Number, default: 4 },
    tags: [{ type: String }],
    comments: [commentSchema],
    isArchived: { type: Boolean, default: false },
    archivedAt: { type: String, default: null }
  },
  { timestamps: true }
);

export const Task = mongoose.model('Task', taskSchema);