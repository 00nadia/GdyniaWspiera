import type { Multilingual, OfferContact } from './offers';

export type VolunteeringCategory = 'internship' | 'volunteering' | 'support_center';

export interface VolunteeringOffer {
	id: string;
	name: Multilingual;
	category: VolunteeringCategory;
	descriptionShort: Multilingual;
	descriptionLong: Multilingual;
	place: Multilingual;
	address: string;
	district: string;
	contact: OfferContact;
	openingHours: Multilingual;
	targetGroup: Multilingual;
	duration: Multilingual;
	schedule: Multilingual;
	requirements: Multilingual;
	recruitment: Multilingual;
	url: string;
	isFree: boolean;
}
