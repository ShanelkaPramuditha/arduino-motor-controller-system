import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';

const Dashboard = lazy(() => import('../pages/dashboard'));
const Home = lazy(() => import('../pages/motor'));

const NotFound = lazy(() => import('../pages/not-found'));

const Layout = lazy(() => import('../layout'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Suspense fallback={<Loader />}>
				<Layout />
			</Suspense>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<Loader />}>
						<Dashboard />
					</Suspense>
				)
			},
			{
				path: '/motor',
				element: (
					<Suspense fallback={<Loader />}>
						<Home />
					</Suspense>
				)
			}
		]
	},
	{
		path: '*',
		element: (
			<Suspense fallback={<Loader />}>
				<NotFound />
			</Suspense>
		)
	}
]);

const AppRoutes = () => {
	return <RouterProvider router={router} />;
};

export default AppRoutes;
