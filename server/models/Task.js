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
    status: { type: String, enum: ['todo', 'in_progress', 'review', 'done'], default: 'todo' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    assignee: { type: String, default: 'nova' },
    progress: { type: Number, default: 0 },
    dueDate: { type: String, required: true },
    timeEstimate: { type: Number, default: 4 },
    tags: [{ type: String }],
    comments: [commentSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
