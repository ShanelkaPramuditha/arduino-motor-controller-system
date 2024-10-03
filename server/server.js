import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setupBot } from './telegram-bot/telegramBot.js';
import { setupRoutes } from './routes/routes.js';
import { initSocket } from './middleware/socket.js';
import { SERVER_CONFIG } from './constants/constants.js';

const app = express();
const port = SERVER_CONFIG.PORT;

app.use(cors());
app.use(bodyParser.json());

// Setup routes
setupRoutes(app);

// Setup Telegram bot
setupBot();

// Health check route
app.get('/', (req, res) => {
  res.json({ status: "🚀 I'm Working...!", port: port });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`✅ Server is running on port ${port} 🎉`);
});

// Initialize Socket.IO
initSocket(server); // Initialize Socket.IO with the server instance
console.log('🌐 Socket.IO initialized and ready for connections!');
