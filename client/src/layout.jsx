import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import ThemeContext from './components/ThemeContext';
import StatusManager from './store/status-manager';

const Layout = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<div className={`app ${theme}`}>
			<StatusManager />
			<div className='flex justify-end mt-5'>
				{' '}
				<button
					onClick={toggleTheme}
					className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded items-end me-5'
				>
					Change Theme
				</button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
