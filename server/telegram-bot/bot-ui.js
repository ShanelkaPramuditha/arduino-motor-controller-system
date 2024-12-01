import { showInlineKeyboard } from './inline-menu.js';

function BotStart(bot) {
  bot.start(async (ctx) => {
    await showInlineKeyboard(ctx);
  });
}

export { BotStart };
