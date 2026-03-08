<script lang="ts">
	import { t, locale } from '$lib/i18n';
	import { getText } from '$lib/types/offers';
	import type { GiveOffer, GiveCategory } from '$lib/types/give';
	import giveData from '$lib/data/give.json';
	import GiveCard from '$lib/components/GiveCard.svelte';

	const allOffers = giveData as GiveOffer[];

	let filterCategory = $state<GiveCategory | ''>('');
	let filterQuery = $state('');
	let filterDistrict = $state('all');

	const districts = [...new Set(allOffers.map(o => o.district))].sort();

	const getFiltered = () => {
		let result = allOffers;
		if (filterCategory) {
			result = result.filter(o => o.category === filterCategory);
		}
		if (filterDistrict !== 'all') {
			result = result.filter(o => o.district === filterDistrict);
		}
		if (filterQuery.trim()) {
			const q = filterQuery.toLowerCase();
			result = result.filter(o => {
				const lang = $locale ?? 'pl';
				const name = getText(o.name, lang).toLowerCase();
				const desc = getText(o.descriptionShort, lang).toLowerCase();
				const place = getText(o.place, lang).toLowerCase();
				const target = getText(o.targetGroup, lang).toLowerCase();
				const address = o.address.toLowerCase();
				return name.includes(q) || desc.includes(q) || place.includes(q) || target.includes(q) || address.includes(q);
			});
		}
		return result;
	};
</script>

<section aria-labelledby="give-title" style="margin-bottom: 1.5rem;">
	<h1 id="give-title" style="margin: 0 0 0.5rem; font-size: 1.5rem;">
		{$t('nav.give')} ({getFiltered().length})
	</h1>
	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.9rem;">
		{$t('give.subtitle')}
	</p>
</section>

<section
	style="
		display: grid;
		grid-template-columns: minmax(0, 2.1fr) minmax(0, 2.5fr);
		gap: 1.5rem;
		align-items: flex-start;
	"
>
	<form
		method="get"
		style="
			display: flex;
			flex-direction: column;
			gap: 0.9rem;
			background: rgba(255, 255, 255, 0.96);
			padding: 1rem 1.1rem 1.2rem;
			border-radius: 18px;
			box-shadow: 0 10px 24px rgba(9, 25, 53, 0.08);
			font-size: 0.9rem;
		"
	>
		<div style="font-weight: 600;">{$t('give.filters')}</div>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('give.categoryLabel')}</span>
			<select
				bind:value={filterCategory}
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="">{$t('search.any')}</option>
				<option value="food">{$t('give.cat_food')}</option>
				<option value="clothing">{$t('give.cat_clothing')}</option>
				<option value="other">{$t('give.cat_other')}</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('offers.district')}</span>
			<select
				bind:value={filterDistrict}
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="all">{$t('offers.allGdynia')}</option>
				{#each districts as d}
					<option value={d}>{d}</option>
				{/each}
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('give.searchLabel')}</span>
			<input
				type="search"
				bind:value={filterQuery}
				placeholder={$t('give.searchPlaceholder')}
				style="
					border-radius: 999px;
					border: 1px solid var(--color-border-subtle);
					padding: 0.35rem 0.7rem;
				"
			/>
		</label>
	</form>

	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		{#if getFiltered().length === 0}
			<div
				style="
					padding: 1rem 1.2rem;
					border-radius: 16px;
					background: rgba(255, 255, 255, 0.96);
					box-shadow: 0 8px 20px rgba(9, 25, 53, 0.08);
					font-size: 0.9rem;
				"
			>
				<strong>{$t('give.noResults')}</strong>
				<div style="margin-top: 0.25rem; color: var(--color-text-muted);">
					{$t('give.noResultsHint')}
				</div>
			</div>
		{:else}
			{#each getFiltered() as offer (offer.id)}
				<GiveCard {offer} />
			{/each}
		{/if}
	</div>
</section>

<style>
	@media (max-width: 900px) {
		section[aria-labelledby='give-title'] + section {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
