import { createContext } from 'react';
import { VariableSizeList } from 'react-window';
import { Passenger } from '../types';

interface SampleContextType {
	setSize: (index: number, size: number) => void;
	windowSize: [number, number];
	listHeight: number;
	listRef: React.RefObject<VariableSizeList<Passenger[]>>;
	chatHistoryRef: React.RefObject<HTMLDivElement>;
	sizeMap: React.RefObject<Record<number, number>>;
}

export const SampleContext = createContext<SampleContextType>({
	setSize: () => {},
	windowSize: [0, 0],
	listRef: { current: null },
	chatHistoryRef: { current: null },
	sizeMap: { current: {} },
	listHeight: 0,
});
