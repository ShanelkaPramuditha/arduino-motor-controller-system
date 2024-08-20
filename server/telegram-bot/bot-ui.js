function BotStart(bot) {
	bot.start((ctx) => {
		const chatId = ctx.chat.id;
		const options = {
			reply_markup: {
				inline_keyboard: [
					[
						{ text: '10%', callback_data: 'PWM:10' },
						{ text: '20%', callback_data: 'PWM:20' },
						{ text: '30%', callback_data: 'PWM:30' },
						{ text: '40%', callback_data: 'PWM:40' },
						{ text: '50%', callback_data: 'PWM:50' }
					],
					[
						{ text: '60%', callback_data: 'PWM:60' },
						{ text: '70%', callback_data: 'PWM:70' },
						{ text: '80%', callback_data: 'PWM:80' },
						{ text: '90%', callback_data: 'PWM:90' },
						{ text: '100%', callback_data: 'PWM:100' }
					],
					[
						{ text: '🟢 On 🟢', callback_data: 'power_on' },
						{ text: '🔴 Off 🔴', callback_data: 'power_off' }
					],
					[
						{ text: 'Pattern 1', callback_data: 'pattern1' },
						{ text: 'Pattern 2', callback_data: 'pattern2' }
					],
					[
						{ text: 'Pattern 3', callback_data: 'pattern3' },
						{ text: 'Pattern 4 ', callback_data: 'pattern4' }
					],
					[{ text: 'Pattern 5', callback_data: 'pattern5' }]
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
