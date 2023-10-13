import { MutableRefObject, useCallback, useMemo } from 'react';

const useDocumentsUtils = (specificElement?: MutableRefObject<HTMLElement>) => {
	const disableScroll = () => {
		document.body.style.overflow = 'hidden';
	};

	const enableScroll = () => {
		document.body.style.overflow = 'unset';
	};

	const openFullscreen = useCallback(() => {
		if (document.fullscreenEnabled) {
			if (!!document.fullscreenElement) {
				document.body.requestFullscreen();
				return;
			}
		} else {
			console.log('Fullscreen is not supported');
		}
		console.log('Fullscreen is already enabled');
	}, []);

	const closeFullscreen = useCallback(() => {
		if (document && document.fullscreenElement) {
			document.body.requestFullscreen();
			return;
		}
	}, []);

	return { disableScroll, enableScroll, openFullscreen, closeFullscreen };
};

export default useDocumentsUtils;
