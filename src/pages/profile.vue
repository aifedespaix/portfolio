<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag';

const { t } = useI18n()

useHeadTag({
  title: 'Mon profil',
  description: `Paramètres et informations personnelles.`,
  type: 'website',
})
</script>

<template>
  <Pager size="small">
    <TitleMain>{{ t('profile.myProfile') }}</TitleMain>

    <Card>
      <div class="grid grid-cols-1" md="grid-cols-2">
        <Button to="/settings">
          {{ t('profile.settings') }}
        </Button>
      </div>
    </Card>
  </Pager>
</template>
