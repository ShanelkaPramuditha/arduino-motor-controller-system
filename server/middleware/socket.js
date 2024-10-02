import { Server } from 'socket.io';

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 A user connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('❗️ Socket.io has not been initialized yet!');
  }
  return io;
}

export { initSocket, getIO };
