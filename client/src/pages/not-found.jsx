import { Link } from 'react-router-dom'; // You can remove this if you're not using react-router

const NotFound = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600'>
			<div className='text-center'>
				<h1 className='text-9xl font-extrabold text-white'>404</h1>
				<p className='text-2xl md:text-3xl text-white mt-4'>
					Oops! The page you&apos;re looking for doesn&apos;t exist.
				</p>
				<p className='text-lg text-white mt-6'>
					It looks like the page you are searching for is not available or has been moved.
				</p>
				<Link
					to='/'
					className='mt-8 inline-block bg-white text-blue-500 px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100'
				>
					Back to Home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
