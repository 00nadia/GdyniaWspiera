import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type FontSize = 'normal' | 'large' | 'xlarge';
type ColorMode = 'color' | 'high-contrast' | 'mono';

const FONT_KEY = 'gw_font_size';
const COLOR_KEY = 'gw_color_mode';

const defaultFont: FontSize = 'normal';
const defaultColor: ColorMode = 'color';

export const fontSize = writable<FontSize>(defaultFont);
export const colorMode = writable<ColorMode>(defaultColor);

if (browser) {
	const storedFont = window.localStorage.getItem(FONT_KEY) as FontSize | null;
	const storedColor = window.localStorage.getItem(COLOR_KEY) as ColorMode | null;

	if (storedFont) fontSize.set(storedFont);
	if (storedColor) colorMode.set(storedColor);

	fontSize.subscribe((value) => {
		document.documentElement.dataset.fontSize = value;
		window.localStorage.setItem(FONT_KEY, value);
	});

	colorMode.subscribe((value) => {
		document.documentElement.dataset.colorMode = value;
		window.localStorage.setItem(COLOR_KEY, value);
	});
}

export type { FontSize, ColorMode };

