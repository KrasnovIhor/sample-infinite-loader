import { FC, useCallback, useContext } from 'react';
import InfiniteLoader from 'react-window-infinite-loader';
import { VariableSizeList as List } from 'react-window';
import { Item } from 'components/Item';
import { Passenger } from 'types';
import { useMemo } from 'react';
import { SampleContext } from 'providers';

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
	const { listRef, sizeMap, listHeight, chatHistoryRef } = useContext(SampleContext);
	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const itemCount = useMemo(
		() => (hasNextPage ? items.length + 1 : items.length),
		[hasNextPage, items.length]
	);

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreItems = useMemo(
		() => (isNextPageLoading ? () => {} : loadNextPage),
		[isNextPageLoading, loadNextPage]
	);

	// Every row is loaded except for our loading indicator row.
	const isItemLoaded = useCallback(
		(index: number) => !hasNextPage || index < items.length,
		[hasNextPage, items.length]
	);

	const getItemSize = useCallback((index: number) => sizeMap.current?.[index] || 40, [sizeMap]);

	return (
		<div className='outer-list' ref={chatHistoryRef}>
			<InfiniteLoader
				isItemLoaded={isItemLoaded}
				itemCount={itemCount}
				loadMoreItems={loadMoreItems}>
				{({ onItemsRendered }) => (
					<List
						useIsScrolling
						estimatedItemSize={50}
						className='List'
						height={listHeight}
						itemCount={itemCount}
						itemSize={getItemSize}
						itemKey={(index, data) => (data[index] ? data[index]._id : index)}
						itemData={items}
						onItemsRendered={onItemsRendered}
						ref={listRef}
						width='50%'>
						{({ index, style, data, isScrolling }) => (
							<Item
								isScrolling={isScrolling}
								getItemSize={getItemSize}
								index={index}
								style={style}
								item={data[index]}
								isItemLoaded={isItemLoaded}
							/>
						)}
					</List>
				)}
			</InfiniteLoader>
		</div>
	);
};
