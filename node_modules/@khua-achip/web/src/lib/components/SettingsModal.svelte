<script lang="ts">
  import { profileStore } from '../stores/profileStore';

  const { settings, activeModal, closeModal, updateSettings } = profileStore;

  let currentLang = $settings.language;
  let enableNotifs = $settings.enableNotifications;
  let soundAlerts = $settings.soundAlerts;
  let currentTheme = $settings.theme;

  function handleSave() {
    updateSettings({
      language: currentLang,
      enableNotifications: enableNotifs,
      soundAlerts,
      theme: currentTheme
    });
    closeModal();
  }
</script>

{#if $activeModal === 'settings'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-card" on:click|stopPropagation>
      <div class="modal-header">
        <div class="modal-title-row">
          <span style="font-size:20px;">⚙️</span>
          <h3>ຕັ້ງຄ່າລະບົບ</h3>
        </div>
        <button type="button" class="btn-close" on:click={closeModal} aria-label="ປິດ">✕</button>
      </div>

      <div class="modal-body">
        <div class="setting-group">
          <div class="setting-label">ພາສາ (Language)</div>
          <div class="choice-row">
            <button
              type="button"
              class="choice-btn {currentLang === 'lo' ? 'selected' : ''}"
              on:click={() => (currentLang = 'lo')}
            >
              🇱🇦 ພາສາລາວ
            </button>
            <button
              type="button"
              class="choice-btn {currentLang === 'en' ? 'selected' : ''}"
              on:click={() => (currentLang = 'en')}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div class="setting-group">
          <div class="setting-label">ຮູບແບບການສະແດງຜົນ (Theme)</div>
          <div class="choice-row">
            <button
              type="button"
              class="choice-btn {currentTheme === 'light' ? 'selected' : ''}"
              on:click={() => (currentTheme = 'light')}
            >
              ☀️ ສະຫວ່າງ (Light)
            </button>
            <button
              type="button"
              class="choice-btn {currentTheme === 'dark' ? 'selected' : ''}"
              on:click={() => (currentTheme = 'dark')}
            >
              🌙 ມືດ (Dark)
            </button>
          </div>
        </div>

        <div class="setting-group">
          <div class="setting-label">ການແຈ້ງເຕືອນ</div>
          <label class="toggle-row">
            <span>ເປີດຮັບການແຈ້ງເຕືອນທຶນ ແລະ ຄອສຮຽນ</span>
            <input type="checkbox" bind:checked={enableNotifs} />
          </label>
          <label class="toggle-row" style="margin-top:8px;">
            <span>ສຽງເຕືອນຂໍ້ຄວາມ AI Mentor</span>
            <input type="checkbox" bind:checked={soundAlerts} />
          </label>
        </div>

        <div class="info-note">
          ℹ️ ຮຸ່ນ 1.0.0 (Cloudflare Release) · ຂົວອາຊີບ (Khua Achip) ສຳລັບໄວໜຸ່ມລາວ
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-secondary" style="flex:1;" on:click={closeModal}>ຍົກເລີກ</button>
        <button type="button" class="btn-primary" style="flex:2;" on:click={handleSave}>ບັນທຶກການຕັ້ງຄ່າ</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 27, 61, 0.6);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: fadeIn 0.2s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .modal-card {
    background: var(--card);
    border-radius: 24px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 24px 50px -12px rgba(15, 27, 61, 0.4);
    display: flex;
    flex-direction: column;
    max-height: 85vh;
    overflow: hidden;
    animation: scaleUp 0.2s ease-out;
  }
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .modal-header {
    padding: 18px 20px 14px 20px;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .modal-title-row h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--navy-900);
  }
  .btn-close {
    background: none;
    border: none;
    font-size: 16px;
    color: var(--ink-400);
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-body {
    padding: 18px 20px;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .setting-group {
    background: var(--paper);
    padding: 14px;
    border-radius: 14px;
    border: 1px solid var(--line);
  }
  .setting-label {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--navy-900);
    margin-bottom: 10px;
  }
  .choice-row {
    display: flex;
    gap: 8px;
  }
  .choice-btn {
    flex: 1;
    padding: 10px;
    border-radius: 12px;
    border: 1.5px solid var(--line);
    background: #fff;
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-600);
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .choice-btn.selected {
    border-color: var(--navy-900);
    background: var(--navy-900);
    color: #fff;
  }
  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12.5px;
    color: var(--ink-900);
    cursor: pointer;
  }
  .toggle-row input {
    accent-color: var(--teal-600);
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  .info-note {
    font-size: 11px;
    color: var(--ink-400);
    text-align: center;
    padding: 6px 0;
  }
  .modal-footer {
    padding: 14px 20px;
    border-top: 1px solid var(--line);
    background: #fafaf8;
    display: flex;
    gap: 10px;
  }
</style>
