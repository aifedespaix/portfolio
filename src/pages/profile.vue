<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Pager>
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
