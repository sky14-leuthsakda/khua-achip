<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import ScholCard from './ScholCard.svelte';
  import { fetchScholarships } from './scholarshipsApi';
  import type { Scholarship } from './types';

  let scholarships: Scholarship[] = [];
  let loading = true;
  let error = '';
  let activeFilter = 'ທັງໝົດ';

  const filters = ['ທັງໝົດ', 'ທຶນເຕັມ', 'ປະລິນຍາຕີ', 'ປະລິນຍາໂທ', 'ອາຊຽນ', 'ໃກ້ໝົດເຂດ'];

  onMount(async () => {
    try {
      scholarships = await fetchScholarships();
    } catch (err: any) {
      error = err.message || 'Error loading scholarships';
    } finally {
      loading = false;
    }
  });

  $: filteredSchols = scholarships.filter((s) => {
    if (activeFilter === 'ທັງໝົດ') return true;
    if (activeFilter === 'ທຶນເຕັມ') return s.funded.includes('ທຶນເຕັມ');
    if (activeFilter === 'ປະລິນຍາຕີ') return s.level.includes('ປະລິນຍາຕີ');
    if (activeFilter === 'ປະລິນຍາໂທ') return s.level.includes('ປະລິນຍາໂທ');
    if (activeFilter === 'ອາຊຽນ') return s.name.includes('ASEAN') || s.country.includes('ສິງກະໂປ');
    return true;
  });
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ຊອກຫາທຶນການສຶກສາ" />

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
        {#each filteredSchols as s (s.id)}
          <ScholCard scholarship={s} layout="list" />
        {/each}
      {/if}
    </div>
  </div>
</div>
