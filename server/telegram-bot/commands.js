const { setSpeed, power, pattern } = require('../controller/controller');

function BotCommands(bot) {
	let lastBotMessageId = null;

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

	bot.action('increase_pwm', async (ctx) => {
		const chatId = ctx.chat.id;
		await setSpeed(
			{ body: { pwmValue: 255 } },
			{
				send: async (message) => await ctx.reply(message),
				status: (code) => {
					return { send: async (message) => await ctx.reply(message) };
				}
			}
		);
	});

	bot.action(/pattern.*/, async (ctx) => {
		const chatId = ctx.chat.id;
		try {
			// Call the pattern function with appropriate error handling
			const response = await pattern(
				{ body: { pattern: ctx.match[0] } },
				{
					send: async (message) => await ctx.reply(message),
					status: (code) => {
						return { send: async (message) => await ctx.reply(message) };
					}
				}
			);

			// Handle successful response from the pattern function
			await ctx.reply(response);
		} catch (error) {
			console.error('Error in pattern function:', error); // Log the error

			// Provide a user-friendly error message to the chat
			await ctx.reply('An unexpected error occurred. Please try again later.');
		}
	});

	bot.action('fetch_status', async (ctx) => {
		const chatId = ctx.chat.id;
		await fetchStatus(
			{ body: {} },
			{
				send: async (message) => await ctx.reply(message),
				status: (code) => {
					return { send: async (message) => await ctx.reply(message) };
				}
			}
		);
	});
}

module.exports = { BotCommands };
