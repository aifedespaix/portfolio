<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="flex items-center justify-center p-4 italic flex-col">
    <div>{{ t('layout.footer.copyright') }} </div>
    <div>&copy; 2024 - {{ new Date().getFullYear() }}</div>
  </footer>
</template>
