export const useIsChrome = (): boolean => {
	if (typeof window === undefined) return false;
	const userAgent = navigator?.userAgent?.toLowerCase();
	return !!(userAgent?.indexOf('chrome') > -1);
};
