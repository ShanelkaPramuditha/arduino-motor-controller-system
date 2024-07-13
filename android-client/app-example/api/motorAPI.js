import axios from 'axios';

const SERVER_URL = 'https://25gc8dtj-3001.asse.devtunnels.ms'; // Replace with your backend URL

// Motor Power On/Off API
export const powerStatus = async (state) => {
	try {
		const response = await axios.post(`${SERVER_URL}/power`, { state });
		return response.data;
	} catch (error) {
		throw new Error('Error toggling power:', error);
	}
};

// Motor Speed API
export const setSpeedAPI = async (pwmValue) => {
	try {
		const response = await axios.post(`${SERVER_URL}/set-speed`, { pwmValue });
		return response.data;
	} catch (error) {
		throw new Error('Error setting speed:', error);
	}
};

// Motor Pattern API
export const sendPatternAPI = async (pattern) => {
	try {
		const response = await axios.post(`${SERVER_URL}/pattern`, { pattern });
		return response.data;
	} catch (error) {
		throw new Error('Error sending pattern:', error);
	}
};

export default { powerStatus, setSpeedAPI, sendPatternAPI };
