/** @format */

'use client';

import { FC } from 'react';

interface HeadingProps {
	title: string;
	subtitle?: string;
	center?: boolean;
	light?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, center, light }) => {
	return (
		<div className={center ? 'text-center' : 'text-start'}>
			<div
				className={
					light
						? 'dark:text-white text-primary-dark text-md font-bold'
						: 'text-[20px] font-bold dark:text-white text-primary-dark'
				}>
				{title}
			</div>
			{subtitle && (
				<div className='font-dark text-neutral-500 mt-2 text-xs'>
					{subtitle}
				</div>
			)}
		</div>
	);
};

export default Heading;
