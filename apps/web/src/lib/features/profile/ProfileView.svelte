<script lang="ts">
  import { navStore } from '../../stores/navStore';
  import { profileStore } from '../../stores/profileStore';

  const { profile, openModal, logout } = profileStore;
</script>

<div class="screen active">
  <div class="status-space"></div>
  <div class="pad">
    <div class="profile-head">
      <div class="profile-avatar">{$profile.avatar}</div>
      <h2>{$profile.fullName}</h2>
      <p>{$profile.grade} · {$profile.school}</p>
    </div>

    <div class="chip-row" style="justify-content:center; display:flex; margin-top:10px;">
      {#each $profile.interests as interest}
        <span class="chip">{interest}</span>
      {/each}
    </div>

    <div class="divider"></div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" on:click={() => navStore.go('riasecResult')}>
      <div class="left">
        <span class="icn">🧭</span>
        ຜົນການປະເມີນຕົນເອງ
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" on:click={() => navStore.go('roadmap')}>
      <div class="left">
        <span class="icn">🗺️</span>
        ເສັ້ນທາງການຮຽນ
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" on:click={() => navStore.go('saved')}>
      <div class="left">
        <span class="icn">❤️</span>
        ລາຍການບັນທຶກໄວ້
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" on:click={() => openModal('editProfile')}>
      <div class="left">
        <span class="icn">✏️</span>
        ແກ້ໄຂໂປຣໄຟລ໌
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" on:click={() => openModal('notifications')}>
      <div class="left">
        <span class="icn">🔔</span>
        ການແຈ້ງເຕືອນ
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" on:click={() => openModal('settings')}>
      <div class="left">
        <span class="icn">⚙️</span>
        ຕັ້ງຄ່າ
      </div>
      <span style="color:var(--ink-400);">›</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="menu-row" style="border-bottom:none;" on:click={logout}>
      <div class="left" style="color:var(--coral-500);">
        <span class="icn" style="background:#FDECE6;">🚪</span>
        ອອກຈາກລະບົບ
      </div>
      <span style="color:var(--coral-500);">›</span>
    </div>
  </div>
</div>
