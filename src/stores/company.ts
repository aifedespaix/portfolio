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
    src: string
    classes?: string[]
  }
  infoGold?: GoldAward
  actual?: boolean
}

export const useCompanyStore = defineStore('company', () => {
  const teliae = {
    name: 'Teliae',
    location: 'Taluyers, France (69)',
    description: 'Teliae est une entreprise proposant des solutions logistiques pour les transporteurs (Transport Management System).',
    urls: [
      {
        name: 'Site de l\'entreprise',
        url: 'https://www.teliae.fr',
      },
    ],
    logo: {
      src: '/assets/companies/teliae-logo.webp',
      classes: ['bg-light-500 dark:bg-light-800'],
    },
  }

  const aife = {
    name: 'Aife',
    location: 'Alençon, France (61)',
    description: 'Aife est le nom que j\'ai choisi pour mon entreprise en tant que freelance. J\'y regroupe mon travail en tant que développeur web mais également mes activités en tant que créateur de contenu.',
    logo: {
      src: '/assets/companies/aife-logo.webp',
    },
  }

  const list: Company[] = [
    {
      id: 'az-network',
      name: 'AZ Network',
      location: 'Alençon, France (61)',
      description: 'AZ Network est une entreprise travaillant sur la mise en place et la maintenance de solutions CRM et ERP.',
      work: 'Stage Développeur Web',
      icon: 'i-mdi:web',
      workDescription: 'J\'ai travaillé sur la mise a jour de l\'ERP Génerix chez différents client. J\'ai dû faire de la recherche de données via requêtes SQL, mise à jour de fichiers pour adapter les mises à jours spécifiques via des expressions régulières.',
      competencies: [
        {
          name: 'Développement Web',
          icon: 'i-mdi:web',
        },
        {
          name: 'Base de données',
          icon: 'i-mdi:database',
        },
        {
          name: 'Expressions Régulières',
          icon: 'i-mdi:regex',
        },
      ],
      date: {
        start: '2015',
      },
      urls: [
        {
          name: 'Site de l\'entreprise',
          url: 'https://www.aznetwork.eu',
        },
      ],
      logo: {
        src: '/assets/companies/az_network-logo.webp',
        classes: ['bg-light-500 dark:bg-light-800'],
      },
      infoGold: {
        value: {
          qte: 4,
          suffix: 'Mois',
        },
        name: 'Stage Développeur Web',
      },
    },
    {
      id: 'teliae',
      ...teliae,
      work: 'Stage Développeur Web',
      workDescription: 'Je commencé dans cette entreprise par un stage. Mon rôle consistait à maintenir et ajouter des fonctionnalités sur une application de gestion de parcours de livraisons.',
      icon: 'i-mdi:bug',
      competencies: [
        {
          name: 'Développement Web',
          icon: 'i-mdi:web',
        },
        {
          name: 'Programmation Back End',
          icon: 'i-mdi:language-php',
        },
        {
          name: 'Suivi client',
          icon: 'i-mdi:account-group',
        },
      ],
      date: {
        start: '2016',
      },
      infoGold: {
        value: {
          qte: 3,
          suffix: 'Mois',
        },
        name: 'Stage Développeur Web',
      },
    },
    {
      id: 'teliae-2',
      ...teliae,
      work: 'Alternant Développeur Web',
      workDescription: 'J\'ai eu la chance d\'être affecté à de multiples missions à ambitions variables. Parmi mes plus grosses missions, j\'ai du repenser l\'interface visuelle d\'une application ancienne. J\'ai dû mettre en place une solution pour adapter l\'interface aux nouveaux standards d\'accessibilité, tout en conservant une interface simple et intuitive. Le tout en accompagnants les utilisateurs dans l\'évolution de leur outil.',
      icon: 'i-mdi:design',
      competencies: [
        {
          name: 'Développement Web',
          icon: 'i-mdi:web',
        },
        {
          name: 'Design UX',
          icon: 'i-mdi:palette',
        },
        {
          name: 'Suivi client',
          icon: 'i-mdi:account-group',
        },
      ],
      date: {
        start: '2016',
        end: '2019',
      },
      infoGold: {
        value: {
          qte: 3,
          suffix: 'ans',
        },
        name: 'Alternant Développeur Web Full Stack',
      },
    },
    {
      id: 'aife',
      ...aife,
      work: 'Créateur de contenu',
      workDescription: 'J\'ai commencé à créer des vidéos à destination de Youtube. Le concept se base sur l\'explication et la vulgarisation de sujets techniques complexes dans les jeux vidéos. Principalement les Glitchs et le Speedrun. Les vidéos ont une volonté première de faire comprendre des mécaniques complexes dans un langage accessible pour tous. J\'ai pu atteindre plus de 100 000 abonnées ainsi que des millions de vues. Je me suis diversifié sur la réalisation de vidéos en direct et de streamings.',
      icon: 'i-mdi:video-check',
      competencies: [
        {
          name: 'Montage Vidéo',
          icon: 'i-mdi:video',
        },
        {
          name: 'Animation de stream',
          icon: 'i-mdi:speak',
        },
        {
          name: 'Vulgarisation',
          icon: 'i-mdi:teach-poll',
        },
      ],
      date: {
        start: '2019',
        end: 'Aujourd\'hui',
      },
      infoGold: {
        value: {
          qte: new Date().getFullYear() - 2019,
          suffix: 'ans',
        },
        name: 'Créateur de contenu',
      },
      urls: [
        {
          name: 'Site de l\'entreprise',
          url: 'https://aife.io',
        },
        {
          name: 'Youtube',
          url: 'https://www.youtube.com/@aife',
          icon: 'i-mdi:youtube',
        },
        {
          name: 'Twitch',
          url: 'https://www.twitch.tv/aife',
          icon: 'i-mdi:twitch',
        },
      ],
    },
    {
      id: 'aife-2',
      ...aife,
      work: 'Développeur Web',
      icon: 'i-mdi:important-devices',
      workDescription: 'Mes activités sont diverses, que ce soit de la création de sites vitrines, de la maintenance de sites existants, de l\'intégration de contenu. Mes compétences en développement, en design, et en création de contenu me permettent de répondre à un large panel de demandes. Je profite de mes compétences pour développer des outils variés pour faciliter mon travail de créateur de contenu.',
      competencies: [
        {
          name: 'Développement Web',
          icon: 'i-mdi:web',
        },
        {
          name: 'Design UX',
          icon: 'i-mdi:palette',
        },
        {
          name: 'Intégration de contenu',
          icon: 'i-mdi:content-copy',
        },
      ],
      date: {
        start: '2019',
        end: 'Aujourd\'hui',
      },
      infoGold: {
        value: {
          qte: new Date().getFullYear() - 2019,
          suffix: 'ans',
        },
        name: 'Développeur Web Full Stack',
      },
      urls: [
        {
          name: 'Site de l\'entreprise',
          url: '/',
        },
      ],
    },
  ].reverse()

  return {
    list,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCompanyStore as any, import.meta.hot))
