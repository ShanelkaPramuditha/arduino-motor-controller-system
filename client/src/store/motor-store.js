import { create } from 'zustand';

const useMotorStore = create((set) => ({
	motorStatus: 'OFF',
	minSpeed: 10,
	maxSpeed: 10,
	currentSpeed: 10,
	pattern: 'PATTERN0',
	setMotorStatus: (status) => set({ motorStatus: status }),
	setMinSpeed: (speed) => set({ minSpeed: speed }),
	setMaxSpeed: (speed) => set({ maxSpeed: speed }),
	setCurrentSpeed: (speed) => set({ currentSpeed: speed }),
	setPattern: (pattern) => set({ pattern: pattern })
}));

export default useMotorStore;
