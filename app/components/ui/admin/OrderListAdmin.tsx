'use client';

import { Enrollee, Order, User } from '@prisma/client';
import { FC } from 'react';
import Avatar from '../Avatar';
import Heading from '../Heading';
import Button from '../Button/BaseButton';
import { Loader, Receipt } from 'lucide-react';

// type Base = (User | Order | Enrollee)[];
interface ContentCardProps {
	orders: Order[];
	title: string;
}

const ContentCard = ({ orders, title }: ContentCardProps) => {
	return (
		<div className='w-full max-w-md p-4 dark:bg-primary-dark bg-white bg-opacity-50 rounded-md'>
			<div className='flex items-center justify-between mb-4'>
				<div className='font-bold text-medium dark:text-white text-primary-dark inline-block'>
					<Receipt className='inline mr-2 mb-1' />
					{title}
				</div>
				<a
					href='#'
					className='text-sm font-medium '>
					View all
				</a>
			</div>
			<div className='flow-root'>
				<ul
					role='list'
					className='divide-y divide-neutral-800'>
					<>
						{orders.map((order) => (
							<li
								key={order.id}
								className='py-3 sm:py-4'>
								<div className='flex items-center space-x-4'>
									<div className='flex-shrink-0'>
										<Avatar />
									</div>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium dark:text-neutral-200 text-primary-dark'>
											{order.createdAt.toLocaleString()}
										</p>
										<p className='text-sm truncate text-neutral-500'>
											{order.amount}$
										</p>
									</div>
									<div className='inline-flex items-center text-base font-semibold text-gray-900 dark:dark:text-white text-primary-dark'>
										<Button
											small
											outline
											label='View'
											onClick={() => {}}
										/>
									</div>
								</div>
							</li>
						))}
					</>
				</ul>
			</div>
		</div>
	);
};

export default ContentCard;
