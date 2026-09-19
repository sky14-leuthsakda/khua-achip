<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { navStore } from '../../stores/navStore';
  import { sendMentorMessage } from './mentorApi';
  import type { ChatMessage, SuggestedAction } from './types';


  let messages: ChatMessage[] = [
    {
      id: 'm-init',
      sender: 'ai',
      text: 'ສະບາຍດີ! ຂ້ອຍແມ່ນ **AI Mentor ຈາກ ຂົວອາຊີບ (Khua Achip)** 🧭\n\nຂ້ອຍເປັນທີ່ປຶກສາດ້ານການຮຽນ, ການເລືອກອາຊີບ, ອາຈານສອນເພີ່ມ, ສູນຮຽນ ແລະ ທຶນການສຶກສາສຳລັບໄວໜຸ່ມລາວ. ມື້ນີ້ເຈົ້າຢາກປຶກສາເລື່ອງໃດ?',
      recommendations: [
        'ເຈົ້າແມ່ນໃຜ?',
        'ຄວນເລີ່ມຮຽນຫຍັງກ່ອນ?',
        'ມີທຶນການສຶກສາຫຍັງແດ່?',
        'ແນະນຳອາຈານສອນໂປຣແກຣມ'
      ],
      timestamp: 'ຕອນນີ້'
    }
  ];

  let inputText = '';
  let sending = false;
  let chatScrollElement: HTMLElement | null = null;

  const quickPrompts = [
    'ເຈົ້າແມ່ນໃຜ?',
    'ຄວນຮຽນຫຍັງ?',
    'ແນະນຳອາຈານ',
    'ແນະນຳສູນຮຽນ',
    'ທຶນທີ່ເໝາະກັບຂ້ອຍ',
    'ແຜນ Roadmap 5 ປີ'
  ];

  async function scrollToBottom(smooth = true) {
    await tick();
    if (chatScrollElement) {
      chatScrollElement.scrollTo({
        top: chatScrollElement.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  }

  async function sendMessage(textToSend?: string) {
    const text = (textToSend || inputText).trim();
    if (!text || sending) return;

    inputText = '';
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: now
    };

    messages = [...messages, userMsg];
    sending = true;
    scrollToBottom();

    try {
      const res = await sendMentorMessage(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply,
        recommendations: res.recommendations,
        suggestedAction: res.suggestedAction,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      messages = [...messages, aiMsg];
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'ຂໍອະໄພ, ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່ກັບ AI Mentor. ກະລຸນາກວດສອບການເຊື່ອມຕໍ່ ຫຼື ລອງໃໝ່ອີກຄັ້ງ.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      messages = [...messages, errorMsg];
    } finally {
      sending = false;
      scrollToBottom();
    }
  }

  function handleActionClick(action?: SuggestedAction) {
    if (!action) return;
    if (action.type === 'tutor') {
      navStore.go('tutorDetail', { tutorId: action.targetId || 't1' });
    } else if (action.type === 'roadmap') {
      navStore.go('roadmap');
    } else if (action.type === 'center') {
      navStore.go('centerDetail', { centerId: action.targetId || 'c1' });
    } else if (action.type === 'scholarship') {
      navStore.go('scholDetail', { scholId: action.targetId || 's1' });
    } else if (action.type === 'career') {
      navStore.go('careerDetail', { careerId: action.targetId || 'sw' });
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function clearChat() {
    messages = [
      {
        id: `m-${Date.now()}`,
        sender: 'ai',
        text: 'ບົດສົນທະນາຖືກລ້າງແລ້ວ. ພ້ອມຕອບຄຳຖາມໃໝ່ຂອງເຈົ້າສະເໝີ! ✨',
        recommendations: [
          'ແນະນຳອາຊີບເທັກໂນໂລຊີ',
          'ຊອກຫາທຶນການສຶກສາ',
          'ຊອກຫາອາຈານສອນເພີ່ມ'
        ],
        timestamp: 'ຕອນນີ້'
      }
    ];
  }

  onMount(() => {
    scrollToBottom(false);
  });
</script>

<div class="chat-container">
  <!-- Chat Header with Back button -->
  <div class="chat-header">
    <div class="header-left">
      <!-- Back Button -->
      <button type="button" class="btn-back" on:click={() => navStore.back()} aria-label="ກັບໄປໜ້າກ່ອນ">
        ⬅️
      </button>
      <div class="ai-avatar">🧭</div>
      <div>
        <div class="ai-name">AI Mentor</div>
        <div class="ai-status">
          <span class="online-indicator"></span> ອອນລາຍ ພ້ອມໃຫ້ຄຳແນະນຳ (Khua Achip RAG)
        </div>
      </div>
    </div>
    <button type="button" class="btn-clear" on:click={clearChat} title="ລ້າງບົດສົນທະນາ">
      🗑️ ລ້າງ
    </button>
  </div>

  <!-- Chat Messages Stream (ChatGPT style) -->
  <div class="messages-stream" bind:this={chatScrollElement}>
    {#each messages as msg (msg.id)}
      <div class="message-row {msg.sender}">
        {#if msg.sender === 'ai'}
          <div class="row-avatar">AI</div>
        {/if}

        <div class="message-bubble-wrapper">
          <div class="bubble {msg.sender}">
            <div class="bubble-text">
              {#each msg.text.split('\n') as paragraph}
                {#if paragraph.trim()}
                  <p>{paragraph}</p>
                {:else}
                  <div style="height: 6px;"></div>
                {/if}
              {/each}
            </div>

            <!-- Recommendations list -->
            {#if msg.recommendations && msg.recommendations.length > 0}
              <div class="recommendations-container">
                <div class="reco-label">ຄຳຖາມ ຫຼື ຫົວຂໍ້ແນະນຳ:</div>
                <div class="reco-list">
                  {#each msg.recommendations as reco}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                    <button type="button" class="reco-pill" on:click={() => sendMessage(reco.replace(/^\d+\.\s*/, ''))}>
                      {reco}
                    </button>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Suggested Action Card / Button -->
            {#if msg.suggestedAction}
              <div class="action-card-box">
                {#if msg.suggestedAction.type === 'tutor' && msg.suggestedAction.meta}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div
                    class="interactive-card"
                    on:click={() => handleActionClick(msg.suggestedAction)}
                  >
                    <div class="card-avatar">{msg.suggestedAction.meta.init || '👨‍🏫'}</div>
                    <div style="flex:1;">
                      <div class="card-name">{msg.suggestedAction.meta.name || msg.suggestedAction.label} ✅</div>
                      <div class="card-sub">{msg.suggestedAction.meta.subj || 'ສອນເພີ່ມ'} · ⭐ {msg.suggestedAction.meta.rating || '4.8'}</div>
                    </div>
                    <span class="card-arrow">ເບິ່ງໂປຣໄຟລ໌ ›</span>
                  </div>
                {:else if msg.suggestedAction.type === 'center' && msg.suggestedAction.meta}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div
                    class="interactive-card"
                    on:click={() => handleActionClick(msg.suggestedAction)}
                  >
                    <div class="card-avatar" style="background:linear-gradient(135deg,#5865C2,#0FADA6);">{msg.suggestedAction.meta.init || '🏫'}</div>
                    <div style="flex:1;">
                      <div class="card-name">{msg.suggestedAction.meta.name || msg.suggestedAction.label}</div>
                      <div class="card-sub">{msg.suggestedAction.meta.loc || 'ວຽງຈັນ'} · ⭐ {msg.suggestedAction.meta.rating || '4.7'}</div>
                    </div>
                    <span class="card-arrow">ເບິ່ງສູນຮຽນ ›</span>
                  </div>
                {:else if msg.suggestedAction.type === 'scholarship' && msg.suggestedAction.meta}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div
                    class="interactive-card"
                    on:click={() => handleActionClick(msg.suggestedAction)}
                  >
                    <div class="card-avatar" style="background:linear-gradient(135deg,#B9822F,#7A5417);">🎓</div>
                    <div style="flex:1;">
                      <div class="card-name">{msg.suggestedAction.meta.name || msg.suggestedAction.label}</div>
                      <div class="card-sub">{msg.suggestedAction.meta.country || ''} · ກົງກັບ Profile {msg.suggestedAction.meta.match || 88}%</div>
                    </div>
                    <span class="card-arrow">ເບິ່ງທຶນ ›</span>
                  </div>
                {:else}
                  <button
                    type="button"
                    class="action-btn-pill"
                    on:click={() => handleActionClick(msg.suggestedAction)}
                  >
                    🚀 {msg.suggestedAction.label}
                  </button>
                {/if}
              </div>
            {/if}
          </div>

          <div class="bubble-time {msg.sender}">{msg.timestamp}</div>
        </div>
      </div>
    {/each}

    {#if sending}
      <div class="message-row ai">
        <div class="row-avatar">AI</div>
        <div class="bubble ai typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    {/if}
  </div>

  <!-- Fixed Sticky Bottom Input Area -->
  <div class="chat-bottom-bar">
    <!-- Quick prompt chips -->
    <div class="quick-chips-scroll">
      {#each quickPrompts as prompt}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <button
          type="button"
          class="quick-prompt-chip"
          on:click={() => sendMessage(prompt)}
          disabled={sending}
        >
          {prompt}
        </button>
      {/each}
    </div>

    <!-- Input Form -->
    <form class="input-form" on:submit|preventDefault={() => sendMessage()}>
      <input
        type="text"
        bind:value={inputText}
        on:keydown={handleKeyDown}
        placeholder="ພິມຄຳຖາມຂອງທ່ານ ຫຼື ເລືອກຫົວຂໍ້ແນະນຳ..."
        disabled={sending}
      />
      <button
        type="submit"
        class="send-btn"
        disabled={!inputText.trim() || sending}
        aria-label="ສົ່ງຂໍ້ຄວາມ"
      >
        ➤
      </button>
    </form>
    <div class="input-disclaimer">
      AI Mentor ອາດມີຂໍ້ຜິດພາດໄດ້. ຂໍ້ມູນທຶນ ແລະ ການສຶກສາຄວນກວດສອບກັບແຫຼ່ງທາງການອີກຄັ້ງ.
    </div>
  </div>
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    /* fill whatever height app-main gives us */
    height: 100%;
    min-height: 0;
    background: #fafaf8;
    overflow: hidden;
  }

  /* Chat Header */
  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid var(--line);
    flex-shrink: 0;
  }
  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  /* Back Button */
  .btn-back {
    background: none;
    border: 1px solid var(--line);
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.15s ease;
    flex-shrink: 0;
  }
  .btn-back:hover {
    background: #eef1fa;
  }
  .ai-avatar {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--navy-800), var(--teal-600));
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: var(--shadow-sm);
  }
  .ai-name {
    font-size: 15px;
    font-weight: 800;
    color: var(--navy-900);
  }
  .ai-status {
    font-size: 11.5px;
    color: var(--ink-400);
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 1px;
  }
  .online-indicator {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #27c93f;
    box-shadow: 0 0 0 2px rgba(39, 201, 63, 0.2);
  }
  .btn-clear {
    background: none;
    border: 1px solid var(--line);
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-600);
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .btn-clear:hover {
    background: #f0f0f0;
    color: var(--coral-500);
  }

  /* Messages Stream — scrolls between header and sticky bottom bar */
  .messages-stream {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    /* extra bottom breathing room */
    padding-bottom: 20px;
  }

  .message-row {
    display: flex;
    gap: 10px;
    max-width: 85%;
    align-items: flex-start;
  }
  .message-row.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  .message-row.ai {
    align-self: flex-start;
  }
  .row-avatar {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: var(--navy-900);
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .message-bubble-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .bubble {
    padding: 14px 18px;
    border-radius: 20px;
    font-size: 13.5px;
    line-height: 1.6;
    word-break: break-word;
    box-shadow: var(--shadow-sm);
  }
  .bubble.user {
    background: var(--navy-900);
    color: #fff;
    border-bottom-right-radius: 4px;
  }
  .bubble.ai {
    background: #fff;
    color: var(--navy-900);
    border-bottom-left-radius: 4px;
    border: 1px solid var(--line);
  }
  .bubble-text p {
    margin: 0;
  }
  .bubble-time {
    font-size: 10px;
    color: var(--ink-400);
    padding: 0 4px;
  }
  .bubble-time.user {
    text-align: right;
  }

  /* Recommendations inside AI Bubble */
  .recommendations-container {
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px dashed var(--line);
  }
  .reco-label {
    font-size: 11.5px;
    font-weight: 700;
    color: var(--teal-600);
    margin-bottom: 8px;
  }
  .reco-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .reco-pill {
    background: var(--teal-100);
    color: var(--teal-600);
    border: none;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
    transition: background 0.15s ease, transform 0.1s ease;
  }
  .reco-pill:hover {
    background: #d4f2ef;
    transform: translateX(2px);
  }

  /* Action Cards inside Bubble */
  .action-card-box {
    margin-top: 12px;
  }
  .interactive-card {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease;
  }
  .interactive-card:hover {
    border-color: var(--teal-600);
    transform: translateY(-1px);
  }
  .card-avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--teal-100);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    color: var(--teal-600);
    font-size: 14px;
  }
  .card-name {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--navy-900);
  }
  .card-sub {
    font-size: 11px;
    color: var(--ink-400);
    margin-top: 2px;
  }
  .card-arrow {
    font-size: 11px;
    font-weight: 700;
    color: var(--teal-600);
  }
  .action-btn-pill {
    background: var(--teal-600);
    color: #fff;
    border: none;
    padding: 9px 16px;
    border-radius: 12px;
    font-size: 12.5px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease;
  }
  .action-btn-pill:hover {
    background: var(--teal-500);
  }

  /* Typing indicator */
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 14px 18px;
  }
  .typing-indicator span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--teal-600);
    animation: typing 1.4s infinite ease-in-out;
  }
  .typing-indicator span:nth-child(1) { animation-delay: 0s; }
  .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
  .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }

  /* Sticky Bottom Bar — sits at the bottom of the flex column, never overlaps messages */
  .chat-bottom-bar {
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid var(--line);
    padding: 10px 16px env(safe-area-inset-bottom, 12px) 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 -4px 20px rgba(15, 27, 61, 0.05);
  }

  .quick-chips-scroll {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }
  .quick-chips-scroll::-webkit-scrollbar {
    display: none;
  }
  .quick-prompt-chip {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 600;
    background: #fff;
    border: 1px solid var(--line);
    padding: 7px 13px;
    border-radius: 18px;
    color: var(--navy-800);
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .quick-prompt-chip:hover {
    background: #EEF1FA;
    border-color: var(--navy-800);
  }

  .input-form {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .input-form input {
    flex: 1;
    border: 1.5px solid var(--line);
    border-radius: 24px;
    padding: 13px 18px;
    font-size: 13.5px;
    font-family: inherit;
    outline: none;
    color: var(--ink-900);
    background: #fff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .input-form input:focus {
    border-color: var(--teal-600);
    box-shadow: 0 0 0 3px rgba(15, 173, 166, 0.15);
  }
  .send-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--navy-900);
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.15s ease, background 0.15s ease;
  }
  .send-btn:hover:not(:disabled) {
    background: var(--teal-600);
    transform: scale(1.05);
  }
  .send-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .input-disclaimer {
    font-size: 10px;
    color: var(--ink-400);
    text-align: center;
  }
</style>
