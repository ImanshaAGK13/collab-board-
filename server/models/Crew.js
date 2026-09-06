import mongoose from 'mongoose';

const crewSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'Crew' },
    title: { type: String, default: 'Payload Specialist' },
    color: { type: String, default: '#00d2ff' },
    status: { type: String, default: 'online' },
    initials: { type: String, default: 'CM' }
  },
  { timestamps: true }
);

export default mongoose.model('Crew', crewSchema);
