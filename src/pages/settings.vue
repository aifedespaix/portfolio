<script setup lang="ts">
import type { Lang } from '~/types/route.type'
import { useHeadTag } from '~/composables/head-tag'

const { locale, t } = useI18n()
const routeMeta = useTypedRouteMeta()
const router = useRouter()

useHeadTag({
  title: computed(() => t('pages.settings.meta.title')),
  description: computed(() => t('pages.settings.meta.description')),
  type: 'website',
})

async function changeLocale(event: Event) {
  const localeName = (event.target as HTMLSelectElement).value as Lang
  const path = routeMeta.otherPaths?.[localeName]
  if (!path) {
    throw new Error(`Path for locale ${localeName} not found`)
  }
  router.push(path)
}

const locales = [
  { label: 'Français', value: 'fr' },
  { label: 'English', value: 'en' },
]

const isDark = useDark()
const toggleDark = useToggle(isDark)
function toggleTheme() {
  toggleDark()
}
</script>

<template>
  <Pager size="small">
    <TitleMain>{{ t('pages.settings.title') }}</TitleMain>

    <Card>
      <title-h2>{{ t('pages.settings.theme.title') }}</title-h2>
      <div class="flex items-center gap-2">
        <ButtonToggleTheme :label="t('pages.settings.theme.label')" />
        <Button @click="toggleTheme">
          {{ t('pages.settings.theme.description') }}
        </Button>
      </div>
    </Card>

    <Card>
      <title-h2>{{ t('pages.settings.language.title') }}</title-h2>

      <select class="p-2" :value="locale" @change="changeLocale">
        <option v-for="loc in locales" :key="loc.value" :value="loc.value">
          {{ loc.label }}
        </option>
      </select>
    </Card>
  </Pager>
</template>
