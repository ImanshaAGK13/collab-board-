import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    callsign: { type: String, default: 'Commander Nova' },
    operationalTitle: { type: String, default: 'Mission Commander' },
    hudAccentColor: { type: String, default: '#ffbf00' },
    themeMode: { type: String, default: 'dark' },
    notificationsEnabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Settings', settingsSchema);
