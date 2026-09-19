<script lang="ts">
  import { navStore } from '../../stores/navStore';
</script>

<div class="screen active">
  <div class="status-space"></div>
  <div class="pad">
    <div class="topbar" style="padding:0 0 4px 0;">
      <h2>ຄົ້ນຫາ</h2>
    </div>

    <div class="searchbar" style="background:#EFF1EC; border-color:var(--line); margin-top:6px;">
      <span>🔍</span>
      <input style="color:var(--ink-900);" placeholder="ຄົ້ນຫາອາຊີບ, ວິຊາ, ອາຈານ, ສູນຮຽນ…" />
    </div>

    <div class="section-title" style="margin-top:20px;">
      <h3>ໝວດໝູ່</h3>
    </div>

    <div style="display:flex; flex-direction:column; gap:12px;">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;" on:click={() => navStore.go('careerList')}>
        <div class="feature-icon" style="background:var(--teal-100); margin:0;">🎯</div>
        <div style="flex:1;">
          <b style="font-size:13.5px;">ຄົ້ນຫາອາຊີບ</b>
          <div style="font-size:11.5px; color:var(--ink-400);">ຄົ້ນພົບອາຊີບທີ່ເໝາະກັບເຈົ້າ</div>
        </div>
        <span style="color:var(--ink-400);">›</span>
      </div>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;" on:click={() => navStore.go('uniDetail')}>
        <div class="feature-icon" style="background:#EFF1FA; margin:0;">🎓</div>
        <div style="flex:1;">
          <b style="font-size:13.5px;">ມະຫາວິທະຍາໄລ ແລະ ວິຊາຮຽນ</b>
          <div style="font-size:11.5px; color:var(--ink-400);">ຂໍ້ມູນມະຫາວິທະຍາໄລໃນ ສປປ ລາວ</div>
        </div>
        <span style="color:var(--ink-400);">›</span>
      </div>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;" on:click={() => navStore.go('tutorList')}>
        <div class="feature-icon" style="background:#FDECE6; margin:0;">👨‍🏫</div>
        <div style="flex:1;">
          <b style="font-size:13.5px;">ຊອກຫາອາຈານສອນເພີ່ມ</b>
          <div style="font-size:11.5px; color:var(--ink-400);">ຈອງອາຈານສ່ວນຕົວ ອອນລາຍ ຫຼື ອອຟລາຍ</div>
        </div>
        <span style="color:var(--ink-400);">›</span>
      </div>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;" on:click={() => navStore.go('centerList')}>
        <div class="feature-icon" style="background:#EFF1FA; margin:0;">🏫</div>
        <div style="flex:1;">
          <b style="font-size:13.5px;">ຊອກຫາສູນຮຽນເພີ່ມ</b>
          <div style="font-size:11.5px; color:var(--ink-400);">ພາສາ, ໂປຣແກຣມ, ຄະນິດສາດ ແລະ ອື່ນໆ</div>
        </div>
        <span style="color:var(--ink-400);">›</span>
      </div>

      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="card" style="display:flex; gap:14px; align-items:center; cursor:pointer;" on:click={() => navStore.go('scholList')}>
        <div class="feature-icon" style="background:#FBF0DD; margin:0;">🎓</div>
        <div style="flex:1;">
          <b style="font-size:13.5px;">ຊອກຫາທຶນການສຶກສາ</b>
          <div style="font-size:11.5px; color:var(--ink-400);">ທຶນພາຍໃນ ແລະ ຕ່າງປະເທດ</div>
        </div>
        <span style="color:var(--ink-400);">›</span>
      </div>
    </div>
  </div>
</div>
