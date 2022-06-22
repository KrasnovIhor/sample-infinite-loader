import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { VariableSizeList } from 'react-window';
import { useWindowSize } from '../hooks';
import { Passenger } from '../types';
import { SampleContext } from './SampleContext';

type SampleProviderProps = {
	children?: ReactNode;
};

export const SampleProvider: FC<SampleProviderProps> = ({ children }) => {
	const [listHeight, setListHeight] = useState(0);

	const sizeMap = useRef<Record<number, number>>({});
	const chatHistoryRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<VariableSizeList<Passenger[]>>(null);

	const setSize = useCallback((index: number, size: number) => {
		sizeMap.current = { ...sizeMap.current, [index]: size };
	}, []);

	const windowSize = useWindowSize();

	useEffect(() => {
		if (chatHistoryRef.current) {
			setListHeight(chatHistoryRef.current.offsetHeight);
		}
	}, []);

	return (
		<SampleContext.Provider
			value={{ setSize, windowSize, listRef, sizeMap, listHeight, chatHistoryRef }}>
			{children}
		</SampleContext.Provider>
	);
};
