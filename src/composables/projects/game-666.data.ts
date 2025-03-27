import type { Project } from '~/types/project'

export const game666Data: Project =  {
  id: 'game-666',
  name: `Énigme d'Halloween`,
  shortDescription: `Une enquête collaborative pour Halloween.`,
  description: `J'ai développé une application web pour animer une soirée d'Halloween. L'idée est de proposer aux membres de ma communauté de travailler ensemble pour résoudre un mystère horrifique. Une fois le projet terminé, j'ai décidé de le mettre à disposition, l'énigme se lance tous les jours à partir de 20h. Il se découpe en 4 mystères à résoudre sur 4 heures, si tous les indices sont trouvés, on peut débloquer l'énigme finale disponible de 00h à 02h.`,
  image: 'game-666',
  icon: 'i-mdi:halloween', 
  links: [
    {
      name: 'Énigme d\'Halloween',
      url: 'https://666.aife.io/',
      icon: 'i-mdi:halloween',
    },
  ],
  technologies: [
    {
      name: 'Vue3',
      url: 'https://vuejs.org/',
    },
    {
      name: 'CryptoJS',
      url: 'https://cryptojs.gitbook.io/docs/',
    },
    {
      name: 'Twurple',
      url: 'https://twurple.js.org/',
    },
  ],
  explains: [
    {
      image: 'game-666-cryptojs',
      title: 'CryptoJS',
      description: `L'énigme est à destination d'un groupe de personnes sur internet. Je savais qu'ils s'amuseraient à regarder dans le code pour cracker les énigmes. Je n'avais pas envie d'ajouter une couche serveur pour sécuriser les données, j'ai préféré me focus sur le contenu plutôt que la sécurité. J'ai donc utilisé CryptoJS pour crypter les informations. Évidement, avec les informations fournies par le front, il y a toutes les clés pour décrypter, mais le processus à suffit pour dissuader les utilisateurs de vouloir cracker les énigmes.`,
    },
  ],
  difficulties: [
    `J'ai réalisé des liens avec l'API Twitch, notamment le chat, ça m'a permis de créer de réelles interactions avec les utilisateurs sans mettre en place de serveur. J'ai joué avec des données aléatoires mélangées avec des messages du chat et des informations sur l'énigme pour accentuer la difficulté.`,
  ],
}

