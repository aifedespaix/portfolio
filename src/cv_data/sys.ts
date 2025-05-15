import type { Competence } from '~/types/cv'

export const job = `Assistant technique, support et déploiement`
export const description = `Expérience en tests techniques, configuration d’outils numériques et gestion d’environnements cloud ou locaux. Sérieux, adaptable et efficace sur le terrain.`
export const competences = [
  {
    name: 'Base de Données',
    percentage: 82,
    icon: 'i-mdi:sql-query',
  },
  {
    name: 'Assistance Technique',
    percentage: 85,
    icon: 'i-mdi:computer',
  },
  {
    name: 'Pédagogie',
    percentage: 95,
    icon: 'i-mdi:school',
  },
  {
    name: 'Sécurité Informatique',
    percentage: 75,
    icon: 'i-mdi:shield-check',
  },
  {
    name: 'Gestion de Projet',
    percentage: 88,
    icon: 'i-mdi:clipboard-check',
  },
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
]

export const softwaresAndTechnologies: Competence[] = [
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
    name: 'Python',
    percentage: 80,
    icon: 'i-logos:python',
  },
  {
    name: 'Javascript',
    percentage: 92,
    icon: 'i-logos:javascript',
    moreIcons: ['i-logos:typescript-icon'],
  },
  {
    name: 'PHP',
    percentage: 80,
    icon: 'i-logos:php',
  },
  {
    name: 'PostgreSQL',
    percentage: 80,
    icon: 'i-logos:postgresql',
  },
  {
    name: 'Git',
    percentage: 85,
    icon: 'i-logos:git',
  },
]
