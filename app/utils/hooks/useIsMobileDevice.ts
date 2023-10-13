import { useState, useEffect } from 'react';

const useIsMobileDevice = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const userAgent = window.navigator.userAgent;
		const mobileRegex =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
		const screenWidth = window.innerWidth;

		setIsMobile(mobileRegex.test(userAgent) || screenWidth <= 768); // Adjust the width as needed
	}, []);

	return isMobile;
};

export default useIsMobileDevice;
