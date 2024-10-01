import { setMaxSpeed, power, setPattern } from '../controller/controller.js';

function BotCommands(bot) {
  bot.action('power_on', async (ctx) => {
    const chatId = ctx.chat.id;
    await power(
      { body: { state: 'on' } },
      {
        send: async (message) => await ctx.reply(message),
        status: (code) => {
          return { send: async (message) => await ctx.reply(message) };
        }
      }
    );
  });

  bot.action('power_off', async (ctx) => {
    const chatId = ctx.chat.id;
    await power(
      { body: { state: 'off' } },
      {
        send: async (message) => await ctx.reply(message),
        status: (code) => {
          return { send: async (message) => await ctx.reply(message) };
        }
      }
    );
  });

  // Change speed with integer values
  bot.action(/PWM:\d+/, async (ctx) => {
    const chatId = ctx.chat.id;
    const pwmValue = parseInt(ctx.match[0].split(':')[1]);
    try {
      await setMaxSpeed(
        { body: { pwmValue } },
        {
          send: async (message) => await ctx.reply(message),
          status: (code) => {
            return { send: async (message) => await ctx.reply(message) };
          }
        }
      );
    } catch (error) {
      console.error('Error in setSpeed function:', error); // Log the error

      // Provide a user-friendly error message to the chat
      await ctx.reply('An unexpected error occurred. Please try again later.');
    }
  });

  bot.action(/pattern.*/, async (ctx) => {
    const chatId = ctx.chat.id;
    try {
      // Call the pattern function with appropriate error handling
      await setPattern(
        { body: { pattern: ctx.match[0] } },
        {
          send: async (message) => await ctx.reply(message),
          status: (code) => {
            return { send: async (message) => await ctx.reply(message) };
          }
        }
      );
    } catch (error) {
      console.error('Error in pattern function:', error); // Log the error

      // Provide a user-friendly error message to the chat
      await ctx.reply('An unexpected error occurred. Please try again later.');
    }
  });
}

export { BotCommands };
