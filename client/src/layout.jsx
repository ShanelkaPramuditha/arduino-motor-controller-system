import { Outlet } from 'react-router-dom';
import StatusManager from './store/status-manager';
import Header from './components/Header';

const Layout = () => {
	return (
		<div className={`app`}>
			<StatusManager />

			<Header />

			<div className='mt-[80px]'>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
