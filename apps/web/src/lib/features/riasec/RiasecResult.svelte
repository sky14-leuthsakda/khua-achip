<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import CareerCard from '../careers/CareerCard.svelte';
  import { riasecResultStore } from './riasecStore';
  import { submitAnswers } from './riasecApi';
  import type { RiasecEvaluationResult } from './types';

  let result: RiasecEvaluationResult | null = null;
  let loading = false;
  let error = '';

  $: if ($riasecResultStore) {
    result = $riasecResultStore;
  }

  onMount(async () => {
    if (!result) {
      loading = true;
      try {
        // Fetch default calculated result from backend API
        const data = await submitAnswers([]);
        riasecResultStore.set(data);
        result = data;
      } catch (err: any) {
        error = err.message || 'Error loading result';
      } finally {
        loading = false;
      }
    }
  });
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar title="ຜົນການປະເມີນ" />

  <div class="pad">
    {#if loading && !result}
      <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດຜົນການປະເມີນ...</div>
    {:else if error}
      <div style="text-align:center; padding:30px; color:var(--coral-500);">{error}</div>
    {:else if result}
      <div class="card" style="text-align:center; background:linear-gradient(135deg,var(--navy-900),var(--navy-700)); color:#fff; border:none;">
        <div style="font-size:12px; color:rgba(255,255,255,0.7);">ບຸກຄະລິກອາຊີບຫຼັກຂອງເຈົ້າ</div>
        <div style="font-size:26px; font-weight:800; margin:6px 0 2px 0;">{result.primaryDimension.name}</div>
        <div style="font-size:12px; color:rgba(255,255,255,0.75);">{result.primaryDimension.description}</div>
      </div>

      <div class="section-title">
        <h3>ຄະແນນແຕ່ລະດ້ານ</h3>
      </div>
      <div>
        {#each result.dimensions as d}
          <div class="riasec-bar-row">
            <div class="lbl-row">
              <span>{d.name}</span>
              <b>{d.score}%</b>
            </div>
            <div class="riasec-track">
              <div class="riasec-fill" style="width:{d.score}%; background:{d.color};"></div>
            </div>
          </div>
        {/each}
      </div>

      <div class="section-title">
        <h3>ອາຊີບທີ່ອາດເໝາະກັບເຈົ້າ</h3>
      </div>
      <div style="display:flex; flex-direction:column; gap:12px;">
        {#each result.matchedCareers as career (career.id)}
          <CareerCard {career} layout="result" />
        {/each}
      </div>
    {/if}
  </div>
</div>
