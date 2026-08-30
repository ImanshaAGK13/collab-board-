import mongoose from 'mongoose';

const crewSchema = new mongoose.Schema(
  {
    crewId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['Captain', 'Co-Captain', 'Crew'], default: 'Crew' },
    title: { type: String, default: 'Payload Specialist' },
    color: { type: String, default: '#00d2ff' },
    status: { type: String, default: 'online' },
    initials: { type: String, default: 'CM' }
  },
  { timestamps: true }
);

export const Crew = mongoose.model('Crew', crewSchema);
