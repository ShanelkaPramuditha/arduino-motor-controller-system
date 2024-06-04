const { Telegraf } = require('telegraf');
require('dotenv').config();
const { BotStart } = require('./bot-ui');
const { BotCommands } = require('./commands');

// Token from env file
const TELEGRAM_TOKEN = process.env.TG_BOT_TOKEN;
const bot = new Telegraf(TELEGRAM_TOKEN);

function setupBot() {
	// Bot Start function
	BotStart(bot);

	// Bot Commands function
	BotCommands(bot);

	// Launch the bot
	bot.launch();
}

module.exports = { setupBot };
