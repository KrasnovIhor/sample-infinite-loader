import { useState } from 'react';
import { useLastUpdate } from './useLastUpdate';

export const useMount = (milliSeconds = 100) => {
	const [mounted, setMounted] = useState(false);

	useLastUpdate(() => {
		setMounted(true);
	}, milliSeconds);

	return mounted;
};
