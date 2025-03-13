<template>
  <div class="square-container">
    <div class="square">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.square-container {
  container-type: size;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.square {
  aspect-ratio: 1;
  height: 100%;
  max-width: min(100vh, 100%);
  max-height: min(100vw, 100%);
  border: 4px solid black;
}
</style>
