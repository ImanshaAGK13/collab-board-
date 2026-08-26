import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useRealtimeSocket(onTaskEvent) {
  const socketRef = useRef(null);

  useEffect(() => {
    // Connect to backend Socket.io server
    const socket = io('http://localhost:5000', {
      autoConnect: true,
      reconnectionAttempts: 3,
      transports: ['websocket', 'polling']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('⚡ Connected to Station Real-Time Socket Server');
    });

    socket.on('task:created', (task) => {
      if (onTaskEvent) onTaskEvent({ type: 'created', task });
    });

    socket.on('task:updated', (task) => {
      if (onTaskEvent) onTaskEvent({ type: 'updated', task });
    });

    socket.on('task:moved', (payload) => {
      if (onTaskEvent) onTaskEvent({ type: 'moved', payload });
    });

    socket.on('task:deleted', (taskId) => {
      if (onTaskEvent) onTaskEvent({ type: 'deleted', taskId });
    });

    return () => {
      socket.disconnect();
    };
  }, [onTaskEvent]);

  const emitTaskCreated = (task) => {
    if (socketRef.current?.connected) socketRef.current.emit('task:create', task);
  };

  const emitTaskUpdated = (task) => {
    if (socketRef.current?.connected) socketRef.current.emit('task:update', task);
  };

  const emitTaskMoved = (taskId, newStatus) => {
    if (socketRef.current?.connected) socketRef.current.emit('task:move', { taskId, newStatus });
  };

  const emitTaskDeleted = (taskId) => {
    if (socketRef.current?.connected) socketRef.current.emit('task:delete', taskId);
  };

  return {
    emitTaskCreated,
    emitTaskUpdated,
    emitTaskMoved,
    emitTaskDeleted
  };
}
