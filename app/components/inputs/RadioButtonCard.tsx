import { Icon } from 'lucide-react';
import { ChangeEvent, FC, InputHTMLAttributes, MouseEvent } from 'react';
import {
	FieldErrors,
	FieldValues,
	UseFormRegister,
} from 'react-hook-form/dist/types';

export interface RadioButtonCardElementProps
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
	Icon: Icon;
	price?: string;
	sublabel?: string;
	onClick?: (e: MouseEvent<HTMLInputElement>) => void;
}

const RadioButtonCard: FC<RadioButtonCardElementProps> = ({
	id,
	group = '',
	register,
	disabled,
	value,
	onClick,
	label,
	Icon,
	sublabel,
	price,
	...props
}) => {
	return (
		<div className='w-full'>
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
                    w-full select-none
					inline-block
                    text-center
					disabled:opacity-50
					disabled:cursor-not-allowed
					rounded-md
					hover:opacity-70
					font-semibold
					bg-secondary-dark
					py-6
					px-2
					border-2
					border-transparent
					transition
					cursor-pointer
				  peer-checked:border-white
				  peer-checked:dark:text-white text-primary-dark'>
				<div className='flex flex-col items-center gap-1'>
					<Icon
						size={18}
						className='mr-1'
					/>
					<div className='text-sm md:text-normal'>{label}</div>
					<div className=' mx-auto text-xs md:w-1/2 text-neutral-500 font-normal'>
						{sublabel}
					</div>
					<div className=' mx-auto  text-neutral-500 '>{price}</div>
				</div>
			</label>
		</div>
	);
};

export default RadioButtonCard;
