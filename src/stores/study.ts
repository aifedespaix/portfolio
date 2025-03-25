import { acceptHMRUpdate, defineStore } from 'pinia'

export interface Study {
  id: string
  school: string
  location: string
  diploma: string
  icon: string
  lvl?: number
  description: string
  competencies: {
    name: string
    icon: string
  }[]
  date: {
    start: string
    end: string
  }
  url: string
  logo: {
    src: string
    classes?: string[]
  }
}

export const useStudyStore = defineStore('study', () => {
  const list: Study[] = [
    {
      id: 'iut-caen',
      school: 'Université de Caen',
      location: 'Caen, France',
      diploma: 'DUT Informatique',
      lvl: 2,
      icon: 'i-mdi:number-two-circle',
      description: 'Formation en informatique générale, j\'ai pu découvrir les bases de l\'informatique et de la programmation. Cette formation m\'a permis de valider mon intérêt pour le développement web tout en m\'apportant un bagage solide dans les sciences de l\'informatique.',
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
          name: 'Administration système et réseaux',
          icon: 'i-mdi:server',
        },
      ],
      date: {
        start: '2013',
        end: '2015',
      },
      url: 'https://www.unicaen.fr/',
      logo: {
        src: '/assets/studies/logo-iut-caen.webp',
        classes: ['rounded-none'],
      },
    },
    {
      id: 'fac-lyon',
      school: 'Université Claude Bernard Lyon 1',
      location: 'Lyon, France',
      lvl: 3,
      icon: 'i-mdi:number-three-circle',
      diploma: 'Licence Informatique',
      description: 'Cette année fut un tournant pour moi et la vision du métier que je souhaitais exercer. J\'ai été au bout de cette année sans la valider. J\'ai tout de même acquis de fortes connaissances en algorithmie et en UX design.',
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
          name: 'Algorithmie',
          icon: 'i-mdi:ab-testing',
        },
      ],
      date: {
        start: '2015',
        end: '2016',
      },
      url: 'https://www.univ-lyon1.fr',
      logo: {
        src: '/assets/studies/logo-fac-lyon.webp',
        classes: ['bg-white'],
      },
    },
    {
      id: 'institut-g4',
      school: 'Institut G4',
      location: 'Lyon, France',
      diploma: 'Chef de projet Système d\'Information',
      lvl: 5,
      icon: 'i-mdi:number-five-circle',
      description: `Je me suis orienté dans le domaine de la gestion de projet informatique.Ayant des connaissances variées et étant intéressé sur tous les aspects de la réalisation de projets, il est naturel pour moi de réfléchir et concevoir des solutions optimales que ce soit organisationnel ou en accord avec les contraintes techniques. J'ai également participé à la formation d'élèves sur mes domaines de compétence. La transmission du savoir est une notion importante pour moi.`,
      competencies: [
        {
          name: 'Développement Web',
          icon: 'i-mdi:web',
        },
        {
          name: 'Gestion de projet',
          icon: 'i-mdi:work',
        },
        {
          name: 'Formation',
          icon: 'i-mdi:school',
        },
      ],
      date: {
        start: '2016',
        end: '2020',
      },
      url: 'https://institut-g4.fr/',
      logo: {
        src: '/assets/studies/logo-institut_g4.webp',
      },
    },
  ].reverse()

  return {
    list,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStudyStore as any, import.meta.hot))
