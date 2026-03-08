<script lang="ts">
	import { fontSize, colorMode, type FontSize, type ColorMode } from '$lib/stores/accessibility';
	import { get } from 'svelte/store';
	import { t } from '$lib/i18n';

	let currentFont: FontSize = get(fontSize);
	let currentColor: ColorMode = get(colorMode);

	const setFont = (value: FontSize) => {
		currentFont = value;
		fontSize.set(value);
	};

	const setColor = (value: ColorMode) => {
		currentColor = value;
		colorMode.set(value);
	};
</script>

<div
	aria-label={$t('accessibility.settings')}
	style="
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		background: rgba(255, 255, 255, 0.9);
		padding: 0.2rem 0.45rem;
		border-radius: 999px;
	"
>
	<div style="display: inline-flex; align-items: center; gap: 0.15rem;">
		<button
			type="button"
			on:click={() => setFont('normal')}
			aria-label={$t('accessibility.fontNormal')}
			style="
				border-radius: 999px;
				border: none;
				background: {currentFont === 'normal' ? 'var(--color-primary-soft)' : 'transparent'};
				padding: 0.15rem 0.35rem;
				font-size: 0.7rem;
				cursor: pointer;
			"
		>
			A
		</button>
		<button
			type="button"
			on:click={() => setFont('large')}
			aria-label={$t('accessibility.fontLarge')}
			style="
				border-radius: 999px;
				border: none;
				background: {currentFont === 'large' ? 'var(--color-primary-soft)' : 'transparent'};
				padding: 0.15rem 0.35rem;
				font-size: 0.85rem;
				cursor: pointer;
			"
		>
			A
		</button>
		<button
			type="button"
			on:click={() => setFont('xlarge')}
			aria-label={$t('accessibility.fontXLarge')}
			style="
				border-radius: 999px;
				border: none;
				background: {currentFont === 'xlarge' ? 'var(--color-primary-soft)' : 'transparent'};
				padding: 0.15rem 0.35rem;
				font-size: 1rem;
				cursor: pointer;
			"
		>
			A
		</button>
	</div>

	<div
		style="
			width: 1px;
			height: 1rem;
			background: var(--color-border-subtle);
		"
	></div>

	<div style="display: inline-flex; align-items: center; gap: 0.15rem;">
		<button
			type="button"
			on:click={() => setColor('color')}
			aria-label={$t('accessibility.colorVersion')}
			style="
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 999px;
				border: 1px solid var(--color-border-subtle);
				background: conic-gradient(from 200deg, #0056a6, #00a6b4, #ffd166, #0056a6);
				outline: {currentColor === 'color' ? '2px solid var(--color-primary-soft)' : 'none'};
				cursor: pointer;
			"
		></button>
		<button
			type="button"
			on:click={() => setColor('high-contrast')}
			aria-label={$t('accessibility.highContrast')}
			style="
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 999px;
				border: 1px solid var(--color-border-subtle);
				background: linear-gradient(135deg, #000, #fff);
				outline: {currentColor === 'high-contrast' ? '2px solid var(--color-primary-soft)' : 'none'};
				cursor: pointer;
			"
		></button>
		<button
			type="button"
			on:click={() => setColor('mono')}
			aria-label={$t('accessibility.blackWhite')}
			style="
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 999px;
				border: 1px solid var(--color-border-subtle);
				background: #f1f1f1;
				outline: {currentColor === 'mono' ? '2px solid var(--color-primary-soft)' : 'none'};
				cursor: pointer;
			"
		></button>
	</div>
</div>

