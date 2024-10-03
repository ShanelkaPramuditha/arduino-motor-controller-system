import PropTypes from 'prop-types';
import { setSpeedAPI } from '../../api/motorAPI';
import useMotorStore from '../../store/motor-store';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const SpeedSelector = ({ motorStatus }) => {
	const { maxSpeed, currentSpeed, setMaxSpeed } = useMotorStore();
	const [speedData, setSpeedData] = useState([]); // Track the speed data for the chart

	useEffect(() => {
		setSpeedData((prevData) => [
			...prevData.slice(-9), // Keep only the last 10 values to avoid overcrowding
			currentSpeed
		]);
	}, [currentSpeed]);

	const chartData = {
		labels: Array.from({ length: speedData.length }, (_, i) => i + 1), // Labels for the X-axis
		datasets: [
			{
				label: 'Motor Speed (%)',
				data: speedData,
				fill: false,
				borderColor: 'rgba(75, 192, 192, 1)',
				tension: 0.1
			}
		]
	};

	return (
		<>
			<div className='flex flex-col items-center gap-4'>
				{/* Chart for currentSpeed */}
				{/* Hide with tailwind css */}
				<div className='w-full sm:w-96 mt-6 hidden'>
					<Line data={chartData} />
				</div>

				{/* Current Speed Card */}
				<span className='card px-4 py-2 bg-gray-200 rounded text-gray-700 font-bold w-full sm:w-52 text-center'>
					{/* Round number */}
					Current Speed: {Math.round(currentSpeed)}%
				</span>

				{/* <div className='flex gap-4 flex-wrap justify-center'> */}
				<div className='hidden'>
					<span className='card px-4 py-2 bg-gray-200 rounded text-gray-700 font-bold w-full sm:w-52 text-center'>
						Max Speed: {maxSpeed}%
					</span>
				</div>
			</div>

			<div className='flex flex-col mt-4 w-full sm:w-96 lg:w-[900px] items-center'>
				{/* Buttons for setting speed (10, 20, 30, 40, 50, etc) */}
				<div className='grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4 w-full'>
					{[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
						<button
							disabled={motorStatus === 'OFF'}
							key={value}
							onClick={() => {
								setSpeedAPI(value);
								setMaxSpeed(value);
							}}
							className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 disabled:opacity-20 min-w-7'
						>
							{value}%
						</button>
					))}
				</div>
			</div>
		</>
	);
};

export default SpeedSelector;

SpeedSelector.propTypes = {
	motorStatus: PropTypes.string.isRequired
};
