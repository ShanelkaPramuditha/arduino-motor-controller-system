import { setMotorSpeed, setMotorPower, setMotorPattern } from '../services/motor.service.js';

// Controller to set motor speed
function setSpeed(req, res) {
  const { pwmValue } = req.body;
  console.log(`⚙️ Received PWM value: ${pwmValue}`);

  setMotorSpeed(pwmValue)
    .then((message) => {
      console.log(`✅ Motor speed set successfully to: ${pwmValue}`);
      res.send(message);
    })
    .catch((err) => {
      console.error('❌ Error setting motor speed:', err.message);
      res.status(500).send(err.message);
    });
}

// Controller to set motor power state (ON/OFF)
function power(req, res) {
  const { state } = req.body;
  console.log(`🔌 Received power state: ${state}`);

  setMotorPower(state)
    .then((message) => {
      console.log(`✅ Motor power state set to: ${state}`);
      res.send(message);
    })
    .catch((err) => {
      console.error('❌ Error setting motor power state:', err.message);
      res.status(500).send(err.message);
    });
}

// Controller to set motor pattern
function pattern(req, res) {
  const { pattern } = req.body;
  console.log(`🎨 Received pattern: ${pattern}`);

  setMotorPattern(pattern)
    .then((message) => {
      console.log(`✅ Motor pattern set successfully to: ${pattern}`);
      res.send(message);
    })
    .catch((err) => {
      console.error('❌ Error setting motor pattern:', err.message);
      res.status(500).send(err.message);
    });
}

export { setSpeed, power, pattern };
