import { useEffect, useState } from 'react';

// Define the type for the initial value
type InitialValue<T> = T | (() => T);

const useLocalStorage = <T>(
	key: string,
	initialValue: InitialValue<T>
): {
	value: T;
	setValue: (value: T) => void;
	removeValue: () => void;
} => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				const item = window.localStorage.getItem(key);
				if (item !== null) {
					setStoredValue(JSON.parse(item));
				}
			} catch (error) {
				console.error('Error retrieving value from local storage:', error);
			}
		}
	}, [key]);

	// Retrieve the value from local storage (if available) or use the initial value
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window !== 'undefined') {
			try {
				const item = window.localStorage.getItem(key);
				return item
					? JSON.parse(item)
					: initialValue instanceof Function
					? initialValue()
					: initialValue;
			} catch (error) {
				console.error('Error retrieving value from local storage:', error);
				return initialValue instanceof Function ? initialValue() : initialValue;
			}
		}
		return initialValue instanceof Function ? initialValue() : initialValue;
	});

	// Update the value in local storage whenever the state changes
	const setValue = (value: T): void => {
		if (typeof window !== 'undefined') {
			try {
				const valueToStore =
					value instanceof Function ? value(storedValue) : value;
				setStoredValue(valueToStore);
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				console.error('Error saving value to local storage:', error);
			}
		}
	};

	// Remove the item from local storage
	const removeValue = (): void => {
		if (typeof window !== 'undefined') {
			try {
				window.localStorage.removeItem(key);
				setStoredValue(
					initialValue instanceof Function ? initialValue() : initialValue
				);
			} catch (error) {
				console.error('Error removing value from local storage:', error);
			}
		}
	};

	return {
		value: storedValue,
		setValue,
		removeValue,
	};
};

export default useLocalStorage;
