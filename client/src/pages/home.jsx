import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { powerStatus, setSpeedAPI, sendPatternAPI } from '../api/motorAPI';

function Home() {
	const [pwmValue, setPwmValue] = useState(50);
	const [speed, setSpeed] = useState(50);
	const [motorOn, setMotorOn] = useState(false);
	const [motorStatus, setMotorStatus] = useState('OFF');
	const [pattern, setPattern] = useState('No Pattern Running');
	const [lastCommand, setLastCommand] = useState('OFF');

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
		};

		togglePower();
	}, [motorOn]);

	useEffect(() => {
		const socket = io(BACKEND_URL);

		socket.on('lastCommand', (command) => {
			setLastCommand(command);
		});
		socket.on('status', (status) => {
			if (status === 'ON') {
				setMotorStatus('ON');
			} else {
				setMotorStatus('OFF');
			}
		});
		socket.on('speed', (speed) => {
			setSpeed(speed);
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
		if (pwmValue < 255) {
			if (pwmValue > 255) {
				setPwmValue(255);
			} else {
				setPwmValue((prevValue) => prevValue + 5);
			}
		}
	};

	const decreasePWMValue = () => {
		if (pwmValue > 50) {
			if (pwmValue < 50) {
				setPwmValue(50);
			}
			setPwmValue((prevValue) => prevValue - 5);
		}
	};

	const handleSliderChange = (event) => {
		const newPwm = parseInt(event.target.value, 10);
		setPwmValue(newPwm);
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
					<span className='card px-4 py-2 bg-gray-200 rounded text-gray-700 font-bold'>Speed: {pwmValue}</span>
					<button
						onClick={increasePWMValue}
						className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded'
					>
						+
					</button>
				</div>
				<div className='flex flex-col mt-4 w-96 items-center'>
					<input
						type='range'
						min='50'
						max='255'
						value={pwmValue}
						onChange={handleSliderChange}
						className='slider w-full'
					/>
				</div>
				<div className='flex flex-col mt-4 w-96 items-center'>
					<div className='w-full bg-gray-200 rounded-full dark:bg-gray-700'>
						<div
							className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
							style={{ width: Math.floor((pwmValue / 255) * 100) + '%' }}
						>
							{Math.floor((pwmValue / 255) * 100)}% {/* Display the width percentage */}
						</div>
					</div>
				</div>

				<div className='flex mt-4 gap-4'>
					<button
						onClick={() => sendPattern('pattern1')}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Pattern 1
					</button>
					<button
						onClick={() => sendPattern('pattern2')}
						className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
					>
						Pattern 2
					</button>
					<button
						onClick={() => sendPattern('pattern3')}
						className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
					>
						Pattern 3
					</button>
					<button
						onClick={() => sendPattern('pattern4')}
						className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
					>
						Pattern 4
					</button>
					<button
						onClick={() => sendPattern('pattern5')}
						className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					>
						Pattern 5
					</button>
				</div>
				<br />
				<div className='flex flex-col gap-2 w-full items-center'>
					<button
						onClick={() => togglePower('on')}
						className={`text-white font-bold py-2 px-4 rounded w-80 ${
							!motorOn ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'
						}`}
					>
						Turn {motorStatus === 'OFF' ? 'On' : 'Off'} Motor
					</button>
					<p>Motor is currently {motorStatus}</p>
					<p>Current Pattern: {pattern}</p>
					<p>Current Speed: {speed}</p>
					{/* <p>Last Command: {lastCommand}</p> */}
				</div>
			</header>
		</div>
	);
}

export default Home;
