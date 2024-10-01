import { create } from 'zustand';

const useMotorStore = create((set) => ({
	motorStatus: 'OFF',
	maxSpeed: 10,
	currentSpeed: 10,
	pattern: 'DEFAULT',
	setMotorStatus: (status) => set({ motorStatus: status }),
	setMaxSpeed: (speed) => set({ maxSpeed: speed }),
	setCurrentSpeed: (speed) => set({ currentSpeed: speed }),
	setPattern: (pattern) => set({ pattern: pattern })
}));

export default useMotorStore;
