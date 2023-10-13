import { countries } from '@/app/static/countries';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';
import { Schema, ZodSchema } from 'zod';

interface SocialMediaInputProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
	isLoading: boolean;
	disabled: boolean;
	id: string;
	label: string;
	options: string[];
}

const SocialMediaInput: FC<SocialMediaInputProps> = ({
	options,
	label,
	register,
	errors,
	isLoading,
	disabled,
	id,
}) => {
	return (
		<div className='w-full relative'>
			<div className='absolute -top-5 left-2 text-sm  text-neutral-500'>
				<label htmlFor={id}>{label}</label>
			</div>
			<select
				{...register(id)}
				disabled={isLoading}
				className='     
                        relative
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        rounded-md
                        hover:opacity-70
                        transition
                        w-full
                        border-2
                        text-sm
                        border-neutral-600
                        p-3
						text-neutral-400
                        bg-secondary-dark
                        appearance-none
                        '>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
			<div className='absolute top-1/2 -translate-y-1/2 right-3'>
				<ChevronDown size={26} />
			</div>
			<div className='text-accent-dark text-xs'>{errors[id]?.message?.toString()}</div>
		</div>
	);
};

export default SocialMediaInput;
