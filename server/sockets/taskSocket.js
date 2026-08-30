export function registerTaskSockets(io) {
  io.on('connection', (socket) => {
    console.log(`⚡ Real-Time WebSockets Client Connected: ${socket.id}`);

    socket.on('task:create', (task) => {
      socket.broadcast.emit('task:created', task);
    });

    socket.on('task:update', (task) => {
      socket.broadcast.emit('task:updated', task);
    });

    socket.on('task:move', (payload) => {
      socket.broadcast.emit('task:moved', payload);
    });

    socket.on('task:delete', (taskId) => {
      socket.broadcast.emit('task:deleted', taskId);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 Client Disconnected: ${socket.id}`);
    });
  });
}
