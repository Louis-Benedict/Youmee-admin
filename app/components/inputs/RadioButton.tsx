import { ChangeEvent, FC, InputHTMLAttributes, MouseEvent } from 'react';
import {
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form/dist/types';

export interface RadioButtonElementProps
	extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	key?: string;
	disabled?: boolean;
	register?: UseFormRegister<FieldValues>;
	errors?: FieldErrors;
	value: string;
	group?: string;
	checked?: boolean;
	label: string;
	onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}

const RadioButton: FC<RadioButtonElementProps> = ({
	id,
	group = '',
	register,
	disabled,
	value,
	onClick,
	label,
	...props
}) => {
	return (
		<div>
			<input
				{...register?.(group)}
				onClick={onClick}
				type='radio'
				value={value}
				disabled={disabled}
				id={id}
				className='hidden peer'
				{...props}
			/>
			<label
				htmlFor={id}
				className='  
					block
					disabled:opacity-50
					disabled:cursor-not-allowed
					rounded-lg
					hover:opacity-70
					text-xs
					font-semibold
					dark:bg-primary-dark
					bg-white
					gap-2
					py-2
					px-3
					mr-1
					border-2
					border-transparent
					transition
					cursor-pointer
					peer-checked:border-neutral-800
				  dark:peer-checked:border-white
				  peer-checked:dark:text-white dark:text-neutral-300 text-primary-dark'>
				{label}
			</label>
		</div>
	);
};

export default RadioButton;
