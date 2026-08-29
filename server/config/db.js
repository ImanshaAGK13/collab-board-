import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/collabboard', {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`⚠️ MongoDB Warning: ${err.message}. Server operating with in-memory data store.`);
    return false;
  }
}
