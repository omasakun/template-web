<script lang="ts">
  import { SmileIcon } from 'svelte-feather-icons'

  let count = 0
</script>

<div class="root">
  <h1 class="flex-center header">
    <SmileIcon size="1x" class="icon" />
    Hello!
  </h1>

  <button type="button" on:click={() => count++}>
    count is: {count}
  </button>
</div>

<style lang="scss">
  .root {
    height: 100%;
    width: 100%;

    text-align: center;
    padding: 3rem;
  }
  :global(.icon) {
    margin-right: 0.5rem;
  }
  .header {
    text-transform: uppercase;
    margin: 2rem;
  }
</style>
