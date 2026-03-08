<script lang="ts">
  type CategoryId =
    | 'mental-health'
    | 'family-children'
    | 'seniors'
    | 'violence'
    | 'homelessness'
    | 'disability'
    | 'addictions'
    | 'material-support';

  type Offer = {
    id: number;
    title: string;
    description: string;
    category: CategoryId;
    audience: string;
    institution: string;
    district: string;
    contactPhone?: string;
    contactWebsite?: string;
  };

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'mental-health', label: 'Zdrowie psychiczne' },
    { id: 'family-children', label: 'Rodzina i dzieci' },
    { id: 'seniors', label: 'Seniorzy' },
    { id: 'violence', label: 'Przemoc i bezpieczeństwo' },
    { id: 'homelessness', label: 'Bezdomność i mieszkalnictwo' },
    { id: 'disability', label: 'Osoby z niepełnosprawnością' },
    { id: 'addictions', label: 'Uzależnienia' },
    { id: 'material-support', label: 'Sytuacja materialna' }
  ];

  const offers: Offer[] = [
    {
      id: 1,
      title: 'Konsultacje psychologiczne dla dorosłych',
      description:
        'Bezpośrednie wsparcie psychologiczne dla osób w kryzysie emocjonalnym, depresyjnym lub lękowym, prowadzone przez specjalistów.',
      category: 'mental-health',
      audience: 'Osoby dorosłe z Gdyni',
      institution: 'Miejski Ośrodek Pomocy Społecznej',
      district: 'Śródmieście',
      contactPhone: '+48 58 000 00 00',
      contactWebsite: 'https://www.gdyniawspiera.pl'
    },
    {
      id: 2,
      title: 'Grupa wsparcia dla rodziców',
      description:
        'Zajęcia grupowe dla rodziców mierzących się z trudnościami wychowawczymi, stresem rodzicielskim lub wypaleniem.',
      category: 'family-children',
      audience: 'Rodzice dzieci do 18 roku życia',
      institution: 'Poradnia psychologiczno–pedagogiczna',
      district: 'Grabówek',
      contactPhone: '+48 58 000 00 01'
    },
    {
      id: 3,
      title: 'Klub seniora i zajęcia aktywizujące',
      description:
        'Spotkania integracyjne, zajęcia ruchowe i edukacyjne dla osób starszych, zapobiegające samotności i wykluczeniu społecznemu.',
      category: 'seniors',
      audience: 'Osoby 60+',
      institution: 'Dom Sąsiedzki',
      district: 'Chylonia',
      contactPhone: '+48 58 000 00 02'
    },
    {
      id: 4,
      title: 'Punkt konsultacyjny dla osób doświadczających przemocy',
      description:
        'Poufne wsparcie psychologiczne i prawne dla osób dotkniętych przemocą domową oraz ich bliskich.',
      category: 'violence',
      audience: 'Osoby doświadczające przemocy oraz świadkowie',
      institution: 'Specjalistyczny Ośrodek Wsparcia',
      district: 'Oksywie',
      contactPhone: '+48 58 000 00 03'
    },
    {
      id: 5,
      title: 'Doradztwo w zakresie świadczeń i zasiłków',
      description:
        'Wsparcie w uzyskaniu świadczeń i zasiłków, w tym pomoc w wypełnianiu wniosków oraz zrozumieniu kryteriów przyznawania.',
      category: 'material-support',
      audience: 'Osoby i rodziny w trudnej sytuacji materialnej',
      institution: 'Punkt informacyjny pomocy społecznej',
      district: 'Wzgórze Św. Maksymiliana',
      contactPhone: '+48 58 000 00 04'
    }
  ];

  let selectedCategory: CategoryId | 'all' = 'all';
  let searchQuery = '';
  let selectedDistrict = 'all';

  const districts = ['all', 'Śródmieście', 'Grabówek', 'Chylonia', 'Oksywie', 'Wzgórze Św. Maksymiliana'];

  $: normalizedQuery = searchQuery.trim().toLowerCase();

  $: filteredOffers = offers.filter((offer) => {
    const matchesCategory = selectedCategory === 'all' || offer.category === selectedCategory;
    const matchesDistrict = selectedDistrict === 'all' || offer.district === selectedDistrict;

    if (!normalizedQuery) {
      return matchesCategory && matchesDistrict;
    }

    const haystack = `${offer.title} ${offer.description} ${offer.audience} ${offer.institution}`.toLowerCase();
    const matchesSearch = haystack.includes(normalizedQuery);

    return matchesCategory && matchesDistrict && matchesSearch;
  });
</script>

