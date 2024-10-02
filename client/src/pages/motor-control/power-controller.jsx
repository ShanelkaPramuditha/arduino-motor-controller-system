import PropTypes from 'prop-types';
import { powerStatus } from '../../api/motorAPI';
import { useEffect } from 'react';
import { POWER_STATUS } from '../../constants';

const PowerController = ({ motorStatus }) => {
	const togglePower = async (state) => {
		try {
			await powerStatus(state);
		} catch (error) {
			console.error('Error toggling power:', error);
		}
	};

	// If motor power on, turn off when refresh page
	useEffect(() => {
		togglePower(POWER_STATUS.OFF);
	}, []);

	return (
		<>
			<div className='flex flex-col gap-2 w-full items-center'>
				<button
					onClick={() => togglePower(motorStatus === POWER_STATUS.ON ? POWER_STATUS.OFF : POWER_STATUS.ON)}
					className={`text-white font-bold py-2 px-4 rounded w-44
							${motorStatus === POWER_STATUS.OFF ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
				>
					Turn {motorStatus === POWER_STATUS.OFF ? POWER_STATUS.ON : POWER_STATUS.OFF} Motor
				</button>
			</div>
		</>
	);
};

export default PowerController;

PowerController.propTypes = {
	motorStatus: PropTypes.string.isRequired
};
