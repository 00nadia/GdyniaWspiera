<script lang="ts">
	import type { PageData } from './$types';
	import { t } from '$lib/i18n';
	import { filterOffers } from '$lib/utils/offerFilters';
	import type { OfferFilter } from '$lib/utils/offerFilters';
	import OfferCard from '$lib/components/OfferCard.svelte';
	import OfferMap from '$lib/components/OfferMap.svelte';

	let { data }: { data: PageData } = $props();

	let filter: OfferFilter = {
		query: data.initialQuery,
		institutionType: (data.initialType || '') as OfferFilter['institutionType'],
		category: '',
		district: 'all'
	};

	const getVisibleOffers = () => filterOffers(data.offers, filter);
</script>

<section aria-labelledby="offers-title" style="margin-bottom: 1.5rem;">
	<h1 id="offers-title" style="margin: 0 0 0.5rem; font-size: 1.5rem;">
		{$t('nav.offers')} ({getVisibleOffers().length})
	</h1>
	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.9rem;">
		Browse free, verified social help offers in Gdynia. Refine the results using the filters.
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
		<div style="font-weight: 600;">Filters</div>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>Problem category</span>
			<select
				bind:value={filter.category}
				name="category"
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="">Any</option>
				<option value="abuse">Violence and abuse</option>
				<option value="addiction">Addiction</option>
				<option value="financial">Financial difficulties</option>
				<option value="mental_health">Mental health</option>
				<option value="housing">Housing / homelessness</option>
				<option value="family">Family and upbringing</option>
				<option value="legal">Legal problems</option>
				<option value="migration">Migration and integration</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>Type of center</span>
			<select
				bind:value={filter.institutionType}
				name="type"
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="">Any</option>
				<option value="therapist">Therapy / counselling</option>
				<option value="lawyer">Legal advice</option>
				<option value="social_worker">Social worker / intervention</option>
				<option value="crisis_center">Crisis center</option>
				<option value="support_group">Support group</option>
				<option value="hotline">Hotline</option>
				<option value="shelter">Shelter</option>
				<option value="other">Other</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>District</span>
			<select
				bind:value={filter.district}
				name="district"
				style="border-radius: 999px; padding: 0.35rem 0.7rem; border: 1px solid var(--color-border-subtle);"
			>
				<option value="all">All of Gdynia</option>
				<option value="Śródmieście">Śródmieście</option>
				<option value="Grabówek">Grabówek</option>
				<option value="Chylonia">Chylonia</option>
			</select>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem;">
			<span>Search by keyword</span>
			<input
				bind:value={filter.query}
				name="q"
				type="search"
				placeholder="e.g. violence, rent, lawyer..."
				style="
					border-radius: 999px;
					border: 1px solid var(--color-border-subtle);
					padding: 0.35rem 0.7rem;
				"
			/>
		</label>
	</form>

	<div style="display: flex; flex-direction: column; gap: 0.75rem;">
		{#await Promise.resolve(getVisibleOffers()) then visibleOffers}
			<div style="display: flex; flex-direction: column; gap: 0.75rem;">
				{#if visibleOffers.length === 0}
				<div
					style="
						padding: 1rem 1.2rem;
						border-radius: 16px;
						background: rgba(255, 255, 255, 0.96);
						box-shadow: 0 8px 20px rgba(9, 25, 53, 0.08);
						font-size: 0.9rem;
					"
				>
					<strong>No offers match the selected filters.</strong>
					<div style="margin-top: 0.25rem; color: var(--color-text-muted);">
						Try removing some filters or using a different keyword.
					</div>
				</div>
			{:else}
					{#each visibleOffers as offer}
						<OfferCard {offer} />
					{/each}
				{/if}
			</div>

			{#if visibleOffers.length > 0}
				<OfferMap offers={visibleOffers} />
			{/if}
		{/await}
	</div>
</section>

<style>
	@media (max-width: 900px) {
		section[aria-labelledby='offers-title'] + section {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

