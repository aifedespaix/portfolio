import type { ProjectCategory } from '~/composables/project-categories'
import type { Project } from '~/types/project.type'

export function matchesProjectFilter(
  project: Pick<Project, 'category'>,
  translatedName: string,
  translatedShortDescription: string,
  selectedCategories: ProjectCategory[],
  query: string,
): boolean {
  const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category)
  const normalizedQuery = query.trim().toLowerCase()
  const matchesSearch = normalizedQuery === ''
    || `${translatedName} ${translatedShortDescription}`.toLowerCase().includes(normalizedQuery)
  return matchesCategory && matchesSearch
}
