export const useIsSafari = (): boolean => {
	if (typeof window == undefined) return false;
	const userAgent = navigator?.userAgent?.toLowerCase();
	return !!(
		userAgent?.indexOf('safari') > -1 && userAgent?.indexOf('chrome') < 0
	);
};
