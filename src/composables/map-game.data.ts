import type { Project } from '~/types/project'

export const mapGameData: Project = {
  id: 'map-game',
  name: 'Carte Interactive',
  shortDescription: `Une Carte Interactive servant de support à un jeu vidéo d'exploration.`,
  description: `Une Carte Interactive servant de support à un jeu vidéo d'exploration. Les enjeux sont de donner des informations rapidement au joueur pour qu'il puisse progresser efficacement. Le format d'une carte était le plus pertinent. Comme c'est un jeu console, l'interface doit être simple et ergonomique sur mobile, avec tout de même une interface adaptée pour les écrans plus larges.`,
  image: 'map-game-sample',
  icon: 'i-mdi:map',
  technologies: [
    {
      name: 'Vue3',
      url: 'https://vuejs.org/',
    },
    {
      name: 'ElementUI',
      url: 'https://element-plus.org/',
    },
    {
      name: 'UnoCSS',
      url: 'https://unocss.dev/',
    },
    {
      name: 'Leaflet',
      url: 'https://leafletjs.com/',
    },
    {
      name: 'Firebase',
      url: 'https://firebase.google.com/',
    },
    {
      name: 'Fuse.js',
      url: 'https://fusejs.io/',
    },
  ],
  explains: [
    {
      image: 'map-game-search',
      title: 'Fonctionnalité de recherche',
      description: `Une des principales fonctionnalité est la recherche de point d'intérêt via une saisie de texte. Pour cela, j'utilise Fuse.js qui est un moteur de recherche très performant et rapide, il gère par exemple les mots partiels.`,
    },
    {
      image: 'map-game-filter',
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
