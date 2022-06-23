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
	isScrolling?: boolean;
};

export const Item = ({ index, style, item, isItemLoaded, isScrolling }: ItemProps) => {
	const { setSize, windowSize } = useContext(SampleContext);
	const [windowWidth] = windowSize;

	const itemRef = useRef<HTMLDivElement>(null);

	const content = useMemo(() => {
		if (!isItemLoaded(index)) {
			return 'Loading...';
		}
		return `${index} ${item?.name || ''}`;
	}, [index, isItemLoaded, item]);

	useEffect(() => {
		if (itemRef.current) {
			const height = itemRef.current.getBoundingClientRect().height;

			setSize(index, height);
		}
	}, [index, setSize, windowWidth]);

	return (
		<div style={style}>
			<div
				className='ListItem'
				ref={itemRef}
				style={{
					backgroundColor: index % 2 ? 'slategray' : 'wheat',
				}}>
				{content}
			</div>
		</div>
	);
};
