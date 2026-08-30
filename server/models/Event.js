import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, default: '14:00 UTC' },
    type: { type: String, enum: ['meeting', 'spacewalk', 'docking', 'maintenance'], default: 'meeting' }
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
