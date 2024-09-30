import PropTypes from 'prop-types';

const LoaderIcon = ({ width = 44, height = 44, stroke = '#000' }) => {
	return (
		<svg width={width} height={height} viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg' stroke={stroke}>
			<g fill='none' fillRule='evenodd' strokeWidth='2'>
				<circle cx='22' cy='22' r='1'>
					<animate
						attributeName='r'
						begin='0s'
						dur='1.8s'
						values='1; 20'
						calcMode='spline'
						keyTimes='0; 1'
						keySplines='0.165, 0.84, 0.44, 1'
						repeatCount='indefinite'
					/>
					<animate
						attributeName='stroke-opacity'
						begin='0s'
						dur='1.8s'
						values='1; 0'
						calcMode='spline'
						keyTimes='0; 1'
						keySplines='0.3, 0.61, 0.355, 1'
						repeatCount='indefinite'
					/>
				</circle>
				<circle cx='22' cy='22' r='1'>
					<animate
						attributeName='r'
						begin='-0.9s'
						dur='1.8s'
						values='1; 20'
						calcMode='spline'
						keyTimes='0; 1'
						keySplines='0.165, 0.84, 0.44, 1'
						repeatCount='indefinite'
					/>
					<animate
						attributeName='stroke-opacity'
						begin='-0.9s'
						dur='1.8s'
						values='1; 0'
						calcMode='spline'
						keyTimes='0; 1'
						keySplines='0.3, 0.61, 0.355, 1'
						repeatCount='indefinite'
					/>
				</circle>
			</g>
		</svg>
	);
};

export default function Loader(props) {
	const { width = 100, height = 100, ...restProps } = props;
	return (
		<div className='flex justify-center items-center h-screen'>
			<LoaderIcon width={width} height={height} {...restProps} />
		</div>
	);
}

LoaderIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	stroke: PropTypes.string
};

Loader.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
};
