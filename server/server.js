const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { setupBot } = require('./telegram-bot/telegramBot');
const { setupRoutes } = require('./routes/routes');
const { initSocket } = require('./socket'); // Import the initSocket function

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

// Setup routes
setupRoutes(app);

// Setup Telegram bot
setupBot();

// health check route
app.get('/', (req, res) => {
  res.json({ status: "I'm Working...!", port: port });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialize Socket.IO
initSocket(server); // Initialize Socket.IO with the server instance
