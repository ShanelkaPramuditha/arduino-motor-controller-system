import { useEffect } from 'react';
import { io } from 'socket.io-client';
import useMotorStore from './motor-store'; // Adjust the path to your Zustand store

const StatusManager = () => {
	const { setMotorStatus, setCurrentSpeed, setPattern } = useMotorStore();
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	useEffect(() => {
		const socket = io(BACKEND_URL);

		socket.on('status', (status) => {
			if (status === 'ON') {
				setMotorStatus('ON');
			} else {
				setMotorStatus('OFF');
			}
		});

		socket.on('speed', (speed) => {
			setCurrentSpeed(speed);
		});

		socket.on('pattern', (pattern) => {
			setPattern(pattern);
		});

		return () => {
			socket.disconnect();
		};
	}, [BACKEND_URL, setMotorStatus, setCurrentSpeed, setPattern]);

	return null;
};

export default StatusManager;
