import type { PageLoad } from './$types';
import type { Offer } from '$lib/types/offers';
import rawOffers from '$lib/data/offers.json';

// Vite will type JSON as any; we assert Offer[]
const offers = rawOffers as Offer[];

export const load: PageLoad = ({ url }) => {
	const searchParams = url.searchParams;

	return {
		offers,
		initialQuery: searchParams.get('q') ?? '',
		initialType: searchParams.get('type') ?? '',
		mode: searchParams.get('mode') ?? 'need-help'
	};
};

