import debounce from 'lodash/debounce';
import { useEffect, useRef } from 'react';

export const useLastUpdate = (callback?: () => void, milliSeconds = 100) => {
	const ref = useRef(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(
		debounce(() => {
			if (!ref.current) {
				callback?.();
			}
			ref.current = true;
		}, milliSeconds)
	);
};
