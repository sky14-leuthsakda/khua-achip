<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import CareerCard from './CareerCard.svelte';
  import { fetchCareers } from './careersApi';
  import type { Career } from './types';

  let careers: Career[] = [];
  let loading = true;
  let error = '';
  let searchQuery = '';
  let activeFilter = 'ທັງໝົດ';

  const filters = ['ທັງໝົດ', 'ເທັກໂນໂລຊີ', 'ອອກແບບ', 'ທຸລະກິດ', 'ວິທະຍາສາດ'];

  onMount(async () => {
    try {
      careers = await fetchCareers();
    } catch (err: any) {
      error = err.message || 'Error loading careers';
    } finally {
      loading = false;
    }
  });

  $: filteredCareers = careers.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.tag.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'ທັງໝົດ' || c.tag.includes(activeFilter);
    return matchesSearch && matchesCategory;
  });
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ຄົ້ນຫາອາຊີບ" />
  <div class="pad">
    <div class="searchbar" style="background:#EFF1EC; border-color:var(--line);">
      <span>🔍</span>
      <input
        type="text"
        bind:value={searchQuery}
        style="color:var(--ink-900);"
        placeholder="ຄົ້ນຫາອາຊີບ..."
      />
    </div>

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

    <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
      {#if loading}
        <div style="text-align:center; padding:30px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>
      {:else if error}
        <div style="text-align:center; padding:20px; color:var(--coral-500);">{error}</div>
      {:else}
        {#each filteredCareers as c (c.id)}
          <CareerCard career={c} layout="list" />
        {/each}
      {/if}
    </div>
  </div>
</div>
