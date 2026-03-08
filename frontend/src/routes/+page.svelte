<script lang="ts">
	import { t } from '$lib/i18n';
</script>

<section aria-labelledby="hero-title" style="margin-bottom: 2.5rem;">
	<div
		style="
			display: grid;
			grid-template-columns: minmax(0, 3fr) minmax(0, 2.6fr);
			gap: 2.25rem;
			align-items: center;
			background: var(--color-surface);
			border-radius: var(--radius-lg);
			padding: 2.25rem 2.5rem;
			box-shadow: var(--shadow-soft);
		"
	>
		<div>
			<h1 id="hero-title" style="font-size: 2.1rem; margin: 0 0 0.75rem;">{$t('hero.title')}</h1>
			<p style="margin: 0 0 1.25rem; color: var(--color-text-muted); max-width: 34rem;">
				{$t('hero.subtitle')}
			</p>

			<div
				style="
					display: flex;
					flex-wrap: wrap;
					gap: 0.75rem;
					margin-bottom: 1.25rem;
				"
			>
				<a
					href="/offers?mode=need-help"
					style="
						padding: 0.75rem 1.4rem;
						border-radius: 999px;
						background: var(--color-primary);
						color: #fff;
						font-weight: 600;
					"
				>
					{$t('hero.needHelp')}
				</a>
				<a
					href="/offers?mode=help-others"
					style="
						padding: 0.7rem 1.3rem;
						border-radius: 999px;
						background: var(--color-primary-soft);
						color: var(--color-primary);
						font-weight: 500;
					"
				>
					{$t('hero.wantToHelp')}
				</a>
			</div>

			<div
				style="
					display: flex;
					flex-wrap: wrap;
					gap: 1.5rem;
					font-size: 0.9rem;
					color: var(--color-text-muted);
				"
			>
				<div>
					<div style="font-weight: 600; margin-bottom: 0.25rem;">{$t('hero.alwaysFree')}</div>
					<div>{$t('hero.alwaysFreeDesc')}</div>
				</div>
				<div>
					<div style="font-weight: 600; margin-bottom: 0.25rem;">{$t('hero.verifiedUpToDate')}</div>
					<div>{$t('hero.verifiedUpToDateDesc')}</div>
				</div>
			</div>
		</div>

		<div
			style="
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
				padding: 1.4rem 1.5rem;
				border-radius: 20px;
				background: radial-gradient(circle at top, #0056a6 0, #001b3c 50%, #000814 100%);
				color: #e6f2ff;
				position: relative;
				overflow: hidden;
			"
		>
			<div
				style="
					position: absolute;
					inset: 0;
					background:
						radial-gradient(circle at 20% 0, rgba(255, 255, 255, 0.18), transparent 55%),
						radial-gradient(circle at 80% 100%, rgba(0, 166, 180, 0.4), transparent 55%);
					opacity: 0.9;
					pointer-events: none;
				"
			></div>
			<div style="position: relative; z-index: 1; display: flex; flex-direction: column; gap: 0.6rem;">
				<div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.16em;">
					{$t('categories.title')}
				</div>
				<div
					style="
						display: grid;
						grid-template-columns: repeat(2, minmax(0, 1fr));
						gap: 0.6rem 0.75rem;
						font-size: 0.86rem;
					"
				>
					<div>• {$t('categories.abuse')}</div>
					<div>• {$t('categories.addiction')}</div>
					<div>• {$t('categories.financial')}</div>
					<div>• {$t('categories.mentalHealth')}</div>
					<div>• {$t('categories.housing')}</div>
					<div>• {$t('categories.family')}</div>
					<div>• {$t('categories.legal')}</div>
					<div>• {$t('categories.migration')}</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section aria-labelledby="search-title" style="margin-bottom: 2.25rem;">
	<div style="margin-bottom: 0.75rem;">
		<h2 id="search-title" style="margin: 0 0 0.4rem; font-size: 1.2rem;">{$t('search.title')}</h2>
		<p style="margin: 0; color: var(--color-text-muted); font-size: 0.9rem;">
			{$t('search.subtitle')}
		</p>
	</div>

	<form
		action="/offers"
		method="get"
		style="
			display: grid;
			grid-template-columns: minmax(0, 3fr) minmax(0, 2fr) auto;
			gap: 0.75rem;
			align-items: center;
			background: rgba(255, 255, 255, 0.9);
			padding: 0.85rem 0.9rem;
			border-radius: 999px;
			box-shadow: 0 10px 26px rgba(10, 31, 62, 0.12);
		"
	>
		<label style="display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.8rem;">
			<span>{$t('search.whatHelp')}</span>
			<input
				name="q"
				type="search"
				placeholder={$t('search.placeholder')}
				style="
					border: none;
					outline: none;
					padding: 0.35rem 0.1rem;
					background: transparent;
					font-size: 0.95rem;
				"
			/>
		</label>

		<label style="display: flex; flex-direction: column; gap: 0.2rem; font-size: 0.8rem;">
			<span>{$t('search.typeOfSupport')}</span>
			<select
				name="type"
				style="
					border-radius: 999px;
					border: 1px solid var(--color-border-subtle);
					padding: 0.3rem 0.75rem;
					font-size: 0.9rem;
				"
			>
				<option value="">{$t('search.any')}</option>
				<option value="therapy">{$t('search.therapy')}</option>
				<option value="legal">{$t('search.legalAdvice')}</option>
				<option value="social">{$t('search.socialWork')}</option>
				<option value="group">{$t('search.supportGroup')}</option>
				<option value="financial">{$t('search.financialCounselling')}</option>
			</select>
		</label>

		<button
			type="submit"
			style="
				border-radius: 999px;
				border: none;
				padding: 0.65rem 1.4rem;
				background: var(--color-accent);
				color: #00101c;
				font-weight: 600;
				cursor: pointer;
			"
		>
			{$t('search.searchOffers')}
		</button>
	</form>
</section>

<section aria-labelledby="info-title">
	<h2 id="info-title" style="margin: 0 0 0.75rem; font-size: 1.2rem;">{$t('info.title')}</h2>
  
	<p style="margin: 0 0 0.6rem; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('info.p1')}
	</p>
	<p style="margin: 0 0 0.6rem; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('info.p2')}
	</p>
	<p style="margin: 0; color: var(--color-text-muted); font-size: 0.95rem;">
		{$t('info.p3')}
	</p>
</section>

<style>
	@media (max-width: 768px) {
		section[aria-labelledby='hero-title'] > div {
			grid-template-columns: minmax(0, 1fr);
			padding: 1.6rem 1.5rem;
		}

		form[action='/offers'] {
			grid-template-columns: minmax(0, 1fr);
			border-radius: 20px !important;
		}
	}
</style>
