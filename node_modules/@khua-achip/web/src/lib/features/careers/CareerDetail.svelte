<script lang="ts">
  import { onMount } from 'svelte';
  import { navStore } from '../../stores/navStore';
  import { savedStore } from '../../stores/savedStore';
  import { fetchCareerById } from './careersApi';
  import type { Career } from './types';

  export let careerId: string = 'sw';

  let career: Career | null = null;
  let loading = true;
  let error = '';

  $: isSaved = $savedStore.careers.includes(careerId);

  async function loadCareer(id: string) {
    loading = true;
    try {
      career = await fetchCareerById(id);
    } catch (err: any) {
      error = err.message || 'Failed to load career';
    } finally {
      loading = false;
    }
  }

  $: if (careerId) {
    loadCareer(careerId);
  }
</script>

<div class="screen active">
  {#if loading && !career}
    <div class="status-space"></div>
    <div style="text-align:center; padding:50px; color:var(--ink-400);">ກຳລັງໂຫລດ...</div>
  {:else if career}
    <div class="detail-hero" id="careerHero">
      <button class="back" style="position:absolute; top:16px; left:16px;" on:click={() => navStore.back()} aria-label="ກັບຄືນ">
        ←
      </button>
      <button
        class="saved-toggle"
        on:click={() => savedStore.toggleCareer(careerId)}
        aria-label="ບັນທຶກ"
      >
        {isSaved ? '❤️' : '🤍'}
      </button>
      <div class="icon-circle" id="careerHeroIcon">{career.icon}</div>
      <div>
        <h1 id="careerHeroTitle">{career.title}</h1>
        <div class="tag-light" id="careerHeroTag">{career.tag}</div>
      </div>
    </div>

    <div class="pad">
      <div class="info-block">
        <h4>ເຮັດຫຍັງແດ່?</h4>
        <p id="careerWhat">{career.what}</p>
      </div>

      <div class="info-block">
        <h4>ທັກສະທີ່ຕ້ອງການ</h4>
        <div class="chip-row" id="careerSkills">
          {#each career.skills as skill}
            <span class="chip">{skill}</span>
          {/each}
        </div>
      </div>

      <div class="stat-grid">
        <div class="stat-box">
          <div class="lbl">ເງິນເດືອນ (ໂດຍປະມານ)</div>
          <div class="val" id="careerSalary">{career.salary}</div>
        </div>
        <div class="stat-box">
          <div class="lbl">ໂອກາດວຽກ</div>
          <div class="val" id="careerDemand">{career.demand}</div>
        </div>
      </div>

      <div class="disclaimer">
        ອ້າງອີງ: ກົມແຮງງານ, 2025 — ລາຍໄດ້ຕົວຈິງອາດແຕກຕ່າງກັນຕາມບໍລິສັດ ແລະ ປະສົບການ
      </div>

      <div class="info-block">
        <h4>ເສັ້ນທາງການສຶກສາ</h4>
        <p id="careerEdu">{career.edu}</p>
      </div>

      <div class="section-title" style="margin:20px 0 10px 0;">
        <h3>ມະຫາວິທະຍາໄລທີ່ກ່ຽວຂ້ອງ</h3>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;" on:click={() => navStore.go('uniDetail')}>
        <div class="feature-icon" style="background:#EFF1FA; margin:0;">🎓</div>
        <div style="flex:1;">
          <b style="font-size:13px;">ຄະນະວິທະຍາສາດຄອມພິວເຕີ, ມຊ.ລ</b>
          <div style="font-size:11px; color:var(--ink-400);">National University of Laos</div>
        </div>
        <span style="color:var(--ink-400);">›</span>
      </div>

      <div class="section-title">
        <h3>ອາຈານແນະນຳ</h3>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="tutor-card" style="margin-bottom:0;" on:click={() => navStore.go('tutorDetail', { tutorId: 't1' })}>
        <div class="row">
          <div class="avatar">ວລ</div>
          <div style="flex:1;">
            <div class="name-row">
              <h4>ອາຈານ ວັນນະລີ</h4>
              <span class="badge-verified">✅</span>
            </div>
            <div class="meta-line">ໂປຣແກຣມມິ່ງ · ອອນລາຍ</div>
            <div class="rating">
              ⭐ 4.8 <span style="color:var(--ink-400); font-weight:400;">· ນັກຮຽນ 62 ຄົນ</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-title">
        <h3>ສູນຮຽນແນະນຳ</h3>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="center-card" style="margin-bottom:0;" on:click={() => navStore.go('centerDetail', { centerId: 'c1' })}>
        <div class="row">
          <div class="avatar" style="background:linear-gradient(135deg,#5865C2,#0FADA6);">CS</div>
          <div style="flex:1;">
            <h4 style="font-size:13.5px; margin:0;">CodeLab Vientiane</h4>
            <div class="meta-line">ໂປຣແກຣມມິ່ງ · ວຽງຈັນ</div>
            <div class="rating">
              ⭐ 4.7 <span style="color:var(--ink-400); font-weight:400;">· ອອນລາຍ+ອອຟລາຍ</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-title">
        <h3>ທຶນການສຶກສາທີ່ກ່ຽວຂ້ອງ</h3>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="schol-card" style="margin-bottom:0;" on:click={() => navStore.go('scholDetail', { scholId: 's1' })}>
        <div style="display:flex; justify-content:space-between;">
          <b style="font-size:13.5px;">ASEAN Digital Scholarship</b>
          <span class="match-pill">ກົງກັນ 88%</span>
        </div>
        <div class="meta-line">ສິງກະໂປ · ປະລິນຍາຕີ · ທຶນເຕັມ</div>
      </div>

      <div style="height:14px;"></div>
      <button class="btn-primary" on:click={() => navStore.go('roadmap')}>
        ສ້າງເສັ້ນທາງການຮຽນສຳລັບອາຊີບນີ້
      </button>
    </div>
  {/if}
</div>
