import { CSSProperties, FC, useMemo } from 'react';
import { Passenger } from '../../types';

type ItemProps = {
	index: number;
	style: CSSProperties;
	item?: Passenger;
	isItemLoaded: (index: number) => boolean;
};

export const Item: FC<ItemProps> = ({ index, style, item, isItemLoaded }) => {
	const content = useMemo(() => {
		if (!isItemLoaded(index)) {
			return 'Loading...';
		}
		return (item?.name || '') + ' ' + item?._id;
	}, [index, isItemLoaded, item?._id, item?.name]);

	return <div style={style}>{content}</div>;
};
