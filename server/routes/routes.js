import { setSpeed, power, setPattern } from '../controller/controller.js';

function setupRoutes(app) {
  app.post('/set-speed', setSpeed);
  app.post('/power', power);
  app.post('/pattern', setPattern);
}

export { setupRoutes };
