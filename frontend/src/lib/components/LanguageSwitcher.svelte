<script lang="ts">
	import { locale, SUPPORTED_LOCALES, type SupportedLocale, t } from '$lib/i18n';
	import { get } from 'svelte/store';

	let currentLocale: SupportedLocale = 'pl';

	const labels: Record<SupportedLocale, string> = {
		pl: get(t)('languages.pl'),
		en: get(t)('languages.en'),
		uk: get(t)('languages.uk')
	};

	const handleChange = (next: SupportedLocale) => {
		currentLocale = next;
		locale.set(next);
	};
</script>

<div style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem;">
	<label for="language-select" class="visually-hidden">Language</label>
	<select
		id="language-select"
		bind:value={currentLocale}
		on:change={(event) => handleChange((event.target as HTMLSelectElement).value as SupportedLocale)}
		style="
			border-radius: 999px;
			border: 1px solid var(--color-border-subtle);
			padding: 0.15rem 0.6rem;
			font-size: 0.8rem;
			background: rgba(255, 255, 255, 0.9);
		"
	>
		{#each SUPPORTED_LOCALES as code}
			<option value={code}>{labels[code]}</option>
		{/each}
	</select>
</div>

<style>
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>

