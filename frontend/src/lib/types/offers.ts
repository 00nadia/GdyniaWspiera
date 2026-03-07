export type ProblemCategory =
	| 'abuse'
	| 'addiction'
	| 'financial'
	| 'mental_health'
	| 'housing'
	| 'family'
	| 'legal'
	| 'migration';

export type InstitutionType =
	| 'therapist'
	| 'lawyer'
	| 'social_worker'
	| 'crisis_center'
	| 'support_group'
	| 'hotline'
	| 'shelter'
	| 'other';

export interface OfferContact {
	phone?: string;
	email?: string;
	website?: string;
}

export interface OpeningHoursRange {
	day: string;
	from: string;
	to: string;
}

export interface LatLng {
	lat: number;
	lng: number;
}

export interface Offer {
	id: string;
	name: string;
	institutionType: InstitutionType;
	categories: ProblemCategory[];
	descriptionShort: string;
	descriptionLong: string;
	address: string;
	district: string;
	city: string;
	postalCode: string;
	location: LatLng;
	contact: OfferContact;
	openingHours: OpeningHoursRange[];
	targetGroups: string[];
	languagesOffered: string[];
	isOnlineAvailable: boolean;
	verifiedBy: string;
	lastUpdated: string;
	isFree: boolean;
}

