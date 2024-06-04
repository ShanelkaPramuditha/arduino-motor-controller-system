import AppRoutes from './routers/AppRoutes';
import './App.css';
import { useContext } from 'react';
import ThemeContext from './components/ThemeContext';

function App() {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			<div className={`app ${theme}`}>
				<div className='mt-5'>
					<div className='flex justify-end'>
						{' '}
						<button
							onClick={toggleTheme}
							className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded items-end me-5'
						>
							Change Theme
						</button>
					</div>
					<AppRoutes />
				</div>
			</div>
		</>
	);
}

export default App;
