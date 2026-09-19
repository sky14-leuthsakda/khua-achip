<script lang="ts">
  import { navStore } from '../../stores/navStore';
  import { savedStore } from '../../stores/savedStore';

  let isSaved = false;

  function toggleSave() {
    isSaved = !isSaved;
  }
</script>

<div class="screen active">
  <div class="detail-hero" style="background:linear-gradient(135deg,#1F2A56,#0F1B3D);">
    <button class="back" style="position:absolute; top:16px; left:16px;" on:click={() => navStore.back()} aria-label="ກັບຄືນ">
      ←
    </button>
    <button class="saved-toggle" on:click={toggleSave} aria-label="ບັນທຶກ">
      {isSaved ? '❤️' : '🤍'}
    </button>
    <div class="icon-circle">🎓</div>
    <div>
      <h1>ຄະນະວິທະຍາສາດຄອມພິວເຕີ</h1>
      <div class="tag-light">ມະຫາວິທະຍາໄລແຫ່ງຊາດລາວ · ວຽງຈັນ</div>
    </div>
  </div>

  <div class="pad">
    <div class="stat-grid">
      <div class="stat-box">
        <div class="lbl">🎓 ໄລຍະເວລາ</div>
        <div class="val">4 ປີ</div>
      </div>
      <div class="stat-box">
        <div class="lbl">💰 ຄ່າຮຽນ/ປີ</div>
        <div class="val">6.5 ລ້ານ LAK</div>
      </div>
      <div class="stat-box">
        <div class="lbl">📍 ສະຖານທີ່</div>
        <div class="val">ວຽງຈັນ</div>
      </div>
      <div class="stat-box">
        <div class="lbl">🗓 ຮັບສະໝັກ</div>
        <div class="val">ພຶດສະພາ-ກໍລະກົດ</div>
      </div>
    </div>

    <div class="info-block">
      <h4>ເງື່ອນໄຂຮັບເຂົ້າ</h4>
      <p>
        ຈົບມັດທະຍົມປາຍ (ມ.7), ຄະແນນສະເລ່ຍວິຊາຄະນິດສາດ ແລະ ວິທະຍາສາດຜ່ານເກນ, ສອບເສັງເສັງເຂົ້າຫຼັກສູດ
      </p>
    </div>

    <div class="info-block">
      <h4>ອາຊີບທີ່ກ່ຽວຂ້ອງ</h4>
      <div class="chip-row">
        <span class="chip">ນັກພັດທະນາຊອບແວ</span>
        <span class="chip">ນັກວິເຄາະຂໍ້ມູນ</span>
        <span class="chip">ຄວາມປອດໄພໄຊເບີ</span>
        <span class="chip">UI/UX Designer</span>
      </div>
    </div>

    <button class="btn-secondary" on:click={() => navStore.go('careerDetail', { careerId: 'sw' })}>
      ເບິ່ງອາຊີບທີ່ກ່ຽວຂ້ອງ
    </button>
  </div>
</div>
