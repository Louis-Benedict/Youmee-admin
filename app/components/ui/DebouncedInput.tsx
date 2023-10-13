import { useEffect, useState } from 'react';

export function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<input
			className='	peer
				block w-full px-2 py-2 pl-10 text-sm focus:outline-none text-gray-900  rounded-lg bg-gray-50 focus:ring-accent-dark focus:border-accent-dark dark:bg-white dark:border-white dark:placeholder-gray-500 dark:text-primary-dark dark:focus:ring-accent-dark dark:focus:border-accent-dark'
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}
