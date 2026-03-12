<script lang="ts">
	import type { GiveOffer } from '$lib/types/give';
	import { getText } from '$lib/types/offers';
	import { locale, t } from '$lib/i18n';

	let { offer }: { offer: GiveOffer } = $props();
	let currentLang = $derived($locale);
</script>

<article
	aria-label={getText(offer.name, currentLang)}
	style="
		background: rgba(255, 255, 255, 0.98);
		border-radius: 18px;
		padding: 1rem 1.1rem;
		box-shadow: 0 10px 26px rgba(9, 25, 53, 0.08);
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	"
>
	<header style="display: flex; justify-content: space-between; gap: 0.75rem; align-items: flex-start;">
		<div>
			<h3 style="margin: 0 0 0.15rem; font-size: 1rem;">{getText(offer.name, currentLang)}</h3>
			<div style="font-size: 0.8rem; color: var(--color-text-muted);">
				{offer.address}, {offer.district}
			</div>
		</div>
		<span
			style="
				border-radius: 999px;
				padding: 0.1rem 0.5rem;
				background: {offer.category === 'food' ? '#e8f5e9' : offer.category === 'clothing' ? '#fff3e0' : '#e3f2fd'};
				color: {offer.category === 'food' ? '#2e7d32' : offer.category === 'clothing' ? '#e65100' : '#1565c0'};
				font-size: 0.75rem;
				white-space: nowrap;
			"
		>
			{$t(`give.cat_${offer.category}`)}
		</span>
	</header>

	<p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted);">
		{getText(offer.descriptionShort, currentLang)}
	</p>

	<div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.3rem; font-size: 0.75rem;">
		<span style="border-radius: 999px; padding: 0.15rem 0.55rem; background: #f1f4ff;">
			🏢 {getText(offer.place, currentLang)}
		</span>
		{#if getText(offer.openingHours, currentLang)}
			<span style="border-radius: 999px; padding: 0.15rem 0.55rem; background: #f1f4ff;">
				🕐 {getText(offer.openingHours, currentLang)}
			</span>
		{/if}
	</div>

	<div
		style="
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 0.5rem;
			font-size: 0.8rem;
		"
	>
		<div style="color: var(--color-text-muted);">
			{getText(offer.targetGroup, currentLang)}
		</div>
		<a
			href={`/give/${offer.id}`}
			style="
				border-radius: 999px;
				padding: 0.4rem 0.95rem;
				background: var(--color-primary);
				color: #fff;
				font-weight: 500;
				font-size: 0.85rem;
			"
		>
			{$t('volunteering.showDetails')}
		</a>
	</div>
</article>
