import webserverService from '../services/webserver.service.js';

const power = async (req, res) => {
  const { state } = req.body;
  try {
    await webserverService.power(state);

    res.send({
      status: state,
      message: `Motor turned ${state}`
    });
  } catch (error) {
    console.error('Error turning motor:', error.message);
    return res.status(500).send('Error turning motor');
  }
};

function setMaxSpeed(req, res) {
  const { pwmValue } = req.body;
  console.log(`Setting PWM value to ${pwmValue}%`);
  try {
    webserverService.setMaxSpeed(pwmValue);
    res.send(`PWM Value set to ${pwmValue}%`);
  } catch (error) {
    console.error('Error setting PWM value:', error.message);
    return res.status(500).send('Error setting PWM value');
  }
}

function setPattern(req, res) {
  const { pattern } = req.body;
  try {
    webserverService.setPattern(pattern);
    res.send(`Pattern set to ${pattern}`);
  } catch (error) {
    console.error('Error setting pattern:', error.message);
    return res.status(500).send('Error setting pattern');
  }
}

export { setMaxSpeed, power, setPattern };
