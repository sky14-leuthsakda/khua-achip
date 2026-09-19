<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import TutorCard from './TutorCard.svelte';
  import { fetchTutors } from './tutorsApi';
  import type { Tutor } from './types';

  let tutors: Tutor[] = [];
  let loading = true;
  let error = '';
  let activeFilter = 'ທັງໝົດ';

  const filters = ['ທັງໝົດ', 'ພາສາອັງກິດ', 'ໂປຣແກຣມມິ່ງ', 'ຄະນິດສາດ', 'ອອນລາຍ', 'ລາຄາ', 'ຄະແນນ'];

  onMount(async () => {
    try {
      tutors = await fetchTutors();
    } catch (err: any) {
      error = err.message || 'Error loading tutors';
    } finally {
      loading = false;
    }
  });

  $: filteredTutors = tutors.filter((t) => {
    if (activeFilter === 'ທັງໝົດ') return true;
    if (activeFilter === 'ອອນລາຍ') return t.mode.includes('ອອນລາຍ');
    return t.subj.includes(activeFilter);
  });
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ຊອກຫາອາຈານສອນເພີ່ມ" />

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
        {#each filteredTutors as t (t.id)}
          <TutorCard tutor={t} layout="list" />
        {/each}
      {/if}
    </div>

    <div class="divider"></div>
    <div class="card" style="display:flex; align-items:center; gap:12px; cursor:pointer;">
      <span style="font-size:22px;">👋</span>
      <div style="flex:1;">
        <b style="font-size:13px;">ຂ້ອຍຢາກສອນ</b>
        <div style="font-size:11px; color:var(--ink-400);">ສະໝັກເປັນອາຈານກັບ Khua Achip</div>
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>
  </div>
</div>
