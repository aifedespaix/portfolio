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
  <Pager size="small">
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
      <div class="text-justify text-sm italic" text="red-700 dark:orange-400">
        Le contenu rédactionnel de l'application n'est pas encore traduit en anglais. N'ayant pas la volonté, actuellement, de travailler avec des professionnels étrangers, je n'ai pas pris le temps de travailler cette traduction. Elle sert simplement d'aperçu de la faisabilité d'une telle traduction.
      </div>
    </Card>
  </Pager>
</template>
