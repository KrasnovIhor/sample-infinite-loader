export type Airline = {
	id: number;
	name: string;
	country: string;
	logo: string;
	slogan: string;
	head_quaters: string;
	website: string;
	established: string;
};

export type Passenger = {
	_id: string;
	name: string;
	trips: number;
	airline: Airline[];
	__v: number;
};

export interface ServerResponse {
	totalPassengers: number;
	totalPages: number;
	data: Passenger[];
}
