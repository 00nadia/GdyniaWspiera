<script lang="ts">
	import type { PageData } from './$types';
	import { getText } from '$lib/types/offers';
	import { locale } from '$lib/i18n';

	let { data }: { data: PageData } = $props();
	const offer = data.offer!;
	let currentLang = $derived($locale);

	const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${offer.address}, ${offer.city}`)}`;
</script>

<nav style="font-size: 0.85rem; margin-bottom: 0.75rem;">
	<a href="/offers">← Back to offers</a>
</nav>

<article
	aria-labelledby="offer-title"
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
			<h1 id="offer-title" style="margin: 0 0 0.4rem; font-size: 1.5rem;">{getText(offer.name, currentLang)}</h1>
			<div style="font-size: 0.9rem; color: var(--color-text-muted);">
				{offer.address}, {offer.district}, {offer.city}
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
						background: var(--color-primary-soft);
						color: var(--color-primary);
						font-weight: 500;
					"
				>
					Free of charge
				</span>
				<span
					style="
						border-radius: 999px;
						padding: 0.2rem 0.6rem;
						background: #f1f4ff;
					"
				>
					Verified by {offer.verifiedBy}
				</span>
				<span style="font-size: 0.8rem; color: var(--color-text-muted);">
					Last updated: {offer.lastUpdated}
				</span>
			</div>
		</header>

		<section style="margin-top: 1rem; font-size: 0.95rem; line-height: 1.5;">
			<p style="white-space: pre-line; margin: 0 0 0.75rem;">{getText(offer.descriptionLong, currentLang)}</p>

			<div style="margin-top: 0.75rem; font-size: 0.9rem; color: var(--color-text-muted);">
				<div><strong>Target groups:</strong> {offer.targetGroups.join(', ')}</div>
				<div><strong>Languages:</strong> {offer.languagesOffered.join(', ')}</div>
				<div><strong>Online help available:</strong> {offer.isOnlineAvailable ? 'Yes' : 'No'}</div>
			</div>
		</section>
	</section>

	<aside style="font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.8rem;">
		<section
			aria-label="Contact"
			style="
				padding: 0.9rem 1rem;
				border-radius: 14px;
				background: #f5f7ff;
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			"
		>
			<div style="font-weight: 600; margin-bottom: 0.2rem;">Contact</div>
			{#if offer.contact.phone}
				<div><strong>Phone:</strong> <a href={`tel:${offer.contact.phone}`}>{offer.contact.phone}</a></div>
			{/if}
			{#if offer.contact.email}
				<div><strong>Email:</strong> <a href={`mailto:${offer.contact.email}`}>{offer.contact.email}</a></div>
			{/if}
			{#if offer.contact.website}
				<div>
					<strong>Website:</strong>
					<a href={offer.contact.website} target="_blank" rel="noreferrer">{offer.contact.website}</a>
				</div>
			{/if}
		</section>

		<section
			aria-label="Opening hours"
			style="
				padding: 0.9rem 1rem;
				border-radius: 14px;
				background: rgba(248, 249, 252, 0.9);
			"
		>
			<div style="font-weight: 600; margin-bottom: 0.2rem;">Opening hours</div>
			<ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem;">
				{#each offer.openingHours as range}
					<li>
						{range.day}: {range.from}–{range.to}
					</li>
				{/each}
			</ul>
		</section>

		<section
			aria-label="Location"
			style="
				padding: 0.9rem 1rem;
				border-radius: 14px;
				background: rgba(248, 249, 252, 0.9);
				display: flex;
				flex-direction: column;
				gap: 0.4rem;
			"
		>
			<div style="font-weight: 600;">Location</div>
			<div style="font-size: 0.85rem; color: var(--color-text-muted);">
				{offer.address}, {offer.district}, {offer.city}
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
				Open in Google Maps
			</a>
			<div style="font-size: 0.8rem; color: var(--color-text-muted);">
				A detailed map preview will be available in the main offers view.
			</div>
		</section>
	</aside>
</article>

<style>
	@media (max-width: 900px) {
		article[aria-labelledby='offer-title'] {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

