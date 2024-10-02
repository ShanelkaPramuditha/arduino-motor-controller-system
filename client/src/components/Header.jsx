import { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ThemeContext from './ThemeContext';

const Header = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const location = useLocation();

	// Function to determine page title based on URL path
	const getPageTitle = () => {
		switch (location.pathname) {
			case '/motor':
				return 'Motor Speed Controller';
			case '/dashboard':
				return 'Dashboard';
			// Add more cases as needed for other pages
			default:
				return 'Welcome'; // Default title
		}
	};

	return (
		<header className='fixed top-0 left-0 right-0 w-full bg-gray-100 dark:bg-gray-900 p-5 shadow-lg z-50 flex justify-between items-center'>
			{/* Page Title */}
			<h1 className='text-lg font-bold text-gray-800 dark:text-white'>{getPageTitle()}</h1>

			{/* Theme Toggle Button */}
			<button
				onClick={toggleTheme}
				className='text-white font-bold p-3 rounded-full focus:outline-none transition-colors duration-300'
				aria-label='Toggle Theme'
			>
				{theme === 'light' ? (
					<FaMoon size={24} className='text-gray-800 hover:text-gray-600' />
				) : (
					<FaSun size={24} className='text-yellow-400 hover:text-yellow-300' />
				)}
			</button>
		</header>
	);
};

export default Header;
