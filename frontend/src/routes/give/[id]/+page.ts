import type { PageLoad } from './$types';
import type { GiveOffer } from '$lib/types/give';
import rawOffers from '$lib/data/give.json';
import { error } from '@sveltejs/kit';

const offers = rawOffers as GiveOffer[];

export const load: PageLoad = ({ params }) => {
	const offer = offers.find((o) => o.id === params.id);

	if (!offer) {
		throw error(404, 'Offer not found');
	}

	return {
		offer
	};
};
