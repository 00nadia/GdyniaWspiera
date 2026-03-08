<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import type { Offer } from '$lib/types/offers';
	import { getText } from '$lib/types/offers';
	import { locale, t } from '$lib/i18n';

	let { offers, zoom = 12 }: { offers: Offer[]; zoom?: number } = $props();

	let mapContainer: HTMLDivElement | null = null;
	let isReady = $state(false);
	let error = $state<string | null>(null);
	let currentLang = $derived($locale);

	const loadScript = () =>
		new Promise<void>((resolve, reject) => {
			if (typeof window === 'undefined') return resolve();

			const existingGoogle = (window as any).google;
			if (existingGoogle && existingGoogle.maps) {
				return resolve();
			}

			const existing = document.querySelector<HTMLScriptElement>('script[data-gw-google-maps]');
			if (existing) {
				existing.addEventListener('load', () => resolve());
				existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')));
				return;
			}

			const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
			if (!apiKey) {
				reject(new Error('Missing Google Maps API key'));
				return;
			}

			const script = document.createElement('script');
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
			script.async = true;
			script.defer = true;
			script.dataset.gwGoogleMaps = 'true';
			script.addEventListener('load', () => resolve());
			script.addEventListener('error', () => reject(new Error('Failed to load Google Maps')));
			document.head.appendChild(script);
		});

	onMount(async () => {
		if (!mapContainer || offers.length === 0) return;

		try {
			await loadScript();
			const googleGlobal = (window as any).google;
			if (!googleGlobal?.maps) throw new Error('Google Maps not available');

			const google = googleGlobal as typeof googleGlobal;

			const center = {
				lat: offers[0]?.location.lat ?? 54.5189,
				lng: offers[0]?.location.lng ?? 18.5305
			};

			const map = new google.maps.Map(mapContainer, {
				center,
				zoom,
				mapTypeControl: false,
				streetViewControl: false,
				fullscreenControl: false
			});

			offers.forEach((offer) => {
				const offerName = getText(offer.name, currentLang);
				const marker = new google.maps.Marker({
					position: offer.location,
					map,
					title: offerName
				});

				const info = new google.maps.InfoWindow({
					content: `<strong>${offerName}</strong><br/>${offer.address}<br/><a href="/offers/${offer.id}">${get(t)('map.details')}</a>`
				});

				marker.addListener('click', () => {
					info.open({ map, anchor: marker });
				});
			});

			isReady = true;
		} catch (e) {
			console.error(e);
			error = get(t)('map.error');
		}
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

	{#if error && !isReady}
		<div style="padding: 0.5rem 0.75rem; font-size: 0.8rem; color: var(--color-text-muted);">
			{error}
		</div>
	{/if}
</div>

