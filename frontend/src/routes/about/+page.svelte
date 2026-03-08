<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section aria-labelledby="about-title" style="display: flex; flex-direction: column; gap: 2.5rem;">
	<div style="display: flex; flex-direction: column; gap: 1.5rem;">
		<h1 id="about-title" style="margin: 0; font-size: clamp(1.75rem, 5vw, 2.25rem); line-height: 1.2; color: var(--color-text);">
			{$t('nav.about')}
		</h1>
		<p style="margin: 0; color: var(--color-text-muted); font-size: clamp(0.95rem, 2vw, 1.1rem); line-height: 1.8; max-width: 600px;" >
			{@html $t('about.description')}
		</p>
	</div>

	<!-- Feature Cards Grid -->
	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
		<!-- Mission Card -->
		<div style="background: linear-gradient(135deg, rgba(0, 86, 166, 0.08) 0%, rgba(0, 166, 180, 0.08) 100%); border: 1px solid rgba(0, 86, 166, 0.12); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
			<div style="font-size: 1.8rem;">🎯</div>
			<h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">
				{$t('about.missionTitle')}
			</h2>
			<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7;">
				{$t('about.missionDesc')}
			</p>
		</div>

		<!-- Trust Card -->
		<div style="background: linear-gradient(135deg, rgba(0, 166, 180, 0.08) 0%, rgba(92, 195, 255, 0.08) 100%); border: 1px solid rgba(0, 166, 180, 0.12); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
			<div style="font-size: 1.8rem;">✓</div>
			<h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">
				{$t('about.trustTitle')}
			</h2>
			<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7;">
				{$t('about.trustDesc')}
			</p>
		</div>

		<!-- Getting Started Card -->
		<div style="background: linear-gradient(135deg, rgba(92, 195, 255, 0.08) 0%, rgba(0, 86, 166, 0.08) 100%); border: 1px solid rgba(92, 195, 255, 0.12); border-radius: 16px; padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
			<div style="font-size: 1.8rem;">👉</div>
			<h2 style="margin: 0; font-size: 1.25rem; color: var(--color-text);">
				{$t('about.gettingStartedTitle')}
			</h2>
			<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7;">
				{@html $t('about.gettingStartedDesc')}
			</p>
		</div>
	</div>

	<!-- Support Organizations Section -->
	<div style="background: var(--color-primary-soft); border-radius: 16px; padding: clamp(1.5rem, 5vw, 2.5rem); border-left: 4px solid var(--color-primary);">
		<h2 style="margin: 0 0 1rem; font-size: 1.25rem; color: var(--color-text);">
			{$t('about.wantToHelpTitle')}
		</h2>
		<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.7; max-width: 600px;">
			{$t('about.wantToHelpDesc')}
		</p>
	</div>

	<!-- Emergency Notice -->
	<div style="background: rgba(255, 193, 7, 0.08); border: 1px solid rgba(255, 193, 7, 0.3); border-radius: 12px; padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
		<div style="font-size: 1.5rem; flex-shrink: 0; margin-top: 0.25rem;">⚠️</div>
		<p style="margin: 0; color: var(--color-text); font-size: 0.95rem; line-height: 1.7; font-weight: 500;">
			{$t('about.emergencyNotice')}
		</p>
	</div>
</section>