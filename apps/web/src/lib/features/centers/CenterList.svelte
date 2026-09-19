<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import CenterCard from './CenterCard.svelte';
  import { fetchCenters } from './centersApi';
  import type { Center } from './types';

  let centers: Center[] = [];
  let loading = true;
  let error = '';
  let activeFilter = 'ທັງໝົດ';

  const filters = [
    'ທັງໝົດ',
    '🗣 ພາສາອັງກິດ',
    '🗣 ພາສາຈີນ',
    '💻 ໂປຣແກຣມມິ່ງ',
    '📐 ຄະນິດສາດ',
    '🧪 ວິທະຍາສາດ',
    '🎨 ອອກແບບ'
  ];

  onMount(async () => {
    try {
      centers = await fetchCenters();
    } catch (err: any) {
      error = err.message || 'Error loading centers';
    } finally {
      loading = false;
    }
  });

  $: filteredCenters = centers.filter((c) => {
    if (activeFilter === 'ທັງໝົດ') return true;
    const cleanFilter = activeFilter.replace(/^[^\s]+\s*/, '');
    return c.subj.includes(cleanFilter);
  });
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ຊອກຫາສູນຮຽນເພີ່ມ" />

  <div class="pad">
    <div class="filter-scroll">
      {#each filters as f}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="filter-chip {activeFilter === f ? 'on' : ''}"
          on:click={() => (activeFilter = f)}
        >
          {f}
        </div>
      {/each}
    </div>

    <div style="display:flex; flex-direction:column; gap:0; margin-top:6px;">
      {#if loading}
        <div style="text-align:center; padding:40px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>
      {:else if error}
        <div style="text-align:center; padding:30px; color:var(--coral-500);">{error}</div>
      {:else}
        {#each filteredCenters as c (c.id)}
          <CenterCard center={c} layout="list" />
        {/each}
      {/if}
    </div>
  </div>
</div>
