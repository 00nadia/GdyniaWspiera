import type { PageLoad } from './$types';
import type { VolunteeringOffer } from '$lib/types/volunteering';
import rawOffers from '$lib/data/volunteering.json';
import { error } from '@sveltejs/kit';

const offers = rawOffers as VolunteeringOffer[];

export const load: PageLoad = ({ params }) => {
	const offer = offers.find((o) => o.id === params.id);

	if (!offer) {
		throw error(404, 'Offer not found');
	}

	return {
		offer
	};
};
