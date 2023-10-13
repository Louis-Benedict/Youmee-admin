const getUserAgent = () => {
	return navigator.userAgent || navigator.vendor;
};

const getPlatform = () => {
	return navigator.platform;
};

const isIos = () => {
	const isPlus13iPad = getUserAgent().includes('Mac') && 'ontouchend' in document;
	return /iPhone|iPad|iPod/.test(getPlatform()) || isPlus13iPad;
};

const isWindowsPhone = () => {
	return /windows phone/i.test(getUserAgent());
};

const isAndroid = () => {
	return /Android/.test(getUserAgent());
};

const isMac = () => {
	return /Mac/.test(getPlatform());
};

const isWindows = () => {
	return /Win/.test(getPlatform());
};

const isLinux = () => {
	return /Linux/.test(getPlatform()) && !isAndroid();
};

export const isMobile = () => {
	return isIos() || isAndroid();
};

export const detectOS = () => {
	if (isIos()) return 'iOS';
	if (isWindowsPhone()) return 'Windows Phone';
	if (isAndroid()) return 'Android';
	if (isMac()) return 'Mac';
	if (isWindows()) return 'Windows';
	if (isLinux()) return 'Linux';
	return null;
};
