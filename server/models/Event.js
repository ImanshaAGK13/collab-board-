import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    type: { type: String, default: 'meeting' }
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