<section class="space-y-8">
  <header class="space-y-3">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
      Przegląd ofert
    </p>
    <h1 class="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
      Oferty bezpłatnego wsparcia społecznego w&nbsp;Gdyni
    </h1>
    <p class="max-w-2xl text-sm text-slate-300 md:text-base">
      Skorzystaj z filtrów, aby zawęzić wyniki do Twojej sytuacji. Wszystkie oferty są
      nieodpłatne dla uprawnionych mieszkanek i mieszkańców Gdyni oraz pochodzą
      ze sprawdzonych instytucji.
    </p>
  </header>

  <section class="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
    <!-- Filtry -->
    <aside class="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-sm">
      <div>
        <label for="search" class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Wyszukaj po słowach kluczowych
        </label>
        <input
          id="search"
          type="search"
          bind:value={searchQuery}
          placeholder="np. psycholog, przemoc, zasiłek..."
          class="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Obszar problemu
        </p>
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            class="rounded-full border px-3 py-1 text-xs font-semibold transition
              {selectedCategory === 'all'
                ? 'border-indigo-400 bg-indigo-500/20 text-indigo-100'
                : 'border-slate-600 bg-slate-900/60 text-slate-200 hover:border-indigo-400'}"
            on:click={() => (selectedCategory = 'all')}
          >
            Wszystkie
          </button>
          {#each categories as category}
            <button
              type="button"
              class="rounded-full border px-3 py-1 text-xs font-semibold transition
                {selectedCategory === category.id
                  ? 'border-indigo-400 bg-indigo-500/20 text-indigo-100'
                  : 'border-slate-600 bg-slate-900/60 text-slate-200 hover:border-indigo-400'}"
              on:click={() => (selectedCategory = category.id)}
            >
              {category.label}
            </button>
          {/each}
        </div>
      </div>

      <div>
        <label for="district" class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Dzielnica
        </label>
        <select
          id="district"
          bind:value={selectedDistrict}
          class="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          {#each districts as d}
            <option value={d}>
              {d === 'all' ? 'Wszystkie dzielnice' : d}
            </option>
          {/each}
        </select>
      </div>

      <p class="text-xs text-slate-400">
        Nie widzisz oferty, której potrzebujesz?
        <a href="/missing-offer" class="text-indigo-300 underline-offset-2 hover:underline">
          Zgłoś swoją potrzebę
        </a>.
      </p>
    </aside>

    <!-- Lista ofert -->
    <div class="space-y-4">
      <p class="text-xs text-slate-400">
        Znalezione oferty:
        <span class="font-semibold text-slate-100">{filteredOffers.length}</span>
      </p>

      {#if filteredOffers.length === 0}
        <div class="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-sm text-slate-300">
          <p class="font-semibold text-slate-100">Brak ofert spełniających podane kryteria.</p>
          <p class="mt-1">
            Spróbuj poszerzyć wyszukiwanie lub
            <a href="/missing-offer" class="text-indigo-300 underline-offset-2 hover:underline">
              opisz nam swoją sytuację
            </a>,
            abyśmy mogli zaproponować nowe kategorie lub formy wsparcia.
          </p>
        </div>
      {:else}
        <ul class="space-y-4">
          {#each filteredOffers as offer}
            <li class="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-sm shadow-slate-950/40">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 class="text-base font-semibold text-slate-50 md:text-lg">
                    {offer.title}
                  </h2>
                  <p class="mt-1 text-xs text-slate-400">
                    {offer.institution} • {offer.district}
                  </p>
                </div>

                <div class="flex flex-wrap gap-2 text-[11px] text-slate-100">
                  <span class="rounded-full bg-indigo-500/20 px-3 py-1 text-indigo-100">
                    {categories.find((c) => c.id === offer.category)?.label}
                  </span>
                  <span class="rounded-full bg-slate-800 px-3 py-1">
                    {offer.audience}
                  </span>
                </div>
              </div>

              <p class="mt-3 text-sm text-slate-200">
                {offer.description}
              </p>

              <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                {#if offer.contactPhone}
                  <a
                    href={`tel:${offer.contactPhone}`}
                    class="inline-flex items-center gap-1 rounded-full border border-slate-600 px-3 py-1 hover:border-indigo-400 hover:text-indigo-200"
                  >
                    Telefon: {offer.contactPhone}
                  </a>
                {/if}

                {#if offer.contactWebsite}
                  <a
                    href={offer.contactWebsite}
                    class="inline-flex items-center gap-1 rounded-full border border-slate-600 px-3 py-1 hover:border-indigo-400 hover:text-indigo-200"
                  >
                    Strona internetowa
                  </a>
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
</section>

