<script>
  import "../app.css";
</script>

<div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
  <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
    <nav
      class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm md:text-base"
      aria-label="Gdynia Wspiera nawigacja"
    >
      <a href="/" class="flex items-center gap-2 font-semibold tracking-tight">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
          GW
        </span>
        <span class="hidden sm:inline">
          Gdynia Wspiera
        </span>
      </a>

      <div class="flex items-center gap-4 md:gap-6">
        <a href="/" class="hover:text-indigo-300 transition-colors">
          Strona główna
        </a>
        <a href="/offers" class="hover:text-indigo-300 transition-colors">
          Przeglądaj ofertę
        </a>
        <a href="/about" class="hover:text-indigo-300 transition-colors">
          O nas
        </a>
        <a
          href="/missing-offer"
          class="rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 transition-colors md:text-sm"
        >
          Brakuje oferty?
        </a>
      </div>
    </nav>
  </header>

  <main class="flex-1 w-full">
    <div class="mx-auto flex h-full max-w-5xl flex-col px-4 py-8 md:py-10">
      <slot />
    </div>
  </main>

  <footer class="border-t border-slate-800 bg-slate-950/80">
    <div class="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
      <div>
        Gdynia Wspiera – nieoficjalny prototyp katalogu
        wsparcia społecznego dla mieszkanek i mieszkańców Gdyni.
      </div>
      <div class="flex gap-4">
        <a
          href="https://www.gdyniawspiera.pl"
          class="hover:text-indigo-300 transition-colors"
        >
          Aktualny serwis miasta
        </a>
        <span>
          Wszystkie oferty są bezpłatne, aktualne i weryfikowane przez instytucję prowadzącą.
        </span>
      </div>
    </div>
  </footer>
</div>
