<script lang="ts">
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import type { Offer } from '$lib/types/offers';
	import { getText } from '$lib/types/offers';
	import { locale, t } from '$lib/i18n';
	import { get } from 'svelte/store';

	let { offers, zoom = 12 }: { offers: Offer[]; zoom?: number } = $props();

	let mapContainer: HTMLDivElement | null = null;
	let currentLang = $derived($locale);

	onMount(() => {
		if (!mapContainer || offers.length === 0) return;

		const center = [
			offers[0]?.location.lat ?? 54.5189,
			offers[0]?.location.lng ?? 18.5305
		];

		const map = L.map(mapContainer).setView(center as [number, number], zoom);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; OpenStreetMap'
		}).addTo(map);

		offers.forEach((offer) => {
			const offerName = getText(offer.name, currentLang);

			const marker = L.marker([
				offer.location.lat,
				offer.location.lng
			]).addTo(map);

			marker.bindPopup(`
				<strong>${offerName}</strong><br/>
				${offer.address}<br/>
				<a href="/offers/${offer.id}">
					${get(t)('map.details')}
				</a>
			`);
		});
	});
</script>

<div
	aria-label={$t('map.title')}
	style="
		border-radius: 18px;
		overflow: hidden;
		background: #e1e7f5;
		border: 1px solid rgba(161, 177, 201, 0.6);
	"
>
	<div bind:this={mapContainer} style="width: 100%; height: 260px;"></div>
</div>