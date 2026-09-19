<script lang="ts">
  import { navStore } from '../stores/navStore';

  export let title: string = '';
  export let subtitle: string = '';
  export let showBack: boolean = true;
  export let onBack: (() => void) | null = null;

  function handleBack() {
    if (onBack) {
      onBack();
    } else {
      navStore.back();
    }
  }
</script>

<div class="topbar">
  {#if showBack}
    <button type="button" class="back" on:click={handleBack} aria-label="ກັບຄືນ">
      ←
    </button>
  {/if}
  {#if title}
    <div>
      <h2>{title}</h2>
      {#if subtitle}
        <div class="topbar-sub">{subtitle}</div>
      {/if}
    </div>
  {/if}
  <slot />
</div>

<style>
  .topbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px 6px 20px;
  }
  .topbar .back {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--card);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    flex-shrink: 0;
    cursor: pointer;
    border: none;
    font-size: 16px;
  }
  .topbar h2 {
    font-size: 17px;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.1px;
  }
  .topbar-sub {
    font-size: 12px;
    color: var(--ink-400);
    margin-top: 1px;
  }
</style>
