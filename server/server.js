const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { setupBot } = require('./telegram-bot/telegramBot');
const { setupRoutes } = require('./web/routes');
const { initSocket } = require('./socket'); // Import the initSocket function

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

// Setup routes
setupRoutes(app);

// Setup Telegram bot
setupBot();

// Start the server
const server = app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

// Initialize Socket.IO
initSocket(server); // Initialize Socket.IO with the server instance
