import type { Project } from '~/types/project'

export const mapEducationData: Project = {
  id: 'map-education',
  name: 'Carte Éducative',
  shortDescription: `Une Carte Interactive d'un établissement associatif.`,
  description: `Une Carte Interactive présentant des informations imagées sur l'organisation d'un établissement.`,
  image: 'map-education',
  icon: 'i-mdi:map-marker-multiple',
  technologies: [
    {
      name: 'Vue3',
      url: 'https://vuejs.org/',
    },
    {
      name: 'Leaflet',
      url: 'https://leafletjs.com/',
    },
    {
      name: 'Wordpress',
      url: 'https://wordpress.org/',
    },
  ],
  explains: [
    {
      image: 'map-education',
      title: 'Fonctionnalité de recherche',
      description: `Une des principales fonctionnalité est la recherche de point d'intérêt via une saisie de texte. Pour cela, j'utilise Fuse.js qui est un moteur de recherche très performant et rapide, il gère par exemple les mots partiels.`,
    },
    {
      image: 'map-education-detail',
      title: 'Fonctionnalité de filtrage',
      description: `Par soucis de lisibilité et de performances, il faut limiter le nombre d'éléments affichés sur la carte. Pour cela, j'utilise un filtre qui permet de nefficher que les points d'intérêt correspondant à la recherche du joueur.`,
    },
  ],
  difficulties: [
    'Il y a énormément de données à afficher sur la carte, il faut donc gérer les performances.',
    `La gestion des écrans de différentes tailles, l'ergonomie et l'UX est compliquée car une carte n'est pas un élément visuel habituel à gérer pour moi.`,
    `La création de la base de la carte de base à dû demander une découpe, à chaque niveau de zoom d'une image gigantesque. Il m'a fallu développer un algorithme pour gérer cette découpe et optimiser le temps de chargement.`,
  ],
}
