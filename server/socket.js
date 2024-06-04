const { Server } = require('socket.io');

let io;

function initSocket(server) {
	io = new Server(server, {
		cors: {
			origin: '*'
		}
	});

	io.on('connection', (socket) => {
		console.log('A user connected');

		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
	});

	return io;
}

function getIO() {
	if (!io) {
		throw new Error('Socket.io not initialized!');
	}
	return io;
}

module.exports = { initSocket, getIO };
