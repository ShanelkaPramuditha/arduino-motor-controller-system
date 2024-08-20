const { SerialPort, ReadlineParser } = require('serialport');
require('dotenv').config();
const { getIO } = require('../socket'); // Import the getIO function

// Function to handle errors during serial port initialization
function handlePortError(err) {
	console.error('Error opening serial port:', err.message);
}

const arduinoPort = new SerialPort({
	path: process.env.SERIAL_PORT,
	baudRate: parseInt(process.env.SERIAL_BAUDRATE, 10)
})
	.on('open', () => {
		console.log(`Serial port opened with baudrate ${arduinoPort.baudRate}`);
	})
	.on('error', handlePortError);

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

let lastCommand = 'OFF';

// Update lastCommand when data is received from Arduino
parser.on('data', (data) => {
	const message = data.trim();
	if (message.startsWith('COMMAND:')) {
		lastCommand = message.substring(8);
		console.log(`Received from Arduino: ${lastCommand}`);
	}

	try {
		if (lastCommand === 'ON' || lastCommand === 'OFF') {
			getIO().emit('status', lastCommand);
		} else if (lastCommand.startsWith('PWM:')) {
			getIO().emit('speed', ((parseInt(lastCommand.substring(4), 10) - 50) / 205) * 100);
		} else if (lastCommand.startsWith('PATTERN')) {
			getIO().emit('pattern', lastCommand);
			getIO().emit('status', 'ON');
		} else {
			console.warn(`Unknown command received from Arduino: ${lastCommand}`);
		}
	} catch (error) {
		console.error('Error processing Arduino command:', error.message);
	}

	getIO().emit('lastCommand', lastCommand); // Emit the command to all connected clients
});

// Pass status, speed and pattern data to the client
function getLastCommand(req, res) {
	res.send(lastCommand);
}
// Function to calculate the speed based on the PWM value
function calculateSpeed(pwmPercentage) {
	return Math.round((pwmPercentage / 100) * 205 + 50);
}

function setSpeed(req, res) {
	const { pwmValue } = req.body;
	console.log(`Received PWM value: ${pwmValue}`);
	const calculatedSpeed = calculateSpeed(pwmValue);
	console.log(`Setting PWM value to ${calculatedSpeed}`);
	if (calculatedSpeed >= 50 && calculatedSpeed <= 255) {
		try {
			arduinoPort.write(`PWM:${calculatedSpeed}\n`, (err) => {
				if (err) {
					console.error('Error writing PWM value to Arduino:', err.message);
					return res.status(500).send('Error writing to Arduino');
				}
				res.send(`PWM Value set to ${calculatedSpeed} = ${pwmValue}%`);
			});
		} catch (error) {
			console.error('Error writing PWM value to Arduino:', error.message);
			return res.status(500).send('Error writing to Arduino');
		}
	} else {
		res.status(400).send('Invalid PWM value');
	}
}

function power(req, res) {
	const { state } = req.body;
	if (state === 'on' || state === 'off') {
		try {
			arduinoPort.write(`${state.toUpperCase()}\n`, (err) => {
				if (err) {
					console.error('Error writing power state to Arduino:', err.message);
					return res.status(500).send('Error writing to Arduino');
				}
				res.send(`Motor turned ${state}`);
			});
		} catch (error) {
			console.error('Error writing power state to Arduino:', error.message);
			return res.status(500).send('Error writing to Arduino');
		}
	} else {
		res.status(400).send('Invalid power state');
	}
}

function pattern(req, res) {
	const { pattern } = req.body;
	if (pattern.startsWith('pattern')) {
		try {
			arduinoPort.write(`${pattern.toUpperCase()}\n`, (err) => {
				if (err) {
					console.error('Error writing pattern to Arduino:', err.message);
					return res.status(500).send('Error writing to Arduino');
				}
				res.send(`Pattern set to ${pattern}`);
			});
		} catch (error) {
			console.error('Error writing pattern to Arduino:', error.message);
			return res.status(500).send('Error writing to Arduino');
		}
	} else {
		res.status(400).send('Invalid pattern name');
	}
}

module.exports = { setSpeed, power, pattern };
