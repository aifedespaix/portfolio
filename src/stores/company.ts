import type { GoldAward } from '~/types/info-gold'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface Company {
  id: string
  name: ComputedRef<string> | string
  location: ComputedRef<string> | string
  description: ComputedRef<string> | string
  work: ComputedRef<string> | string
  workDescription: ComputedRef<string> | string
  icon: string
  competencies: {
    name: ComputedRef<string> | string
    icon: string
  }[]
  date: {
    start: string
    end?: string
  }
  urls:
  {
    name: ComputedRef<string> | string
    url: string
    icon?: string
  }[]

  logo: {
    src: string
    classes?: string[]
  }
  infoGold?: GoldAward
  actual?: boolean
}

export const useCompanyStore = defineStore('company', () => {
  const { t } = useI18n({
  })

  const teliae = {
    name: computed(() => t('teliae.name')),
    location: computed(() => t('teliae.location')),
    description: computed(() => t('teliae.description')),
    urls: [
      {
        name: computed(() => t('teliae.url.name')),
        url: 'https://www.teliae.fr',
      },
    ],
    logo: {
      src: '/assets/companies/teliae-logo.webp',
      classes: ['bg-light-500 dark:bg-light-800'],
    },
  }

  const aife = {
    name: computed(() => t('aife.name')),
    location: computed(() => t('aife.location')),
    description: computed(() => t('aife.description')),
    logo: {
      src: '/assets/companies/aife-logo.webp',
    },
  }

  const list: Company[] = [
    {
      id: 'az-network',
      name: computed(() => t('az-network.name')),
      location: computed(() => t('az-network.location')),
      description: computed(() => t('az-network.description')),
      work: computed(() => t('az-network.work')),
      workDescription: computed(() => t('az-network.workDescription')),
      icon: 'i-mdi:web',
      competencies: [
        { name: computed(() => t('az-network.competencies.web')), icon: 'i-mdi:web' },
        { name: computed(() => t('az-network.competencies.database')), icon: 'i-mdi:database' },
        { name: computed(() => t('az-network.competencies.regex')), icon: 'i-mdi:regex' },
      ],
      date: { start: '2015' },
      urls: [
        { name: computed(() => t('website.name')), url: 'https://www.aznetwork.eu' },
      ],
      logo: { src: '/assets/companies/az_network-logo.webp', classes: ['bg-light-500 dark:bg-light-800'] },
      infoGold: {
        value: {
          qte: 4,
          suffix: computed(() => t('az-network.infoGold.suffix')),
        },
        name: computed(() => t('az-network.infoGold.name')),
      },
    },
    {
      id: 'teliae',
      ...teliae,
      urls: [
        { name: computed(() => t('website.name')), url: 'https://www.teliae.fr' },
      ],
      logo: { src: '/assets/companies/teliae-logo.webp', classes: ['bg-light-500 dark:bg-light-800'] },
      work: computed(() => t('teliae-1.work')),
      workDescription: computed(() => t('teliae-1.workDescription')),
      icon: 'i-mdi:bug',
      competencies: [
        { name: computed(() => t('teliae-1.competencies.web')), icon: 'i-mdi:web' },
        { name: computed(() => t('teliae-1.competencies.language_php')), icon: 'i-mdi:language-php' },
        { name: computed(() => t('teliae-1.competencies.account_group')), icon: 'i-mdi:account-group' },
      ],
      date: { start: '2016' },
      infoGold: {
        value: {
          qte: 3,
          suffix: computed(() => t('teliae-1.infoGold.suffix')),
        },
        name: computed(() => t('teliae-1.infoGold.name')),
      },
    },
    {
      id: 'teliae-2',
      ...teliae,
      urls: [
        { name: computed(() => t('website.name')), url: 'https://www.teliae.fr' },
      ],
      logo: { src: '/assets/companies/teliae-logo.webp', classes: ['bg-light-500 dark:bg-light-800'] },
      work: computed(() => t('teliae-2.work')),
      workDescription: computed(() => t('teliae-2.workDescription')),
      icon: 'i-mdi:design',
      competencies: [
        { name: computed(() => t('teliae-2.competencies.web')), icon: 'i-mdi:web' },
        { name: computed(() => t('teliae-2.competencies.palette')), icon: 'i-mdi:palette' },
        { name: computed(() => t('teliae-2.competencies.account_group')), icon: 'i-mdi:account-group' },
      ],
      date: { start: '2016', end: '2019' },
      infoGold: {
        value: {
          qte: 3,
          suffix: computed(() => t('teliae-2.infoGold.suffix')),
        },
        name: computed(() => t('teliae-2.infoGold.name')),
      },
    },
    {
      id: 'aife',
      ...aife,
      work: computed(() => t('aife-1.work')),
      workDescription: computed(() => t('aife-1.workDescription')),
      icon: 'i-mdi:video-check',
      competencies: [
        { name: computed(() => t('aife-1.competencies.video')), icon: 'i-mdi:video' },
        { name: computed(() => t('aife-1.competencies.speak')), icon: 'i-mdi:speak' },
        { name: computed(() => t('aife-1.competencies.teach_poll')), icon: 'i-mdi:teach-poll' },
      ],
      date: { start: '2019', end: 'Aujourd\'hui' },
      infoGold: {
        value: {
          qte: new Date().getFullYear() - 2019,
          suffix: computed(() => t('aife-1.infoGold.suffix')),
        },
        name: computed(() => t('aife-1.infoGold.name')),
      },
      urls: [
        { name: computed(() => t('website.name')), url: 'https://aife.io' },
        { name: 'Youtube', url: 'https://www.youtube.com/@aife', icon: 'i-mdi:youtube' },
        { name: 'Twitch', url: 'https://www.twitch.tv/aife', icon: 'i-mdi:twitch' },
      ],
    },
    {
      id: 'aife-2',
      ...aife,
      work: computed(() => t('aife-2.work')),
      workDescription: computed(() => t('aife-2.workDescription')),
      icon: 'i-mdi:important-devices',
      competencies: [
        { name: computed(() => t('aife-2.competencies.web')), icon: 'i-mdi:web' },
        { name: computed(() => t('aife-2.competencies.palette')), icon: 'i-mdi:palette' },
        { name: computed(() => t('aife-2.competencies.content_copy')), icon: 'i-mdi:content-copy' },
      ],
      date: { start: '2019', end: 'Aujourd\'hui' },
      infoGold: {
        value: {
          qte: new Date().getFullYear() - 2019,
          suffix: computed(() => t('aife-2.infoGold.suffix')),
        },
        name: computed(() => t('aife-2.infoGold.name')),
      },
      urls: [
        { name: computed(() => t('website.name')), url: '/' },
      ],
    },
  ].reverse()

  return {
    list,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCompanyStore as any, import.meta.hot))
