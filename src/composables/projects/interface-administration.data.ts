import type { Project } from '~/types/project'

export const interfaceAdministrationData: Project = {
  id: 'interface-administration',
  name: `Interface d'Administration`,
  shortDescription: `Application web à destination d'un streamer et de ses modérateurs.`,
  description: `Une application web qui regroupe une multitude de fonctionnalités pour la gestion d'un stream et des vidéos. Génération des overlay dynamiques reliés à une base de données Firebase. Génération des commandes, sondages, messages automatiques, modération des messages, gestion de la musique, génération de planning.`,
  image: 'interface-administration',
  icon: 'i-mdi:administrator',  links: [
    {
      name: 'Lien du projet ',
      more: '(Fonctionnalités accessibles aux modérateurs uniquement)',
      url: 'https://aife.io/',
      icon: 'i-mdi:calendar',
    },
  ],
  technologies: [
    {
      name: 'Vue3',
      url: 'https://vuejs.org/',
    },
    {
      name: 'Twurple',
      url: 'https://twurple.js.org/',
    },
    {
      name: 'Firebase',
      url: 'https://firebase.google.com/',
    },
    {
      name: 'ElementUI',
      url: 'https://element-plus.org/',
    },
    {
      name: 'UnoCSS',
      url: 'https://unocss.dev/',
    },
  ],
  explains: [
    {
      image: 'interface-administration-stream',
      title: 'Gestionnaire de Stream',
      description: `Écran simple et épuré pour gérer les différents paramètres du stream le tout relié à une base de données pour proposer des informations pertinentes aux spectateurs comme les infos du stream, la musique en cours, les commandes etc.`,
    },
    {
      image: 'interface-administration-sondages',
      title: 'Validation des sondages',
      description: `Un système, lié à un site dédié aux spectateurs permet de proposer des sondages. Ces derniers sont regroupé sur une page dédiée et sont validés ou rejetés par les modérateurs.`,
    },
    {
      image: 'interface-administration-command',
      title: 'Générateur de commandes FFMPEG',
      description: `Un système de génération de commandes FFMPEG pour le découpage des vidéos avant leur diffusion.`,
    },
  ],
  difficulties: [
    `Lien fort avec l'API Twitch, cependant cette dernière n'est pas la plus simple à utiliser, et la documentation est assez pauvre, heureusement il existe des librairies qui permettent de faciliter l'utilisation de l'API : Twurple.`,
    `Pour avoir des informations en temps réel sur le stream, j'ai dû mettre en place des solutions pour optimiser les retours sans pour autant surcharger les serveurs de requêtes.`,
  ],
}
