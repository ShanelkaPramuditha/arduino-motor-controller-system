import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { powerStatus, setSpeedAPI, sendPatternAPI } from '../api/motorAPI';

function Home() {
	const [pwmValue, setPwmValue] = useState(0);
	const [value, setValue] = useState(0);
	const [miniValue, setMiniValue] = useState(0);
	const [speed, setSpeed] = useState(0);
	const [motorOn, setMotorOn] = useState(false);
	const [motorStatus, setMotorStatus] = useState('OFF');
	const [pattern, setPattern] = useState('No Pattern Running');
	// const [lastCommand, setLastCommand] = useState('OFF');

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

	useEffect(() => {
		const setSpeed = async () => {
			setSpeedAPI(pwmValue);
		};

		setSpeed();
	}, [pwmValue]);

	const togglePower = () => {
		setMotorOn(!motorOn);
	};

	useEffect(() => {
		const togglePower = async () => {
			powerStatus(motorOn ? 'on' : 'off');
			setPattern('No Pattern Running');
		};

		togglePower();
	}, [motorOn]);

	useEffect(() => {
		const socket = io(BACKEND_URL);

		// socket.on('lastCommand', (command) => {
		// 	setLastCommand(command);
		// });
		socket.on('status', (status) => {
			if (status === 'ON') {
				setMotorStatus('ON');
			} else {
				setMotorStatus('OFF');
			}
		});
		socket.on('speed', (speed) => {
			setSpeed(speed.toFixed(0));
		});
		socket.on('pattern', (pattern) => {
			setPattern(pattern);
		});

		return () => {
			socket.disconnect();
		};
	}, [BACKEND_URL]);

	const sendPattern = async (pattern) => {
		sendPatternAPI(pattern);
	};

	const increasePWMValue = () => {
		if (pwmValue < 100) {
			if (pwmValue > 100) {
				setPwmValue(100);
			} else {
				setPwmValue((prevValue) => prevValue + 1);
			}
		}
	};

	const decreasePWMValue = () => {
		if (pwmValue > 0) {
			if (pwmValue < 0) {
				setPwmValue(0);
			}
			setPwmValue((prevValue) => prevValue - 1);
		}
	};

	const handleSliderChange = (event) => {
		const newPwm = parseInt(event.target.value, 10);
		setMiniValue(newPwm);
		setPwmValue(value + miniValue);
	};

	return (
		<div className='App'>
			<header className='App-header flex flex-col justify-between items-center py-8'>
				<h1 className='text-3xl font-bold mb-4'>Motor Speed Controller</h1>
				<div className='flex items-center gap-4'>
					<button
						onClick={decreasePWMValue}
						className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded'
					>
						-
					</button>
					<span className='card px-4 py-2 bg-gray-200 rounded text-gray-700 font-bold'>Speed: {speed}%</span>
					<button
						onClick={increasePWMValue}
						className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded'
					>
						+
					</button>
				</div>
				<div className='flex flex-col mt-4 w-96 items-center'>
					{/* Buttons for set speed (10, 20, 30, 40, 50, etc) */}
					<div className='grid grid-cols-5 gap-4'>
						{[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
							<button
								key={value}
								onClick={() => {
									setPwmValue(value);
									setValue(value);
									setMiniValue(0);
								}}
								className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded'
							>
								{value}%
							</button>
						))}
					</div>
				</div>
				<div className='flex flex-col mt-4 w-96 items-center'>
					<input
						type='range'
						min={0}
						max={10}
						value={miniValue}
						onChange={handleSliderChange}
						className={`slider w-full ${speed == 100 ? 'opacity-50 cursor-not-allowed' : ''}`}
						disabled={speed == 100}
					/>
				</div>
				<div className='flex flex-col mt-4 w-96 items-center'>
					<div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
						<div
							className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
							style={{ width: Math.floor(speed) + '%' }}
						>
							{speed}% {/* Display the width percentage */}
						</div>
					</div>
				</div>

				<div className='grid grid-cols-3 mt-4 gap-4'>
					<div>
						<button
							onClick={() => sendPattern('pattern1')}
							className={
								pattern == 'PATTERN1'
									? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
									: 'font-bold py-2 px-4 rounded border border-blue-500'
							}
						>
							Pattern 1
						</button>
					</div>
					<div>
						<button
							onClick={() => sendPattern('pattern2')}
							className={
								pattern == 'PATTERN2'
									? 'bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
									: 'font-bold py-2 px-4 rounded border border-yellow-500'
							}
						>
							Pattern 2
						</button>
					</div>
					<div>
						<button
							onClick={() => sendPattern('pattern3')}
							className={
								pattern == 'PATTERN3'
									? 'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
									: 'font-bold py-2 px-4 rounded border border-indigo-500'
							}
						>
							Pattern 3
						</button>
					</div>
					<div>
						<button
							onClick={() => sendPattern('pattern4')}
							className={
								pattern == 'PATTERN4'
									? 'bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
									: 'font-bold py-2 px-4 rounded border border-purple-500'
							}
						>
							Pattern 4
						</button>
					</div>
					<div>
						<button
							onClick={() => sendPattern('pattern5')}
							className={
								pattern == 'PATTERN5'
									? 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
									: 'font-bold py-2 px-4 rounded border border-red-500'
							}
						>
							Pattern 5
						</button>
					</div>
					<div>
						<button
							onClick={() => sendPattern('pattern6')}
							className={
								pattern == 'PATTERN6'
									? 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
									: 'font-bold py-2 px-4 rounded border border-green-500'
							}
						>
							Pattern 6
						</button>
					</div>
				</div>
				<br />
				<div className='flex flex-col gap-2 w-full items-center'>
					<button
						onClick={() => togglePower('on')}
						className={`text-white font-bold py-2 px-4 rounded w-80 
							${motorStatus === 'OFF' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
					>
						Turn {motorStatus === 'OFF' ? 'On' : 'Off'} Motor
					</button>
				</div>
			</header>
		</div>
	);
}

export default Home;
