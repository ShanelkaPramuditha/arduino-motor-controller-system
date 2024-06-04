function BotStart(bot) {
	bot.start((ctx) => {
		const chatId = ctx.chat.id;
		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: '🟢 On 🟢', callback_data: 'power_on' },
						{ text: '🔴 Off 🔴', callback_data: 'power_off' }
					],
					[
						{ text: '⏫ Speed ⏫', callback_data: 'increase_pwm' },
						{ text: '⏬ Speed ⏬', callback_data: 'decrease_pwm' }
					],
					[
						{ text: '♒︎ 1 ♒︎', callback_data: 'pattern1' },
						{ text: '♒︎ 2 ♒︎', callback_data: 'pattern2' }
					],
					[
						{ text: '♒︎ 3 ♒︎', callback_data: 'pattern3' },
						{ text: '♒︎ 4 ♒︎', callback_data: 'pattern4' },
						{ text: '♒︎ 5 ♒︎', callback_data: 'pattern5' }
					],
					[{ text: '📊 Status 📊', callback_data: 'fetch_status' }]
				]
			}
		};
		ctx.reply('Welcome to Motor Control Bot! Use the buttons below to control the motor.', options).then(
			(sentMessage) => {
				lastBotMessageId = sentMessage.message_id;
			}
		);
	});
}

module.exports = { BotStart };
