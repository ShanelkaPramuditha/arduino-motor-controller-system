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
							disabled={motorStatus === 'OFF'}
							onClick={() => sendPattern(i)}
							className={`font-bold py-2 px-4 rounded min-w-44 w-full 
								${
									pattern === `PATTERN${i}` && motorStatus === 'ON'
										? `bg-blue-500 hover:bg-blue-700 text-white`
										: `border border-blue-500 disabled:opacity-20`
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

export default PatternSelector;

PatternSelector.propTypes = {
	motorStatus: PropTypes.string.isRequired
};
