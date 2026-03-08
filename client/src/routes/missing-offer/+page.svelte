<script lang="ts">
  let submitted = false;

  type ProblemGroup =
    | 'mental-health'
    | 'family-children'
    | 'seniors'
    | 'violence'
    | 'homelessness'
    | 'disability'
    | 'addictions'
    | 'material-support'
    | 'other';

  let problemGroup: ProblemGroup = 'mental-health';
  let proposedCategory = '';
  let situationDescription = '';
  let helpFor = 'self';
  let preferredContact = '';

  function handleSubmit() {
    submitted = true;
  }
</script>

<section class="space-y-8">
  <header class="space-y-3">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
      Brakuje oferty?
    </p>
    <h1 class="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
      Zgłoś potrzebę nowej oferty lub kategorii wsparcia
    </h1>
    <p class="max-w-2xl text-sm text-slate-300 md:text-base">
      Jeśli nie możesz znaleźć oferty pasującej do Twojej sytuacji,
      opisz nam swój problem. Twoje zgłoszenie pomoże w projektowaniu
      nowych usług oraz kategorii, aby serwis lepiej odpowiadał
      na realne potrzeby mieszkanek i mieszkańców Gdyni.
    </p>
  </header>

  <form
    class="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-sm"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-2">
        <label
          for="helpFor"
          class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
        >
          Dla kogo szukasz pomocy?
        </label>
        <select
          id="helpFor"
          bind:value={helpFor}
          class="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          <option value="self">Dla siebie</option>
          <option value="family">Dla członka rodziny</option>
          <option value="neighbour">Dla sąsiada / znajomej osoby</option>
          <option value="professional">Jestem specjalistą (np. pedagog, lekarz)</option>
        </select>
      </div>

      <div class="space-y-2">
        <label
          for="problemGroup"
          class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
        >
          Główny obszar problemu
        </label>
        <select
          id="problemGroup"
          bind:value={problemGroup}
          class="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        >
          <option value="mental-health">Zdrowie psychiczne / kryzys emocjonalny</option>
          <option value="family-children">Rodzina i dzieci</option>
          <option value="seniors">Seniorzy</option>
          <option value="disability">Osoby z niepełnosprawnością</option>
          <option value="material-support">Sytuacja materialna</option>
          <option value="violence">Przemoc i bezpieczeństwo</option>
          <option value="addictions">Uzależnienia</option>
          <option value="homelessness">Bezdomność / mieszkalnictwo</option>
          <option value="other">Inny obszar</option>
        </select>
      </div>
    </div>

    <div class="space-y-2">
      <label
        for="proposedCategory"
        class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        Zaproponowana nazwa kategorii lub oferty
      </label>
      <input
        id="proposedCategory"
        bind:value={proposedCategory}
        placeholder="np. Wsparcie dla opiekunów osób z chorobą Alzheimera"
        class="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>

    <div class="space-y-2">
      <label
        for="situation"
        class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        Opisz w kilku zdaniach sytuację i potrzebę
      </label>
      <textarea
        id="situation"
        bind:value={situationDescription}
        rows="5"
        required
        placeholder="Bez danych wrażliwych – opisz w skrócie sytuację, z jaką się mierzysz lub którą obserwujesz. Co byłoby dla Ciebie realną pomocą?"
        class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
      <p class="text-xs text-slate-400">
        Nie wpisuj imion, nazwisk, dokładnych adresów ani innych danych pozwalających na
        identyfikację osób.
      </p>
    </div>

    <div class="space-y-2">
      <label
        for="contact"
        class="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        Preferowana forma kontaktu (opcjonalnie)
      </label>
      <input
        id="contact"
        bind:value={preferredContact}
        placeholder="np. e-mail lub numer telefonu, jeśli chcesz otrzymać odpowiedź"
        class="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
      />
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
      <p class="text-xs text-slate-400">
        Wysyłając zgłoszenie, wyrażasz zgodę na jego wykorzystanie w celu projektowania
        nowych usług i kategorii wsparcia.
      </p>
      <button
        type="submit"
        class="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
      >
        Wyślij zgłoszenie
      </button>
    </div>

    {#if submitted}
      <div class="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
        Dziękujemy za podzielenie się swoim doświadczeniem. Twoje zgłoszenie pomoże
        w lepszym dopasowaniu oferty pomocy do potrzeb mieszkańców Gdyni.
      </div>
    {/if}
  </form>
</section>

