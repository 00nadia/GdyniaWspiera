<script lang="ts">
	import type { PageData } from './$types';
	import { getText } from '$lib/types/offers';
	import { locale, t } from '$lib/i18n';

	let { data }: { data: PageData } = $props();
	const offer = data.offer!;
	let currentLang = $derived($locale);

	const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.address)}`;
</script>

<nav style="font-size: 0.85rem; margin-bottom: 0.75rem;">
	<a href="/help-others">{$t('volDetail.backToList')}</a>
</nav>

<article
	aria-labelledby="vol-title"
	style="
		background: rgba(255, 255, 255, 0.98);
		border-radius: 20px;
		padding: 1.4rem 1.6rem;
		box-shadow: 0 14px 40px rgba(9, 25, 53, 0.12);
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 2.5fr);
		gap: 1.5rem;
	"
>
	<section>
		<header>
			<h1 id="vol-title" style="margin: 0 0 0.4rem; font-size: 1.5rem;">{getText(offer.name, currentLang)}</h1>
			<div style="font-size: 0.9rem; color: var(--color-text-muted);">
				{offer.address}, {offer.district}
			</div>
			<div
				style="
					display: flex;
					flex-wrap: wrap;
					gap: 0.4rem;
					margin-top: 0.6rem;
					font-size: 0.8rem;
				"
			>
				<span
					style="
						border-radius: 999px;
						padding: 0.2rem 0.6rem;
						background: {offer.category === 'internship' ? '#e8f5e9' : offer.category === 'volunteering' ? '#fff3e0' : '#e3f2fd'};
						color: {offer.category === 'internship' ? '#2e7d32' : offer.category === 'volunteering' ? '#e65100' : '#1565c0'};
						font-weight: 500;
					"
				>
					{$t(`volunteering.cat_${offer.category}`)}
				</span>
				{#if offer.isFree}
					<span
						style="
							border-radius: 999px;
							padding: 0.2rem 0.6rem;
							background: var(--color-primary-soft);
							color: var(--color-primary);
							font-weight: 500;
						"
					>
						{$t('volunteering.free')}
					</span>
				{/if}
				<span style="border-radius: 999px; padding: 0.2rem 0.6rem; background: #f1f4ff;">
					🏢 {getText(offer.place, currentLang)}
				</span>
			</div>
		</header>

		<section style="margin-top: 1rem; font-size: 0.95rem; line-height: 1.5;">
			<p style="white-space: pre-line; margin: 0 0 0.75rem;">{getText(offer.descriptionLong, currentLang)}</p>

			<div style="margin-top: 0.75rem; font-size: 0.9rem; display: grid; grid-template-columns: auto 1fr; gap: 0.3rem 0.6rem;">
				<strong>{$t('volunteering.targetGroup')}:</strong>
				<span>{getText(offer.targetGroup, currentLang)}</span>

				<strong>{$t('volunteering.duration')}:</strong>
				<span>{getText(offer.duration, currentLang)}</span>

				<strong>{$t('volunteering.schedule')}:</strong>
				<span>{getText(offer.schedule, currentLang)}</span>

				<strong>{$t('volunteering.requirements')}:</strong>
				<span>{getText(offer.requirements, currentLang)}</span>

				<strong>{$t('volunteering.recruitment')}:</strong>
				<span>{getText(offer.recruitment, currentLang)}</span>
			</div>
		</section>
	</section>

	<aside style="font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.8rem;">
		<section
			aria-label={$t('offerDetail.contact')}
			style="
				padding: 0.9rem 1rem;
				border-radius: 14px;
				background: #f5f7ff;
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			"
		>
			<div style="font-weight: 600; margin-bottom: 0.2rem;">{$t('offerDetail.contact')}</div>
			{#if offer.contact.phone}
				<div><strong>{$t('offerDetail.phone')}</strong> <a href={`tel:${offer.contact.phone}`}>{offer.contact.phone}</a></div>
			{/if}
			{#if offer.contact.email}
				<div><strong>{$t('offerDetail.email')}</strong> <a href={`mailto:${offer.contact.email}`}>{offer.contact.email}</a></div>
			{/if}
			{#if offer.contact.website}
				<div>
					<strong>{$t('offerDetail.website')}</strong>
					<a href={offer.contact.website.startsWith('http') ? offer.contact.website : `https://${offer.contact.website}`} target="_blank" rel="noreferrer">{offer.contact.website}</a>
				</div>
			{/if}
		</section>

		{#if getText(offer.openingHours, currentLang)}
			<section
				aria-label={$t('offerDetail.openingHours')}
				style="
					padding: 0.9rem 1rem;
					border-radius: 14px;
					background: rgba(248, 249, 252, 0.9);
				"
			>
				<div style="font-weight: 600; margin-bottom: 0.2rem;">{$t('offerDetail.openingHours')}</div>
				<div style="font-size: 0.85rem;">{getText(offer.openingHours, currentLang)}</div>
			</section>
		{/if}

		<section
			aria-label={$t('offerDetail.location')}
			style="
				padding: 0.9rem 1rem;
				border-radius: 14px;
				background: rgba(248, 249, 252, 0.9);
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			"
		>
			<div style="font-weight: 600;">{$t('offerDetail.location')}</div>
			<div style="font-size: 0.85rem; color: var(--color-text-muted);">
				{offer.address}, {offer.district}
			</div>
			<a
				href={googleMapsLink}
				target="_blank"
				rel="noreferrer"
				style="
					align-self: flex-start;
					margin-top: 0.3rem;
					border-radius: 999px;
					padding: 0.4rem 0.9rem;
					background: var(--color-primary);
					color: #fff;
					font-weight: 500;
				"
			>
				{$t('offerDetail.openInMaps')}
			</a>
		</section>

		{#if offer.url}
			<a
				href={offer.url}
				target="_blank"
				rel="noopener"
				style="
					display: inline-block;
					border-radius: 999px;
					padding: 0.5rem 1rem;
					background: var(--color-primary);
					color: #fff;
					font-weight: 500;
					font-size: 0.9rem;
					text-align: center;
				"
			>
				{$t('volunteering.moreInfo')}
			</a>
		{/if}
	</aside>
</article>

<style>
	@media (max-width: 900px) {
		article[aria-labelledby='vol-title'] {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
