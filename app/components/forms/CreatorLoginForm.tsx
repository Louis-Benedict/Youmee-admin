import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form/dist/types';
import Input from '../inputs/Input';
import Heading from '../ui/Heading';
import Button from '../ui/Button/BaseButton';
import {
	CreatorLoginSchema,
	creatorLoginSchema,
} from '@/app/libs/validation/authValidation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// interface CreatorLoginFormProps {
// 	register: UseFormRegister<CreatorLoginSchema>;
// 	errors: FieldErrors;
// 	isLoading: boolean;
// 	onSubmit: () => void;
// }

const CreatorLoginForm = ({}) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<CreatorLoginSchema>({
		resolver: zodResolver(creatorLoginSchema),
	});

	const onSubmit: SubmitHandler<CreatorLoginSchema> = (data, errors) => {
		console.log(data);
		console.log(errors);
	};
	return (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Welcome back'
				subtitle='Login to your account!'
			/>
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				label='Password'
				type='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Button
				label='Continue'
				onClick={handleSubmit(onSubmit)}
			/>
		</div>
	);
};

export default CreatorLoginForm;
