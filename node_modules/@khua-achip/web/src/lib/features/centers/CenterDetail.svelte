<script lang="ts">
  import { onMount } from 'svelte';
  import { navStore } from '../../stores/navStore';
  import { savedStore } from '../../stores/savedStore';
  import { fetchCenterById } from './centersApi';
  import type { Center } from './types';

  export let centerId: string = 'c1';

  let center: Center | null = null;
  let loading = true;
  let error = '';

  $: isSaved = $savedStore.centers.includes(centerId);

  async function loadCenter(id: string) {
    loading = true;
    try {
      center = await fetchCenterById(id);
    } catch (err: any) {
      error = err.message || 'Error loading center';
    } finally {
      loading = false;
    }
  }

  $: if (centerId) {
    loadCenter(centerId);
  }
</script>

<div class="screen active">
  {#if loading && !center}
    <div class="status-space"></div>
    <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>
  {:else if center}
    <div class="detail-hero" style="background: {center.grad};">
      <button class="back" style="position:absolute; top:16px; left:16px;" on:click={() => navStore.back()} aria-label="ກັບຄືນ">
        ←
      </button>
      <button class="saved-toggle" on:click={() => savedStore.toggleCenter(centerId)} aria-label="ບັນທຶກ">
        {isSaved ? '❤️' : '🤍'}
      </button>
      <div class="icon-circle">💻</div>
      <div>
        <h1>{center.name}</h1>
        <div class="tag-light">{center.subj} · {center.loc}</div>
      </div>
    </div>

    <div class="pad">
      <div class="rating" style="margin-top:14px;">
        ⭐ {center.rating} <span style="color:var(--ink-400); font-weight:400;">· ຣີວິວ 96 ຄັ້ງ</span>
      </div>

      <div class="info-block">
        <h4>ກ່ຽວກັບ</h4>
        <p>
          ສູນຮຽນສະເພາະດ້ານໂປຣແກຣມມິ່ງ ສອນຕັ້ງແຕ່ພື້ນຖານຈົນເຖິງລະດັບສ້າງແອັບຕົວຈິງ ມີຫ້ອງ Lab ພ້ອມຄອມພິວເຕີໃນທຸກຫ້ອງຮຽນ
        </p>
      </div>

      <div class="info-block">
        <h4>ຫຼັກສູດ</h4>
        <div class="chip-row">
          <span class="chip">Python ພື້ນຖານ</span>
          <span class="chip">Web Development</span>
          <span class="chip">Mobile App</span>
          <span class="chip">Data Science</span>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-box">
          <div class="lbl">ລາຄາ</div>
          <div class="val">ເລີ່ມ {center.price}</div>
        </div>
        <div class="stat-box">
          <div class="lbl">ຮູບແບບ</div>
          <div class="val">{center.mode}</div>
        </div>
      </div>

      <div class="info-block">
        <h4>ຕາຕະລາງ</h4>
        <p>ຈັນ-ສຸກ 17:00-20:00 · ເສົາ-ອາທິດ 09:00-16:00</p>
      </div>

      <div class="info-block">
        <h4>ສະຖານທີ່ ແລະ ຕິດຕໍ່</h4>
        <p>ບ້ານໂພນສະຫວ່າງ, ນະຄອນຫຼວງວຽງຈັນ · ໂທ 020 5555 1234</p>
      </div>
    </div>

    <div class="pad" style="position:absolute; bottom:26px; left:0; right:0;">
      <button class="btn-primary">ຕິດຕໍ່ສູນຮຽນ</button>
    </div>
  {/if}
</div>
