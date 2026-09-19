<script lang="ts">
  import type { Center } from './types';
  import { navStore } from '../../stores/navStore';

  export let center: Center;
  export let layout: 'scroll' | 'list' = 'scroll';

  function handleClick() {
    navStore.go('centerDetail', { centerId: center.id });
  }
</script>

{#if layout === 'scroll'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="ct-card" on:click={handleClick}>
    <!-- Avatar -->
    <div class="ct-avatar" style="background:{center.grad};">{center.init}</div>

    <!-- Info grows -->
    <div class="ct-body">
      <div class="ct-name">{center.name}</div>
      <div class="ct-loc">{center.loc}</div>
    </div>

    <!-- Footer: rating -->
    <div class="ct-footer">
      <span class="ct-rating">⭐ {center.rating}</span>
    </div>
  </div>

{:else if layout === 'list'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="center-card" on:click={handleClick}>
    <div class="row">
      <div class="avatar" style="background:{center.grad};">{center.init}</div>
      <div style="flex:1;min-width:0;">
        <h4 style="font-size:13.5px;margin:0 0 2px 0;font-weight:700;">{center.name}</h4>
        <div class="meta-line">{center.subj} · {center.loc}</div>
        <div class="rating">
          ⭐ {center.rating}
          <span style="color:var(--ink-400);font-weight:400;">· {center.mode}</span>
        </div>
        <div class="price-tag" style="display:block;margin-top:6px;">{center.price}</div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── Compact scroll card ── */
  .ct-card {
    width: 152px;
    flex: 0 0 152px;
    height: 160px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 14px;
    border: 1px solid var(--line);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    padding: 12px 11px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    scroll-snap-align: start;
  }

  .ct-card:active { transform: scale(0.97); }
  .ct-card:hover  { box-shadow: 0 4px 14px rgba(15,27,61,0.1); transform: translateY(-2px); }

  /* Avatar */
  .ct-avatar {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Info block */
  .ct-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 2px;
  }

  /* Name: 2 lines max with fixed slot height so 1-line and 2-line cards match perfectly */
  .ct-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy-900);
    line-height: 1.35;
    height: 35px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Location: 1 line */
  .ct-loc {
    font-size: 11px;
    color: var(--ink-400);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Footer: pinned to bottom */
  .ct-footer {
    margin-top: auto;
  }

  .ct-rating {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink-900);
  }
</style>
