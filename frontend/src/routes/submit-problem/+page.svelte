<script lang="ts">
	import { t } from '$lib/i18n';
	import type { ProblemCategory } from '$lib/types/offers';

	let formData = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		category: '' as ProblemCategory | '',
		problemDescription: '',
		additionalDetails: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state<{ type: 'success' | 'error'; text: string } | null>(null);

	const problemCategories: { value: ProblemCategory; label: string }[] = [
		{ value: 'abuse', label: 'categories.abuse' },
		{ value: 'addiction', label: 'categories.addiction' },
		{ value: 'financial', label: 'categories.financial' },
		{ value: 'mental_health', label: 'categories.mentalHealth' },
		{ value: 'housing', label: 'categories.housing' },
		{ value: 'family', label: 'categories.family' },
		{ value: 'legal', label: 'categories.legal' },
		{ value: 'migration', label: 'categories.migration' }
	];

	async function handleSubmit() {
		if (!formData.firstName || !formData.email || !formData.category || !formData.problemDescription) {
			submitMessage = {
				type: 'error',
				text: $t('submitProblem.validationError')
			};
			return;
		}

		isSubmitting = true;
		try {
			const response = await fetch('/api/submit-problem', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitMessage = {
					type: 'success',
					text: $t('submitProblem.successMessage')
				};
				// Reset form
				formData = {
					firstName: '',
					lastName: '',
					email: '',
					phone: '',
					category: '',
					problemDescription: '',
					additionalDetails: ''
				};
			} else {
				submitMessage = {
					type: 'error',
					text: $t('submitProblem.errorMessage')
				};
			}
		} catch (error) {
			submitMessage = {
				type: 'error',
				text: $t('submitProblem.errorMessage')
			};
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section aria-labelledby="submit-title" style="max-width: 700px; margin: 0 auto;">
	<div style="margin-bottom: 2.5rem;">
		<h1 id="submit-title" style="margin: 0 0 0.75rem; font-size: 2rem;">
			{$t('submitProblem.title')}
		</h1>
		<p style="margin: 0; color: var(--color-text-muted); max-width: 500px;">
			{$t('submitProblem.subtitle')}
		</p>
	</div>

	<form
		onsubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}
		style="
			background: var(--color-surface);
			border-radius: var(--radius-lg);
			padding: 2.5rem;
			box-shadow: var(--shadow-soft);
		"
	>
		<!-- Personal Information Section -->
		<fieldset style="border: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
			<legend style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">
				{$t('submitProblem.personalInfo')}
			</legend>

			<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
				<label style="display: flex; flex-direction: column; gap: 0.5rem;">
					<span style="font-weight: 500; color: var(--color-text);">
						{$t('submitProblem.firstName')} <span style="color: var(--color-primary);">*</span>
					</span>
					<input
						type="text"
						bind:value={formData.firstName}
						placeholder={$t('submitProblem.firstNamePlaceholder')}
						required
						style="
							border: 1px solid var(--color-border-subtle);
							border-radius: 0.5rem;
							padding: 0.75rem;
							font-size: 1rem;
						"
					/>
				</label>

				<label style="display: flex; flex-direction: column; gap: 0.5rem;">
					<span style="font-weight: 500; color: var(--color-text);">
						{$t('submitProblem.lastName')}
					</span>
					<input
						type="text"
						bind:value={formData.lastName}
						placeholder={$t('submitProblem.lastNamePlaceholder')}
						style="
							border: 1px solid var(--color-border-subtle);
							border-radius: 0.5rem;
							padding: 0.75rem;
							font-size: 1rem;
						"
					/>
				</label>
			</div>

			<label style="display: flex; flex-direction: column; gap: 0.5rem;">
				<span style="font-weight: 500; color: var(--color-text);">
					{$t('submitProblem.email')} <span style="color: var(--color-primary);">*</span>
				</span>
				<input
					type="email"
					bind:value={formData.email}
					placeholder={$t('submitProblem.emailPlaceholder')}
					required
					style="
						border: 1px solid var(--color-border-subtle);
						border-radius: 0.5rem;
						padding: 0.75rem;
						font-size: 1rem;
					"
				/>
			</label>

			<label style="display: flex; flex-direction: column; gap: 0.5rem;">
				<span style="font-weight: 500; color: var(--color-text);">
					{$t('submitProblem.phone')}
				</span>
				<input
					type="tel"
					bind:value={formData.phone}
					placeholder={$t('submitProblem.phonePlaceholder')}
					style="
						border: 1px solid var(--color-border-subtle);
						border-radius: 0.5rem;
						padding: 0.75rem;
						font-size: 1rem;
					"
				/>
			</label>
		</fieldset>

		<!-- Problem Information Section -->
		<fieldset style="border: none; padding: 0; margin: 0 0 2rem; display: flex; flex-direction: column; gap: 1.5rem;">
			<legend style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">
				{$t('submitProblem.problemInfo')}
			</legend>

			<label style="display: flex; flex-direction: column; gap: 0.5rem;">
				<span style="font-weight: 500; color: var(--color-text);">
					{$t('submitProblem.problemCategory')} <span style="color: var(--color-primary);">*</span>
				</span>
				<select
					bind:value={formData.category}
					required
					style="
						border: 1px solid var(--color-border-subtle);
						border-radius: 0.5rem;
						padding: 0.75rem;
						font-size: 1rem;
						background: white;
					"
				>
					<option value="">{$t('submitProblem.selectCategory')}</option>
					{#each problemCategories as cat}
						<option value={cat.value}>{$t(cat.label)}</option>
					{/each}
				</select>
			</label>

			<label style="display: flex; flex-direction: column; gap: 0.5rem;">
				<span style="font-weight: 500; color: var(--color-text);">
					{$t('submitProblem.problemDescription')} <span style="color: var(--color-primary);">*</span>
				</span>
				<textarea
					bind:value={formData.problemDescription}
					placeholder={$t('submitProblem.problemDescriptionPlaceholder')}
					required
					rows={6}
					style="
						border: 1px solid var(--color-border-subtle);
						border-radius: 0.5rem;
						padding: 0.75rem;
						font-size: 1rem;
						font-family: inherit;
						resize: vertical;
					"
				></textarea>
			</label>

			<label style="display: flex; flex-direction: column; gap: 0.5rem;">
				<span style="font-weight: 500; color: var(--color-text);">
					{$t('submitProblem.additionalDetails')}
				</span>
				<textarea
					bind:value={formData.additionalDetails}
					placeholder={$t('submitProblem.additionalDetailsPlaceholder')}
					rows={4}
					style="
						border: 1px solid var(--color-border-subtle);
						border-radius: 0.5rem;
						padding: 0.75rem;
						font-size: 1rem;
						font-family: inherit;
						resize: vertical;
					"
				></textarea>
			</label>
		</fieldset>

		<!-- Messages -->
		{#if submitMessage}
			<div
				style="
					padding: 1rem 1.2rem;
					border-radius: 0.5rem;
					margin-bottom: 1.5rem;
					{submitMessage.type === 'success'
						? 'background: rgba(80, 165, 120, 0.1); color: var(--color-success); border: 1px solid rgba(80, 165, 120, 0.3);'
						: 'background: rgba(220, 53, 69, 0.1); color: var(--color-error); border: 1px solid rgba(220, 53, 69, 0.3);'}
				"
			>
				{submitMessage.text}
			</div>
		{/if}

		<!-- Submit Button -->
		<button
			type="submit"
			disabled={isSubmitting}
			style="
				width: 100%;
				padding: 1rem 1.5rem;
				border-radius: 0.5rem;
				background: var(--color-primary);
				color: white;
				font-weight: 600;
				font-size: 1rem;
				border: none;
				cursor: {isSubmitting ? 'not-allowed' : 'pointer'};
				opacity: {isSubmitting ? 0.7 : 1};
				transition: opacity 0.2s ease;
			"
		>
			{isSubmitting ? $t('submitProblem.submitting') : $t('submitProblem.submitButton')}
		</button>

		<p style="margin-top: 1rem; color: var(--color-text-muted); font-size: 0.875rem;">
			{$t('submitProblem.privacyNote')}
		</p>
	</form>
</section>
