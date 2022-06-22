import { CSSProperties, useEffect, useMemo, useRef, useContext } from 'react';
import { SampleContext } from 'providers';
import { Passenger } from 'types';

type ItemProps = {
	index: number;
	style: CSSProperties;
	item?: Passenger;
	isItemLoaded: (index: number) => boolean;
	getItemSize: (index: number) => number;
	retrieveSize?: (height: number, index: number) => void;
};

export const Item = ({ index, style, item, isItemLoaded }: ItemProps) => {
	const { setSize, windowSize } = useContext(SampleContext);
	const [windowWidth] = windowSize;

	const itemRef = useRef<HTMLDivElement>(null);

	const content = useMemo(() => {
		if (!isItemLoaded(index)) {
			return 'Loading...';
		}
		return (item?.name || '') + ' ' + item?._id + ' ' + index;
	}, [index, isItemLoaded, item?._id, item?.name]);

	useEffect(() => {
		if (itemRef.current) {
			setSize(index, itemRef.current.offsetHeight);
			// console.log(itemRef.current, itemRef.current.offsetHeight);
		}
	}, [index, setSize, windowWidth]);

	return (
		<div className='ListItem' ref={itemRef} style={style}>
			{content}
		</div>
	);
};
