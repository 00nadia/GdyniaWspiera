<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section aria-labelledby="how-title">
	<h1 id="how-title" style="margin: 0 0 0.75rem; font-size: 1.5rem;">
		{$t('nav.howToUse')}
	</h1>

	<p style="margin: 0 0 0.75rem; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('howToUse.intro')}
	</p>

	<ol style="margin: 0 0 0.75rem 1.25rem; color: var(--color-text-muted); font-size: 0.95rem;">
		<li>{$t('howToUse.step1')}</li>
		<li>{$t('howToUse.step2')}</li>
		<li>{$t('howToUse.step3')}</li>
	</ol>

	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('howToUse.closing')}
	</p>
</section>

