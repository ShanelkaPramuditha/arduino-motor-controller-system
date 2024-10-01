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
			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(0)}
					className={
						pattern == 'DEFAULT' && motorStatus === 'ON'
							? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-blue-500 disabled:opacity-20'
					}
				>
					Default
				</button>
			</div>

			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(1)}
					className={
						pattern == 'PATTERN1'
							? 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-blue-500 disabled:opacity-20'
					}
				>
					Pattern 1
				</button>
			</div>
			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(2)}
					className={
						pattern == 'PATTERN2'
							? 'bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-yellow-500 disabled:opacity-20'
					}
				>
					Pattern 2
				</button>
			</div>
			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(3)}
					className={
						pattern == 'PATTERN3'
							? 'bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-indigo-500 disabled:opacity-20'
					}
				>
					Pattern 3
				</button>
			</div>
			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(4)}
					className={
						pattern == 'PATTERN4'
							? 'bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-purple-500 disabled:opacity-20'
					}
				>
					Pattern 4
				</button>
			</div>
			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(5)}
					className={
						pattern == 'PATTERN5'
							? 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-red-500 disabled:opacity-20'
					}
				>
					Pattern 5
				</button>
			</div>
			<div>
				<button
					disabled={motorStatus === 'OFF'}
					onClick={() => sendPattern(6)}
					className={
						pattern == 'PATTERN6'
							? 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
							: 'font-bold py-2 px-4 rounded border border-green-500 disabled:opacity-20'
					}
				>
					Pattern 6
				</button>
			</div>
		</>
	);
};

export default PatternSelector;

PatternSelector.propTypes = {
	motorStatus: PropTypes.string.isRequired
};
