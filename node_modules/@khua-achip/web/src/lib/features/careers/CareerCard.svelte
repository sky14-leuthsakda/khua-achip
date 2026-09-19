<script lang="ts">
  import type { Career } from './types';
  import { navStore } from '../../stores/navStore';

  export let career: Career;
  export let layout: 'scroll' | 'list' | 'result' = 'scroll';

  function handleClick() {
    navStore.go('careerDetail', { careerId: career.id });
  }
</script>

{#if layout === 'scroll'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="c-card" on:click={handleClick}>
    <div class="c-icon">{career.icon}</div>
    <div class="c-title">{career.title}</div>
    <div class="c-tag">{career.tag}</div>
    <span class="c-pill">ກົງກັນ {career.match}%</span>
  </div>

{:else if layout === 'list'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="career-card" style="min-width:auto;" on:click={handleClick}>
    <div class="row">
      <div class="emoji-badge" style="margin:0;">{career.icon}</div>
      <div style="flex:1;min-width:0;">
        <h4 style="margin:0 0 3px 0;font-size:13px;font-weight:700;">{career.title}</h4>
        <div class="tag">{career.tag}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
          <span style="font-size:11.5px;color:var(--ink-600);">{career.salary}</span>
          <span class="match-pill">ກົງກັນ {career.match}%</span>
        </div>
      </div>
    </div>
  </div>

{:else if layout === 'result'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="career-card" style="min-width:auto;" on:click={handleClick}>
    <div class="row">
      <div class="emoji-badge" style="margin:0;">{career.icon}</div>
      <div style="flex:1;min-width:0;">
        <h4 style="margin:0 0 3px 0;font-size:13px;font-weight:700;">{career.title}</h4>
        <div class="tag" style="margin-bottom:4px;">{career.tag}</div>
        <div style="font-size:11px;color:var(--ink-600);">
          ເໝາະສົມເພາະເຈົ້າມີຄະແນນ Investigative ສູງ ແລະ ມັກແກ້ໄຂບັນຫາທີ່ທ້າທາຍ
        </div>
      </div>
      <span class="match-pill" style="align-self:flex-start;">{career.match}%</span>
    </div>
  </div>
{/if}

<style>
  /* ── Compact scroll card ── */
  .c-card {
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

  .c-card:active { transform: scale(0.97); }
  .c-card:hover  { box-shadow: 0 4px 14px rgba(15,27,61,0.1); transform: translateY(-2px); }

  /* Icon badge */
  .c-icon {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: var(--teal-100);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    margin-bottom: 2px;
  }

  /* Title: max 2 lines with consistent slot height */
  .c-title {
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

  /* Tag: 1 line, subtle */
  .c-tag {
    font-size: 11px;
    color: var(--ink-400);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Match pill pinned to bottom */
  .c-pill {
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
