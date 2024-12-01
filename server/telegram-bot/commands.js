import { setSpeed, power, pattern } from '../controller/motor.controller.js';
import { showInlineKeyboard } from './inline-menu.js';

function BotCommands(bot) {
  bot.action('power_on', async (ctx) => {
    await power(
      { body: { state: 'ON' } },
      {
        send: async (message) => await ctx.reply(message),
        status: (code) => {
          return { send: async (message) => await ctx.reply(message) };
        }
      }
    );
    await showInlineKeyboard(ctx);
  });

  bot.action('power_off', async (ctx) => {
    const chatId = ctx.chat.id;
    await power(
      { body: { state: 'OFF' } },
      {
        send: async (message) => await ctx.reply(message),
        status: (code) => {
          return { send: async (message) => await ctx.reply(message) };
        }
      }
    );
    await showInlineKeyboard(ctx);
  });

  // Change speed with integer values
  bot.action(/PWM:\d+/, async (ctx) => {
    const chatId = ctx.chat.id;
    const pwmValue = parseInt(ctx.match[0].split(':')[1]);
    try {
      await setSpeed(
        { body: { pwmValue } },
        {
          send: async (message) => await ctx.reply(message),
          status: (code) => {
            return { send: async (message) => await ctx.reply(message) };
          }
        }
      );
      await showInlineKeyboard(ctx);
    } catch (error) {
      console.error('Error in setSpeed function:', error); // Log the error

      // Provide a user-friendly error message to the chat
      await ctx.reply('An unexpected error occurred. Please try again later.');
      await showInlineKeyboard(ctx);
    }
  });

  bot.action(/pattern.*/, async (ctx) => {
    const patternNumber = parseInt(ctx.match[0].split('pattern')[1]);
    try {
      // Call the pattern function with appropriate error handling
      await pattern(
        { body: { pattern: patternNumber } },
        {
          send: async (message) => await ctx.reply(message),
          status: (code) => {
            return { send: async (message) => await ctx.reply(message) };
          }
        }
      );
      await showInlineKeyboard(ctx);
    } catch (error) {
      console.error('Error in pattern function:', error); // Log the error

      // Provide a user-friendly error message to the chat
      await ctx.reply('An unexpected error occurred. Please try again later.');
      await showInlineKeyboard(ctx);
    }
  });
}

export { BotCommands };
