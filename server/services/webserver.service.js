import { POWER_STATUS, PWM_CONFIG, SERVER_CONFIG } from '../constants/constants.js';
import { getIO } from '../middleware/socket.js';

const esp32_ip = SERVER_CONFIG.ESP32_IP;
let currentPattern = null;
let motorOn = false;
let minSpeed = 10;
let maxSpeed = 10;
let minPwm = PWM_CONFIG.MIN_PWM;
let maxPwm = PWM_CONFIG.MAX_PWM;

const webserverService = {
  // Power ON/OFF the motor
  power: async (state) => {
    const url = `${esp32_ip}/motor/${state.toLowerCase()}?value=${
      state === POWER_STATUS.ON ? minSpeed : 0
    }`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        getIO().emit('status', state.toUpperCase());

        if (state === POWER_STATUS.OFF) {
          motorOn = false;
          getIO().emit('pattern', null);
        } else {
          motorOn = true;
          webserverService.setSpeed(minSpeed);
          webserverService.setPattern(0);
        }
      } else {
        console.error(`Error turning motor ${state}`);
      }
    } catch (error) {
      console.error('Error turning motor:', error);
    }
  },

  // Set the maximum speed of the motor
  setMaxSpeed: async (speedPercentage) => {
    maxSpeed = speedPercentage;

    if (currentPattern === 0 && motorOn) {
      await webserverService.setSpeed(maxSpeed); // Apply the new speed
    }
  },

  // Set the speed of the motor (PWM value)
  setSpeed: async (speedPercentage) => {
    const calculatedSpeed = calculateSpeed(speedPercentage);
    const url = `${esp32_ip}/motor/pwm?value=${calculatedSpeed}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        getIO().emit('speed', speedPercentage);
        // console.log(`Speed set to ${speedPercentage}% (PWM: ${calculatedSpeed})`);
      } else {
        console.error(`Error setting speed ${speedPercentage}%`);
      }
    } catch (error) {
      console.error('Error setting speed:', error);
    }
  },

  setPattern: async (pattern) => {
    if (pattern === currentPattern) {
      return;
    }

    currentPattern = pattern;

    // Start the new pattern
    console.log(`Setting pattern to ${currentPattern}`);
    getIO().emit('speed', maxSpeed);

    if (pattern === 0) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 0) {
        await webserverService.pattern0(maxSpeed);
      }
    }

    if (pattern === 1) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 1) {
        await webserverService.pattern1(maxSpeed);
      }
    }

    if (pattern === 2) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 2) {
        await webserverService.pattern2(maxSpeed);
      }
    }

    if (pattern === 3) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 3) {
        await webserverService.pattern3(maxSpeed);
      }
    }

    if (pattern === 4) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 4) {
        await webserverService.pattern4(maxSpeed);
      }
    }

    if (pattern === 5) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 5) {
        await webserverService.pattern5(maxSpeed);
      }
    }

    if (pattern === 6) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 6) {
        await webserverService.pattern6(maxSpeed);
      }
    }

    if (pattern === 7) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 7) {
        await webserverService.pattern7(maxSpeed);
      }
    }

    if (pattern === 8) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 8) {
        await webserverService.pattern8(maxSpeed);
      }
    }

    if (pattern === 9) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 9) {
        await webserverService.pattern9(maxSpeed);
      }
    }

    if (pattern === 10) {
      getIO().emit('pattern', `PATTERN${currentPattern}`);
      while (motorOn && currentPattern === 10) {
        await webserverService.pattern10(maxSpeed);
      }
    }
  },

  // Always ON pattern
  pattern0: async (speed) => {
    await webserverService.setSpeed(speed);
  },

  // Pattern 1: Blink
  pattern1: async (speed) => {
    await webserverService.setSpeed(0); // Motor off
    await delay(100); // Wait for 100ms
    await webserverService.setSpeed(speed); // Motor on
    await delay(200); // Wait for 200ms
  },

  // Pattern 2: Increase and decrease speed
  pattern2: async (speed) => {
    // Increase speed
    for (let i = 0; i <= speed; i += 5) {
      await webserverService.setSpeed(i);
      await delay(100); // Delay between speed increases
    }

    // Decrease speed
    for (let i = speed; i >= 0; i -= 5) {
      await webserverService.setSpeed(i);
      await delay(100); // Delay between speed decreases
    }
  },

  // Pattern 3: Fast increase and decrease
  pattern3: async (speed) => {
    for (let i = speed; i >= 0; i -= 10) {
      await webserverService.setSpeed(i);
      await delay(10); // Fast speed decrease
    }
    for (let i = 0; i <= speed; i += 10) {
      await webserverService.setSpeed(i);
      await delay(10); // Fast speed increase
    }
  },

  // Pattern 4: Wave
  pattern4: async (speed) => {
    const lowSpeed = Math.floor(speed * 0.3); // 30% of max speed as the low value
    const highSpeed = Math.floor(speed * 0.9); // 90% of max speed as the high value

    // Gradually increase to high speed
    for (let i = lowSpeed; i <= highSpeed; i += 1) {
      await webserverService.setSpeed(i);
      await delay(20); // Slower ramp-up for wave effect
    }

    // Sharply drop to low speed
    await webserverService.setSpeed(lowSpeed);
    await delay(200); // Pause briefly at low speed before the next wave
  },

  // Pattern 5: Pulse and Hold
  pattern5: async (speed) => {
    const pulseDuration = 100; // Duration for each pulse
    const holdDuration = 2000; // Hold at max speed for 2 seconds
    const pulseSteps = 5; // Number of pulses before holding max speed

    // Pulsing effect
    for (let i = 0; i < pulseSteps; i++) {
      await webserverService.setSpeed(0); // Motor off
      await delay(pulseDuration);
      await webserverService.setSpeed(speed); // Motor on at full speed
      await delay(pulseDuration);
    }

    // Hold at max speed
    await webserverService.setSpeed(speed);
    await delay(holdDuration);

    // Gradually slow down
    for (let i = speed; i >= 0; i -= 5) {
      await webserverService.setSpeed(i);
      await delay(50); // Smooth slow down
    }
  },

  // Pattern 6: Pulse Burst
  pattern6: async (speed) => {
    for (let i = 0; i < 5; i++) {
      await webserverService.setSpeed(speed);
      await delay(100); // Short burst
      await webserverService.setSpeed(0);
      await delay(50); // Quick stop
    }
    await delay(500); // Longer pause before repeating
  },

  // Pattern 7: Slow Pulses
  pattern7: async (speed) => {
    for (let i = 0; i < 5; i++) {
      await webserverService.setSpeed(speed);
      await delay(500); // Longer pulse
      await webserverService.setSpeed(0);
      await delay(300); // Pause between pulses
    }
  },

  // Pattern 8: Quick Ramps
  pattern8: async (speed) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j <= speed; j += 5) {
        await webserverService.setSpeed(j);
        await delay(20); // Fast ramp-up
      }
      for (let j = speed; j >= 0; j -= 5) {
        await webserverService.setSpeed(j);
        await delay(20); // Fast ramp-down
      }
    }
  },

  // Pattern 9: High-Low Alternation
  pattern9: async (speed) => {
    const lowSpeed = Math.floor(speed * 0.2);
    const highSpeed = Math.floor(speed * 1.0);
    for (let i = 0; i < 5; i++) {
      await webserverService.setSpeed(lowSpeed);
      await delay(300);
      await webserverService.setSpeed(highSpeed);
      await delay(300);
    }
  },

  // Random pattern
  pattern10: async (speed) => {
    for (let i = 0; i < 10; i++) {
      const randomSpeed = Math.floor(Math.random() * speed);
      await webserverService.setSpeed(randomSpeed);
      await delay(200);
    }
  }
};

// function to create a delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Convert speed percentage to PWM value (minPwm to maxPwm)
function calculateSpeed(speedPercentage) {
  return Math.floor((speedPercentage / 100) * (maxPwm - minPwm) + minPwm);
}

export default webserverService;
