import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    workspaceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    ownerId: { type: String, default: 'usr_nova' },
    membersCount: { type: Number, default: 3 }
  },
  { timestamps: true }
);

export default mongoose.model('Workspace', workspaceSchema);
