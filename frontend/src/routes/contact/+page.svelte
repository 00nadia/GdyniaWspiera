<script lang="ts">
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let mapContainer: HTMLDivElement;

	const gdyniaCoords: [number, number] = [54.509448767194876, 18.538256390201536]; // ul. Świętojańska 123, Gdynia

	onMount(() => {
		const map = L.map(mapContainer).setView(gdyniaCoords, 15);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		L.marker(gdyniaCoords).addTo(map)
			.bindPopup(`<strong>Gdynia Wspiera</strong><br>${t('contact.address')}`)
			.openPopup();
	});
</script>

<section aria-labelledby="contact-title" style="display: flex; flex-direction: column; gap: 2.5rem;">
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<h1 id="contact-title" style="margin: 0; font-size: clamp(1.75rem, 5vw, 2.25rem); line-height: 1.2; color: var(--color-text);">
			{$t('nav.contact')}
		</h1>
		<p style="margin: 0; color: var(--color-text-muted); font-size: clamp(0.95rem, 2vw, 1.1rem); line-height: 1.8; max-width: 600px;">
			<strong style="color: var(--color-text);">Gdynia Wspiera</strong> {$t('contact.intro')}
		</p>
	</div>

	<!-- Contact Info Cards -->
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
		<div style="background: linear-gradient(135deg, rgba(0, 86, 166, 0.08) 0%, rgba(0, 166, 180, 0.08) 100%); border: 1px solid rgba(0, 86, 166, 0.12); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
			<div style="font-size: 1.8rem;">✉️</div>
			<h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">{$t('contact.emailLabel')}</h2>
			<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7;">
				<a href="mailto:{$t('contact.email')}" style="color: var(--color-primary); font-weight: 600;">{$t('contact.email')}</a>
			</p>
		</div>

		<div style="background: linear-gradient(135deg, rgba(0, 166, 180, 0.08) 0%, rgba(92, 195, 255, 0.08) 100%); border: 1px solid rgba(0, 166, 180, 0.12); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
			<div style="font-size: 1.8rem;">📞</div>
			<h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">{$t('contact.phoneLabel')}</h2>
			<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7;">
				<a href="tel:{$t('contact.phone')}" style="color: var(--color-primary); font-weight: 600;">{$t('contact.phone')}</a>
			</p>
		</div>

		<div style="background: linear-gradient(135deg, rgba(92, 195, 255, 0.08) 0%, rgba(0, 86, 166, 0.08) 100%); border: 1px solid rgba(92, 195, 255, 0.12); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
			<div style="font-size: 1.8rem;">📍</div>
			<h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">{$t('contact.addressLabel')}</h2>
			<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7;">{$t('contact.address')}</p>
		</div>
	</div>

	<!-- Leaflet Map -->
	<div bind:this={mapContainer} style="height: 400px; width: 100%; border-radius: 16px; overflow: hidden; margin-top: 2rem;"></div>
</section>