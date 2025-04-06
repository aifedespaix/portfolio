import type { GoldAward } from '~/types/info-gold'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface Company {
  id: string
  name: string
  location: string
  description: string
  work: string
  workDescription: string
  icon: string
  competencies: {
    name: string
    icon: string
  }[]
  date: {
    start: string
    end?: string
  }
  urls:
  {
    name: string
    url: string
    icon?: string
  }[]

  logo: {
    path: string
    transparent: boolean
    classes?: string[]
  }
  infoGold?: GoldAward
  actual?: boolean
}

export const useCompanyStore = defineStore('company', () => {
  const teliae = {
    name: 'stores.company.teliae.name',
    location: 'stores.company.teliae.location',
    description: 'stores.company.teliae.description',
    urls: [
      {
        name: 'stores.company.teliae.url.name',
        url: 'https://www.teliae.fr',
      },
    ],
    logo: {
      path: '/assets/companies/teliae-logo',
      transparent: true,
      classes: ['bg-light-500 dark:bg-light-800'],
    },
  }

  const aife = {
    name: 'stores.company.aife.name',
    location: 'stores.company.aife.location',
    description: 'stores.company.aife.description',
    logo: {
      path: '/assets/companies/aife-logo',
      transparent: true,
    },
  }

  const list: Company[] = [
    {
      id: 'az-network',
      name: 'stores.company.az-network.name',
      location: 'stores.company.az-network.location',
      description: 'stores.company.az-network.description',
      work: 'stores.company.az-network.work',
      workDescription: 'stores.company.az-network.workDescription',
      icon: 'i-mdi:web',
      competencies: [
        { name: 'stores.company.az-network.competencies.web', icon: 'i-mdi:web' },
        { name: 'stores.company.az-network.competencies.database', icon: 'i-mdi:database' },
        { name: 'stores.company.az-network.competencies.regex', icon: 'i-mdi:regex' },
      ],
      date: { start: '2015' },
      urls: [
        { name: 'stores.company.website.name', url: 'https://www.aznetwork.eu' },
      ],
      logo: { 
        path: '/assets/companies/az_network-logo', 
        transparent: true,
        classes: ['bg-light-500 dark:bg-light-800']
      },
      infoGold: {
        value: {
          qte: 4,
          suffix: 'stores.company.az-network.info-gold.suffix',
        },
        name: 'stores.company.az-network.info-gold.name',
      },
    },
    {
      id: 'teliae',
      ...teliae,
      urls: [
        { name: 'stores.company.website.name', url: 'https://www.teliae.fr' },
      ],
      work: 'stores.company.teliae-1.work',
      workDescription: 'stores.company.teliae-1.workDescription',
      icon: 'i-mdi:bug',
      competencies: [
        { name: 'stores.company.teliae-1.competencies.web', icon: 'i-mdi:web' },
        { name: 'stores.company.teliae-1.competencies.language_php', icon: 'i-mdi:language-php' },
        { name: 'stores.company.teliae-1.competencies.account_group', icon: 'i-mdi:account-group' },
      ],
      date: { start: '2016' },
      infoGold: {
        value: {
          qte: 3,
          suffix: 'stores.company.teliae-1.info-gold.suffix',
        },
        name: 'stores.company.teliae-1.info-gold.name',
      },
    },
    {
      id: 'teliae-2',
      ...teliae,
      urls: [
        { name: 'stores.company.website.name', url: 'https://www.teliae.fr' },
      ],
      work: 'stores.company.teliae-2.work',
      workDescription: 'stores.company.teliae-2.workDescription',
      icon: 'i-mdi:design',
      competencies: [
        { name: 'stores.company.teliae-2.competencies.web', icon: 'i-mdi:web' },
        { name: 'stores.company.teliae-2.competencies.palette', icon: 'i-mdi:palette' },
        { name: 'stores.company.teliae-2.competencies.account_group', icon: 'i-mdi:account-group' },
      ],
      date: { start: '2016', end: '2019' },
      infoGold: {
        value: {
          qte: 3,
          suffix: 'stores.company.teliae-2.info-gold.suffix',
        },
        name: 'stores.company.teliae-2.info-gold.name',
      },
    },
    {
      id: 'aife',
      ...aife,
      work: 'stores.company.aife-1.work',
      workDescription: 'stores.company.aife-1.workDescription',
      icon: 'i-mdi:video-check',
      competencies: [
        { name: 'stores.company.aife-1.competencies.video', icon: 'i-mdi:video' },
        { name: 'stores.company.aife-1.competencies.speak', icon: 'i-mdi:speak' },
        { name: 'stores.company.aife-1.competencies.teach_poll', icon: 'i-mdi:teach-poll' },
      ],
      date: { start: '2019', end: 'Aujourd\'hui' },
      infoGold: {
        value: {
          qte: new Date().getFullYear() - 2019,
          suffix: 'stores.company.aife-1.info-gold.suffix',
        },
        name: 'stores.company.aife-1.info-gold.name',
      },
      urls: [
        { name: 'stores.company.website.name', url: 'https://aife.io' },
        { name: 'stores.company.website.youtube', url: 'https://www.youtube.com/@aife', icon: 'i-mdi:youtube' },
        { name: 'stores.company.website.twitch', url: 'https://www.twitch.tv/aife', icon: 'i-mdi:twitch' },
      ],
    },
    {
      id: 'aife-2',
      ...aife,
      work: 'stores.company.aife-2.work',
      workDescription: 'stores.company.aife-2.workDescription',
      icon: 'i-mdi:important-devices',
      competencies: [
        { name: 'stores.company.aife-2.competencies.web', icon: 'i-mdi:web' },
        { name: 'stores.company.aife-2.competencies.palette', icon: 'i-mdi:palette' },
        { name: 'stores.company.aife-2.competencies.content_copy', icon: 'i-mdi:content-copy' },
      ],
      date: { start: '2019', end: 'Aujourd\'hui' },
      infoGold: {
        value: {
          qte: new Date().getFullYear() - 2019,
          suffix: 'stores.company.aife-2.info-gold.suffix',
        },
        name: 'stores.company.aife-2.info-gold.name',
      },
      urls: [
        { name: 'stores.company.website.name', url: '/' },
      ],
    },
  ].reverse()

  return {
    list,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCompanyStore as any, import.meta.hot))
