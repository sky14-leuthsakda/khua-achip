<script lang="ts">
  import { onMount } from "svelte";
  import { navStore } from "../../stores/navStore";
  import CareerCard from "../careers/CareerCard.svelte";
  import TutorCard from "../tutors/TutorCard.svelte";
  import CenterCard from "../centers/CenterCard.svelte";
  import ScholCard from "../scholarships/ScholCard.svelte";
  import { fetchCareers } from "../careers/careersApi";
  import { fetchTutors } from "../tutors/tutorsApi";
  import { fetchCenters } from "../centers/centersApi";
  import { fetchScholarships } from "../scholarships/scholarshipsApi";
  import type { Career } from "../careers/types";
  import type { Tutor } from "../tutors/types";
  import type { Center } from "../centers/types";
  import type { Scholarship } from "../scholarships/types";

  let careers: Career[] = [];
  let tutors: Tutor[] = [];
  let centers: Center[] = [];
  let scholarships: Scholarship[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const [c, t, ce, s] = await Promise.all([
        fetchCareers(),
        fetchTutors(),
        fetchCenters(),
        fetchScholarships(),
      ]);
      careers = c;
      tutors = t;
      centers = ce;
      scholarships = s;
    } catch (err) {
      console.error("Error fetching home data:", err);
    } finally {
      loading = false;
    }
  });
</script>

<div class="screen active">
  <div class="status-space"></div>
  <div class="pad">
    <div class="hero-card">
      <div style="font-size:20px;">ສະບາຍດີ, ອານຸສິນ 👋</div>
      <div
        style="font-size:13px; color:rgba(255,255,255,0.75); margin-top:4px;"
      >
        ມື້ນີ້ຢາກຄົ້ນຫາຫຍັງ?
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="searchbar" on:click={() => navStore.go("explore")}>
        <span>🔍</span>
        <input readonly placeholder="ຄົ້ນຫາອາຊີບ, ວິຊາ, ອາຈານ, ສູນຮຽນ…" />
      </div>
    </div>

    <div class="feature-grid">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="feature-card" on:click={() => navStore.go("careerList")}>
        <div class="feature-icon" style="background:var(--teal-100);">🎯</div>
        <h4>ຄົ້ນຫາອາຊີບ</h4>
        <p>ອາຊີບ 120+ ລາຍການ</p>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="feature-card" on:click={() => navStore.go("tutorList")}>
        <div class="feature-icon" style="background:#FDECE6;">👨‍🏫</div>
        <h4>ຊອກຫາອາຈານ</h4>
        <p>ອາຈານ 340+ ຄົນ</p>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="feature-card" on:click={() => navStore.go("centerList")}>
        <div class="feature-icon" style="background:#EFF1FA;">🏫</div>
        <h4>ຊອກຫາສູນຮຽນ</h4>
        <p>ສູນຮຽນ 85+ ແຫ່ງ</p>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="feature-card" on:click={() => navStore.go("scholList")}>
        <div class="feature-icon" style="background:#FBF0DD;">🎓</div>
        <h4>ຊອກຫາທຶນການສຶກສາ</h4>
        <p>ທຶນ 60+ ລາຍການ</p>
      </div>
    </div>

    <div class="section-title">
      <h3>ອາຊີບແນະນຳສຳລັບເຈົ້າ</h3>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="see-all" on:click={() => navStore.go("careerList")}
        >ເບິ່ງທັງໝົດ</span
      >
    </div>
  </div>

  <div class="hscroll">
    {#each careers as c (c.id)}
      <CareerCard career={c} layout="scroll" />
    {/each}
  </div>

  <div class="pad">
    <div class="section-title">
      <h3>ອາຈານແນະນຳ</h3>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="see-all" on:click={() => navStore.go("tutorList")}
        >ເບິ່ງທັງໝົດ</span
      >
    </div>
  </div>

  <div class="hscroll">
    {#each tutors as t (t.id)}
      <TutorCard tutor={t} layout="scroll" />
    {/each}
  </div>

  <div class="pad">
    <div class="section-title">
      <h3>ສູນຮຽນໃກ້ເຈົ້າ</h3>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="see-all" on:click={() => navStore.go("centerList")}
        >ເບິ່ງທັງໝົດ</span
      >
    </div>
  </div>

  <div class="hscroll">
    {#each centers as ce (ce.id)}
      <CenterCard center={ce} layout="scroll" />
    {/each}
  </div>

  <div class="pad">
    <div class="section-title">
      <h3>ທຶນການສຶກສາແນະນຳ</h3>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <span class="see-all" on:click={() => navStore.go("scholList")}
        >ເບິ່ງທັງໝົດ</span
      >
    </div>
  </div>

  <div class="hscroll">
    {#each scholarships as s (s.id)}
      <ScholCard scholarship={s} layout="scroll" />
    {/each}
  </div>

  <div class="pad" style="margin-top:6px;">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="card"
      style="display:flex; gap:14px; align-items:center; cursor:pointer;"
      on:click={() => navStore.go("riasecWelcome")}
    >
      <div style="font-size:26px;">🧭</div>
      <div style="flex:1;">
        <div style="font-weight:700; font-size:13.5px;">
          ຍັງບໍ່ໄດ້ເຮັດແບບປະເມີນ?
        </div>
        <div style="font-size:11.5px; color:var(--ink-400); margin-top:2px;">
          ຮູ້ຈັກຕົວເອງ ແລະ ຄົ້ນຫາອາຊີບທີ່ໃຊ່ພາຍໃນ 5 ນາທີ
        </div>
      </div>
      <div style="color:var(--teal-600); font-size:18px;">›</div>
    </div>
  </div>

  <div style="height:30px;"></div>
</div>
