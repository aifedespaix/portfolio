import type { CV, Experience } from '~/types/cv'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { competences, description, job, softwaresAndTechnologies } from '~/cv_data/sys'

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
      job,
      description,
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
