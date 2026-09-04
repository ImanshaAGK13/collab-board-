import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import crewRoutes from './routes/crewRoutes.js';
import telemetryRoutes from './routes/telemetryRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';
import documentRoutes from './routes/documentRoutes.js';

import { registerTaskSockets } from './sockets/taskSocket.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Standalone In-Memory Storage Mode Active (No Database Required)

// API Routes for all 8 team modules
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/crew', crewRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/events', calendarRoutes);
app.use('/api/documents', documentRoutes);

// Base Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    message: 'CollabBoard Express Backend REST API & Socket Server Operational',
    timestamp: new Date().toISOString()
  });
});

// Register Socket.io Real-Time Event Handlers
registerTaskSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 CollabBoard Backend Server running on http://localhost:${PORT}`);
  console.log(`⚡ Socket.io Real-Time WebSockets Server Active on Port ${PORT}`);
});
