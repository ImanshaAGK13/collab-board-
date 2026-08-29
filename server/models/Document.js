import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    docId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, default: 'Technical' },
    size: { type: String, default: '1.5 MB' },
    updatedAt: { type: String, default: () => new Date().toISOString().split('T')[0] }
  },
  { timestamps: true }
);

export const Document = mongoose.model('Document', documentSchema);
