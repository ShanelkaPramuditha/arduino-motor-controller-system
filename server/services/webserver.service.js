import { SERVER_CONFIG } from '../constants/constants.js';
import { getIO } from '../middleware/socket.js';

const esp32_ip = SERVER_CONFIG.ESP32_IP;

// Function to calculate the speed based on the PWM value
function calculateSpeed(pwmPercentage) {
  return Math.round((pwmPercentage / 100) * 205 + 50);
}

const webserverService = {
  power: async (state) => {
    // Motor ON/OFF
    const url = `${esp32_ip}/motor/${state}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          getIO().emit('status', state.toUpperCase());

          if (state === 'off') {
            getIO().emit('speed', 10);
            getIO().emit('pattern', 'PATTERN0');
          }
          console.log(`Motor turned ${state}`);
        } else {
          console.error(`Error turning motor ${state}`);
        }
      })
      .catch((error) => {
        console.error('Error turning motor:', error);
      });
  },

  setSpeed: async (pwmValue) => {
    console.log(`Received PWM value: ${pwmValue}`);
    const calculatedSpeed = calculateSpeed(pwmValue);
    console.log(`Setting PWM value to ${calculatedSpeed}`);
    const url = `${esp32_ip}/motor/pwm?value=${calculatedSpeed}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          getIO().emit('speed', pwmValue);
          console.log(`PWM Value set to ${pwmValue}%`);
        } else {
          console.error(`Error setting PWM value ${pwmValue}`);
        }
      })
      .catch((error) => {
        console.error('Error setting PWM value:', error);
        console.log(error);
      });
  },

  setPattern: async (pattern) => {
    // Set pattern
    const url = `${esp32_ip}/motor/pattern?pattern=${pattern}`;
    console.log(`Setting pattern to ${pattern}`);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          getIO().emit('pattern', 'PATTERN' + pattern);
          console.log(`Pattern set to ${pattern}`);
        } else {
          console.error(`Error setting pattern ${pattern}`);
        }
      })
      .catch((error) => {
        console.error('Error setting pattern:', error);
        console.log(error);
      });
  }
};

export default webserverService;
