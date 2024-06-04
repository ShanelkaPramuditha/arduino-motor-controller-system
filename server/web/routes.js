// routes.js
const { setSpeed, power, pattern } = require('../controller/controller');

function setupRoutes(app) {
	app.post('/set-speed', setSpeed);
	app.post('/power', power);
	app.post('/pattern', pattern);
}

module.exports = { setupRoutes };
