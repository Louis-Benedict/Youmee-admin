import { useCallback, useState } from 'react';

type Result = {
	on: () => void;
	off: () => void;
	toggle: () => void;
	value: boolean;
};

const useToggle = (initialState = false, onChange?: (value: boolean) => void): Result => {
	const [value, setValueBase] = useState<boolean>(initialState);

	const setValue = (nextValueOrCallback: any) => {
		setValueBase((prevValue) => {
			const nextValue =
				typeof nextValueOrCallback === 'function'
					? nextValueOrCallback(prevValue)
					: nextValueOrCallback;

			if (onChange) {
				onChange(nextValue);
			}

			return nextValue;
		});
	};

	const on = useCallback(() => {
		setValue(true);
	}, [setValue]);

	const off = useCallback(() => {
		setValue(false);
	}, [setValue]);

	const toggle = useCallback(() => {
		setValue((prevValue: any) => !prevValue);
	}, [setValue]);

	return {
		off,
		on,
		toggle,
		value,
	};
};

export default useToggle;
