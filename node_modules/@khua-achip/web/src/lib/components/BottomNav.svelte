<script lang="ts">
  import { navStore, isBottomNavVisible, type ScreenName } from '../stores/navStore';

  const tabs: { id: ScreenName; label: string; icon: 'home' | 'explore' | 'mentor' | 'saved' | 'profile' }[] = [
    { id: 'home', label: 'ໜ້າຫຼັກ', icon: 'home' },
    { id: 'explore', label: 'ຄົ້ນຫາ', icon: 'explore' },
    { id: 'mentor', label: 'AI Mentor', icon: 'mentor' },
    { id: 'saved', label: 'ບັນທຶກ', icon: 'saved' },
    { id: 'profile', label: 'ໂປຣໄຟລ໌', icon: 'profile' }
  ];

  function handleTabClick(tabId: ScreenName) {
    navStore.go(tabId);
  }
</script>

{#if $isBottomNavVisible}
  <nav class="bottomnav" id="bottomnav">
    {#each tabs as tab}
      <button
        type="button"
        class="navitem {$navStore.currentScreen === tab.id ? 'active' : ''}"
        data-tab={tab.id}
        on:click={() => handleTabClick(tab.id)}
      >
        {#if tab.icon === 'home'}
          <svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>
        {:else if tab.icon === 'explore'}
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
        {:else if tab.icon === 'mentor'}
          <svg viewBox="0 0 24 24"><path d="M12 3a5 5 0 0 0-5 5c0 2 1 3 1 5v1h8v-1c0-2 1-3 1-5a5 5 0 0 0-5-5Z"/><path d="M9 18h6M10 21h4"/></svg>
        {:else if tab.icon === 'saved'}
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.8 5 6.3 5c2 0 3.3 1 5.7 3.5C14.4 6 15.7 5 17.7 5 21.2 5 23.5 8.5 21.5 12.5 19 16.65 12 21 12 21Z"/></svg>
        {:else if tab.icon === 'profile'}
          <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>
        {/if}
        <span>{tab.label}</span>
      </button>
    {/each}
  </nav>
{/if}

<style>
  .bottomnav {
    /* sticky inside the flex-column app-frame: stays at bottom without overlapping scroll area */
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 6px env(safe-area-inset-bottom, 16px) 6px;
    z-index: 40;
    box-shadow: 0 -4px 20px rgba(15, 27, 61, 0.06);
  }
  .navitem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--ink-400);
    cursor: pointer;
    width: 64px;
    padding: 4px 0;
    border: none;
    background: none;
    font-family: inherit;
    transition: color 0.15s ease;
  }
  .navitem svg {
    width: 22px;
    height: 22px;
    stroke: var(--ink-400);
    fill: none;
    stroke-width: 1.8;
    transition: stroke 0.15s ease;
  }
  .navitem span {
    font-size: 10.5px;
    font-weight: 600;
  }
  .navitem.active {
    color: var(--navy-800);
  }
  .navitem.active svg {
    stroke: var(--navy-800);
  }
</style>
