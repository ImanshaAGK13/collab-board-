import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String, default: '1.0 MB' },
    updatedAt: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Document', documentSchema);
