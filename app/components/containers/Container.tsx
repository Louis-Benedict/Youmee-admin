/** @format */

'use client';

import { FC, HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={className}>
			<div className='w-full dark:text-primary-font-dark text-primary-dark'>
				<div className='max-w-[1400px] mx-auto xl:px-20 md:px-10 sm:px-6 px-4'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Container;
