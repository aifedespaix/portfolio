<script setup lang="ts">
import { loadLanguageAsync } from '~/modules/i18n'

const { locale, t } = useI18n()

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
  <Pager>
    <TitleMain>{{ t('settings.title') }}</TitleMain>

    <Card>
      <title-h2>{{ t('settings.theme.title') }}</title-h2>
      <div class="flex items-center gap-2">
        <ButtonToggleTheme :label="t('settings.theme.label')" />
        <button @click="toggleTheme">
          {{ t('settings.theme.description') }}
        </button>
      </div>
    </Card>

    <Card>
      <title-h2>{{ t('settings.language.title') }}</title-h2>
      <select class="p-2" :value="locale" @change="changeLocale">
        <option v-for="loc in locales" :key="loc.value" :value="loc.value">
          {{ loc.label }}
        </option>
      </select>
    </Card>
  </Pager>
</template>
