<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { setupI18n, t } from '$lib/i18n';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import AccessibilityControls from '$lib/components/AccessibilityControls.svelte';

	let { children } = $props();

	const navLinks = [
		{ href: '/', key: 'nav.home' },
		{ href: '/offers', key: 'nav.offers' },
		{ href: '/how-to-use', key: 'nav.howToUse' },
		{ href: '/about', key: 'nav.about' },
		{ href: '/help-others', key: 'nav.helpOthers' }
	];

	onMount(() => {
		setupI18n();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link" href="#main-content">Skip to main content</a>

<header class="layout-header">
	<div class="brand" aria-label="Gdynia Wspiera">
		<div class="brand-mark" aria-hidden="true">GW</div>
		<div class="brand-text">
			<div class="brand-title">Gdynia Wspiera</div>
			<div class="brand-subtitle">Free, verified social help offers</div>
		</div>
	</div>

	<nav class="primary-nav" aria-label="Main">
		<div class="primary-nav-links">
			{#each navLinks as link}
				<a
					href={link.href}
					class="primary-nav-link"
					data-active={$page.url.pathname === link.href ? 'true' : 'false'}
				>
					{$t(link.key)}
				</a>
			{/each}
		</div>

		<div class="header-aside">
			<AccessibilityControls />
			<LanguageSwitcher />
		</div>
	</nav>
</header>

<main id="main-content" class="page-shell">
	{@render children()}
</main>

<footer class="layout-footer">
	<div class="layout-footer-inner">
		<div class="layout-footer-top">
			<div>Gdynia Wspiera – browser of free, up-to-date and verified social help offers.</div>
			<div class="layout-footer-links">
				<span class="pill">{$t('common.free')}</span>
				<span class="pill">{$t('common.verified')}</span>
				<span class="pill">{$t('common.multiLanguage')}</span>
			</div>
		</div>
		<div>
			<span>{$t('common.homeInstitutionLabel')}: </span>
			<span>{$t('common.homeInstitution')}</span>
		</div>
		<div>For emergencies, always contact local emergency numbers first.</div>
	</div>
</footer>
