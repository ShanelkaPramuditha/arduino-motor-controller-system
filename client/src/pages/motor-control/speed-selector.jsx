import PropTypes from 'prop-types';
import { setSpeedAPI } from '../../api/motorAPI';
import useMotorStore from '../../store/motor-store';

const SpeedSelector = ({ motorStatus }) => {
	const { maxSpeed, currentSpeed, setMaxSpeed } = useMotorStore();

	return (
		<>
			<div className='flex items-center gap-4'>
				<span className='card px-4 py-2 bg-gray-200 rounded text-gray-700 font-bold w-52 text-center'>
					Current Speed: {currentSpeed}%
				</span>

				<span className='card px-4 py-2 bg-gray-200 rounded text-gray-700 font-bold w-52 text-center'>
					Max Speed: {maxSpeed}%
				</span>
			</div>
			<div className='flex flex-col mt-4 w-96 items-center'>
				{/* Buttons for set speed (10, 20, 30, 40, 50, etc) */}
				<div className='grid grid-cols-5 gap-4'>
					{[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
						<button
							disabled={motorStatus === 'OFF'}
							key={value}
							onClick={() => {
								setSpeedAPI(value);
								setMaxSpeed(value);
							}}
							className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded border border-gray-400 disabled:opacity-20'
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
