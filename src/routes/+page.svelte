<script>
  import ThemeSwitch from "$lib/ThemeSwitch.svelte";

</script>
<div>
  <ThemeSwitch fontSize="1.2rem"></ThemeSwitch>
  <ThemeSwitch fontSize="1.2rem" horizontal={true}></ThemeSwitch>
</div>

<style>
  div {
    width: fit-content;
    padding: 1.5vh;
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
    align-items: center;
  }
</style>