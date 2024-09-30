import { Link } from 'react-router-dom';

function Dashboard() {
	return (
		<div className='App'>
			<header className='App-header flex flex-col justify-between items-center py-8'>
				<Link to='/motor'>Motor Controller</Link>
			</header>
		</div>
	);
}

export default Dashboard;
