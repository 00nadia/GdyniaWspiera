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
	day: Multilingual | string;
	from: string;
	to: string;
}

export interface LatLng {
	lat: number;
	lng: number;
}

export interface Multilingual {
	pl: string;
	en: string;
	uk: string;
}

export interface Offer {
	id: string;
	name: Multilingual | string;
	institutionType: InstitutionType;
	categories: ProblemCategory[];
	descriptionShort: Multilingual | string;
	descriptionLong: Multilingual | string;
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

// Helper function to get text in a specific language
export function getText(
	text: Multilingual | string,
	lang: 'pl' | 'en' | 'uk' = 'pl'
): string {
	if (typeof text === 'string') {
		return text;
	}
	return text[lang] || text.pl;
}

