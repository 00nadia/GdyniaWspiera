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
  let conversationContext = $state<ProblemCategory[]>([]);
  let lastMatchedOffers = $state<Offer[]>([]);
  let awaitingFollowUp = $state<string | null>(null);

  // --- Comprehensive keyword maps ---

  const categoryKeywords: Record<ProblemCategory, string[]> = {
    abuse: [
      // PL
      'przemoc', 'nadużyci', 'bicie', 'maltretow', 'znęca', 'molestow', 'gwałt', 'ofiara', 'krzywdz',
      'stalking', 'nękani', 'agresj', 'zastrasz', 'bity', 'bita', 'uderz', 'pobił', 'pobil',
      'groźb', 'grozb', 'szantaż', 'szantaz', 'dręcz', 'drecz', 'poniża', 'poniza', 'wyzywa',
      'partner', 'partnersk', 'domow', 'w domu', 'boi się', 'boi sie', 'boję się', 'boje sie',
      'mąż mnie bije', 'żona mnie bije', 'rodzice mnie biją', 'ktoś mnie bije',
      // EN
      'violence', 'abuse', 'assault', 'victim', 'harass', 'beaten', 'hurt me', 'hitting',
      'domestic', 'threat', 'stalked', 'scared', 'afraid', 'bully', 'intimidat',
      // UK
      'насильств', 'зловживан', 'жертв', 'побит', 'знущан', 'агресі', 'кривдж',
      'загроз', 'переслідуван', 'боюся', 'домашн', 'б\'є', 'б\'ють'
    ],
    addiction: [
      // PL
      'uzależnien', 'alkohol', 'narkotyk', 'nałóg', 'nalog', 'piję', 'pije', 'hazard', 'palę', 'papieros',
      'dopalacz', 'odwyk', 'detoks', 'trzeźw', 'trzezw', 'pić', 'pic', 'wódk', 'wodk', 'vodka', 'piwo',
      'substancj', 'ćpanie', 'cpanie', 'kokain', 'heroin', 'marihuan', 'joint', 'tabletk', 'leki',
      'za dużo piję', 'za duzo pije', 'gram w automat', 'zakłady', 'zaklady', 'butelk', 'pijany', 'pijan',
      'odtruwan', 'terapia uzależ', 'aa', 'anonimowi alko', 'wyniszcz',
      // EN
      'addiction', 'addict', 'alcohol', 'drug', 'drinking', 'sober', 'rehab', 'gambling', 'substance',
      'drunk', 'overdose', 'withdrawal', 'smoking', 'pills',
      // UK
      'залежніст', 'алкогол', 'наркотик', 'звичк', 'тверезіст', 'реабілітац', 'азартн',
      'п\'ю', 'випиваю', 'наркоман', 'вживан'
    ],
    financial: [
      // PL
      'finans', 'pieniądz', 'pieniędz', 'pieniadz', 'pieniedz', 'czynsz', 'dług', 'dlug', 'długi', 'dlugi',
      'komornik', 'eksmisj', 'bieda', 'zasiłek', 'zasilek', 'zasiłk', 'socjaln', 'świadczen', 'swiadczen',
      'rachunk', 'opłat', 'oplat', 'kredyt', 'pożyczk', 'pozyczk',
      'nie mam pieniędzy', 'nie mam pieniedzy', 'nie mam kasy', 'brak pieniędzy', 'brak pieniedzy',
      'nie stać', 'nie stac', 'ubóstw', 'ubostw', 'bankructw', 'wypłat', 'wyplat', 'pensj',
      'głodny', 'glodny', 'głód', 'glod', 'jedzeni', 'jedzen', 'bank żywności', 'bank zywnosci',
      'bezrobot', 'praca', 'stracił pracę', 'stracil prace', 'zwolnion', 'zaległoś', 'zaleglos',
      // EN
      'financial', 'money', 'rent', 'debt', 'eviction', 'poverty', 'benefit', 'welfare', 'payment',
      'poor', 'broke', 'hungry', 'food', 'unemploy', 'job', 'lost my job', 'salary',
      // UK
      'фінанс', 'гроші', 'грошей', 'борг', 'борги', 'оренд', 'бідніст', 'виселен',
      'допомог', 'субсиді', 'голодн', 'їж', 'безробіт', 'робот', 'зарплат'
    ],
    mental_health: [
      // PL
      'psychiczn', 'depresj', 'lęk', 'lek', 'stres', 'psycholog', 'psychiatr', 'terapi', 'teraput',
      'nerwic', 'bezsennoś', 'bezsennosc', 'bezsenn', 'panik', 'atak panik', 'fobi', 'zaburzen', 'kryzys',
      'smutne', 'smutn', 'samotnoś', 'samotnosc', 'samotn', 'nie radz', 'nie radzę', 'nie radze',
      'nie daję rady', 'nie daje rady', 'nie dam rady', 'wypaleni', 'traumat', 'ptsd',
      'myśli', 'mysli', 'źle się czuję', 'zle sie czuje', 'nie mogę spać', 'nie moge spac',
      'psychoterapi', 'emocj', 'niepokój', 'niepokoj', 'płacz', 'placz', 'rozpacz',
      'leczeni', 'chorob', 'nerwy', 'zdenerwow', 'irytacj', 'złość', 'zlosc',
      'pustkę', 'pustke', 'pustka', 'otępieni', 'otepieni', 'apatia', 'apatycz',
      'nie chce mi się żyć', 'nie chce mi sie zyc', 'sens życia', 'sens zycia',
      'obniżony nastrój', 'obnizony nastroj', 'zły nastrój', 'zly nastroj',
      // EN
      'mental', 'depression', 'depressed', 'anxiety', 'anxious', 'stress', 'stressed',
      'therapist', 'therapy', 'psychologist', 'panic', 'sleep', 'insomnia',
      'lonely', 'loneliness', 'burnout', 'trauma', 'i feel bad', 'feeling bad',
      'sad', 'sadness', 'crying', 'overwhelm', 'empty', 'numb', 'apathy',
      'mood', 'angry', 'anger', 'scared', 'worried', 'worry',
      // UK
      'психічн', 'депрес', 'тривог', 'тривожн', 'стрес', 'психолог', 'терапі', 'безсонн', 'панік',
      'самотніст', 'самотн', 'не справляюся', 'погано', 'плач', 'розпач', 'криз',
      'сум', 'порожнеч', 'апаті', 'настрій', 'злість', 'хвилюван'
    ],
    housing: [
      // PL
      'mieszkan', 'bezdomn', 'schronisk', 'noclegow', 'dach nad głow', 'dach nad glow',
      'na ulicy', 'eksmisj', 'lokal', 'kwaterunek', 'komunaln', 'wynajm', 'wynajem',
      'spanie', 'śpię na', 'spie na', 'nie mam gdzie', 'nie mam dachu',
      'nocleg', 'żyje na ulicy', 'zyje na ulicy', 'pod mostem', 'w samochodzie',
      'ogrzewalni', 'jadłodajn', 'jadlodajn', 'wymeldowan', 'zameldowan',
      // EN
      'housing', 'homeless', 'shelter', 'evict', 'roof', 'sleep rough', 'street',
      'accomodat', 'nowhere to live', 'no place', 'kicked out',
      // UK
      'житл', 'безпритульн', 'притулок', 'нічліж', 'виселен', 'на вулиці',
      'дах', 'бездомн', 'ночівл', 'немає де жити'
    ],
    family: [
      // PL
      'rodzin', 'dzieck', 'dziecko', 'dziecmi', 'dzieckiem', 'wychow', 'rozwód', 'rozwod',
      'alimenty', 'opiek', 'kurator', 'adopcj', 'piecz', 'matk', 'ojciec', 'ojca',
      'rodzeństw', 'rodzenst', 'nastolatk', 'młodzie', 'mlodziez', 'mąż', 'maz', 'żona', 'zona',
      'małżeń', 'malzen', 'ciąż', 'ciaz', 'poród', 'porod', 'kobieta', 'macierzy', 'ojcostw',
      'rodzice', 'teściow', 'tesciow', 'synow', 'córk', 'cork', 'wnuk', 'wnucz',
      'kłótni', 'klotni', 'problemy w związ', 'problemy w zwiaz', 'rozstani',
      'samotna matka', 'samotny ojciec', 'mediacj', 'terapia par', 'terapia rodzin',
      'nieletni', 'szkoła', 'szkola', 'wagary', 'trudna młodzież', 'trudna mlodziez',
      // EN
      'family', 'child', 'children', 'divorce', 'custody', 'parent', 'mother', 'father',
      'teenager', 'youth', 'wife', 'husband', 'pregnan', 'baby', 'marriage', 'couple',
      'mediation', 'relationship', 'son', 'daughter', 'guardian',
      // UK
      'сім\'', 'дитин', 'дітей', 'вихован', 'розлучен', 'батьк', 'матір', 'опік', 'підліт',
      'дружин', 'чоловік', 'вагітн', 'немовл', 'шлюб', 'пар', 'стосунк',
      'син', 'дочк', 'медіаці', 'розставан'
    ],
    legal: [
      // PL
      'prawn', 'prawnik', 'sąd', 'sad', 'sądu', 'sadu', 'adwokat', 'porad', 'urzęd', 'urzed',
      'dokument', 'umow', 'kontrakt', 'pozew', 'mandat', 'policj', 'karn', 'cywil',
      'sprawa', 'skarg', 'wnios', 'zezwolen', 'pozwolen', 'regulacj', 'pracodawc',
      'zwolnien', 'pracy', 'kodeks', 'paragraf', 'przepis', 'ustaw', 'prawo',
      'oskarżeni', 'oskarzeni', 'zarzut', 'obrońc', 'obronc', 'notarius', 'akt',
      'spadek', 'testament', 'darowizn', 'nieruchomoś', 'nieruchomosc',
      'reklamacj', 'odszkodowan', 'ubezpieczeni', 'renta', 'emerytur',
      'lokator', 'najemca', 'wynajmujący', 'wynajmujacy',
      // EN
      'legal', 'lawyer', 'court', 'attorney', 'law', 'contract', 'document', 'complaint',
      'rights', 'police', 'crime', 'criminal', 'civil', 'sue', 'lawsuit', 'will', 'inherit',
      'tenant', 'landlord', 'insurance', 'pension', 'compensation',
      // UK
      'правов', 'юридичн', 'адвокат', 'суд', 'суду', 'документ', 'поліці', 'закон',
      'права', 'скарг', 'заяв', 'злочин', 'спадщин', 'страхуван', 'пенсі',
      'орендар', 'договір', 'позов'
    ],
    migration: [
      // PL
      'migracj', 'uchodźc', 'uchodźca', 'uchodzc', 'cudzoziemiec', 'cudzoziemk', 'obcokrajow',
      'wiza', 'pobyt', 'azyl', 'karta pobytu', 'integraq', 'tłumacz', 'tlumacz',
      'przesiedl', 'granica', 'paszport', 'pesel', 'meldunek',
      'ukraiń', 'ukrain', 'białoruś', 'bialorus', 'repatria', 'deportacj',
      'zezwolenie na pobyt', 'zezwolenie na pracę', 'zezwolenie na prace',
      'nostryfikacj', 'uznan', 'dyplom', 'język polsk', 'jezyk polsk', 'kurs polsk',
      'legalizacj', 'status uchodźcy', 'status uchodzcy', 'ochrona międzynarod',
      // EN
      'migration', 'migrant', 'refugee', 'foreigner', 'visa', 'asylum', 'residence',
      'integration', 'translat', 'passport', 'permit', 'immigrant', 'expat',
      'work permit', 'residence permit', 'language course',
      // UK
      'міграц', 'біженц', 'іноземц', 'віза', 'притулок', 'інтеграц', 'перекладач',
      'дозвіл на проживання', 'паспорт', 'дозвіл на роботу', 'легалізац',
      'мовний курс', 'переселенц', 'статус біженц'
    ]
  };

  // Map institution type keywords to filter
  const institutionKeywords: Record<InstitutionType, string[]> = {
    therapist: [
      'terapeut', 'psycholog', 'psychiatr', 'poradni', 'gabinet', 'konsultacj',
      'therapist', 'psychologist', 'counsell', 'counselor', 'psychiatrist',
      'терапевт', 'психолог', 'психіатр', 'консультац'
    ],
    lawyer: [
      'prawnik', 'adwokat', 'radca', 'mecenas', 'kancelari',
      'lawyer', 'attorney', 'solicitor',
      'адвокат', 'юрист'
    ],
    social_worker: [
      'pracownik socjaln', 'socjaln', 'ośrod', 'osrod', 'mops', 'ops', 'gops',
      'ośrodek pomocy', 'osrodek pomocy', 'asystent rodziny',
      'social worker', 'social services', 'welfare office',
      'соціальн', 'соцпрацівник'
    ],
    crisis_center: [
      'kryzysow', 'interwencj', 'punkt kryzys', 'centrum kryzys',
      'crisis', 'crisis center', 'intervention',
      'кризов', 'інтервенц'
    ],
    support_group: [
      'grupa wsparcia', 'grupa samopom', 'spotkani', 'wspólnot',
      'support group', 'self-help', 'peer support',
      'група підтримки', 'взаємодопомог'
    ],
    hotline: [
      'telefon', 'linia', 'zadzwon', 'zadzwoń', 'numer', 'infolini', 'dyżur',
      'hotline', 'helpline', 'call',
      'гаряча лінія', 'телефон довіри'
    ],
    shelter: [
      'schronisk', 'nocleg', 'noclegowni', 'ogrzewalni', 'dom dla',
      'shelter', 'refuge', 'safe house',
      'притулок', 'нічліжн', 'прихисток'
    ],
    other: []
  };

  // Target group keywords
  const targetGroupKeywords: Record<string, string[]> = {
    children: ['dziec', 'dziecko', 'dziecmi', 'nastolatk', 'nieletni', 'małoletni', 'maloletni',
      'child', 'children', 'teen', 'minor', 'youth', 'kid',
      'дитин', 'дітей', 'підліт', 'неповнолітн'],
    seniors: ['senior', 'emeryt', 'starszych', 'osoba starsz', 'wiek podeszł', 'wiek podeszl',
      'senior', 'elderly', 'older', 'retired', 'pension',
      'літн', 'пенсіонер', 'старш'],
    families: ['rodzin', 'rodzice', 'matk', 'ojciec',
      'family', 'families', 'parent',
      'сім\'', 'батьк', 'родин'],
    women: ['kobieta', 'kobiet', 'matka', 'mama', 'ciężarn', 'ciezarn',
      'woman', 'women', 'female', 'mother',
      'жінк', 'жінок', 'мат', 'мама']
  };

  // District keywords for location-based search
  const districts = ['Śródmieście', 'Grabówek', 'Wzgórze', 'Chylonia', 'Cisowa', 'Działki Leśne',
    'Dąbrowa', 'Karwiny', 'Leszczynki', 'Mały Kack', 'Obłuże', 'Oksywie', 'Orłowo',
    'Pogórze', 'Pustki Cisowskie', 'Redłowo', 'Wielki Kack', 'Witomino'];

  function getGreeting(): string {
    const lang = $locale;
    if (lang === 'uk') return 'Привіт! 👋 Я помічник Gdynia Wspiera. Допоможу знайти безкоштовну підтримку в Гдині.\n\nОберіть тему нижче або опишіть ситуацію. Наприклад:\n• «Потрібен психолог»\n• «Мене б\'ють вдома»\n• «Допоможіть з документами для біженців»\n• «Шукаю допомоги для дитини»';
    if (lang === 'en') return 'Hello! 👋 I\'m the Gdynia Wspiera assistant. I\'ll help you find free support in Gdynia.\n\nPick a topic below or describe your situation. For example:\n• "I need a therapist"\n• "Help with financial problems"\n• "Where can I get legal help?"\n• "I\'m a refugee and need support"';
    return 'Cześć! 👋 Jestem asystentem Gdynia Wspiera. Pomogę Ci znaleźć bezpłatne wsparcie w Gdyni.\n\nWybierz temat poniżej lub opisz swoją sytuację. Na przykład:\n• „Szukam psychologa"\n• „Mam problemy z alkoholem"\n• „Gdzie znajdę pomoc prawną?"\n• „Potrzebuję pomocy dla dziecka"\n• „Jestem uchodźcą, potrzebuję wsparcia"';
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

  function findOffers(categories: ProblemCategory[], instType?: InstitutionType, targetGroup?: string, district?: string, onlineOnly?: boolean): Offer[] {
    let result = offers;
    if (categories.length > 0) {
      result = result.filter(o => o.categories.some(c => categories.includes(c)));
    }
    if (instType) {
      result = result.filter(o => o.institutionType === instType);
    }
    if (targetGroup) {
      result = result.filter(o => o.targetGroups?.some(g => g.toLowerCase().includes(targetGroup)));
    }
    if (district) {
      result = result.filter(o => o.district.toLowerCase().includes(district.toLowerCase()));
    }
    if (onlineOnly) {
      result = result.filter(o => o.isOnlineAvailable);
    }
    return result;
  }

  function searchByText(text: string): Offer[] {
    const lower = text.toLowerCase();
    const words = lower.split(/\s+/).filter(w => w.length > 2);
    if (words.length === 0) return [];

    const scored = offers.map(o => {
      const lang = $locale ?? 'pl';
      const name = getText(o.name, lang).toLowerCase();
      const desc = getText(o.descriptionShort, lang).toLowerCase();
      const descLong = getText(o.descriptionLong, lang).toLowerCase();
      const address = o.address.toLowerCase();
      const district = o.district.toLowerCase();
      const targetGroups = (o.targetGroups || []).join(' ').toLowerCase();
      const all = `${name} ${desc} ${descLong} ${address} ${district} ${targetGroups}`;

      let score = 0;
      for (const w of words) {
        if (name.includes(w)) score += 3;
        if (desc.includes(w)) score += 2;
        if (descLong.includes(w)) score += 1;
        if (address.includes(w) || district.includes(w)) score += 1;
        if (targetGroups.includes(w)) score += 1;
      }
      return { offer: o, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

    return scored.map(s => s.offer);
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

  function detectTargetGroup(text: string): string | undefined {
    const lower = text.toLowerCase();
    for (const [group, keywords] of Object.entries(targetGroupKeywords)) {
      if (keywords.some(kw => lower.includes(kw))) {
        return group.toLowerCase();
      }
    }
    return undefined;
  }

  function detectDistrict(text: string): string | undefined {
    const lower = text.toLowerCase();
    return districts.find(d => lower.includes(d.toLowerCase()));
  }

  function detectOnline(text: string): boolean {
    const patterns = ['online', 'zdaln', 'internet', 'przez komputer', 'przez telefon',
      'z domu', 'z domu', 'remotely', 'virtual', 'онлайн', 'дистанційн', 'віддален'];
    return patterns.some(p => text.toLowerCase().includes(p));
  }

  function formatOfferResults(matched: Offer[]): string {
    const lang = $locale;
    if (matched.length === 0) {
      if (lang === 'uk') return 'На жаль, не знайдено пропозицій за вашим запитом. Спробуйте переглянути [всі пропозиції](/offers) або опишіть ситуацію іншими словами.';
      if (lang === 'en') return 'No matching offers found. Try browsing [all offers](/offers) or describe your situation differently.';
      return 'Nie znaleziono pasujących ofert. Spróbuj przejrzeć [wszystkie oferty](/offers) lub opisz swoją sytuację innymi słowami.';
    }
    const top = matched.slice(0, 3);
    let header: string;
    if (lang === 'uk') header = `Знайдено ${matched.length} пропозиц${matched.length === 1 ? 'ію' : 'ій'}:`;
    else if (lang === 'en') header = `Found ${matched.length} offer${matched.length === 1 ? '' : 's'}:`;
    else header = `Znaleziono ${matched.length} ofer${matched.length === 1 ? 'tę' : 't'}:`;

    const items = top.map(o => {
      const name = getText(o.name, lang ?? 'pl');
      const desc = getText(o.descriptionShort, lang ?? 'pl');
      const phone = o.contact?.phone ? `\n📞 ${o.contact.phone}` : '';
      const online = o.isOnlineAvailable ? (lang === 'uk' ? '\n💻 Доступно онлайн' : lang === 'en' ? '\n💻 Online available' : '\n💻 Dostępne online') : '';
      return `\n📌 **${name}**\n${desc}\n📍 ${o.address}, ${o.district}${phone}${online}\n🔗 [${lang === 'uk' ? 'Деталі' : lang === 'en' ? 'Details' : 'Szczegóły'}](/offers/${o.id})`;
    }).join('\n');

    let footer = '';
    if (matched.length > 3) {
      if (lang === 'uk') footer = `\n\n➡️ [Переглянути всі ${matched.length} пропозицій](/offers)`;
      else if (lang === 'en') footer = `\n\n➡️ [See all ${matched.length} offers](/offers)`;
      else footer = `\n\n➡️ [Zobacz wszystkie ${matched.length} ofert](/offers)`;
    }

    // Follow-up suggestion
    let followUp = '';
    if (lang === 'uk') followUp = '\n\nМожете уточнити: «покажи контакт», «є щось онлайн?», «для дітей» або обрати іншу тему.';
    else if (lang === 'en') followUp = '\n\nYou can also ask: "show contact", "anything online?", "for children" or pick another topic.';
    else followUp = '\n\nMożesz też zapytać: „pokaż kontakt", „coś online?", „dla dzieci" albo wybrać inny temat.';

    return header + items + footer + followUp;
  }

  function getEmergencyResponse(): string {
    const lang = $locale;
    // Also show crisis center offer
    const crisisOffers = offers.filter(o => o.institutionType === 'crisis_center' || o.categories.includes('abuse'));
    const crisisInfo = crisisOffers.slice(0, 1).map(o => {
      const name = getText(o.name, lang ?? 'pl');
      return `\n\n🏥 **${name}**\n📍 ${o.address}\n📞 ${o.contact?.phone || ''}\n🔗 [${lang === 'uk' ? 'Деталі' : lang === 'en' ? 'Details' : 'Szczegóły'}](/offers/${o.id})`;
    }).join('');

    if (lang === 'uk') return `🚨 **Якщо ви в небезпеці або маєте суїцидальні думки:**\n• Зателефонуйте **112** (екстрена допомога)\n• Телефон довіри: **116 123**\n• Дитяча лінія довіри: **116 111**\n• Для жінок: **800 120 002** (Niebieska Linia)\n\nВи не самі — допомога доступна цілодобово.${crisisInfo}`;
    if (lang === 'en') return `🚨 **If you are in danger or having suicidal thoughts:**\n• Call **112** (emergency)\n• Helpline: **116 123**\n• Children\'s helpline: **116 111**\n• For women: **800 120 002** (Blue Line)\n\nYou are not alone — help is available 24/7.${crisisInfo}`;
    return `🚨 **Jeśli jesteś w niebezpieczeństwie lub masz myśli samobójcze:**\n• Zadzwoń pod **112** (pogotowie)\n• Telefon zaufania: **116 123**\n• Telefon dla dzieci i młodzieży: **116 111**\n• Dla kobiet: **800 120 002** (Niebieska Linia)\n\nNie jesteś sam/sama — pomoc jest dostępna całodobowo.${crisisInfo}`;
  }

  function getAboutResponse(): string {
    const lang = $locale;
    if (lang === 'uk') return `Gdynia Wspiera — це безкоштовний каталог перевірених пропозицій соціальної підтримки в Гдині.\n\n📊 В базі: **${offers.length} пропозицій**\n\nТут ви знайдете допомогу щодо:\n• 🧠 Психічного здоров\'я\n• 🛡️ Насильства\n• 🚫 Залежностей\n• 💰 Фінансових труднощів\n• ⚖️ Юридичних питань\n• 🏠 Житла\n• 🌍 Міграції\n• 👨‍👩‍👧 Сімейних питань\n\nВсі послуги безкоштовні. [Детальніше](/about)`;
    if (lang === 'en') return `Gdynia Wspiera is a free catalog of verified social support offers in Gdynia.\n\n📊 Database: **${offers.length} offers**\n\nHere you can find help with:\n• 🧠 Mental health\n• 🛡️ Violence\n• 🚫 Addiction\n• 💰 Financial difficulties\n• ⚖️ Legal issues\n• 🏠 Housing\n• 🌍 Migration\n• 👨‍👩‍👧 Family matters\n\nAll services are free. [Learn more](/about)`;
    return `Gdynia Wspiera to bezpłatna przeglądarka zweryfikowanych ofert pomocy społecznej w Gdyni.\n\n📊 W bazie: **${offers.length} ofert**\n\nZnajdziesz tu wsparcie w zakresie:\n• 🧠 Zdrowia psychicznego\n• 🛡️ Przemocy\n• 🚫 Uzależnień\n• 💰 Trudności finansowych\n• ⚖️ Problemów prawnych\n• 🏠 Mieszkalnictwa\n• 🌍 Migracji\n• 👨‍👩‍👧 Spraw rodzinnych\n\nWszystkie usługi są bezpłatne. [Więcej](/about)`;
  }

  function getContactInfoResponse(matched: Offer[]): string {
    const lang = $locale;
    const top = matched.slice(0, 3);
    let result = '';
    for (const offer of top) {
      const name = getText(offer.name, lang ?? 'pl');
      result += `\n📞 **${name}**\n`;
      if (offer.contact.phone) result += `Tel: ${offer.contact.phone}\n`;
      if (offer.contact.email) result += `E-mail: ${offer.contact.email}\n`;
      if (offer.contact.website) result += `WWW: ${offer.contact.website}\n`;
      result += `📍 ${offer.address}, ${offer.district}\n`;
      if (offer.openingHours?.length) {
        const label = lang === 'uk' ? 'Години' : lang === 'en' ? 'Hours' : 'Godziny';
        result += `🕐 ${label}: `;
        result += offer.openingHours.map(h => `${getText(h.day, lang ?? 'pl')} ${h.from}–${h.to}`).join(', ');
        result += '\n';
      }
      if (offer.isOnlineAvailable) {
        result += lang === 'uk' ? '💻 Доступно онлайн\n' : lang === 'en' ? '💻 Online available\n' : '💻 Dostępne online\n';
      }
      result += `🔗 [${lang === 'uk' ? 'Повна інформація' : lang === 'en' ? 'Full details' : 'Pełne informacje'}](/offers/${offer.id})\n`;
    }
    return result.trim();
  }

  function processMessage(text: string): string {
    const lower = text.toLowerCase().replace(/[?!.,;:]+/g, '').trim();
    const lang = $locale;

    // --- 1. Emergency detection (highest priority) ---
    const emergencyPatterns = [
      'samobójstw', 'samobojstw', 'samobójcz', 'samobojcz', 'chcę umrzeć', 'chce umrzec',
      'nie chcę żyć', 'nie chce zyc', 'chcę się zabić', 'chce sie zabic', 'odebrać sobie',
      'skrzywdzić się', 'skrzywdzic sie', 'niebezpieczeństw', 'niebezpieczenst',
      'zagrożenie życi', 'zagrozenie zyci', 'ratunku', 'ratuj', 'na pomoc',
      'nie chce mi się żyć', 'nie chce mi sie zyc', 'koniec', 'nie wytrzymam',
      'suicide', 'kill myself', 'want to die', 'end my life', 'danger', 'help me please',
      'суїцид', 'не хочу жити', 'хочу померти', 'небезпек', 'самогубств', 'допоможіть'
    ];
    if (emergencyPatterns.some(w => lower.includes(w))) {
      return getEmergencyResponse();
    }

    // --- 2. Greetings ---
    const greetings = ['cześć', 'czesc', 'hej', 'siema', 'witam', 'witaj', 'dzień dobry', 'dzien dobry',
      'dobry wieczór', 'dobry wieczor', 'elo', 'yo', 'halo',
      'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
      'привіт', 'добрий день', 'здрастуйте', 'вітаю', 'добрий вечір', 'доброго дня'];
    if (greetings.some(g => lower === g || (lower.startsWith(g) && lower.length < g.length + 5))) {
      showQuickActions = true;
      if (lang === 'uk') return 'Привіт! 😊 Чим я можу допомогти? Оберіть тему або опишіть, що вас турбує.';
      if (lang === 'en') return 'Hi! 😊 How can I help? Pick a topic or tell me what you need.';
      return 'Cześć! 😊 W czym mogę pomóc? Wybierz temat lub powiedz, czego szukasz.';
    }

    // --- 3. Thanks ---
    const thanks = ['dzięk', 'dziek', 'dziękuję', 'dziekuje', 'dzięki', 'dzieki',
      'super', 'fajnie', 'ok dzieki', 'ok dzięki', 'świetnie', 'swietnie',
      'thank', 'thanks', 'great', 'awesome', 'perfect',
      'дякую', 'дякуємо', 'дякую', 'чудово', 'супер'];
    if (thanks.some(w => lower === w || lower.startsWith(w))) {
      showQuickActions = true;
      if (lang === 'uk') return 'Будь ласка! 😊 Якщо потрібна ще допомога — просто напишіть або оберіть тему.';
      if (lang === 'en') return 'You\'re welcome! 😊 Need more help? Just ask or pick a topic.';
      return 'Nie ma za co! 😊 Jeśli potrzebujesz czegoś jeszcze — pytaj albo wybierz temat.';
    }

    // --- 4. "What is this" / about the platform ---
    const aboutPatterns = ['czym jest', 'co to jest', 'co to za', 'o czym', 'jaki cel', 'do czego służy',
      'do czego sluzy', 'po co', 'co oferujecie', 'co oferujesz', 'jakie usługi', 'jakie uslugi',
      'what is this', 'what is gdynia', 'about this', 'what does this', 'what do you do',
      'що це', 'що таке', 'для чого', 'про що', 'які послуги'];
    if (aboutPatterns.some(w => lower.includes(w))) {
      return getAboutResponse();
    }

    // --- 5. "How to use" / "how does it work" ---
    const howToPatterns = ['jak korzyst', 'jak działą', 'jak dziala', 'jak to działa', 'jak to dziala',
      'jak szukać', 'jak szukac', 'jak znaleźć', 'jak znalezc', 'jak używać', 'jak uzywac',
      'instrukcj', 'poradnik', 'tutorial',
      'how to use', 'how does it work', 'how do i', 'how can i find', 'tutorial',
      'як користуват', 'як це працює', 'як знайти', 'як шукати', 'інструкці'];
    if (howToPatterns.some(w => lower.includes(w))) {
      showQuickActions = true;
      if (lang === 'uk') return '📋 **Як користуватися:**\n1. Оберіть тему нижче або опишіть ситуацію\n2. Я покажу безкоштовні пропозиції допомоги\n3. Натисніть «Деталі» для контактів і годин роботи\n\nМожете також:\n• Запитати «покажи контакт до психолога»\n• Уточнити «для дітей» або «онлайн»\n• Переглянути [всі пропозиції](/offers) з фільтрами';
      if (lang === 'en') return '📋 **How to use:**\n1. Pick a topic below or describe your situation\n2. I\'ll show matching free support offers\n3. Click "Details" for contact info and hours\n\nYou can also:\n• Ask "show contact for therapist"\n• Specify "for children" or "online"\n• Browse [all offers](/offers) with filters';
      return '📋 **Jak korzystać:**\n1. Wybierz temat poniżej lub opisz sytuację\n2. Pokażę Ci bezpłatne oferty pomocy\n3. Kliknij „Szczegóły" — kontakt i godziny\n\nMożesz też:\n• Zapytać „pokaż kontakt do psychologa"\n• Doprecyzować „dla dzieci" albo „online"\n• Przejrzeć [wszystkie oferty](/offers) z filtrami';
    }

    // --- 6. Follow-up: "show more" / "next" ---
    const morePatterns = ['więcej', 'wiecej', 'następn', 'nastepn', 'inne', 'reszta', 'kolejn', 'dalej',
      'more', 'next', 'other', 'rest', 'continue',
      'більше', 'наступн', 'інші', 'далі', 'ще'];
    if (morePatterns.some(w => lower.includes(w)) && lastMatchedOffers.length > 3) {
      const remaining = lastMatchedOffers.slice(3, 6);
      if (remaining.length > 0) {
        const savedOffers = lastMatchedOffers;
        lastMatchedOffers = lastMatchedOffers.slice(3);
        return formatOfferResults(savedOffers.slice(3));
      }
    }

    // --- 7. Questions about contact / hours / details ---
    const hoursPatterns = ['godzin', 'otwarc', 'czynne', 'czynny', 'kiedy', 'o której', 'o ktorej',
      'kiedy otwar', 'do której', 'do ktorej', 'od której', 'od ktorej',
      'hours', 'open', 'when', 'schedule', 'opening',
      'годин', 'розклад', 'коли', 'працює', 'відчинен'];
    const contactPatterns = ['kontakt', 'telefon', 'numer', 'zadzwoni', 'zadzwoń', 'mail', 'email',
      'strona', 'www', 'adres', 'jak się skontaktow', 'jak sie skontaktow',
      'pokaż kontakt', 'pokaz kontakt', 'dane kontaktow',
      'contact', 'phone', 'call', 'number', 'address', 'reach', 'get in touch',
      'контакт', 'телефон', 'номер', 'зателефонуват', 'адрес', 'зв\'язат'];
    const asksHours = hoursPatterns.some(w => lower.includes(w));
    const asksContact = contactPatterns.some(w => lower.includes(w));

    if (asksHours || asksContact) {
      const cats = detectCategories(lower);
      const instType = detectInstitutionType(lower);
      let matched = findOffers(cats, instType);

      // If no category/type found but we have context from previous results, use that
      if (matched.length === 0 && lastMatchedOffers.length > 0) {
        matched = lastMatchedOffers;
      }
      if (matched.length === 0 && conversationContext.length > 0) {
        matched = findOffers(conversationContext);
      }

      if (matched.length > 0) {
        return getContactInfoResponse(matched);
      }

      if (lang === 'uk') return 'Щоб показати контакт, вкажіть тему. Наприклад: «контакт до психолога» або «гodziny centrum kryzysowego».';
      if (lang === 'en') return 'To show contact info, specify the topic. E.g.: "contact for therapist" or "crisis center hours".';
      return 'Żeby pokazać kontakt, powiedz jakiej pomocy szukasz. Np.: „kontakt do psychologa" albo „godziny centrum kryzysowego".';
    }

    // --- 8. Online filter ---
    const onlineOnly = detectOnline(lower);

    // --- 9. "For whom" questions ---
    const forWhomPatterns = ['dla kogo', 'kto może', 'kto moze', 'czy mogę', 'czy moge', 'dla mnie',
      'czy kwalifikuj', 'mam prawo', 'kto kwalifikuje',
      'for whom', 'who can', 'am i eligible', 'can i use',
      'для кого', 'хто може', 'чи можу'];
    if (forWhomPatterns.some(w => lower.includes(w))) {
      if (lang === 'uk') return 'Всі пропозиції на Gdynia Wspiera безкоштовні та доступні для мешканців Гдині. Більшість не потребує направлення.\n\nДеякі пропозиції призначені для конкретних груп (діти, сім\'ї, літні люди). Перевірте деталі конкретної пропозиції.\n\nОберіть тему, і я покажу підходящі пропозиції!';
      if (lang === 'en') return 'All offers on Gdynia Wspiera are free and available to Gdynia residents. Most don\'t require a referral.\n\nSome offers target specific groups (children, families, seniors). Check the specific offer details.\n\nPick a topic, and I\'ll show matching offers!';
      return 'Wszystkie oferty na Gdynia Wspiera są bezpłatne i dostępne dla mieszkańców Gdyni. Większość nie wymaga skierowania.\n\nNiektóre oferty są skierowane do określonych grup (dzieci, rodziny, seniorzy). Sprawdź szczegóły konkretnej oferty.\n\nWybierz temat, a pokażę pasujące oferty!';
    }

    // --- 10. "Is it free" / cost questions ---
    const freePatterns = ['za darmo', 'bezpłatn', 'bezplatn', 'darmow', 'ile kosztuj', 'cena', 'opłat', 'oplat',
      'free', 'cost', 'price', 'pay', 'charge',
      'безкоштовн', 'скільки коштує', 'ціна', 'платн', 'оплат'];
    if (freePatterns.some(w => lower.includes(w))) {
      if (lang === 'uk') return '✅ **Так, все безкоштовно!**\n\nВсі пропозиції на Gdynia Wspiera є повністю безкоштовними. Ви не платите за жодну з послуг.\n\nОберіть тему, і я покажу доступні пропозиції.';
      if (lang === 'en') return '✅ **Yes, everything is free!**\n\nAll offers on Gdynia Wspiera are completely free. You don\'t pay for any service.\n\nPick a topic, and I\'ll show available offers.';
      return '✅ **Tak, wszystko jest bezpłatne!**\n\nWszystkie oferty na Gdynia Wspiera są całkowicie darmowe. Nie płacisz za żadną usługę.\n\nWybierz temat, a pokażę dostępne oferty.';
    }

    // --- 11. "Do I need a referral" ---
    const referralPatterns = ['skierowan', 'skierowanie', 'zaświadczen', 'zaswiadczen', 'potrzebne dok',
      'referral', 'do i need', 'appointment', 'registration',
      'направленн', 'потрібно направлення', 'реєстраці'];
    if (referralPatterns.some(w => lower.includes(w))) {
      if (lang === 'uk') return '📋 Більшість пропозицій **не потребує направлення** — можна прийти або зателефонувати напряму.\n\nДеякі можуть вимагати попередньої реєстрації за телефоном. Перевірте деталі конкретної пропозиції.\n\nОберіть тему, і я покажу пропозиції з контактами.';
      if (lang === 'en') return '📋 Most offers **don\'t require a referral** — you can come or call directly.\n\nSome may require phone registration. Check the specific offer details.\n\nPick a topic, and I\'ll show offers with contacts.';
      return '📋 Większość ofert **nie wymaga skierowania** — możesz po prostu przyjść lub zadzwonić.\n\nNiektóre mogą wymagać rejestracji telefonicznej. Sprawdź szczegóły konkretnej oferty.\n\nWybierz temat, a pokażę oferty z kontaktami.';
    }

    // --- 12. "Where can I..." / "I need..." / situational patterns ---
    const needPatterns = [
      'szukam', 'potrzebuj', 'potrzebuję', 'chcę', 'chce', 'chciał', 'chciałab', 'chcialb',
      'where can', 'where do', 'need', 'looking for', 'can you help', 'can i get', 'i want', 'i need',
      'шукаю', 'потрібн', 'хочу', 'де можна', 'де знайти', 'мені потрібн',
      'gdzie', 'gdzie mogę', 'gdzie moge', 'gdzie znajdę', 'gdzie znajde',
      'czy jest', 'czy są', 'jest jakiś', 'jest jakis', 'jest gdzieś', 'jest gdzies',
      'mam problem', 'mój problem', 'moj problem', 'problem z', 'problemem',
      'kto pomoże', 'kto pomoze', 'do kogo', 'do kogo się', 'do kogo sie',
      'polec', 'poleci', 'polecić', 'polecisz', 'podpowiedz', 'wskaż', 'wskaz', 'doradź', 'doradz',
      'w jakiej', 'jaka instytucj', 'jaki ośrod', 'jaki osrod',
      'знайти', 'допоможіть', 'порадьте', 'підкажіть', 'де є'
    ];
    const hasNeedIntent = needPatterns.some(w => lower.includes(w));

    // --- 13. Combined detection: category + institution + targetGroup + district + online ---
    const cats = detectCategories(lower);
    const instType = detectInstitutionType(lower);
    const targetGroup = detectTargetGroup(lower);
    const district = detectDistrict(lower);

    if (cats.length > 0 || instType) {
      conversationContext = cats.length > 0 ? cats : conversationContext;
      const matched = findOffers(cats, instType, targetGroup, district, onlineOnly);
      lastMatchedOffers = matched;
      return formatOfferResults(matched);
    }

    // Target group or district without category — search all
    if (targetGroup || district || onlineOnly) {
      const matched = findOffers(conversationContext.length > 0 ? conversationContext : [], undefined, targetGroup, district, onlineOnly);
      if (matched.length > 0) {
        lastMatchedOffers = matched;
        return formatOfferResults(matched);
      }
    }

    // --- 14. Full-text search with scoring ---
    if (hasNeedIntent || lower.length >= 4) {
      const textResults = searchByText(lower);
      if (textResults.length > 0) {
        lastMatchedOffers = textResults;
        return formatOfferResults(textResults);
      }
    }

    // --- 15. "All offers" ---
    const allOffersPatterns = ['wszystkie', 'wszystko', 'pokaż oferty', 'pokaz oferty', 'lista', 'oferty', 'pełna lista', 'pelna lista',
      'show all', 'all offers', 'list', 'everything', 'full list',
      'всі', 'усі', 'список', 'пропозиції', 'повний список'];
    if (allOffersPatterns.some(w => lower.includes(w))) {
      if (lang === 'uk') return `📊 W naszej bazie jest **${offers.length}** безкоштовних пропозицій.\n\nПереглянь їх на сторінці [пропозиції](/offers) — там є фільтри за категорією, типом і районом.\n\nАбо оберіть тему, і я покажу конкретні пропозиції.`;
      if (lang === 'en') return `📊 We have **${offers.length}** free offers in our database.\n\nBrowse them at [offers](/offers) — filter by category, type and district.\n\nOr pick a topic, and I'll show specific offers.`;
      return `📊 Mamy **${offers.length}** bezpłatnych ofert w bazie.\n\nPrzejrzyj je na stronie [oferty](/offers) – filtruj po kategorii, typie i dzielnicy.\n\nAlbo wybierz temat, a pokażę konkretne oferty.`;
    }

    // --- 16. "bye" / closing ---
    const byePatterns = ['pa', 'do widzenia', 'do zobaczenia', 'nara', 'trzymaj się', 'trzymaj sie',
      'bye', 'goodbye', 'see you', 'take care',
      'бувай', 'до побачення', 'до зустрічі'];
    if (byePatterns.some(w => lower === w || lower.startsWith(w))) {
      if (lang === 'uk') return 'До побачення! 👋 Якщо знадобиться допомога — завжди можете повернутися. Тримайтеся! 💙';
      if (lang === 'en') return 'Goodbye! 👋 If you need help again — come back anytime. Take care! 💙';
      return 'Do widzenia! 👋 Jeśli będziesz potrzebować pomocy — wróć w każdej chwili. Trzymaj się! 💙';
    }

    // --- 17. Improved fallback with suggestions ---
    showQuickActions = true;
    if (lang === 'uk') return 'Не зовсім зрозумів. 🤔 Спробуйте:\n• Обрати тему нижче 👇\n• Описати проблему, наприклад: «потрібен психолог», «проблеми з алкоголем»\n• Запитати: «що тут є?» або «як користуватися?»\n\n[Переглянути всі пропозиції](/offers)';
    if (lang === 'en') return 'I didn\'t quite understand. 🤔 Try:\n• Picking a topic below 👇\n• Describing your problem, e.g.: "need a therapist", "alcohol problem"\n• Asking: "what is this?" or "how to use?"\n\n[Browse all offers](/offers)';
    return 'Nie do końca zrozumiałem. 🤔 Spróbuj:\n• Wybrać temat poniżej 👇\n• Opisać problem, np.: „szukam psychologa", „problem z alkoholem"\n• Zapytać: „co tu jest?" albo „jak korzystać?"\n\n[Przejrzyj wszystkie oferty](/offers)';
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
    conversationContext = [category];
    messages = [...messages, { role: 'user', text: catLabel }];
    const matched = findOffers([category]);
    lastMatchedOffers = matched;
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
