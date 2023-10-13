'use client';

import { Enrollee, Order, User } from '@prisma/client';
import { FC } from 'react';
import Avatar from '../Avatar';
import Heading from '../Heading';
import Button from '../Button/BaseButton';
import { Loader, UserPlus2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// type Base = (User | Order | Enrollee)[];
interface EnrolleeListAdminProps {
	enrollees: Enrollee[];
	title: string;
}

const EnrolleeListAdmin = ({ enrollees, title }: EnrolleeListAdminProps) => {
	const router = useRouter();

	return (
		<div className='w-full max-w-md p-4 dark:bg-primary-dark bg-white bg-opacity-50 rounded-md'>
			<div className='flex items-center justify-between mb-4'>
				<div className='font-bold text-medium dark:text-white text-primary-dark inline-block'>
					<UserPlus2 className='inline mr-2 mb-1' />
					{title}
				</div>
				<a
					className='text-sm font-medium cursor-pointer'
					onClick={() => router.push(`/admin/enrollees`)}>
					View all
				</a>
			</div>
			<div className='flow-root'>
				<ul
					role='list'
					className='divide-y divide-neutral-800'>
					<>
						{enrollees.map((enrollee) => (
							<li
								key={enrollee.id}
								className='py-3 sm:py-4'>
								<div className='flex items-center space-x-4'>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium dark:text-neutral-200 text-primary-dark'>
											{enrollee.fullname}
										</p>
										<p className='text-sm truncate text-neutral-500'>
											{enrollee.email}
										</p>
									</div>
									<div className='inline-flex items-center text-base font-semibold text-gray-900 dark:dark:text-white text-primary-dark'>
										<Button
											small
											outline
											label='Reply'
											onClick={() =>
												router.push(`/admin/enrollee/${enrollee.id}`)
											}
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

export default EnrolleeListAdmin;
