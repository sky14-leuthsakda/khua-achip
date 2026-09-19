<script lang="ts">
  import { profileStore } from '../stores/profileStore';

  const { profile, activeModal, closeModal, updateProfile } = profileStore;

  let name = $profile.fullName;
  let school = $profile.school;
  let grade = $profile.grade;

  function handleSave() {
    if (!name.trim()) return;
    updateProfile({
      fullName: name.trim(),
      school: school.trim(),
      grade: grade.trim()
    });
    closeModal();
  }
</script>

{#if $activeModal === 'editProfile'}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-card" on:click|stopPropagation>
      <div class="modal-header">
        <div class="modal-title-row">
          <span style="font-size:20px;">✏️</span>
          <h3>ແກ້ໄຂໂປຣໄຟລ໌</h3>
        </div>
        <button type="button" class="btn-close" on:click={closeModal} aria-label="ປິດ">✕</button>
      </div>

      <div class="modal-body">
        <div class="field">
          <label for="prof-name">ຊື່ ແລະ ນາມສະກຸນ</label>
          <input id="prof-name" type="text" bind:value={name} placeholder="ປ້ອນຊື່ ແລະ ນາມສະກຸນ..." />
        </div>

        <div class="field">
          <label for="prof-school">ໂຮງຮຽນ</label>
          <input id="prof-school" type="text" bind:value={school} placeholder="ໂຮງຮຽນ..." />
        </div>

        <div class="field">
          <label for="prof-grade">ຫ້ອງຮຽນ / ຊັ້ນຮຽນ</label>
          <input id="prof-grade" type="text" bind:value={grade} placeholder="ຕົວຢ່າງ: ມ.6, ມ.7..." />
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn-secondary" style="flex:1;" on:click={closeModal}>ຍົກເລີກ</button>
        <button type="button" class="btn-primary" style="flex:2;" on:click={handleSave}>ບັນທຶກ</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 27, 61, 0.6);
    backdrop-filter: blur(6px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: fadeIn 0.2s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .modal-card {
    background: var(--card);
    border-radius: 24px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 24px 50px -12px rgba(15, 27, 61, 0.4);
    display: flex;
    flex-direction: column;
    max-height: 85vh;
    overflow: hidden;
    animation: scaleUp 0.2s ease-out;
  }
  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  .modal-header {
    padding: 18px 20px 14px 20px;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .modal-title-row h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--navy-900);
  }
  .btn-close {
    background: none;
    border: none;
    font-size: 16px;
    color: var(--ink-400);
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-body {
    padding: 18px 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .field label {
    font-size: 12px;
    font-weight: 700;
    color: var(--navy-900);
  }
  .field input {
    padding: 11px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--line);
    font-size: 13px;
    font-family: inherit;
    outline: none;
    color: var(--ink-900);
  }
  .field input:focus {
    border-color: var(--teal-600);
  }
  .modal-footer {
    padding: 14px 20px;
    border-top: 1px solid var(--line);
    background: #fafaf8;
    display: flex;
    gap: 10px;
  }
</style>
