<script lang="ts">
	import { t } from '$lib/i18n';
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

	<p style="margin: 0 0 0.75rem; color: var(--color-text-muted); font-size: 0.95rem;">
		<strong>{$t('contact.emailLabel')}:</strong> <a href="mailto:{$t('contact.email')}" style="color: var(--color-text);">{$t('contact.email')}</a>
	</p>

	<p style="margin: 0 0 0.75rem; color: var(--color-text-muted); font-size: 0.95rem;">
		<strong>{$t('contact.phoneLabel')}:</strong> <a href="tel:{$t('contact.phone')}" style="color: var(--color-text);">{$t('contact.phone')}</a>
	</p>

	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem;">
		<strong>{$t('contact.addressLabel')}:</strong> {$t('contact.address')}
	</p>
</section>