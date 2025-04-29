import type { Competence, CV, Experience } from '~/types/cv'
import { acceptHMRUpdate, defineStore } from 'pinia'

const contact = [
  {
    icon: 'i-mdi:phone',
    label: 'Phone',
    value: '+33 6 40 60 57 18',
  },
  {
    icon: 'i-mdi:email',
    label: 'Email',
    value: 'joantassel.dev@gmail.com',
  },
  {
    icon: 'i-mdi:web',
    label: 'Portfolio',
    value: 'portfolio.aife.io',
  },
  {
    icon: 'i-mdi:map-marker',
    label: 'Adresse',
    value: 'Alençon - Normandie, France',
  },
  {
    icon: 'i-mdi:car',
    label: 'Véhiculé',
    value: 'Permis B - Véhiculé',
  },
]

const languages = [
  {
    label: 'Français',
    value: 'Natif',
  },
  {
    label: 'Anglais',
    value: 'B2',
  },
]

const competences = [
  {
    name: 'Développement Front',
    percentage: 90,
    icon: 'i-mdi:camera-front',
  },
  {
    name: 'Développement Back',
    percentage: 82,
    icon: 'i-mdi:backup',
  },
  {
    name: 'Base de Données',
    percentage: 82,
    icon: 'i-mdi:sql-query',
  },
  {
    name: 'Pédagogie',
    percentage: 95,
    icon: 'i-mdi:school',
  },
  {
    name: 'Animation',
    percentage: 87,
    icon: 'i-mdi:microphone',
  },
  {
    name: 'Architecture de Projets',
    percentage: 80,
    icon: 'i-mdi:archive-cog',
  },
  {
    name: 'UI/UX',
    percentage: 85,
    icon: 'i-mdi:code',
  },
  {
    name: 'Référencement Web',
    percentage: 90,
    icon: 'i-mdi:web',
  },
  {
    name: 'Montage Vidéo',
    percentage: 95,
    icon: 'i-mdi:video',
  },
]

const softwaresAndTechnologies: Competence[] = [
  {
    name: 'Javascript',
    percentage: 92,
    icon: 'i-logos:javascript',
    moreIcons: ['i-logos:typescript-icon'],
  },
  {
    name: 'Vue.js',
    percentage: 88,
    icon: 'i-logos:vue',
  },
  {
    name: 'CSS',
    percentage: 90,
    icon: 'i-logos:css-3',
  },
  {
    name: 'NestJS',
    percentage: 93,
    icon: 'i-logos:nestjs',
  },
  {
    name: 'PHP',
    percentage: 80,
    icon: 'i-logos:php',
  },
  {
    name: 'Wordpress',
    percentage: 78,
    icon: 'i-logos:wordpress',
  },
  {
    name: 'Linux',
    percentage: 90,
    icon: 'i-logos:linux-tux',
  },
  {
    name: 'Docker',
    percentage: 86,
    icon: 'i-logos:docker',
  },
  {
    name: 'Git',
    percentage: 85,
    icon: 'i-logos:git',
  },
]

export const useCVStore = defineStore('cv', () => {
  const studyStore = useStudyStore()
  const companyStore = useCompanyStore()
  const experiences: Experience[] = Object.values(
    companyStore.list.reduce((acc, company) => {
      const baseId = company.id.split('-')[0]

      if (!acc[baseId]) {
        acc[baseId] = {
          company: company.name,
          city: company.location,
          job: company.work,
          missions: [],
          startDate: company.date.start,
          endDate: company.date.end,
        }
      }

      // Concatène les missions
      acc[baseId].missions.push({
        name: company.work,
        actions: company.missions,
      })

      // Met à jour la date de début la plus ancienne
      if (new Date(company.date.start) < new Date(acc[baseId].startDate)) {
        acc[baseId].startDate = company.date.start
      }

      // Met à jour la date de fin la plus récente (si définie)
      if (
        company.date.end
        && (!acc[baseId].endDate || new Date(company.date.end) > new Date(acc[baseId].endDate))
      ) {
        acc[baseId].endDate = company.date.end
      }

      return acc
    }, {} as Record<string, Experience>),
  )
  const passions: string[] = [
    'Cuisine',
    'Randonnée',
    'Jeux vidéo',
    'Président d’une association de médiation par l’animal',
  ]
  const cv: CV = {
    contact: {
      title: 'Contact',
      items: contact,
    },
    languages: {
      title: 'Langues',
      items: languages,
    },
    formations: {
      title: 'Formations',
      items: studyStore.list.map(study => ({
        school: study.school,
        diploma: study.diploma,
        startYear: study.date.start,
        endYear: study.date.end,
        city: study.location,
      })),
    },
    competences: {
      title: 'Compétences',
      items: competences,
    },
    header: {
      name: 'Joan TASSEL',
      job: 'Développeur d\'Applications Web',
      description: 'Développeur web et créateur de contenus, je conçois des outils numériques interactifs pensés pour sensibiliser, accompagner et éveiller la curiosité.',
    },
    experiences: {
      title: 'Expériences',
      items: experiences,
    },
    softwaresAndTechnologies: {
      title: 'Technologies',
      items: softwaresAndTechnologies,
    },
    passions: {
      title: `Centres d'intérêt`,
      items: passions,
    },
  }

  return { cv }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCVStore as any, import.meta.hot))
