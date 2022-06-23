import { useState, useCallback } from 'react';
import { ExampleWrapper } from 'components/ExampleWrapper';
import { API, PAGE_LIMIT } from './constants';

import { Passenger, ServerResponse } from 'types';
import { faker } from '@faker-js/faker';

import './styles.css';

export default function App() {
	const [passengers, setPassengers] = useState<Passenger[]>([]);
	const [hasNextPage, setHasNextPage] = useState(true);
	const [isNextPageLoading, setIsNextPageLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);

	const fetchPassengers = useCallback(async (page: number = 0) => {
		const responseData: ServerResponse = await fetch(
			`${API}passenger?page=${page}&size=${PAGE_LIMIT}`
		)
			.then((res) => res.json())
			.then((data) => data);

		setTotalPages(responseData.totalPages);
		setPassengers((prev) => [
			...prev,
			...responseData.data.map((passenger, index, array) => ({
				...passenger,
				name: array[index].name + ' ' + faker.lorem.text(),
			})),
		]);

		return responseData;
	}, []);

	const loadNextPage = useCallback(
		async (..._: any) => {
			try {
				const currentPage = passengers.length / PAGE_LIMIT;
				setIsNextPageLoading(true);

				await fetchPassengers(currentPage);

				if (passengers.length < totalPages) {
					setHasNextPage(true);
				}
				setIsNextPageLoading(false);
			} catch (error) {
				console.error(error);
			}
		},
		[fetchPassengers, passengers.length, totalPages]
	);

	return (
		<ExampleWrapper
			items={passengers}
			hasNextPage={hasNextPage}
			isNextPageLoading={isNextPageLoading}
			loadNextPage={loadNextPage}
		/>
	);
}
