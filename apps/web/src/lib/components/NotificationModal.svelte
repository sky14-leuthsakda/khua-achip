<script lang="ts">
  import { profileStore } from '../stores/profileStore';

  const { notifications, activeModal, closeModal, markNotificationAsRead, markAllNotificationsRead } = profileStore;
</script>

{#if $activeModal === 'notifications'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-card" on:click|stopPropagation>
      <div class="modal-header">
        <div class="modal-title-row">
          <span style="font-size:20px;">🔔</span>
          <h3>ການແຈ້ງເຕືອນ</h3>
        </div>
        <button type="button" class="btn-close" on:click={closeModal} aria-label="ປິດ">✕</button>
      </div>

      <div class="modal-body">
        <div class="notif-actions">
          <span>ທັງໝົດ ({$notifications.length})</span>
          <button type="button" class="link-btn" on:click={markAllNotificationsRead}>
            ໝາຍວ່າອ່ານແລ້ວທັງໝົດ
          </button>
        </div>

        <div class="notif-list">
          {#each $notifications as notif (notif.id)}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="notif-item {notif.read ? 'read' : 'unread'}"
              on:click={() => markNotificationAsRead(notif.id)}
            >
              <div class="notif-icon-circle {notif.type}">
                {#if notif.type === 'scholarship'}🎓
                {:else if notif.type === 'tutor'}👨‍🏫
                {:else if notif.type === 'riasec'}🧭
                {:else}📢
                {/if}
              </div>
              <div style="flex:1;">
                <div class="notif-top">
                  <div class="notif-title">{notif.title}</div>
                  {#if !notif.read}
                    <span class="unread-dot"></span>
                  {/if}
                </div>
                <div class="notif-desc">{notif.description}</div>
                <div class="notif-time">{notif.time}</div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-primary" on:click={closeModal}>ຕົກລົງ</button>
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
  .btn-close:hover {
    background: #f0f0f0;
  }
  .modal-body {
    padding: 16px 20px;
    overflow-y: auto;
    flex: 1;
  }
  .notif-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--ink-400);
    margin-bottom: 12px;
  }
  .link-btn {
    background: none;
    border: none;
    color: var(--teal-600);
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
  }
  .notif-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .notif-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 14px;
    background: var(--paper);
    cursor: pointer;
    transition: background 0.15s ease;
    border: 1px solid transparent;
  }
  .notif-item.unread {
    background: #F0F8F8;
    border-color: rgba(15, 173, 166, 0.25);
  }
  .notif-item:hover {
    background: #EBF4F4;
  }
  .notif-icon-circle {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    background: #fff;
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
  }
  .notif-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }
  .notif-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--navy-900);
  }
  .unread-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--teal-500);
    flex-shrink: 0;
  }
  .notif-desc {
    font-size: 11.5px;
    color: var(--ink-600);
    margin-top: 3px;
    line-height: 1.45;
  }
  .notif-time {
    font-size: 10.5px;
    color: var(--ink-400);
    margin-top: 4px;
  }
  .modal-footer {
    padding: 14px 20px;
    border-top: 1px solid var(--line);
    background: #fafaf8;
  }
</style>
