import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { setupBot } from './telegram-bot/telegramBot.js'; // Import the setupBot function
import { setupRoutes } from './routes/routes.js'; // Import the setupRoutes function
import { initSocket } from './middleware/socket.js'; // Import the initSocket function
import { SERVER_CONFIG } from './constants/constants.js';

const app = express();
const port = SERVER_CONFIG.PORT;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST']
  })
);
app.use(bodyParser.json());

// Setup routes
setupRoutes(app);

// Setup Telegram bot
setupBot();

const moduleStatus = async (req, res) => {
  const url = `${SERVER_CONFIG.ESP32_IP}`;
  console.log('🔍 Checking ESP32 connection...');
  try {
    const response = await fetch(url);
    const data = await response.text();
    if (data) {
      console.log('✅ ESP32 is connected');
    }
  } catch (error) {
    console.error(`❌ Please check ESP32 connection`);
  }
};

// Start the server
const server = app.listen(port, () => {
  try {
    console.log(`🚀 Server running on port ${port}`);
    moduleStatus().then(() => {
      initSocket(server);
    });
  } catch (error) {
    console.error('⚠️ Error starting server:', error.message);
  }
});
