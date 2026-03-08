import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import offersData from '$lib/data/offers.json';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

function buildSystemPrompt(lang: string): string {
  const offersContext = offersData.map((o: any) => {
    const name = typeof o.name === 'object' ? o.name[lang] || o.name.pl : o.name;
    const desc = typeof o.descriptionShort === 'object' ? o.descriptionShort[lang] || o.descriptionShort.pl : o.descriptionShort;
    const descLong = typeof o.descriptionLong === 'object' ? o.descriptionLong[lang] || o.descriptionLong.pl : o.descriptionLong;
    return `- **${name}** (ID: ${o.id})
  Kategorie: ${o.categories.join(', ')}
  Typ: ${o.institutionType}
  Opis: ${desc}
  Szczegóły: ${descLong}
  Adres: ${o.address}, ${o.district}, ${o.city}
  Telefon: ${o.contact?.phone || 'brak'}
  Email: ${o.contact?.email || 'brak'}
  WWW: ${o.contact?.website || 'brak'}
  Grupy docelowe: ${o.targetGroups?.join(', ') || 'brak'}
  Języki: ${o.languagesOffered?.join(', ') || 'brak'}
  Online: ${o.isOnlineAvailable ? 'tak' : 'nie'}
  Godziny: ${o.openingHours?.map((h: any) => `${h.day}: ${h.from}-${h.to}`).join('; ') || 'brak'}
  Link: /offers/${o.id}`;
  }).join('\n\n');

  const langInstructions: Record<string, string> = {
    pl: 'Odpowiadaj po polsku.',
    en: 'Answer in English.',
    uk: 'Відповідай українською.'
  };

  return `Jesteś pomocnym asystentem platformy "Gdynia Wspiera" – bezpłatnej przeglądarki zweryfikowanych ofert pomocy społecznej w Gdyni (Polska).

${langInstructions[lang] || langInstructions.pl}

Twoje zadania:
1. Pomagaj użytkownikom znaleźć odpowiednie oferty wsparcia na podstawie ich sytuacji.
2. Odpowiadaj empatycznie i delikatnie – użytkownicy mogą być w trudnej sytuacji życiowej.
3. Podawaj konkretne oferty z bazy danych, włącznie z nazwą, adresem, kontaktem i linkiem.
4. Linki do ofert formatuj jako: [Nazwa](/offers/ID_OFERTY)
5. W sytuacjach kryzysowych (przemoc, myśli samobójcze) ZAWSZE podaj numery alarmowe: 112, Telefon Zaufania 116 123.
6. Nie wymyślaj ofert – używaj tylko tych z bazy poniżej.
7. Jeśli nie ma pasującej oferty, powiedz o tym i zaproponuj przejrzenie wszystkich ofert na stronie /offers.
8. Odpowiadaj zwięźle, ale informacyjnie. Używaj emoji gdzie pasuje.
9. Formatuj odpowiedzi używając Markdown (pogrubienia, listy, linki).

BAZA OFERT:

${offersContext}`;
}

export const POST: RequestHandler = async ({ request }) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return json({ error: 'Brak klucza API Gemini. Ustaw VITE_GEMINI_API_KEY w pliku .env' }, { status: 500 });
  }

  const { messages, lang } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return json({ error: 'Invalid request' }, { status: 400 });
  }

  const systemPrompt = buildSystemPrompt(lang || 'pl');

  const geminiContents = [
    {
      role: 'user',
      parts: [{ text: systemPrompt }]
    },
    {
      role: 'model',
      parts: [{ text: 'Rozumiem. Jestem asystentem Gdynia Wspiera i pomogę znaleźć odpowiednie oferty wsparcia.' }]
    },
    ...messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))
  ];

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.9
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Gemini API error:', errorText);
    return json({ error: 'Błąd API Gemini' }, { status: response.status });
  }

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Przepraszam, nie udało się wygenerować odpowiedzi.';

  return json({ reply });
};
