<script lang="ts">
  import { onMount } from 'svelte';
  import { navStore } from '../../stores/navStore';
  import { savedStore } from '../../stores/savedStore';
  import CareerCard from '../careers/CareerCard.svelte';
  import TutorCard from '../tutors/TutorCard.svelte';
  import CenterCard from '../centers/CenterCard.svelte';
  import ScholCard from '../scholarships/ScholCard.svelte';
  import { fetchCareers } from '../careers/careersApi';
  import { fetchTutors } from '../tutors/tutorsApi';
  import { fetchCenters } from '../centers/centersApi';
  import { fetchScholarships } from '../scholarships/scholarshipsApi';
  import type { Career } from '../careers/types';
  import type { Tutor } from '../tutors/types';
  import type { Center } from '../centers/types';
  import type { Scholarship } from '../scholarships/types';

  type SavedTab = 'career' | 'uni' | 'tutor' | 'center' | 'schol';
  let currentTab: SavedTab = 'career';

  let allCareers: Career[] = [];
  let allTutors: Tutor[] = [];
  let allCenters: Center[] = [];
  let allSchols: Scholarship[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const [c, t, ce, s] = await Promise.all([
        fetchCareers(),
        fetchTutors(),
        fetchCenters(),
        fetchScholarships()
      ]);
      allCareers = c;
      allTutors = t;
      allCenters = ce;
      allSchols = s;
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  });

  $: savedCareers = allCareers.filter((c) => $savedStore.careers.includes(c.id));
  $: savedTutors = allTutors.filter((t) => $savedStore.tutors.includes(t.id));
  $: savedCenters = allCenters.filter((ce) => $savedStore.centers.includes(ce.id));
  $: savedSchols = allSchols.filter((s) => $savedStore.scholarships.includes(s.id));
</script>

<div class="screen active">
  <div class="status-space"></div>
  <div class="pad">
    <div class="topbar" style="padding:0 0 4px 0;">
      <h2>ບັນທຶກໄວ້</h2>
    </div>

    <div class="tab-row" id="savedTabs">
      <button
        type="button"
        class="tab-btn {currentTab === 'career' ? 'on' : ''}"
        on:click={() => (currentTab = 'career')}
      >
        ອາຊີບ
      </button>
      <button
        type="button"
        class="tab-btn {currentTab === 'uni' ? 'on' : ''}"
        on:click={() => (currentTab = 'uni')}
      >
        ມະຫາວິທະຍາໄລ
      </button>
      <button
        type="button"
        class="tab-btn {currentTab === 'tutor' ? 'on' : ''}"
        on:click={() => (currentTab = 'tutor')}
      >
        ອາຈານ
      </button>
      <button
        type="button"
        class="tab-btn {currentTab === 'center' ? 'on' : ''}"
        on:click={() => (currentTab = 'center')}
      >
        ສູນຮຽນ
      </button>
      <button
        type="button"
        class="tab-btn {currentTab === 'schol' ? 'on' : ''}"
        on:click={() => (currentTab = 'schol')}
      >
        ທຶນການສຶກສາ
      </button>
    </div>

    <div id="savedContent" style="margin-top:12px;">
      {#if currentTab === 'career'}
        {#if savedCareers.length > 0}
          <div style="display:flex; flex-direction:column; gap:12px;">
            {#each savedCareers as c (c.id)}
              <CareerCard career={c} layout="list" />
            {/each}
          </div>
        {:else}
          <div class="empty-illustration">
            <div class="em">🗂️</div>
            <div>ຍັງບໍ່ມີລາຍການບັນທຶກໄວ້<br />ໃນໝວດນີ້</div>
          </div>
        {/if}
      {:else if currentTab === 'uni'}
        {#if $savedStore.unis.length > 0}
          {#each $savedStore.unis as u}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div
              class="card"
              style="margin-bottom:12px; display:flex; gap:12px; align-items:center; cursor:pointer;"
              on:click={() => navStore.go('uniDetail')}
            >
              <div class="feature-icon" style="background:#EFF1FA; margin:0;">🎓</div>
              <div style="flex:1;">
                <b style="font-size:13px;">{u.name}</b>
                <div style="font-size:11px; color:var(--ink-400);">{u.sub}</div>
              </div>
              <span>❤️</span>
            </div>
          {/each}
        {:else}
          <div class="empty-illustration">
            <div class="em">🗂️</div>
            <div>ຍັງບໍ່ມີລາຍການບັນທຶກໄວ້<br />ໃນໝວດນີ້</div>
          </div>
        {/if}
      {:else if currentTab === 'tutor'}
        {#if savedTutors.length > 0}
          {#each savedTutors as t (t.id)}
            <TutorCard tutor={t} layout="list" />
          {/each}
        {:else}
          <div class="empty-illustration">
            <div class="em">🗂️</div>
            <div>ຍັງບໍ່ມີລາຍການບັນທຶກໄວ້<br />ໃນໝວດນີ້</div>
          </div>
        {/if}
      {:else if currentTab === 'center'}
        {#if savedCenters.length > 0}
          {#each savedCenters as ce (ce.id)}
            <CenterCard center={ce} layout="list" />
          {/each}
        {:else}
          <div class="empty-illustration">
            <div class="em">🗂️</div>
            <div>ຍັງບໍ່ມີລາຍການບັນທຶກໄວ້<br />ໃນໝວດນີ້</div>
          </div>
        {/if}
      {:else if currentTab === 'schol'}
        {#if savedSchols.length > 0}
          {#each savedSchols as s (s.id)}
            <ScholCard scholarship={s} layout="list" />
          {/each}
        {:else}
          <div class="empty-illustration">
            <div class="em">🗂️</div>
            <div>ຍັງບໍ່ມີລາຍການບັນທຶກໄວ້<br />ໃນໝວດນີ້</div>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>
