<script lang="ts">
  import { locale } from '$lib/i18n';

  let isOpen = $state(false);
  let input = $state('');
  let messages = $state<{ role: 'bot' | 'user'; text: string }[]>([]);
  let chatBody: HTMLDivElement | null = null;
  let isLoading = $state(false);
  let apiError = $state<string | null>(null);

  function getGreeting(): string {
    const lang = $locale;
    if (lang === 'uk') return 'Привіт! 👋 Я AI-помічник Gdynia Wspiera. Опишіть свою ситуацію, і я допоможу знайти безкоштовну підтримку в Гдині.\n\nНаприклад:\n• «Мені потрібна психологічна допомога»\n• «Шукаю юридичну консультацію»\n• «Де можна отримати допомогу при насильстві?»';
    if (lang === 'en') return 'Hello! 👋 I\'m the Gdynia Wspiera AI assistant. Describe your situation and I\'ll help you find free support in Gdynia.\n\nFor example:\n• "I need psychological help"\n• "Where can I get legal advice?"\n• "I\'m struggling with addiction"';
    return 'Cześć! 👋 Jestem AI asystentem Gdynia Wspiera. Opisz swoją sytuację, a pomogę Ci znaleźć bezpłatne wsparcie w Gdyni.\n\nNa przykład:\n• „Potrzebuję pomocy psychologicznej"\n• „Szukam porady prawnej"\n• „Mam problem z uzależnieniem"';
  }

  function toggleChat() {
    isOpen = !isOpen;
    if (isOpen && messages.length === 0) {
      messages = [{ role: 'bot', text: getGreeting() }];
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    messages = [...messages, { role: 'user', text }];
    input = '';
    isLoading = true;
    apiError = null;
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.filter(m => m.role === 'user' || m.role === 'bot')
            .slice(1) // skip greeting
            .map(m => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text })),
          lang: $locale || 'pl'
        })
      });

      const data = await response.json();

      if (data.error) {
        apiError = data.error;
        const lang = $locale;
        let fallback: string;
        if (lang === 'uk') fallback = '⚠️ Не вдалося з\'єднатися з AI. Перевірте, чи встановлено ключ API Gemini у файлі .env (VITE_GEMINI_API_KEY).';
        else if (lang === 'en') fallback = '⚠️ Could not connect to AI. Make sure the Gemini API key is set in .env (VITE_GEMINI_API_KEY).';
        else fallback = '⚠️ Nie udało się połączyć z AI. Upewnij się, że klucz API Gemini jest ustawiony w pliku .env (VITE_GEMINI_API_KEY).';
        messages = [...messages, { role: 'bot', text: fallback }];
      } else {
        messages = [...messages, { role: 'bot', text: data.reply }];
      }
    } catch {
      const lang = $locale;
      let errMsg: string;
      if (lang === 'uk') errMsg = '⚠️ Помилка з\'єднання. Спробуйте ще раз.';
      else if (lang === 'en') errMsg = '⚠️ Connection error. Please try again.';
      else errMsg = '⚠️ Błąd połączenia. Spróbuj ponownie.';
      messages = [...messages, { role: 'bot', text: errMsg }];
    } finally {
      isLoading = false;
      scrollToBottom();
    }
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
    class="chatbot-toggle chatbot-toggle-ai"
    onclick={toggleChat}
    aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
  >
    {#if isOpen}
      ✕
    {:else}
      🤖
    {/if}
  </button>

  {#if isOpen}
    <div class="chatbot-window" role="dialog" aria-label="AI Chatbot">
      <div class="chatbot-header chatbot-header-ai">
        <span class="chatbot-header-title">🤖 Gdynia Wspiera AI</span>
        <button class="chatbot-close" onclick={toggleChat} aria-label="Close">✕</button>
      </div>

      <div class="chatbot-body" bind:this={chatBody}>
        {#each messages as msg}
          <div class="chatbot-msg chatbot-msg-{msg.role}">
            {@html renderMarkdown(msg.text)}
          </div>
        {/each}

        {#if isLoading}
          <div class="chatbot-msg chatbot-msg-bot chatbot-loading">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        {/if}
      </div>

      <div class="chatbot-input-bar">
        <input
          type="text"
          bind:value={input}
          onkeydown={handleKeydown}
          disabled={isLoading}
          placeholder={$locale === 'uk' ? 'Опишіть ситуацію...' : $locale === 'en' ? 'Describe your situation...' : 'Opisz swoją sytuację...'}
        />
        <button onclick={sendMessage} aria-label="Send" disabled={isLoading}>➤</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .chatbot-wrapper {
    position: fixed;
    bottom: 24px;
    right: 90px;
    z-index: 9999;
    font-family: var(--font-family-sans, system-ui, sans-serif);
  }

  .chatbot-toggle {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
  }

  .chatbot-toggle-ai {
    background: linear-gradient(135deg, #667eea, #764ba2);
  }

  .chatbot-toggle:hover {
    transform: scale(1.1);
  }

  .chatbot-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 400px;
    max-width: calc(100vw - 32px);
    height: 550px;
    max-height: calc(100vh - 120px);
    background: var(--color-surface, #fff);
    border-radius: 16px;
    box-shadow: 0 12px 48px rgba(0,0,0,0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chatbot-header {
    color: white;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .chatbot-header-ai {
    background: linear-gradient(135deg, #667eea, #764ba2);
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
    color: #667eea;
    text-decoration: underline;
  }

  .chatbot-msg-bot {
    background: #f0f4f8;
    color: var(--color-text, #12212f);
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }

  .chatbot-msg-user {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .chatbot-loading {
    display: flex;
    gap: 4px;
    padding: 14px 18px;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: #667eea;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) { animation-delay: -0.32s; }
  .dot:nth-child(2) { animation-delay: -0.16s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
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
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102,126,234,0.15);
  }

  .chatbot-input-bar input:disabled {
    opacity: 0.6;
  }

  .chatbot-input-bar button {
    background: linear-gradient(135deg, #667eea, #764ba2);
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

  .chatbot-input-bar button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    .chatbot-wrapper {
      right: 16px;
    }

    .chatbot-window {
      width: calc(100vw - 16px);
      height: calc(100vh - 100px);
      right: -8px;
      bottom: 64px;
      border-radius: 12px;
    }
  }
</style>
