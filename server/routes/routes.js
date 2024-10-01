import { setMaxSpeed, power, setPattern } from '../controller/controller.js';

function setupRoutes(app) {
  app.post('/set-speed', setMaxSpeed);
  app.post('/power', power);
  app.post('/pattern', setPattern);
}

export { setupRoutes };
