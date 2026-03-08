<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section aria-labelledby="about-title" style="display: flex; flex-direction: column; gap: 2.5rem;">
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<h1 id="about-title" style="margin: 0; font-size: clamp(1.75rem, 5vw, 2.25rem); line-height: 1.2; color: var(--color-text);">
			{$t('nav.about')}
		</h1>
		<p style="margin: 0; color: var(--color-text-muted); font-size: clamp(0.95rem, 2vw, 1.1rem); line-height: 1.8; max-width: 600px;">
			<strong style="color: var(--color-text);">Gdynia Wspiera</strong> {$t('about.p1')}
		</p>
	</div>

	<p style="margin: 0 0 0.75rem; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('about.p1')}
	</p>

	<p style="margin: 0 0 0.75rem; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('about.p2')}
	</p>

	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('about.p3')}
	</p>
</section>

