<script lang="ts">
  import { t, locale } from '$lib/i18n';
  import offersData from '$lib/data/offers.json';
  import { getText } from '$lib/types/offers';
  import type { Offer, ProblemCategory, InstitutionType } from '$lib/types/offers';

  const offers = offersData as Offer[];

  let isOpen = $state(false);
  let input = $state('');
  let messages = $state<{ role: 'bot' | 'user'; text: string }[]>([]);
  let chatBody: HTMLDivElement | null = null;
  let showQuickActions = $state(true);

  // --- Expanded keyword maps ---

  const categoryKeywords: Record<ProblemCategory, string[]> = {
    abuse: [
      'przemoc', 'nadużyci', 'bicie', 'maltretow', 'znęca', 'molestow', 'gwałt', 'ofiara', 'krzywdz',
      'stalking', 'nękani', 'agresj', 'zastrasz', 'bity', 'bita', 'uderz',
      'violence', 'abuse', 'assault', 'victim', 'harass', 'beaten', 'hurt me', 'hitting',
      'насильств', 'зловживан', 'жертв', 'побит', 'знущан', 'агресі', 'кривдж'
    ],
    addiction: [
      'uzależnien', 'alkohol', 'narkotyk', 'nałóg', 'piję', 'pije', 'hazard', 'palę', 'papieros',
      'dopalacz', 'odwyk', 'detoks', 'trzeźw', 'pić', 'pic', 'wódk', 'vodka', 'piwo', 'substancj',
      'ćpanie', 'cpanie', 'kokain', 'heroin', 'marihuan', 'joint', 'tabletk', 'leki',
      'addiction', 'addict', 'alcohol', 'drug', 'drinking', 'sober', 'rehab', 'gambling', 'substance',
      'залежніст', 'алкогол', 'наркотик', 'звичк', 'тверезіст', 'реабілітац', 'азартн'
    ],
    financial: [
      'finans', 'pieniądz', 'pieniędz', 'czynsz', 'dług', 'długi', 'komornik', 'eksmisj', 'bieda',
      'zasiłek', 'zasiłk', 'socjaln', 'świadczen', 'rachunk', 'opłat', 'kredyt', 'pożyczk',
      'nie mam pieniędzy', 'nie mam kasy', 'brak pieniędzy', 'nie stać', 'ubóstw', 'bankructw',
      'financial', 'money', 'rent', 'debt', 'eviction', 'poverty', 'benefit', 'welfare', 'payment', 'poor', 'broke',
      'фінанс', 'гроші', 'борг', 'оренд', 'бідніст', 'виселен', 'допомог', 'субсиді', 'борги', 'грошей'
    ],
    mental_health: [
      'psychiczn', 'depresj', 'lęk', 'stres', 'psycholog', 'psychiatr', 'terapi', 'teraput',
      'nerwic', 'bezsennoś', 'bezsenn', 'panik', 'atak panik', 'fobi', 'zaburzen', 'kryzys',
      'smutne', 'smutn', 'samotnoś', 'samotn', 'nie radz', 'nie radzę', 'nie daję rady', 'nie daje rady',
      'wypaleni', 'traumat', 'ptsd', 'myśli', 'źle się czuję', 'zle sie czuje', 'nie mogę spać',
      'psychoterapi', 'emocj', 'niepokój', 'niepokoj', 'płacz', 'placz', 'rozpacz',
      'mental', 'depression', 'anxiety', 'stress', 'therapist', 'therapy', 'psychologist', 'panic',
      'sleep', 'insomnia', 'lonely', 'burnout', 'trauma', 'i feel bad', 'sad', 'crying', 'overwhelm',
      'психічн', 'депрес', 'тривог', 'стрес', 'психолог', 'терапі', 'безсонн', 'панік',
      'самотніст', 'не справляюся', 'погано', 'плач', 'розпач', 'криз'
    ],
    housing: [
      'mieszkan', 'bezdomn', 'schronisk', 'noclegow', 'dach nad głow', 'na ulicy', 'eksmisj',
      'lokal', 'kwaterunek', 'komunaln', 'wynajm', 'wynajem', 'spanie', 'śpię na',
      'housing', 'homeless', 'shelter', 'evict', 'roof', 'sleep rough', 'street', 'accomodat',
      'житл', 'безпритульн', 'притулок', 'нічліж', 'виселен', 'на вулиці', 'дах'
    ],
    family: [
      'rodzin', 'dzieck', 'dziecko', 'dziecmi', 'dzieckiem', 'wychow', 'rozwód', 'rozwod',
      'alimenty', 'opiek', 'kurator', 'adopcj', 'piecz', 'matk', 'ojciec', 'ojca',
      'rodzeństw', 'nastolatk', 'młodzie', 'mąż', 'maz', 'żona', 'zona', 'małżeń', 'malzeń',
      'ciąż', 'ciaz', 'poród', 'porod', 'kobieta', 'macierzy', 'ojcostw',
      'family', 'child', 'children', 'divorce', 'custody', 'parent', 'mother', 'father',
      'teenager', 'youth', 'wife', 'husband', 'pregnan', 'baby',
      'сім\'', 'дитин', 'вихован', 'розлучен', 'батьк', 'матір', 'опік', 'підліт',
      'дружин', 'чоловік', 'вагітн', 'немовл'
    ],
    legal: [
      'prawn', 'prawnik', 'sąd', 'sądu', 'adwokat', 'porad', 'urzęd', 'dokument', 'umow',
      'kontrakt', 'pozew', 'mandat', 'policj', 'karn', 'cywil', 'sprawa', 'skarg', 'wnios',
      'zezwolen', 'pozwolen', 'regulacj', 'pracodawc', 'zwolnien', 'pracy',
      'legal', 'lawyer', 'court', 'attorney', 'law', 'contract', 'document', 'complaint', 'rights', 'police',
      'правов', 'юридичн', 'адвокат', 'суд', 'документ', 'поліці', 'закон', 'права', 'скарг', 'заяв'
    ],
    migration: [
      'migracj', 'uchodźc', 'uchodźca', 'cudzoziemiec', 'cudzoziemk', 'obcokrajow', 'wiza',
      'pobyt', 'azyl', 'karta pobytu', 'integraq', 'tłumacz', 'przesiedl', 'granica',
      'paszport', 'pesel', 'meldunek', 'ukraiń', 'ukrain',
      'migration', 'migrant', 'refugee', 'foreigner', 'visa', 'asylum', 'residence', 'integration', 'translat',
      'міграц', 'біженц', 'іноземц', 'віза', 'притулок', 'інтеграц', 'перекладач',
      'дозвіл на проживання', 'паспорт'
    ]
  };

  // Map institution type keywords to filter
  const institutionKeywords: Record<InstitutionType, string[]> = {
    therapist: ['terapeut', 'psycholog', 'psychiatr', 'poradni', 'therapist', 'psychologist', 'counsell', 'терапевт', 'психолог'],
    lawyer: ['prawnik', 'adwokat', 'radca', 'lawyer', 'attorney', 'адвокат', 'юрист'],
    social_worker: ['pracownik socjaln', 'socjaln', 'ośrod', 'osrod', 'mops', 'social worker', 'соціальн'],
    crisis_center: ['kryzysow', 'interwencj', 'crisis', 'кризов'],
    support_group: ['grupa wsparcia', 'grupa samopom', 'support group', 'група підтримки'],
    hotline: ['telefon', 'linia', 'zadzwon', 'zadzwoń', 'numer', 'hotline', 'helpline', 'гаряча лінія', 'телефон'],
    shelter: ['schronisk', 'nocleg', 'shelter', 'притулок', 'нічліжн'],
    other: []
  };

  function getGreeting(): string {
    const lang = $locale;
    if (lang === 'uk') return 'Привіт! 👋 Я помічник Gdynia Wspiera. Я можу допомогти вам знайти безкоштовну підтримку в Гдині.\n\nОберіть тему нижче або опишіть свою ситуацію, наприклад:\n• «Потрібен психолог»\n• «Мене б\'ють вдома»\n• «Потрібна юридична допомога»';
    if (lang === 'en') return 'Hello! 👋 I\'m the Gdynia Wspiera assistant. I can help you find free support in Gdynia.\n\nPick a topic below or describe your situation, for example:\n• "I need a therapist"\n• "I have financial problems"\n• "Where can I get legal help?"';
    return 'Cześć! 👋 Jestem asystentem Gdynia Wspiera. Pomogę Ci znaleźć bezpłatne wsparcie w Gdyni.\n\nWybierz temat poniżej lub opisz swoją sytuację, na przykład:\n• „Szukam psychologa"\n• „Mam problemy z alkoholem"\n• „Gdzie znajdę pomoc prawną?"';
  }

  function getQuickActions(): { label: string; category: ProblemCategory }[] {
    const lang = $locale;
    const cats: { key: ProblemCategory; pl: string; en: string; uk: string }[] = [
      { key: 'mental_health', pl: '🧠 Zdrowie psychiczne', en: '🧠 Mental health', uk: '🧠 Психічне здоров\'я' },
      { key: 'abuse', pl: '🛡️ Przemoc', en: '🛡️ Violence', uk: '🛡️ Насильство' },
      { key: 'addiction', pl: '🚫 Uzależnienia', en: '🚫 Addiction', uk: '🚫 Залежності' },
      { key: 'family', pl: '👨‍👩‍👧 Rodzina', en: '👨‍👩‍👧 Family', uk: '👨‍👩‍👧 Сім\'я' },
      { key: 'financial', pl: '💰 Finanse', en: '💰 Financial', uk: '💰 Фінанси' },
      { key: 'legal', pl: '⚖️ Prawo', en: '⚖️ Legal', uk: '⚖️ Правова допомога' },
      { key: 'housing', pl: '🏠 Mieszkanie', en: '🏠 Housing', uk: '🏠 Житло' },
      { key: 'migration', pl: '🌍 Migracja', en: '🌍 Migration', uk: '🌍 Міграція' },
    ];
    return cats.map(c => ({ label: lang === 'uk' ? c.uk : lang === 'en' ? c.en : c.pl, category: c.key }));
  }

  function findOffers(categories: ProblemCategory[], instType?: InstitutionType): Offer[] {
    let result = offers;
    if (categories.length > 0) {
      result = result.filter(o => o.categories.some(c => categories.includes(c)));
    }
    if (instType) {
      result = result.filter(o => o.institutionType === instType);
    }
    return result;
  }

  function searchByText(text: string): Offer[] {
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 2);
    return offers.filter(o => {
      const name = getText(o.name, $locale ?? 'pl').toLowerCase();
      const desc = getText(o.descriptionShort, $locale ?? 'pl').toLowerCase();
      const descLong = getText(o.descriptionLong, $locale ?? 'pl').toLowerCase();
      const address = o.address.toLowerCase();
      const district = o.district.toLowerCase();
      const all = `${name} ${desc} ${descLong} ${address} ${district}`;
      return words.some(w => all.includes(w));
    });
  }

  function detectCategories(text: string): ProblemCategory[] {
    const lower = text.toLowerCase();
    const found: ProblemCategory[] = [];
    for (const [cat, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(kw => lower.includes(kw))) {
        found.push(cat as ProblemCategory);
      }
    }
    return found;
  }

  function detectInstitutionType(text: string): InstitutionType | undefined {
    const lower = text.toLowerCase();
    for (const [type, keywords] of Object.entries(institutionKeywords)) {
      if (keywords.some(kw => lower.includes(kw))) {
        return type as InstitutionType;
      }
    }
    return undefined;
  }

  function formatOfferResults(matched: Offer[], context?: string): string {
    const lang = $locale;
    if (matched.length === 0) {
      if (lang === 'uk') return 'На жаль, не знайдено пропозицій за вашим запитом. Спробуйте переглянути [всі пропозиції](/offers) або опишіть ситуацію іншими словами.';
      if (lang === 'en') return 'No matching offers found. Try browsing [all offers](/offers) or describe your situation differently.';
      return 'Nie znaleziono pasujących ofert. Spróbuj przejrzeć [wszystkie oferty](/offers) lub opisz swoją sytuację innymi słowami.';
    }
    const top = matched.slice(0, 3);
    let header: string;
    if (lang === 'uk') header = `Znaleziono ${matched.length} propozycji${context ? ` (${context})` : ''}. Ось найкращі:`;
    else if (lang === 'en') header = `Found ${matched.length} offer${matched.length === 1 ? '' : 's'}${context ? ` (${context})` : ''}:`;
    else header = `Znaleziono ${matched.length} ofer${matched.length === 1 ? 'tę' : 't'}${context ? ` (${context})` : ''}:`;

    const items = top.map(o => {
      const name = getText(o.name, lang ?? 'pl');
      const desc = getText(o.descriptionShort, lang ?? 'pl');
      return `\n📌 **${name}**\n${desc}\n📍 ${o.address}, ${o.district}\n🔗 [${lang === 'uk' ? 'Деталі' : lang === 'en' ? 'Details' : 'Szczegóły'}](/offers/${o.id})`;
    }).join('\n');

    let footer = '';
    if (matched.length > 3) {
      if (lang === 'uk') footer = `\n\n➡️ [Переглянути всі пропозиції](/offers)`;
      else if (lang === 'en') footer = `\n\n➡️ [See all offers](/offers)`;
      else footer = `\n\n➡️ [Zobacz wszystkie oferty](/offers)`;
    }
    return header + items + footer;
  }

  function getEmergencyResponse(): string {
    const lang = $locale;
    if (lang === 'uk') return '🚨 **Якщо ви в небезпеці або маєте суїцидальні думки:**\n• Зателефонуйте **112** (екстрена допомога)\n• Телефон довіри: **116 123**\n• Дитяча лінія довіри: **116 111**\n\nВи не самі — допомога доступна цілодобово.\n\nТакож перегляньте [пропозиції кризової допомоги](/offers).';
    if (lang === 'en') return '🚨 **If you are in danger or having suicidal thoughts:**\n• Call **112** (emergency)\n• Helpline: **116 123**\n• Children\'s helpline: **116 111**\n\nYou are not alone — help is available 24/7.\n\nAlso see [crisis support offers](/offers).';
    return '🚨 **Jeśli jesteś w niebezpieczeństwie lub masz myśli samobójcze:**\n• Zadzwoń pod **112** (pogotowie)\n• Telefon zaufania: **116 123**\n• Telefon dla dzieci i młodzieży: **116 111**\n\nNie jesteś sam/sama — pomoc jest dostępna całodobowo.\n\nZobacz też [oferty pomocy kryzysowej](/offers).';
  }

  function getAboutResponse(): string {
    const lang = $locale;
    if (lang === 'uk') return 'Gdynia Wspiera — це безкоштовний каталог перевірених пропозицій соціальної підтримки в Гдині. Тут ви знайдете допомогу щодо:\n• Психічного здоров\'я\n• Насильства\n• Залежностей\n• Фінансових труднощів\n• Юридичних питань\n• Житла\n• Міграції\n• Сімейних питань\n\nВсі послуги безкоштовні. Детальніше на сторінці [Про нас](/about).';
    if (lang === 'en') return 'Gdynia Wspiera is a free catalog of verified social support offers in Gdynia. Here you can find help with:\n• Mental health\n• Violence\n• Addiction\n• Financial difficulties\n• Legal issues\n• Housing\n• Migration\n• Family matters\n\nAll services are free. Learn more at [About](/about).';
    return 'Gdynia Wspiera to bezpłatna przeglądarka zweryfikowanych ofert pomocy społecznej w Gdyni. Znajdziesz tu wsparcie w zakresie:\n• Zdrowia psychicznego\n• Przemocy\n• Uzależnień\n• Trudności finansowych\n• Problemów prawnych\n• Mieszkalnictwa\n• Migracji\n• Spraw rodzinnych\n\nWszystkie usługi są bezpłatne. Więcej na stronie [O nas](/about).';
  }

  function getContactInfoResponse(offer: Offer): string {
    const lang = $locale;
    const name = getText(offer.name, lang ?? 'pl');
    let info = `📞 **${name}**\n`;
    if (offer.contact.phone) info += `Telefon: ${offer.contact.phone}\n`;
    if (offer.contact.email) info += `E-mail: ${offer.contact.email}\n`;
    if (offer.contact.website) info += `WWW: ${offer.contact.website}\n`;
    info += `📍 ${offer.address}, ${offer.district}\n`;
    if (offer.openingHours?.length) {
      const label = lang === 'uk' ? 'Години роботи' : lang === 'en' ? 'Opening hours' : 'Godziny otwarcia';
      info += `\n🕐 **${label}:**\n`;
      offer.openingHours.forEach(h => {
        info += `${h.day}: ${h.from}–${h.to}\n`;
      });
    }
    info += `\n🔗 [${lang === 'uk' ? 'Повна інформація' : lang === 'en' ? 'Full details' : 'Pełne informacje'}](/offers/${offer.id})`;
    return info;
  }

  function processMessage(text: string): string {
    const lower = text.toLowerCase().replace(/[?!.,;:]+/g, '').trim();
    const lang = $locale;

    // --- 1. Emergency detection (highest priority) ---
    const emergencyPatterns = [
      'samobójstw', 'samobojstw', 'samobójcz', 'samobojcz', 'chcę umrzeć', 'chce umrzec',
      'nie chcę żyć', 'nie chce zyc', 'chcę się zabić', 'chce sie zabic', 'odebrać sobie',
      'skrzywdzić się', 'skrzywdzic sie', 'niebezpieczeństw', 'zagrożenie życi',
      'ratunku', 'ratuj',
      'suicide', 'kill myself', 'want to die', 'end my life', 'danger', 'emergency',
      'суїцид', 'не хочу жити', 'хочу померти', 'небезпек', 'самогубств'
    ];
    if (emergencyPatterns.some(w => lower.includes(w))) {
      return getEmergencyResponse();
    }

    // --- 2. Greetings ---
    const greetings = ['cześć', 'czesc', 'hej', 'siema', 'witam', 'witaj', 'dzień dobry', 'dzien dobry',
      'hello', 'hi', 'hey', 'good morning', 'good afternoon',
      'привіт', 'добрий день', 'здрастуйте', 'вітаю'];
    if (greetings.some(g => lower === g || lower.startsWith(g + ' '))) {
      if (lang === 'uk') return 'Привіт! 😊 Чим я можу допомогти? Оберіть тему вище або опишіть, що вас турбує.';
      if (lang === 'en') return 'Hi! 😊 How can I help? Pick a topic above or tell me what you need.';
      return 'Cześć! 😊 W czym mogę pomóc? Wybierz temat powyżej lub powiedz, czego szukasz.';
    }

    // --- 3. Thanks ---
    const thanks = ['dzięk', 'dziek', 'dziękuję', 'dziekuje', 'thank', 'thanks', 'дякую', 'дякуємо'];
    if (thanks.some(w => lower.includes(w))) {
      if (lang === 'uk') return 'Будь ласка! Якщо потрібна ще допомога, просто напишіть. 😊';
      if (lang === 'en') return 'You\'re welcome! If you need more help, just ask. 😊';
      return 'Nie ma za co! Jeśli potrzebujesz czegoś jeszcze, śmiało pytaj. 😊';
    }

    // --- 4. "What is this" / about the platform ---
    const aboutPatterns = ['czym jest', 'co to jest', 'co to za', 'o czym', 'jaki cel', 'do czego służy',
      'what is this', 'what is gdynia', 'about this', 'what does this',
      'що це', 'що таке', 'для чого', 'про що'];
    if (aboutPatterns.some(w => lower.includes(w))) {
      return getAboutResponse();
    }

    // --- 5. "How to use" / "how does it work" ---
    const howToPatterns = ['jak korzyst', 'jak działą', 'jak dziala', 'jak to działa', 'jak szukać',
      'jak szukac', 'jak znaleźć', 'jak znalezc', 'jak używać', 'jak uzywac', 'instrukcj',
      'how to use', 'how does it work', 'how do i', 'how can i find',
      'як користуват', 'як це працює', 'як знайти', 'як шукати'];
    if (howToPatterns.some(w => lower.includes(w))) {
      if (lang === 'uk') return '📋 **Як користуватися:**\n1. Оберіть тему вище або напишіть, що вас турбує\n2. Я покажу відповідні безкоштовні пропозиції допомоги\n3. Натисніть «Деталі», щоб побачити контакти та години роботи\n\nМожете також переглянути [всі пропозиції](/offers) з фільтрами.';
      if (lang === 'en') return '📋 **How to use:**\n1. Pick a topic above or describe your situation\n2. I\'ll show matching free support offers\n3. Click "Details" for contact info and hours\n\nYou can also browse [all offers](/offers) with filters.';
      return '📋 **Jak korzystać:**\n1. Wybierz temat powyżej lub opisz swoją sytuację\n2. Pokażę Ci pasujące bezpłatne oferty pomocy\n3. Kliknij „Szczegóły", żeby zobaczyć kontakt i godziny otwarcia\n\nMożesz też przeglądać [wszystkie oferty](/offers) z filtrami.';
    }

    // --- 6. Questions about opening hours / contact ---
    const hoursPatterns = ['godzin', 'otwarc', 'czynne', 'czynny', 'kiedy', 'o której', 'o ktorej',
      'hours', 'open', 'when', 'schedule',
      'годин', 'розклад', 'коли', 'працює'];
    const contactPatterns = ['kontakt', 'telefon', 'numer', 'zadzwoni', 'mail', 'email', 'strona',
      'contact', 'phone', 'call', 'number',
      'контакт', 'телефон', 'номер', 'зателефонуват'];
    const asksHours = hoursPatterns.some(w => lower.includes(w));
    const asksContact = contactPatterns.some(w => lower.includes(w));

    if (asksHours || asksContact) {
      // Try to find which offer they're asking about
      const cats = detectCategories(lower);
      const instType = detectInstitutionType(lower);
      const matched = findOffers(cats, instType);
      if (matched.length > 0) {
        return getContactInfoResponse(matched[0]);
      }
      // Generic response
      if (lang === 'uk') return 'Щоб показати контакт або години роботи, вкажіть тему або тип установи. Наприклад: «Контакт до психолога» або «Години роботи кризового центру».';
      if (lang === 'en') return 'To show contact info or hours, tell me the topic or type. For example: "Contact for therapist" or "Crisis center hours".';
      return 'Żeby pokazać kontakt lub godziny, powiedz mi, jakiej pomocy szukasz. Na przykład: „Kontakt do psychologa" albo „Godziny centrum kryzysowego".';
    }

    // --- 7. "Where can I..." / "I need..." / "I'm looking for..." intent patterns ---
    const needPatterns = [
      'szukam', 'potrzebuj', 'potrzebuję', 'chcę', 'chciał', 'where can', 'where do',
      'need', 'looking for', 'can you help', 'can i get', 'i want',
      'шукаю', 'потрібн', 'хочу', 'де можна', 'де знайти', 'мені потрібн',
      'gdzie', 'gdzie mogę', 'gdzie znajdę', 'czy jest', 'czy są', 'jest jakiś', 'jest jakis',
      'mam problem', 'mój problem', 'moj problem', 'problem z', 'problemem',
      'kto pomoże', 'kto pomoze', 'do kogo', 'do kogo się', 'do kogo sie',
      'jest gdzieś', 'jest gdzies', 'polec', 'poleci', 'polecić',
      'знайти', 'допоможіть', 'порадьте'
    ];
    const hasNeedIntent = needPatterns.some(w => lower.includes(w));

    // --- 8. Category and institution detection ---
    const cats = detectCategories(lower);
    const instType = detectInstitutionType(lower);

    if (cats.length > 0 || instType) {
      const matched = findOffers(cats, instType);
      return formatOfferResults(matched);
    }

    // --- 9. If has need intent but no category matched, try full-text search ---
    if (hasNeedIntent) {
      const textResults = searchByText(lower);
      if (textResults.length > 0) {
        return formatOfferResults(textResults);
      }
    }

    // --- 10. Try full-text search as last resort ---
    if (lower.length >= 4) {
      const textResults = searchByText(lower);
      if (textResults.length > 0) {
        return formatOfferResults(textResults);
      }
    }

    // --- 11. "All offers" ---
    const allOffersPatterns = ['wszystkie', 'wszystko', 'pokaż oferty', 'pokaz oferty', 'lista', 'oferty',
      'show all', 'all offers', 'list', 'everything',
      'всі', 'усі', 'список', 'пропозиції'];
    if (allOffersPatterns.some(w => lower.includes(w))) {
      if (lang === 'uk') return `W naszej bazie jest ${offers.length} bezpłatnych propozycji. Переглянь їх на сторінці [пропозиції](/offers) — там є фільтри за категорією, типом і районом.`;
      if (lang === 'en') return `We have ${offers.length} free offers. Browse them at [offers](/offers) — you can filter by category, type and district.`;
      return `Mamy ${offers.length} bezpłatnych ofert. Przejrzyj je na stronie [oferty](/offers) – możesz filtrować po kategorii, typie i dzielnicy.`;
    }

    // --- 12. Improved fallback ---
    showQuickActions = true;
    if (lang === 'uk') return 'Вибачте, не зовсім зрозумів. 🤔 Спробуйте:\n• Обрати тему нижче\n• Описати проблему іншими словами\n• Написати «психолог», «правник», «фінанси»...\n\nАбо перегляньте [всі пропозиції](/offers).';
    if (lang === 'en') return 'Sorry, I didn\'t quite understand. 🤔 Try:\n• Picking a topic below\n• Describing your problem in other words\n• Typing "therapist", "legal", "financial"...\n\nOr browse [all offers](/offers).';
    return 'Przepraszam, nie do końca zrozumiałem. 🤔 Spróbuj:\n• Wybrać temat poniżej\n• Opisać problem innymi słowami\n• Wpisać „psycholog", „prawnik", „finanse"...\n\nAlbo przejrzyj [wszystkie oferty](/offers).';
  }

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen && messages.length === 0) {
      messages = [{ role: 'bot', text: getGreeting() }];
      showQuickActions = true;
    }
  }

  function handleQuickAction(category: ProblemCategory) {
    const catLabel = getQuickActions().find(a => a.category === category)?.label ?? category;
    showQuickActions = false;
    messages = [...messages, { role: 'user', text: catLabel }];
    const matched = findOffers([category]);
    messages = [...messages, { role: 'bot', text: formatOfferResults(matched) }];
    scrollToBottom();
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    showQuickActions = false;
    messages = [...messages, { role: 'user', text }];
    input = '';
    const reply = processMessage(text);
    messages = [...messages, { role: 'bot', text: reply }];
    scrollToBottom();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, 50);
  }

  function renderMarkdown(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br>');
  }
