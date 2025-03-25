<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()
</script>

<template>
  <Pager size="small" class="flex-1 items-center justify-center">
    <div class="text-8xl">
      404
    </div>
    <div class="text-4xl">
      {{ t('not-found') }}
    </div>
    <Button @click="router.back()">
      {{ t('button.back') }}
    </Button>
  </Pager>
</template>
