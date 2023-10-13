'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const GoBackButton = ({}) => {
	const router = useRouter();
	return (
		<div
			onClick={router.back}
			className='w-[40px] h-[40px]  rounded-md hover:bg-neutral-800  mr-4 grid place-items-center'>
			<ChevronLeft size={30} />
		</div>
	);
};

export default GoBackButton;
