<script lang="ts">
  import { onMount } from 'svelte';
  import TopBar from '../../components/TopBar.svelte';
  import { fetchTutorById } from './tutorsApi';
  import type { Tutor } from './types';

  export let tutorId: string = 't1';

  let tutor: Tutor | null = null;
  let loading = true;
  let error = '';

  async function loadTutor(id: string) {
    loading = true;
    try {
      tutor = await fetchTutorById(id);
    } catch (err: any) {
      error = err.message || 'Error loading tutor';
    } finally {
      loading = false;
    }
  }

  $: if (tutorId) {
    loadTutor(tutorId);
  }
</script>

<div class="screen active">
  <div class="status-space"></div>
  <TopBar />

  <div class="pad">
    {#if loading && !tutor}
      <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>
    {:else if tutor}
      <div style="display:flex; gap:16px; align-items:center;">
        <div class="avatar" style="width:72px; height:72px; font-size:24px; border-radius:20px;">
          {tutor.init}
        </div>
        <div>
          <div class="name-row">
            <h2 style="margin:0;">{tutor.name}</h2>
            <span class="badge-verified">✅</span>
          </div>
          <div class="meta-line">{tutor.subj} · Python, Web Development</div>
          <div class="rating">⭐ {tutor.rating} · ນັກຮຽນ {tutor.students} ຄົນ</div>
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-box">
          <div class="lbl">ປະສົບການ</div>
          <div class="val">{tutor.years} ປີ</div>
        </div>
        <div class="stat-box">
          <div class="lbl">ລາຄາ</div>
          <div class="val">{tutor.price}</div>
        </div>
        <div class="stat-box">
          <div class="lbl">ຮູບແບບ</div>
          <div class="val">{tutor.mode} + ອອຟລາຍ</div>
        </div>
        <div class="stat-box">
          <div class="lbl">ຕາຕະລາງ</div>
          <div class="val">ຈ-ສ, 18:00-20:00</div>
        </div>
      </div>

      <div class="info-block">
        <h4>ແນວທາງການສອນ</h4>
        <p>
          ເນັ້ນການລົງມືປະຕິບັດຕົວຈິງ, ໃຫ້ນັກຮຽນສ້າງໂປຣເຈັກຂອງຕົນເອງໄປພ້ອມກັບການຮຽນທິດສະດີ ເໝາະສຳລັບຜູ້ເລີ່ມຕົ້ນ
        </p>
      </div>

      <div class="info-block">
        <h4>ວິຊາທີ່ສອນ</h4>
        <div class="chip-row">
          <span class="chip">Python</span>
          <span class="chip">Web Development</span>
          <span class="chip">Database ພື້ນຖານ</span>
        </div>
      </div>

      <div class="section-title">
        <h3>ຣີວິວ (48)</h3>
      </div>
      <div class="review-row">
        <div class="top">
          <b>ນັກຮຽນ ອ.</b>
          <span class="stars">★★★★★</span>
        </div>
        <p>ອະທິບາຍເຂົ້າໃຈງ່າຍ, ໃຈເຢັນຫຼາຍ ແນະນຳໃຫ້ຄົນທີ່ຢາກເລີ່ມຮຽນເຂດນີ້.</p>
      </div>
      <div class="review-row">
        <div class="top">
          <b>ນັກຮຽນ ບ.</b>
          <span class="stars">★★★★★</span>
        </div>
        <p>ໄດ້ຄວາມຮູ້ຫຼາຍກວ່າໃນຫ້ອງຮຽນ, ມີໂປຣເຈັກຕົວຈິງໃຫ້ລອງເຮັດ.</p>
      </div>
    {/if}
  </div>

  <div class="pad" style="position:absolute; bottom:26px; left:0; right:0; display:flex; gap:10px;">
    <button class="btn-secondary" style="flex:1;">ຕິດຕໍ່</button>
    <button class="btn-primary btn-teal" style="flex:2;">ຈອງຮຽນ</button>
  </div>
</div>
