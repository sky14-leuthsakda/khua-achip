<script lang="ts">
  import { demoStore, DEMO_STEPS } from '../stores/demoStore';

  $: currentStep = DEMO_STEPS[$demoStore.stepIndex] || DEMO_STEPS[0];
</script>

{#if $demoStore.isActive}
  <div class="demo-bar show">
    <div>
      <div class="step-lbl">{$demoStore.stepIndex + 1}/{DEMO_STEPS.length}</div>
      <div class="step-name">{currentStep.name}</div>
    </div>
    <div class="demo-controls">
      <button type="button" on:click={() => demoStore.prev()} aria-label="ຂັ້ນຕອນກ່ອນໜ້າ">‹</button>
      <button type="button" on:click={() => demoStore.next()} aria-label="ຂັ້ນຕອນຕໍ່ໄປ">›</button>
      <button type="button" class="exit" on:click={() => demoStore.exit()}>ອອກ</button>
    </div>
  </div>
{/if}

<style>
  .demo-bar {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 14px;
    z-index: 70;
    background: var(--navy-900);
    border-radius: 18px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--shadow);
    animation: slideUp 0.25s ease-out;
  }
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .step-lbl {
    color: #fff;
    font-size: 11.5px;
    font-weight: 700;
  }
  .step-name {
    color: rgba(255, 255, 255, 0.65);
    font-size: 10px;
  }
  .demo-controls {
    display: flex;
    gap: 8px;
  }
  .demo-controls button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .demo-controls button.exit {
    background: var(--coral-500);
    font-size: 11px;
    width: auto;
    padding: 0 12px;
    border-radius: 18px;
  }
</style>
