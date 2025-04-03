<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'

const { t } = useI18n()
const router = useRouter()

useHeadTag({
  title: '404 Page non trouvée',
  description: `Désolé, cette page n'existe pas.`,
  type: 'website',
})
</script>

<template>
  <Pager size="small" class="flex-1 items-center justify-center">
    <div class="text-8xl">
      404
    </div>
    <div class="text-4xl">
      {{ t('pages.not-found.title') }}
    </div>
    <Button @click="router.back()">
      {{ t('pages.not-found.buttons.back') }}
    </Button>
  </Pager>
</template>
