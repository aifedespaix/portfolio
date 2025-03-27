import type { Project } from '~/types/project'

export const miniGamesData: Project = {
  id: 'mini-games',
  name: 'Mini-Jeux',
  shortDescription: `Calendrier de l'Avant sous forme de Mini-Jeux.`,
  description: `Je me suis lancé un défi sur un mois de décembre de développer un calendrier de l'avant sous forme d'un site internet. Chaque jour j'ai développé un mini-jeu en JavaScript, parfois en collaboration avec d'autres personnes et d'ambitions diverses compte tenu du rythme quotidien qu'il fallait respecter. Je vous propose d'en découvrir quelques-uns parmi les 25.`,
  links: [
    {
      name: 'Calendrier de l\'Avant',
      url: 'https://noel.aife.io/',
      icon: 'i-mdi:calendar',
    },
  ],
  image: 'mini-games',
  icon: 'i-mdi:gamepad',
  technologies: [
    {
      name: 'Vue3',
      url: 'https://vuejs.org/',
    },
    {
      name: 'UnoCSS',
      url: 'https://unocss.dev/',
    },
    {
      name: 'Three.js',
      url: 'https://threejs.org/',
    },
    {
      name: 'VueUse',
      url: 'https://vueuse.org/',
    },
  ],
  explains: [
    {
      image: 'mini-games-word',
      title: 'Mots Croisés Simplifiés',
      description: `Le principe de ce mini jeu est de proposer une grille de lettres à remplir. Chaque ligne est associée à une description permettant de découvrir le mot correspondant. Il y a des interactions audio et visuelles pour améliorer l'expérience.`,
    },
    {
      image: 'mini-games-double',
      title: 'Jeu des paires',
      description: `Le principe est simple, il y a une grille d'images dédoublées posées face cachée. Le joueur doit retourner deux images parmi lesquelles une seule est identique. Chaque essai coûte un point, le but est de trouver toutes les paires en un minimum de coups.`,
    },
    {
      image: 'mini-games-enigma',
      title: `L'énigme du Coffre`,
      description: `Un Coffre mystérieux, un code à 3 chiffres à trouver. Chaque bouton donne accès à une image où un indice est caché.`,
    },
    {
      image: 'mini-games-taquin',
      title: 'Jeu du Taquin',
      description: `Le Taquin est un jeu de puzzle classique. Le joueur doit déplacer les tuiles pour reconstituer l'image originale. Le programme commence par prendre une image et la découpe en X tuiles, il retire une des tuiles et ensuite mélange de la même façon que le joueur doit reconstituer l'image. Il le fait très vite, le joueur peut alors le résoudre. J'ai mis 3 niveaux de difficultés avec 3 niveaux de découpage des images.`,
    },
  ],
  difficulties: [
    `Comme ce sont principalement des mini-jeux et que la plus-part des utilisateurs sont sur téléphone, j'ai dû gérer le système tactile pour faciliter l'expérience. Heureusement, javascript propose une API très simple pour cela : les Touch Events. Encore plus facilité par la librairie VueUse.`,
    `Pour gagner en plaisir de jeu, j'ai mis en place beaucoup d'éléments audio. Musiques et effets sonores. J'ai réalisé un petit moteur qui permet de les gérer efficacement : Activer/Désactiver, Mettre en pause, Ajuster le volume, Bloquer l'interaction tant qu'un son est joué, Chargement des assets.`,
  ],
}