</script>

<div class="chatbot-wrapper">
  <button
    class="chatbot-toggle"
    onclick={toggleChat}
    aria-label={isOpen ? 'Close chat' : 'Open chat'}
  >
    {#if isOpen}
      ✕
    {:else}
      💬
    {/if}
  </button>

  {#if isOpen}
    <div class="chatbot-window" role="dialog" aria-label="Chatbot">
      <div class="chatbot-header">
        <span class="chatbot-header-title">💬 Gdynia Wspiera</span>
        <button class="chatbot-close" onclick={toggleChat} aria-label="Close">✕</button>
      </div>

      <div class="chatbot-body" bind:this={chatBody}>
        {#each messages as msg}
          <div class="chatbot-msg chatbot-msg-{msg.role}">
            {@html renderMarkdown(msg.text)}
          </div>
        {/each}

        {#if showQuickActions}
          <div class="chatbot-quick-actions">
            {#each getQuickActions() as action}
              <button
                class="chatbot-quick-btn"
                onclick={() => handleQuickAction(action.category)}
              >
                {action.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <div class="chatbot-input-bar">
        <input
          type="text"
          bind:value={input}
          onkeydown={handleKeydown}
          placeholder={$locale === 'uk' ? 'Напишіть повідомлення...' : $locale === 'en' ? 'Type a message...' : 'Napisz wiadomość...'}
        />
        <button onclick={sendMessage} aria-label="Send">➤</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .chatbot-wrapper {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 9999;
    font-family: var(--font-family-sans, system-ui, sans-serif);
  }

  .chatbot-toggle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: var(--color-primary, #0056a6);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }

  .chatbot-toggle:hover {
    transform: scale(1.1);
  }

  .chatbot-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 380px;
    max-width: calc(100vw - 32px);
    height: 520px;
    max-height: calc(100vh - 120px);
    background: var(--color-surface, #fff);
    border-radius: 16px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chatbot-header {
    background: var(--color-primary, #0056a6);
    color: white;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .chatbot-header-title {
    font-weight: 600;
    font-size: 0.95rem;
  }

  .chatbot-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .chatbot-close:hover {
    background: rgba(255,255,255,0.15);
  }

  .chatbot-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .chatbot-msg {
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 0.9rem;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .chatbot-msg :global(a) {
    color: var(--color-primary, #0056a6);
    text-decoration: underline;
  }

  .chatbot-msg-bot {
    background: #f0f4f8;
    color: var(--color-text, #12212f);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  .chatbot-msg-user {
    background: var(--color-primary, #0056a6);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .chatbot-quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 4px 0;
  }

  .chatbot-quick-btn {
    background: var(--color-primary-soft, #e1efff);
    color: var(--color-primary, #0056a6);
    border: 1px solid var(--color-border-subtle, #d3dde8);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 0.82rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .chatbot-quick-btn:hover {
    background: var(--color-primary, #0056a6);
    color: white;
  }

  .chatbot-input-bar {
    display: flex;
    border-top: 1px solid var(--color-border-subtle, #d3dde8);
    padding: 10px;
    gap: 8px;
    flex-shrink: 0;
  }

  .chatbot-input-bar input {
    flex: 1;
    border: 1px solid var(--color-border-subtle, #d3dde8);
    border-radius: 20px;
    padding: 8px 14px;
    font-size: 0.9rem;
    outline: none;
    font-family: inherit;
  }

  .chatbot-input-bar input:focus {
    border-color: var(--color-primary, #0056a6);
    box-shadow: 0 0 0 2px rgba(0,86,166,0.15);
  }

  .chatbot-input-bar button {
    background: var(--color-primary, #0056a6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .chatbot-input-bar button:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    .chatbot-window {
      width: calc(100vw - 16px);
      height: calc(100vh - 100px);
      right: -16px;
      bottom: 64px;
      border-radius: 12px;
    }
  }
</style>
