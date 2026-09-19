<script lang="ts">
  import BottomNav from './BottomNav.svelte';
  import DemoBar from './DemoBar.svelte';
</script>

<div class="device" id="device">
  <div class="notch"></div>
  <div class="screens" id="screens">
    <slot />
  </div>
  <BottomNav />
  <DemoBar />
</div>
