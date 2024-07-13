import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { powerStatus, setSpeedAPI, sendPatternAPI } from '../api/motorAPI';
import io from 'socket.io-client';

const ControlComponent = () => {
	const [pwmValue, setPwmValue] = useState(50);
	const [speed, setSpeed] = useState(50);
	const [motorOn, setMotorOn] = useState(false);
	const [motorStatus, setMotorStatus] = useState('OFF');
	const [pattern, setPattern] = useState('No Pattern Running');
	const [lastCommand, setLastCommand] = useState('OFF');

	useEffect(() => {
		const setSpeed = async () => {
			setSpeedAPI(pwmValue);
		};

		setSpeed();
	}, [pwmValue]);

	useEffect(() => {
		const togglePower = async () => {
			powerStatus(motorOn ? 'on' : 'off');
		};

		togglePower();
	}, [motorOn]);

	useEffect(() => {
		const socket = io('https://25gc8dtj-3001.asse.devtunnels.ms');

		socket.on('lastCommand', (command) => {
			setLastCommand(command);
		});
		socket.on('status', (status) => {
			setMotorStatus(status === 'ON' ? 'ON' : 'OFF');
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
	}, []);

	const handleSetSpeed = async () => {
		try {
			await setSpeedAPI(pwmValue);
		} catch (error) {
			console.error('Error setting speed:', error);
		}
	};

	const handleTogglePower = async () => {
		try {
			await powerStatus(motorOn ? 'off' : 'on');
			setMotorOn(!motorOn);
		} catch (error) {
			console.error('Error toggling power:', error);
		}
	};

	const handleSetPattern = async (selectedPattern) => {
		try {
			await sendPatternAPI(selectedPattern);
		} catch (error) {
			console.error('Error setting pattern:', error);
		}
	};

	const increasePWMValue = () => {
		if (pwmValue < 255) {
			setPwmValue((prevValue) => prevValue + 5);
		}
	};

	const decreasePWMValue = () => {
		if (pwmValue > 50) {
			setPwmValue((prevValue) => prevValue - 5);
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Last Command: {lastCommand}</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<TouchableOpacity onPress={decreasePWMValue}>
					<Text style={styles.button}>-</Text>
				</TouchableOpacity>
				<Text>Speed: {pwmValue}</Text>
				<TouchableOpacity onPress={increasePWMValue}>
					<Text style={styles.button}>+</Text>
				</TouchableOpacity>
			</View>
			<Slider
				style={{ width: 200, height: 40 }}
				minimumValue={50}
				maximumValue={255}
				value={pwmValue}
				onValueChange={(value) => setPwmValue(value)}
			/>
			<Text>Motor Status: {motorStatus}</Text>
			<TouchableOpacity onPress={handleTogglePower}>
				<Text style={[styles.button, { backgroundColor: motorOn ? 'red' : 'green' }]}>
					Turn {motorOn ? 'Off' : 'On'} Motor
				</Text>
			</TouchableOpacity>
			<Text>Current Pattern: {pattern}</Text>
			<View style={{ flexDirection: 'row', marginTop: 10 }}>
				<TouchableOpacity onPress={() => handleSetPattern('pattern1')}>
					<Text style={styles.patternButton}>Pattern 1</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleSetPattern('pattern2')}>
					<Text style={styles.patternButton}>Pattern 2</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleSetPattern('pattern3')}>
					<Text style={styles.patternButton}>Pattern 3</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleSetPattern('pattern4')}>
					<Text style={styles.patternButton}>Pattern 4</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleSetPattern('pattern5')}>
					<Text style={styles.patternButton}>Pattern 5</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = {
	button: {
		backgroundColor: 'lightblue',
		padding: 10,
		margin: 5,
		borderRadius: 5
	},
	patternButton: {
		backgroundColor: 'lightblue',
		padding: 10,
		margin: 5,
		borderRadius: 5
	}
};

export default ControlComponent;
