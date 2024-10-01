import { sendPatternAPI } from '../../api/motorAPI';
import PropTypes from 'prop-types';
import useMotorStore from '../../store/motor-store';

const PatternSelector = ({ motorStatus }) => {
	const { pattern } = useMotorStore();

	const sendPattern = (pattern) => {
		sendPatternAPI(pattern);
	};

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-5 xl:grid-cols-5 gap-4'>
				{[...Array(11).keys()].map((i) => (
					<div key={i}>
						<button
							disabled={motorStatus === 'OFF' || pattern === `PATTERN${i}`}
							onClick={() => sendPattern(i)}
							className={`font-bold py-2 px-4 rounded w-full 
								${
									pattern === `PATTERN${i}` && motorStatus === 'ON'
										? `bg-${getButtonColor(i)}-500 hover:bg-${getButtonColor(i)}-700 text-white`
										: `border border-${getButtonColor(i)}-500 disabled:opacity-20`
								}`}
						>
							Pattern {i === 0 ? 'On' : i}
						</button>
					</div>
				))}
			</div>
		</>
	);
};

// Helper function to get button colors based on index
const getButtonColor = (index) => {
	const colors = [
		'green', // Pattern 0
		'blue', // Pattern 1
		'yellow', // Pattern 2
		'indigo', // Pattern 3
		'purple', // Pattern 4
		'red', // Pattern 5
		'green', // Pattern 6
		'blue', // Pattern 7
		'yellow', // Pattern 8
		'indigo', // Pattern 9
		'purple' // Pattern 10
	];
	return colors[index] || 'gray';
};

export default PatternSelector;

PatternSelector.propTypes = {
	motorStatus: PropTypes.string.isRequired
};
