import Button from './ui/Button/BaseButton';
import { useRouter } from 'next/navigation';
import { ArrowBigLeft, LucideHistory, RefreshCcw } from 'lucide-react';
import Container from './containers/Container';

export default function Error() {
	const router = useRouter();
	return (
		<Container className='h-screen'>
			<div className='absolute  top-1/2 min-w-[300px] -translate-y-1/2 right-1/2 translate-x-1/2 items-center justify-center flex-col gap-6'>
				<div className='text-center flex flex-col items-center my-4'>
					<LucideHistory
						size={120}
						className='dark:text-white text-primary-dark'
					/>
					<div className='my-4'>
						<div className='text-[24px] font-bold dark:text-white text-primary-dark'>
							Seems like something went wrong...
						</div>
						<div className='text-sm'>Go back or try again later</div>
					</div>
				</div>
				<div className='flex flex-row w-full gap-2 '>
					<Button
						icon={ArrowBigLeft}
						outline
						label='Go Back'
						onClick={() => router.back()}
					/>
					<Button
						icon={RefreshCcw}
						outline
						label='Try again'
						onClick={() => router.refresh()}
					/>
				</div>
			</div>
		</Container>
	);
}
