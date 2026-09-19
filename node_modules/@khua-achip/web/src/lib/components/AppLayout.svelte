<script lang="ts">
  import AppHeader from './AppHeader.svelte';
  import BottomNav from './BottomNav.svelte';
  import NotificationModal from './NotificationModal.svelte';
  import SettingsModal from './SettingsModal.svelte';
  import EditProfileModal from './EditProfileModal.svelte';

  export let isChatMode = false;
</script>

<div class="app-shell">
  <div class="app-frame">
    <!-- Top Header with Logo and Notification Bell -->
    <AppHeader />

    <!-- Main Screens Container -->
    <main class="app-main" class:chat-mode={isChatMode}>
      <slot />
    </main>

    <!-- Bottom Navigation Bar -->
    <BottomNav />
  </div>

  <!-- Global Modals -->
  <NotificationModal />
  <SettingsModal />
  <EditProfileModal />
</div>

<style>
  .app-shell {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: linear-gradient(180deg, #eef1f8 0%, #e4e9f4 100%);
    padding: 0;
    overflow: hidden;
  }

  .app-frame {
    width: 100%;
    max-width: 860px;
    height: 100vh;
    background: var(--paper);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 20px 50px -20px rgba(15, 27, 61, 0.2);
    overflow: hidden;
  }

  /* Content scrolls between sticky header and sticky bottom nav */
  .app-main {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* In chat mode, don't scroll app-main — MentorChat manages its own scroll */
  .app-main.chat-mode {
    overflow: hidden;
  }

  @media (min-width: 768px) {
    .app-shell {
      padding: 24px 16px;
      height: auto;
      min-height: 100vh;
    }
    .app-frame {
      height: calc(100vh - 48px);
      border-radius: 28px;
      border: 1px solid var(--line);
    }
  }

  @media (max-width: 767px) {
    .app-frame {
      max-width: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }
</style>
