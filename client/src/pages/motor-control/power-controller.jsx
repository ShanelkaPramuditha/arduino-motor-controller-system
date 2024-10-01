import PropTypes from 'prop-types';
import useMotorStore from '../../store/motor-store';
import { powerStatus } from '../../api/motorAPI';

const PowerController = ({ motorStatus }) => {
	const togglePower = async (state) => {
		try {
			await powerStatus(state);
			useMotorStore.getState().setMotorStatus(state === 'on' ? 'ON' : 'OFF');
		} catch (error) {
			console.error('Error toggling power:', error);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-2 w-full items-center'>
				<button
					onClick={() => togglePower(motorStatus === 'ON' ? 'off' : 'on')}
					className={`text-white font-bold py-2 px-4 rounded w-80 
							${motorStatus === 'OFF' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
				>
					Turn {motorStatus === 'OFF' ? 'On' : 'Off'} Motor
				</button>
			</div>
		</>
	);
};

export default PowerController;

PowerController.propTypes = {
	motorStatus: PropTypes.string.isRequired
};
