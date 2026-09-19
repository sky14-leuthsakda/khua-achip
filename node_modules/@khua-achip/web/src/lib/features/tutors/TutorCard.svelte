<script lang="ts">
  import type { Tutor } from './types';
  import { navStore } from '../../stores/navStore';

  export let tutor: Tutor;
  export let layout: 'scroll' | 'list' = 'scroll';

  function handleClick() {
    navStore.go('tutorDetail', { tutorId: tutor.id });
  }
</script>

{#if layout === 'scroll'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="t-card" on:click={handleClick}>
    <!-- Avatar circle -->
    <div class="t-avatar">{tutor.init}</div>

    <!-- Info grows to fill space -->
    <div class="t-body">
      <div class="t-name">{tutor.name}</div>
      <div class="t-subj">{tutor.subj}</div>
    </div>

    <!-- Footer: rating + price pinned -->
    <div class="t-footer">
      <span class="t-rating">⭐ {tutor.rating}</span>
      <span class="t-price">{tutor.price}</span>
    </div>
  </div>

{:else if layout === 'list'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="tutor-card" on:click={handleClick}>
    <div class="row">
      <div class="avatar">{tutor.init}</div>
      <div style="flex:1;min-width:0;">
        <div class="name-row">
          <h4>{tutor.name}</h4>
          <span class="badge-verified">✅</span>
        </div>
        <div class="meta-line">{tutor.subj} · {tutor.years} ປີປະສົບການ</div>
        <div class="rating">
          ⭐ {tutor.rating}
          <span style="color:var(--ink-400);font-weight:400;">· ນັກຮຽນ {tutor.students} ຄົນ</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
          <span class="price-tag">{tutor.price}</span>
          <span class="chip">{tutor.mode}</span>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── Compact scroll card ── */
  .t-card {
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

  .t-card:active { transform: scale(0.97); }
  .t-card:hover  { box-shadow: 0 4px 14px rgba(15,27,61,0.1); transform: translateY(-2px); }

  /* Avatar */
  .t-avatar {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--navy-800), var(--teal-600));
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Middle section grows */
  .t-body {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 2px;
  }

  /* Name: 1 line, ellipsis */
  .t-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy-900);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.35;
  }

  /* Subject: 1 line, subtle */
  .t-subj {
    font-size: 11px;
    color: var(--ink-400);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Footer: rating on top line, price below — pinned to bottom */
  .t-footer {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: auto;
  }

  .t-rating {
    font-size: 11px;
    font-weight: 700;
    color: var(--ink-900);
  }

  .t-price {
    font-size: 11px;
    font-weight: 700;
    color: var(--teal-600);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
