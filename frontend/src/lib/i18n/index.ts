import { browser } from '$app/environment';
import { writable, type Readable } from 'svelte/store';
import { register, init, getLocaleFromNavigator, locale as i18nLocale, _ } from 'svelte-i18n';

const STORAGE_KEY = 'gw_locale';

export const SUPPORTED_LOCALES = ['pl', 'en', 'uk'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function setupI18n() {
	register('pl', () => import('./pl.json'));
	register('en', () => import('./en.json'));
	register('uk', () => import('./uk.json'));

	let initial = 'pl';

	if (browser) {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
			initial = stored;
		} else {
			const fromNavigator = getLocaleFromNavigator()?.slice(0, 2) as SupportedLocale | undefined;
			if (fromNavigator && SUPPORTED_LOCALES.includes(fromNavigator)) {
				initial = fromNavigator;
			}
		}
	}

	init({
		fallbackLocale: 'pl',
		initialLocale: initial
	});
}

export const locale = writable<SupportedLocale>('pl');

locale.subscribe((value) => {
	i18nLocale.set(value);
	if (browser) {
		window.localStorage.setItem(STORAGE_KEY, value);
	}
});

export const t = _ as Readable<(key: string, options?: Record<string, unknown>) => string>;

