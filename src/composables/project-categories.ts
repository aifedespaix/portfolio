import type { I18nKey } from '~/types/i18n'

export type ProjectCategory = 'game' | 'tool' | 'education'

export interface ProjectCategoryMeta {
  id: ProjectCategory
  labelKey: I18nKey
  icon: string
  textClass: string
  chipClass: string
}

export const PROJECT_CATEGORIES: ProjectCategoryMeta[] = [
  {
    id: 'game',
    labelKey: 'stores.projectCategories.game',
    icon: 'i-mdi:gamepad-variant',
    textClass: 'text-violet-600 dark:text-violet-400',
    chipClass: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  },
  {
    id: 'tool',
    labelKey: 'stores.projectCategories.tool',
    icon: 'i-mdi:tools',
    textClass: 'text-teal-700 dark:text-teal-400',
    chipClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  },
  {
    id: 'education',
    labelKey: 'stores.projectCategories.education',
    icon: 'i-mdi:school',
    textClass: 'text-rose-700 dark:text-rose-400',
    chipClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  },
]

export function getProjectCategory(id: ProjectCategory): ProjectCategoryMeta {
  const category = PROJECT_CATEGORIES.find(category => category.id === id)
  if (!category) {
    throw new Error(`Unknown project category: ${id}`)
  }
  return category
}
