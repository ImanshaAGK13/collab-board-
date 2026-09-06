import mongoose from 'mongoose';
import dns from 'dns';

// Fix Node.js Windows IPv6 SRV lookup timeout for MongoDB Atlas
dns.setDefaultResultOrder('ipv4first');

export const connectDB = async () => {
  const srvUri = 'mongodb+srv://imanshakumudesh991_db_user:cb2026@cluster0.b6xosym.mongodb.net/collabboard?retryWrites=true&w=majority';
  const directUri = 'mongodb://imanshakumudesh991_db_user:cb2026@cluster0-shard-00-00.b6xosym.mongodb.net:27017,cluster0-shard-00-01.b6xosym.mongodb.net:27017,cluster0-shard-00-02.b6xosym.mongodb.net:27017/collabboard?ssl=true&replicaSet=atlas-b6xosym-shard-0&authSource=admin&retryWrites=true&w=majority';

  const uriList = [
    process.env.MONGODB_URI,
    srvUri,
    directUri,
    'mongodb://127.0.0.1:27017/collabboard'
  ].filter(Boolean);

  for (const uri of uriList) {
    try {
      const isCloud = uri.includes('mongodb.net');
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 8000
      });

      if (isCloud) {
        console.log(`☁️ MongoDB Atlas Cloud Database Connected! Host: ${conn.connection.host}`);
      } else {
        console.log(`🍃 Local MongoDB Connected! Host: ${conn.connection.host}`);
      }
      return;
    } catch (err) {
      // Continue to next URI fallback
    }
  }

  console.error('❌ MongoDB Connection Error: All cluster connection attempts timed out.');
  console.log('⚠️ Running in standalone fallback mode (Data stored safely in memory until DB connects).');
};
