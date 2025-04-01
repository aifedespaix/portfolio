<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'
import { loadLanguageAsync } from '~/modules/i18n'

const { locale, t } = useI18n()

useHeadTag({
  title: t('title'),
  description: t('description'),
  type: 'website',
})

async function changeLocale(event: Event) {
  const target = event.target as HTMLSelectElement
  await loadLanguageAsync(target.value)
  locale.value = target.value
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
    <TitleMain>{{ t('title') }}</TitleMain>

    <Card>
      <title-h2>{{ t('theme.title') }}</title-h2>
      <div class="flex items-center gap-2">
        <ButtonToggleTheme :label="t('theme.label')" />
        <Button @click="toggleTheme">
          {{ t('theme.description') }}
        </Button>
      </div>
    </Card>

    <Card>
      <title-h2>{{ t('language.title') }}</title-h2>
      <select class="p-2" :value="locale" @change="changeLocale">
        <option v-for="loc in locales" :key="loc.value" :value="loc.value">
          {{ loc.label }}
        </option>
      </select>
    </Card>
  </Pager>
</template>

<i18n lang="yaml">
  en:
    title: Settings
    description: Settings and personal information.
    theme:
      title: Theme
      label: Theme
      description: Switch the app theme
    language:
      title: Language
  fr:
    title: Paramètres
    description: "Paramètres du site : Couleurs, langue, etc."
    theme:
      title: Thème
      label: Thème
      description: Changer le thème de l'application
    language:
      title: Langue
</i18n>
