<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'

const { t } = useI18n()

useHeadTag({
  title: t('title'),
  description: t('description'),
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

<i18n lang="yaml">
  en:
    title: My profile
    description: Settings and personal information.
    profile:
      myProfile: My profile
      settings: Settings
  fr:
    title: Mon profil
    description: Paramètres et informations personnelles.
    profile:
      myProfile: Mon profil
      settings: Paramètres
</i18n>
