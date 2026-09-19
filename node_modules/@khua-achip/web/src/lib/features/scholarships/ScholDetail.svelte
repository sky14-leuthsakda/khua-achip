<script lang="ts">
  import { onMount } from 'svelte';
  import { navStore } from '../../stores/navStore';
  import { savedStore } from '../../stores/savedStore';
  import { fetchScholarshipById } from './scholarshipsApi';
  import type { Scholarship } from './types';

  export let scholId: string = 's1';

  let scholarship: Scholarship | null = null;
  let loading = true;
  let error = '';

  $: isSaved = $savedStore.scholarships.includes(scholId);

  async function loadSchol(id: string) {
    loading = true;
    try {
      scholarship = await fetchScholarshipById(id);
    } catch (err: any) {
      error = err.message || 'Error loading scholarship';
    } finally {
      loading = false;
    }
  }

  $: if (scholId) {
    loadSchol(scholId);
  }
</script>

<div class="screen active">
  {#if loading && !scholarship}
    <div class="status-space"></div>
    <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>
  {:else if scholarship}
    <div class="detail-hero" style="background:linear-gradient(135deg,#B9822F,#7A5417);">
      <button class="back" style="position:absolute; top:16px; left:16px;" on:click={() => navStore.back()} aria-label="ກັບຄືນ">
        ←
      </button>
      <button class="saved-toggle" on:click={() => savedStore.toggleSchol(scholId)} aria-label="ບັນທຶກ">
        {isSaved ? '❤️' : '🤍'}
      </button>
      <div class="icon-circle">🎓</div>
      <div>
        <h1>{scholarship.name}</h1>
        <div class="tag-light">{scholarship.country} · {scholarship.level}</div>
      </div>
    </div>

    <div class="pad">
      <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;">
        <span class="chip" style="background:var(--teal-100); color:var(--teal-600);">{scholarship.funded} 100%</span>
        <span class="match-pill" style="margin-top:0;">ເໝາະກັບ Profile ຂອງເຈົ້າ {scholarship.match}%</span>
      </div>

      <div class="info-block">
        <h4>ລາຍລະອຽດທຶນ</h4>
        <p>
          ທຶນສະໜັບສະໜູນຄ່າຮຽນ ແລະ ຄ່າຄອງຊີບເຕັມຈຳນວນ ສຳລັບນັກສຶກສາອາຊຽນທີ່ຮຽນສາຍວິທະຍາສາດຄອມພິວເຕີ ຫຼື ດ້ານດິຈິຕອນ
        </p>
      </div>

      <div class="info-block">
        <h4>ຄຸນສົມບັດຜູ້ສະໝັກ</h4>
        <p>
          ອາຍຸບໍ່ເກີນ 22 ປີ, ຈົບ ມ.7 ດ້ວຍຄະແນນສະເລ່ຍ 3.2 ຂຶ້ນໄປ, ມີໃບຮັບຮອງພາສາອັງກິດ IELTS 6.0+
        </p>
      </div>

      <div class="info-block">
        <h4>ເອກະສານທີ່ຕ້ອງການ</h4>
        <p>
          ໃບຄະແນນ, ໃບຢັ້ງຢືນພາສາອັງກິດ, ຈົດໝາຍແນະນຳຕົນເອງ, ຈົດໝາຍຮັບຮອງ 2 ສະບັບ
        </p>
      </div>

      <div class="stat-grid">
        <div class="stat-box">
          <div class="lbl">📅 ໝົດເຂດສະໝັກ</div>
          <div class="val">{scholarship.deadline}</div>
        </div>
        <div class="stat-box">
          <div class="lbl">🎓 ລະດັບ</div>
          <div class="val">{scholarship.level}</div>
        </div>
      </div>

      <div class="disclaimer">
        ຂໍ້ມູນອ້າງອີງຈາກແຫຼ່ງທາງການ · ອັບເດດລ່າສຸດ ກັນຍາ 2026 — ວັນທີ ແລະ ເງື່ອນໄຂອາດມີການປ່ຽນແປງ ກະລຸນາກວດສອບກັບແຫຼ່ງທາງການອີກຄັ້ງ
      </div>
    </div>

    <div class="pad" style="position:absolute; bottom:26px; left:0; right:0;">
      <button class="btn-primary">ໄປຍັງເວັບໄຊທາງການ ↗</button>
    </div>
  {/if}
</div>
