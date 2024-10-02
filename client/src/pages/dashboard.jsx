import { Link } from 'react-router-dom';

function Dashboard() {
	return (
		<div className='min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition duration-300'>
			<header className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:p-12 flex flex-col items-center justify-center max-w-lg w-full transition-colors duration-300'>
				<h1 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center transition-colors duration-300'>
					Welcome to the Dashboard
				</h1>
				<p className='text-gray-600 dark:text-gray-400 mb-8 text-center transition-colors duration-300'>
					Manage your motor system and other controls from here.
				</p>

				<Link
					to='/motor'
					className='text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 dark:focus:ring-blue-400'
				>
					Go to Motor Controller
				</Link>
			</header>
		</div>
	);
}

export default Dashboard;
