import { useState, useEffect } from 'react';
import PatternSelector from './pattern-selector';
import useMotorStore from '../../store/motor-store';
import SpeedSelector from './speed-selector';
import PowerController from './power-controller';
import { setSpeedAPI } from '../../api/motorAPI';

function Home() {
	const motorStatus = useMotorStore((state) => state.motorStatus);
	const { setMaxSpeed } = useMotorStore();
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		setIsVisible(motorStatus === 'ON');
		setMaxSpeed(motorStatus === 'OFF' ? 0 : 10);
		setSpeedAPI(10);
	}, [motorStatus, setMaxSpeed]);

	return (
		<div>
			<header className='App-header flex flex-col justify-between items-center py-8'>
				<div
					className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
					style={{ height: isVisible ? 'auto' : '0', overflow: 'hidden' }}
				>
					<SpeedSelector motorStatus={motorStatus} />
				</div>

				<div
					className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} m-5`}
					style={{ height: isVisible ? 'auto' : '0', overflow: 'hidden' }}
				>
					<PatternSelector motorStatus={motorStatus} />
				</div>

				<br />
				<PowerController motorStatus={motorStatus} />
			</header>
		</div>
	);
}

export default Home;
