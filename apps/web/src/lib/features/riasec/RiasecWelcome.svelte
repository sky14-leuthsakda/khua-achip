<script lang="ts">
  import TopBar from '../../components/TopBar.svelte';
  import { navStore } from '../../stores/navStore';

  function startAssessment() {
    navStore.go('riasecQ');
  }
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar />
  <div class="pad" style="text-align:center; padding-top:10px;">
    <div style="font-size:64px; margin:20px 0 10px 0;">🧭</div>
    <h1 style="font-size:22px; margin:0 0 10px 0;">ມາຮູ້ຈັກຕົວເອງ</h1>
    <p style="font-size:13.5px; color:var(--ink-600); line-height:1.7;">
      ແບບປະເມີນນີ້ອີງໃສ່ຫຼັກ RIASEC ເພື່ອຄົ້ນຫາຄວາມສົນໃຈ ແລະ ຈຸດແຂງຂອງເຈົ້າ ແລ້ວແນະນຳອາຊີບທີ່ອາດເໝາະສົມ
    </p>

    <div class="card" style="margin-top:24px; text-align:left;">
      <div style="display:flex; gap:10px; align-items:center; margin-bottom:14px;">
        <span style="font-size:18px;">⏱</span>
        <span style="font-size:12.5px; color:var(--ink-600);">ໃຊ້ເວລາປະມານ 5-7 ນາທີ</span>
      </div>
      <div style="display:flex; gap:10px; align-items:center; margin-bottom:14px;">
        <span style="font-size:18px;">📝</span>
        <span style="font-size:12.5px; color:var(--ink-600);">20 ຄຳຖາມ ແບບເລືອກລະດັບຄວາມເຫັນດີ</span>
      </div>
      <div style="display:flex; gap:10px; align-items:center;">
        <span style="font-size:18px;">🔒</span>
        <span style="font-size:12.5px; color:var(--ink-600);">ຄຳຕອບຂອງເຈົ້າຈະຖືກເກັບໄວ້ເປັນສ່ວນຕົວ</span>
      </div>
    </div>
  </div>

  <div class="pad" style="position:absolute; bottom:26px; left:0; right:0;">
    <button class="btn-primary" on:click={startAssessment}>
      ເລີ່ມການປະເມີນ
    </button>
  </div>
</div>
