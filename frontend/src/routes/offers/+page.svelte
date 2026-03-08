<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { filterOffers } from '$lib/utils/offerFilters';
	import type { OfferFilter } from '$lib/utils/offerFilters';
	import OfferCard from '$lib/components/OfferCard.svelte';
	import OfferMap from '$lib/components/OfferMap.svelte';

	let { data }: { data: PageData } = $props();
	let ctaHovered = $state(false);

	let filter = $state<OfferFilter>({
		query: data.initialQuery,
		institutionType: (data.initialType || '') as OfferFilter['institutionType'],
		category: '',
		district: 'all'
	});

	const getVisibleOffers = () => filterOffers(data.offers, filter);
</script>

<section aria-labelledby="offers-title" style="margin-bottom: 1.5rem;">
	<h1 id="offers-title" style="margin: 0 0 0.5rem; font-size: 1.5rem;">
		{$t('nav.offers')} ({getVisibleOffers().length})
	</h1>
	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.9rem;">
		{$t('offers.subtitle')}
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
		<div style="font-weight: 600;">{$t('offers.filters')}</div>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('offers.problemCategory')}</span>
			<select
				bind:value={filter.category}
				name="category"
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="">{$t('search.any')}</option>
				<option value="abuse">{$t('categories.abuse')}</option>
				<option value="addiction">{$t('categories.addiction')}</option>
				<option value="financial">{$t('categories.financial')}</option>
				<option value="mental_health">{$t('categories.mentalHealth')}</option>
				<option value="housing">{$t('offers.housingHomelessness')}</option>
				<option value="family">{$t('categories.family')}</option>
				<option value="legal">{$t('categories.legal')}</option>
				<option value="migration">{$t('categories.migration')}</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('offers.centerType')}</span>
			<select
				bind:value={filter.institutionType}
				name="type"
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="">{$t('search.any')}</option>
				<option value="therapist">{$t('search.therapy')}</option>
				<option value="lawyer">{$t('search.legalAdvice')}</option>
				<option value="social_worker">{$t('offers.socialWorker')}</option>
				<option value="crisis_center">{$t('offers.crisisCenter')}</option>
				<option value="support_group">{$t('search.supportGroup')}</option>
				<option value="hotline">{$t('offers.hotline')}</option>
				<option value="shelter">{$t('offers.shelter')}</option>
				<option value="other">{$t('offers.other')}</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('offers.district')}</span>
			<select
				bind:value={filter.district}
				name="district"
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="all">{$t('offers.allGdynia')}</option>
				<option value="Śródmieście">Śródmieście</option>
				<option value="Grabówek">Grabówek</option>
				<option value="Chylonia">Chylonia</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>{$t('offers.searchKeyword')}</span>
			<input
				bind:value={filter.query}
				name="q"
				type="search"
				placeholder={$t('offers.keywordPlaceholder')}
				style="
					border-radius: 999px;
					border: 1px solid var(--color-border-subtle);
					padding: 0.35rem 0.7rem;
				"
			/>
		</label>
	</form>

	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		{#if getVisibleOffers().length === 0}
			<div
				style="
					padding: 1rem 1.2rem;
					border-radius: 16px;
					background: rgba(255, 255, 255, 0.96);
					box-shadow: 0 8px 20px rgba(9, 25, 53, 0.08);
					font-size: 0.9rem;
				"
			>
				<strong>{$t('offers.noResults')}</strong>
				<div style="margin-top: 0.25rem; color: var(--color-text-muted);">
					{$t('offers.noResultsHint')}
				</div>
			</div>
		{:else}
			{#each getVisibleOffers() as offer}
				<OfferCard {offer} />
			{/each}
		{/if}

		{#if getVisibleOffers().length > 0}
			<OfferMap offers={getVisibleOffers()} />
		{/if}
	</div>
</section>

<!-- Call to Action Section -->
<section
	aria-labelledby="cta-title"
	style="
		margin-top: 3rem;
		padding: 2.5rem;
		background: linear-gradient(135deg, rgba(0, 86, 166, 0.08) 0%, rgba(0, 166, 180, 0.08) 100%);
		border: 1px solid rgba(0, 86, 166, 0.12);
		border-radius: 16px;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	"
>
	<h2 id="cta-title" style="margin: 0; font-size: 1.5rem; color: var(--color-text);">
		{$t('offers.notFoundTitle')}
	</h2>
	<p style="margin: 0; color: var(--color-text-muted); max-width: 500px; font-size: 1rem;">
		{$t('offers.notFoundDesc')}
	</p>
	<a
		href="/submit-problem"
		style="
			padding: 0.75rem 1.8rem;
			border-radius: 999px;
			background: var(--color-primary);
			color: white;
			font-weight: 600;
			text-decoration: none;
			display: inline-block;
			margin-top: 0.5rem;
			transition: opacity 0.2s ease;
			{ctaHovered ? 'opacity: 0.9;' : 'opacity: 1;'}
		"
		onmouseover={() => (ctaHovered = true)}
		onmouseout={() => (ctaHovered = false)}
	>
		{$t('offers.notFoundButton')}
	</a>
</section>

<style>
	@media (max-width: 900px) {
		section[aria-labelledby='offers-title'] + section {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

