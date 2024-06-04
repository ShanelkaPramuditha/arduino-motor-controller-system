import { Routes, Route } from 'react-router-dom';
import * as Page from '../pages/index.js';

function AppRoutes() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Page.Home />} />
			</Routes>
		</div>
	);
}

export default AppRoutes;
