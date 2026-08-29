import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Captain', 'Co-Captain', 'Crew'], default: 'Crew' },
    title: { type: String, default: 'Payload Specialist' },
    color: { type: String, default: '#00d2ff' },
    avatar: { type: String, default: 'avatar1' },
    resetToken: { type: String, default: null },
    resetTokenExpire: { type: Date, default: null }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
