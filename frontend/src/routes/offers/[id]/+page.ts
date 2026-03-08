import type { PageLoad } from './$types';
import type { Offer } from '$lib/types/offers';
import rawOffers from '$lib/data/offers.json';
import { error } from '@sveltejs/kit';

const offers = rawOffers as Offer[];

export const load: PageLoad = ({ params }) => {
	const offer = offers.find((o) => o.id === params.id);

	if (!offer) {
		throw error(404, 'Offer not found');
	}

	return {
		offer
	};
};

