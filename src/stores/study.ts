import { acceptHMRUpdate, defineStore } from 'pinia'

export interface Study {
  id: string
  school: ComputedRef<string> | string
  location: ComputedRef<string> | string
  diploma: ComputedRef<string> | string
  icon: string
  lvl?: number
  description: ComputedRef<string> | string
  competencies: {
    id: string
    name: ComputedRef<string> | string
    icon: string
  }[]
  date: {
    start: ComputedRef<string> | string
    end: ComputedRef<string> | string
  }
  url: string
  logo: {
    src: string
    classes?: string[]
  }
}

export const useStudyStore = defineStore('study', () => {
  const { t } = useI18n({})

  const list: Study[] = [
    {
      id: 'iut-caen',
      icon: 'i-mdi:number-two-circle',
      lvl: 2,
      school: computed(() => t('iut-caen.school')),
      location: computed(() => t('iut-caen.location')),
      diploma: computed(() => t('iut-caen.diploma')),
      description: computed(() => t('iut-caen.description')),
      competencies: [
        { id: 'iut-caen.competencies.web', name: computed(() => t('iut-caen.competencies.web')), icon: 'i-mdi:web' },
        { id: 'iut-caen.competencies.database', name: computed(() => t('iut-caen.competencies.database')), icon: 'i-mdi:database' },
        { id: 'iut-caen.competencies.server', name: computed(() => t('iut-caen.competencies.server')), icon: 'i-mdi:server' },
      ],
      date: {
        start: computed(() => '2013'),
        end: computed(() => '2015'),
      },
      url: 'https://www.unicaen.fr/',
      logo: { src: '/assets/studies/logo-iut-caen.webp', classes: ['rounded-none'] },
    },
    {
      id: 'fac-lyon',
      lvl: 3,
      icon: 'i-mdi:number-three-circle',
      school: computed(() => t('fac-lyon.school')),
      location: computed(() => t('fac-lyon.location')),
      diploma: computed(() => t('fac-lyon.diploma')),
      description: computed(() => t('fac-lyon.description')),
      competencies: [
        { id: 'fac-lyon.competencies.web', name: computed(() => t('fac-lyon.competencies.web')), icon: 'i-mdi:web' },
        { id: 'fac-lyon.competencies.palette', name: computed(() => t('fac-lyon.competencies.palette')), icon: 'i-mdi:palette' },
        { id: 'fac-lyon.competencies.ab_testing', name: computed(() => t('fac-lyon.competencies.ab_testing')), icon: 'i-mdi:ab-testing' },
      ],
      date: {
        start: computed(() => '2015'),
        end: computed(() => '2016'),
      },
      url: 'https://www.univ-lyon1.fr',
      logo: { src: '/assets/studies/logo-fac-lyon.webp', classes: ['bg-white'] },
    },
    {
      id: 'institut-g4',
      lvl: 5,
      icon: 'i-mdi:number-five-circle',
      school: computed(() => t('institut-g4.school')),
      location: computed(() => t('institut-g4.location')),
      diploma: computed(() => t('institut-g4.diploma')),
      description: computed(() => t('institut-g4.description')),
      competencies: [
        { id: 'institut-g4.competencies.web', name: computed(() => t('institut-g4.competencies.web')), icon: 'i-mdi:web' },
        { id: 'institut-g4.competencies.work', name: computed(() => t('institut-g4.competencies.work')), icon: 'i-mdi:work' },
        { id: 'institut-g4.competencies.school', name: computed(() => t('institut-g4.competencies.school')), icon: 'i-mdi:school' },
      ],
      date: {
        start: computed(() => '2016'),
        end: computed(() => '2020'),
      },
      url: 'https://institut-g4.fr/',
      logo: { src: '/assets/studies/logo-institut_g4.webp' },
    },
  ].reverse()

  return {
    list,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStudyStore as any, import.meta.hot))
