import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { BotStart } from './bot-ui.js';
import { BotCommands } from './commands.js';

dotenv.config();

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

export { setupBot };
