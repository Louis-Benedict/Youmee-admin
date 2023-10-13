'use client';

import { useCallback, useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Icons from '@/app/libs/icons';
import { useRouter } from 'next/navigation';
import { toast } from '@/app/components/ui/toast';
import { toastMessages } from '@/app/static/toastMessages';

import Modal from './Modal';
import useReviewModal from '@/app/hooks/useReviewModal';
import TextArea from '../inputs/TextArea';
import axios from 'axios';
import StarReview from '../ui/StarReview';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '@/app/libs/validation/entityValidation';
import Checkbox from '../ui/Checkbox';

const ReviewModal = () => {
	const router = useRouter();
	const reviewModal = useReviewModal();

	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({ resolver: zodResolver(reviewSchema) });

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	useEffect(() => {
		reset({
			orderId: reviewModal.targetOrderId,
			recipientUserId: reviewModal.targetUser?.id,
		});
	}, [reviewModal.targetOrderId]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		console.log(data);
		axios
			.post('/api/review', data)
			.then(() => {
				toast(toastMessages.reviewCreated.success);
				router.refresh();
				reset();
				reviewModal.onClose();
			})
			.catch(() => {
				toast(toastMessages.reviewCreated.error);
			});

		setIsLoading(false);
		reset();
	};

	const bodyContent = (
		<div className='flex flex-col '>
			<div className='text-sm text-neutral-500'>
				Your feedback not only helps us enhance our service, but also gives you a chance to be
				featured on our website or social media, showcasing your special moment and connecting with
				a global community of fans.
			</div>

			<div className='my-6 self-center'>
				<StarReview
					setValue={setValue}
					id='rating'
					register={register}
					errors={errors}
					readOnly={false}
					medium
				/>
			</div>
			<TextArea
				id='message'
				label='Review'
				disabled={isLoading}
				register={register}
				errors={errors}
				placeholder='How did you like your youmee video?'
				required
			/>
			<Checkbox
				onSelected={() => setValue('publicizeConsent', true)}
				id='publicDisplay'
				label='I want this review to be displayed on the creators profile'
			/>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={reviewModal.isOpen}
			actionLabel='Send'
			title={`Review for ${reviewModal.targetUser?.name}`}
			secondaryAction={reviewModal.onClose}
			secondaryActionLabel='Cancel'
			onClose={reviewModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
};

export default ReviewModal;
