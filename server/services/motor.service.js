/* 
Motor Controller Service
Patterns inside the Arduino Board
USB Connection
*/

import { writeToSerial } from './serial.service.js';
import { POWER_STATUS } from '../constants/constants.js';
import { getIO } from '../middleware/socket.js';

// Function to calculate PWM speed
function calculateSpeed(pwmPercentage) {
  return Math.round((pwmPercentage / 100) * 205 + 50);
}

// Set motor speed
async function setMotorSpeed(pwmValue) {
  const calculatedSpeed = calculateSpeed(pwmValue);
  if (calculatedSpeed >= 50 && calculatedSpeed <= 255) {
    try {
      await writeToSerial(`PWM:${calculatedSpeed}`);
      return `✅ PWM speed successfully set to ${pwmValue}% 🏎️`;
    } catch (err) {
      throw new Error(`❌ Failed to set motor speed: ${err.message} ⚠️`);
    }
  } else {
    throw new Error('❌ Invalid PWM value, must be between 50 and 255 ⚠️');
  }
}

// Set motor power state
async function setMotorPower(state) {
  if (state === POWER_STATUS.ON || state === POWER_STATUS.OFF) {
    try {
      await writeToSerial(state.toUpperCase());
      getIO().emit('status', state);
      return `✅ Motor successfully turned ${state === POWER_STATUS.ON ? 'ON 🟢' : 'OFF 🔴'}`;
    } catch (err) {
      throw new Error(`❌ Failed to change motor power state: ${err.message} ⚠️`);
    }
  } else {
    throw new Error('❌ Invalid power state, must be ON or OFF ⚠️');
  }
}

// Set motor pattern
async function setMotorPattern(pattern) {
  if (pattern >= 0 && pattern <= 10) {
    try {
      await writeToSerial(`PATTERN${pattern}`);
      return `✅ Pattern ${pattern} successfully set 🎨`;
    } catch (err) {
      throw new Error(`❌ Failed to set motor pattern: ${err.message} ⚠️`);
    }
  } else {
    throw new Error('❌ Invalid pattern value, must be between 0 and 10 ⚠️');
  }
}

export { setMotorSpeed, setMotorPower, setMotorPattern };
