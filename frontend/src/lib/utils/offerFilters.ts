import type { Offer, ProblemCategory, InstitutionType } from '$lib/types/offers';

export interface OfferFilter {
	query?: string;
	category?: ProblemCategory | '';
	institutionType?: InstitutionType | '';
	district?: string;
}

export function filterOffers(offers: Offer[], filter: OfferFilter): Offer[] {
	const q = filter.query?.trim().toLowerCase() ?? '';
	return offers.filter((offer) => {
		if (filter.category && !offer.categories.includes(filter.category)) return false;
		if (filter.institutionType && offer.institutionType !== filter.institutionType) return false;
		if (filter.district && filter.district !== 'all' && offer.district !== filter.district) return false;

		if (q) {
			const haystack = [
				offer.name,
				offer.descriptionShort,
				offer.descriptionLong,
				offer.district,
				offer.categories.join(' '),
				offer.institutionType
			]
				.join(' ')
				.toLowerCase();
			if (!haystack.includes(q)) return false;
		}

		return true;
	});
}

