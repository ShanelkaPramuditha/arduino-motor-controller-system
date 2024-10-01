import PatternSelector from './pattern-selector';
import useMotorStore from '../../store/motor-store';
import SpeedSelector from './speed-selector';
import PowerController from './power-controller';

function Home() {
	const motorStatus = useMotorStore((state) => state.motorStatus);

	return (
		<div className='App'>
			<header className='App-header flex flex-col justify-between items-center py-8'>
				<h1 className='text-3xl font-bold mb-4'>Motor Speed Controller</h1>
				<SpeedSelector motorStatus={motorStatus} />

				<div className='grid grid-cols-3 mt-4 gap-4'>
					<PatternSelector motorStatus={motorStatus} />
				</div>

				<br />
				<PowerController motorStatus={motorStatus} />
			</header>
		</div>
	);
}

export default Home;
