import { setSpeed, power, pattern } from '../controller/motor.controller.js';

function setupRoutes(app) {
  app.post('/set-speed', setSpeed);
  app.post('/power', power);
  app.post('/pattern', pattern);
}

export { setupRoutes };
