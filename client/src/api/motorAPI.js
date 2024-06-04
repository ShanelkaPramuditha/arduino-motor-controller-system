import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Motor Power On/Off API
export const powerStatus = async (state) => {
	try {
		await axios.post(`${BACKEND_URL}/power`, { state });
	} catch (error) {
		console.error('Error toggling power:', error);
	}
};

// Motor Speed API
export const setSpeedAPI = async (pwmValue) => {
	try {
		await axios.post(`${BACKEND_URL}/set-speed`, { pwmValue });
	} catch (error) {
		console.error('Error setting speed:', error);
	}
};

// Motor Pattern API
export const sendPatternAPI = async (pattern) => {
	try {
		await axios.post(`${BACKEND_URL}/pattern`, { pattern });
	} catch (error) {
		console.error('Error sending pattern:', error);
	}
};
