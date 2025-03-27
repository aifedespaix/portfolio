import type { Project } from '~/types/project'

export const mapEducationData: Project = {
  id: 'map-education',
  name: 'Carte Éducative',
  shortDescription: `Une Carte Interactive d'un établissement associatif.`,
  description: `Une Carte Interactive présentant des informations imagées sur l'organisation d'un établissement. La carte est accessible via un site WordPress, elle est à destination des visiteurs, principalement des plus jeunes. L'interface doit être simple et ergonomique sur mobile, il faut également intégrer une seconde carte pour détailler un zoom sur le lieu.`,
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
      title: 'Carte Générale',
      description: `La carte générale est une carte classique, elle permet de visualiser l'ensemble des points d'intérêt autour de l'établissement. Elle met en avant des lieux avec une description textuelle.`,
    },
    {
      image: 'map-education-detail',
      title: 'Carte de la ferme',
      description: `Seconde carte, elle permet de zoomer sur le lieu et de visualiser les points d'intérêt autour de la ferme. Les différents points sont accessible via la carte ou par une liste déroulante sous forme de boutons.`,
    },
  ],
  difficulties: [
    `L'interface était difficile à penser à cause des deux cartes qui se chevauchent sur le même espace.`,
    `La gestion sur mobile ainsi qu'écran large demande une adaptation particulière compte tenu de la quantité d'informations textuelles à afficher.`,
    `L'import via WordPress m'a demandé de maîtriser le système de plugins ainsi que la gestion des assets (javascript, css, images, etc.) pour conserver une vitesse de chargement optimale.`,
  ],
}
