<script lang="ts">
  import { navStore } from '../stores/navStore';
  import { profileStore } from '../stores/profileStore';

  const { profile, notifications, openModal } = profileStore;

  $: unreadCount = $notifications.filter((n) => !n.read).length;
</script>

<header class="app-header">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="brand" on:click={() => navStore.go('home')}>
    <div class="logo-circle">🧭</div>
    <div class="brand-text">
      <span class="brand-title">ຂົວອາຊີບ</span>
      <span class="brand-sub">Khua Achip</span>
    </div>
  </div>

  <div class="header-actions">
    <!-- Notification Bell -->
    <button
      type="button"
      class="icon-btn"
      on:click={() => openModal('notifications')}
      aria-label="ການແຈ້ງເຕືອນ"
    >
      <span class="bell-icon">🔔</span>
      {#if unreadCount > 0}
        <span class="badge">{unreadCount}</span>
      {/if}
    </button>

    <!-- Profile button -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="user-pill" on:click={() => navStore.go('profile')}>
      <div class="user-avatar">{$profile.avatar}</div>
      <span class="user-name">{$profile.fullName.split(' ')[0]}</span>
    </div>
  </div>
</header>

<style>
  .app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
    position: sticky;
    top: 0;
    z-index: 45;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .logo-circle {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: var(--navy-900);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 4px 10px rgba(15, 27, 61, 0.2);
  }
  .brand-text {
    display: flex;
    flex-direction: column;
  }
  .brand-title {
    font-size: 15.5px;
    font-weight: 800;
    color: var(--navy-900);
    line-height: 1.2;
  }
  .brand-sub {
    font-size: 10px;
    color: var(--teal-600);
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .icon-btn {
    position: relative;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--paper);
    border: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s ease;
  }
  .icon-btn:hover {
    background: #eef1fa;
  }
  .bell-icon {
    font-size: 17px;
  }
  .badge {
    position: absolute;
    top: -2px;
    right: -2px;
    background: var(--coral-500);
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
  }
  .user-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px 4px 4px;
    border-radius: 20px;
    background: var(--paper);
    border: 1px solid var(--line);
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .user-pill:hover {
    background: #eef1fa;
  }
  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--navy-800), var(--teal-600));
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user-name {
    font-size: 12px;
    font-weight: 700;
    color: var(--navy-900);
  }
  @media (max-width: 480px) {
    .user-name {
      display: none;
    }
    .user-pill {
      padding: 3px;
      border-radius: 50%;
    }
  }
</style>
