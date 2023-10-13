import { Children, InputHTMLAttributes, ReactElement, cloneElement } from 'react';
import { RadioButtonElementProps } from './RadioButton';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';
import { ZodSchema } from 'zod';

export interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
	children: ReactElement<RadioButtonElementProps>[];
	group: string;
	register: UseFormRegister<any>;
	errors: FieldErrors;
}

const RadioButtonContainer = ({
	group,
	children,
	register,
	errors,
	...props
}: InputElementProps) => {
	const newChildren = Children.map(children, (child) => {
		return cloneElement(child, { register: register, errors: errors, group: group });
	});
	return (
		<>
			{/* <div>{errors[group]?.message?.toString()}</div> */}
			<div className={props.className}>{newChildren}</div>
		</>
	);
};

export default RadioButtonContainer;
