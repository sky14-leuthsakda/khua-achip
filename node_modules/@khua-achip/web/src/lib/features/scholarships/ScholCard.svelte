<script lang="ts">
  import type { Scholarship } from './types';
  import { navStore } from '../../stores/navStore';

  export let scholarship: Scholarship;
  export let layout: 'scroll' | 'list' = 'scroll';

  function handleClick() {
    navStore.go('scholDetail', { scholId: scholarship.id });
  }
</script>

{#if layout === 'scroll'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="s-card" on:click={handleClick}>
    <!-- Icon -->
    <div class="s-icon">🎓</div>

    <!-- Name grows -->
    <div class="s-name">{scholarship.name}</div>

    <!-- Meta: country · funded -->
    <div class="s-meta">{scholarship.country} · {scholarship.funded}</div>

    <!-- Match pill pinned to bottom -->
    <span class="s-pill">ກົງກັນ {scholarship.match}%</span>
  </div>

{:else if layout === 'list'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="schol-card" on:click={handleClick}>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
      <b style="font-size:13.5px;font-weight:700;line-height:1.4;">{scholarship.name}</b>
      <span class="match-pill" style="flex-shrink:0;">ກົງກັນ {scholarship.match}%</span>
    </div>
    <div class="meta-line" style="margin-top:4px;">{scholarship.country} · {scholarship.level} · {scholarship.funded}</div>
    <div class="pill-source">📅 ໝົດເຂດ {scholarship.deadline}</div>
  </div>
{/if}

<style>
  /* ── Compact scroll card ── */
  .s-card {
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

  .s-card:active { transform: scale(0.97); }
  .s-card:hover  { box-shadow: 0 4px 14px rgba(15,27,61,0.1); transform: translateY(-2px); }

  /* Scholarship icon */
  .s-icon {
    font-size: 19px;
    line-height: 1;
    flex-shrink: 0;
    margin-bottom: 2px;
  }

  /* Name: max 2 lines with consistent slot height */
  .s-name {
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

  /* Country · funding: 1 line */
  .s-meta {
    font-size: 11px;
    color: var(--ink-400);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Match pill pinned to bottom */
  .s-pill {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    color: var(--teal-600);
    background: var(--teal-100);
    padding: 3px 7px;
    border-radius: 20px;
    align-self: flex-start;
    margin-top: auto;
  }
</style>
