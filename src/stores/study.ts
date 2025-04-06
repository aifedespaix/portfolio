import type { I18nKey } from '~/types/i18n'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface Study {
  id: string
  school: I18nKey
  location: I18nKey
  diploma: I18nKey
  icon: string
  lvl?: number
  description: I18nKey
  competencies: {
    id: string
    name: I18nKey
    icon: string
  }[]
  date: {
    start: I18nKey
    end: I18nKey
  }
  url: string
  logo: {
    path: string
    transparent: boolean
    classes?: string[]
  }
}

export const useStudyStore = defineStore('study', () => {
  const list: Study[] = [
    {
      id: 'iut-caen',
      icon: 'i-mdi:number-two-circle',
      lvl: 2,
      school: 'stores.study.iut-caen.school',
      location: 'stores.study.iut-caen.location',
      diploma: 'stores.study.iut-caen.diploma',
      description: 'stores.study.iut-caen.description',
      competencies: [
        { id: 'stores.study.iut-caen.competencies.web', name: 'stores.study.iut-caen.competencies.web', icon: 'i-mdi:web' },
        { id: 'stores.study.iut-caen.competencies.database', name: 'stores.study.iut-caen.competencies.database', icon: 'i-mdi:database' },
        { id: 'stores.study.iut-caen.competencies.server', name: 'stores.study.iut-caen.competencies.server', icon: 'i-mdi:server' },
      ],
      date: {
        start: '2013',
        end: '2015',
      },
      url: 'https://www.unicaen.fr/',
      logo: { path: '/assets/studies/logo-iut-caen', transparent: true, classes: ['rounded-none'] },
    },
    {
      id: 'fac-lyon',
      lvl: 3,
      icon: 'i-mdi:number-three-circle',
      school: 'stores.study.fac-lyon.school',
      location: 'stores.study.fac-lyon.location',
      diploma: 'stores.study.fac-lyon.diploma',
      description: 'stores.study.fac-lyon.description',
      competencies: [
        { id: 'stores.study.fac-lyon.competencies.web', name: 'stores.study.fac-lyon.competencies.web', icon: 'i-mdi:web' },
        { id: 'stores.study.fac-lyon.competencies.palette', name: 'stores.study.fac-lyon.competencies.palette', icon: 'i-mdi:palette' },
        { id: 'stores.study.fac-lyon.competencies.ab_testing', name: 'stores.study.fac-lyon.competencies.ab_testing', icon: 'i-mdi:ab-testing' },
      ],
      date: {
        start: '2015',
        end: '2016',
      },
      url: 'https://www.univ-lyon1.fr',
      logo: { path: '/assets/studies/logo-fac-lyon', transparent: true, classes: ['bg-white'] },
    },
    {
      id: 'institut-g4',
      lvl: 5,
      icon: 'i-mdi:number-five-circle',
      school: 'stores.study.institut-g4.school',
      location: 'stores.study.institut-g4.location',
      diploma: 'stores.study.institut-g4.diploma',
      description: 'stores.study.institut-g4.description',
      competencies: [
        { id: 'stores.study.institut-g4.competencies.web', name: 'stores.study.institut-g4.competencies.web', icon: 'i-mdi:web' },
        { id: 'stores.study.institut-g4.competencies.work', name: 'stores.study.institut-g4.competencies.work', icon: 'i-mdi:work' },
        { id: 'stores.study.institut-g4.competencies.school', name: 'stores.study.institut-g4.competencies.school', icon: 'i-mdi:school' },
      ],
      date: {
        start: '2016',
        end: '2020',
      },
      url: 'https://institut-g4.fr/',
      logo: { path: '/assets/studies/logo-institut_g4', transparent: true },
    },
  ].reverse()

  return {
    list,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStudyStore as any, import.meta.hot))
