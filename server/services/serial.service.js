import { SerialPort, ReadlineParser } from 'serialport';
import { getIO } from '../middleware/socket.js';

// Initialize and handle serial port connection
const arduinoPort = new SerialPort({
  path: process.env.SERIAL_PORT,
  baudRate: parseInt(process.env.SERIAL_BAUDRATE, 10)
})
  .on('open', () => {
    console.log(`🚀 Serial port opened at baudrate: ${arduinoPort.baudRate}`);
  })
  .on('error', (err) => {
    console.error('⚠️ Error opening serial port:', err.message);
  });

const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Function to handle writing data to the serial port
function writeToSerial(data) {
  return new Promise((resolve, reject) => {
    arduinoPort.write(`${data}\n`, (err) => {
      if (err) {
        console.error('❌ Error writing to Arduino:', err.message);
        return reject(err);
      }
      resolve(`✅ Successfully wrote to Arduino: ${data}`);
    });
  });
}

// Listen for data from Arduino and emit through WebSocket
parser.on('data', (data) => {
  const message = data.trim();
  console.log(`📩 Received from Arduino: ${message}`);

  try {
    if (message.startsWith('COMMAND:')) {
      const lastCommand = message.substring(8);
      getIO().emit('lastCommand', lastCommand);

      if (lastCommand === 'ON' || lastCommand === 'OFF') {
        getIO().emit('status', lastCommand);
        console.log(`💡 Status updated: ${lastCommand}`);
      } else if (lastCommand.startsWith('PWM:')) {
        const pwmValue = parseInt(lastCommand.substring(4), 10);
        const speed = ((pwmValue - 50) / 205) * 100;
        getIO().emit('speed', speed);
        console.log(`⚙️ Speed updated: ${Math.round(speed)}%`);
      } else if (lastCommand.startsWith('PATTERN')) {
        getIO().emit('pattern', lastCommand);
        getIO().emit('status', 'ON');
        console.log(`🎨 Pattern changed: ${lastCommand}`);
      } else {
        console.warn(`❓ Unknown command received: ${lastCommand}`);
      }
    }
  } catch (error) {
    console.error('🚨 Error processing Arduino command:', error.message);
  }
});

export { writeToSerial };
