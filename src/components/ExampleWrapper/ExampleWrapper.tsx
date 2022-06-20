import { FC, useCallback } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList as List } from 'react-window';
import { Item } from '../Item';
import { Passenger } from '../../types';

type Props = {
	// Are there more items to load?
	// (This information comes from the most recent API request.)
	hasNextPage: boolean;

	// Are we currently loading a page of items?
	// (This may be an in-flight flag in your Redux store for example.)
	isNextPageLoading: boolean;

	// Array of items loaded so far.
	items: Passenger[];

	// Callback function responsible for loading the next page of items.
	loadNextPage: (startingIndex: number, stopIndex: number) => void | Promise<void>;
};

export const ExampleWrapper: FC<Props> = ({
	hasNextPage,
	isNextPageLoading,
	items,
	loadNextPage,
}) => {
	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = hasNextPage ? items.length + 1 : items.length;

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

	// Every row is loaded except for our loading indicator row.
	const isItemLoaded = useCallback(
		(index: number) => !hasNextPage || index < items.length,
		[hasNextPage, items.length]
	);

	return (
		<InfiniteLoader isItemLoaded={isItemLoaded} itemCount={itemCount} loadMoreItems={loadMoreItems}>
			{({ onItemsRendered, ref }) => (
				<List
					useIsScrolling
					className='List'
					height={450}
					itemCount={itemCount}
					itemSize={50}
					onItemsRendered={onItemsRendered}
					ref={ref}
					width={300}>
					{({ index, style }) => (
						<Item index={index} style={style} item={items[index]} isItemLoaded={isItemLoaded} />
					)}
				</List>
			)}
		</InfiniteLoader>
	);
};
