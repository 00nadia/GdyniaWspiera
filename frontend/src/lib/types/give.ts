import type { Multilingual, OfferContact } from './offers';

export type GiveCategory = 'food' | 'clothing' | 'other';

export interface GiveOffer {
	id: string;
	name: Multilingual;
	category: GiveCategory;
	descriptionShort: Multilingual;
	place: Multilingual;
	address: string;
	district: string;
	contact: OfferContact;
	openingHours: Multilingual;
	targetGroup: Multilingual;
	url: string;
}
