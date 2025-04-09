import type { Project } from '~/types/project.type'

export const chatBotData: Project = {
  id: 'bot-chat',
  meta: {
    title: 'Chat Bot de Gestion',
    description: `Un chat bot pour Discord et Twitch.`,
  },
  name: 'Chat Bot de Gestion',
  shortDescription: `Un chat bot pour Discord et Twitch.`,
  description: `Un chat bot pour Discord et Twitch. Il permet de gérer des serveurs Discord et des chat Twitch. Il peut récupérer des informations diverses sur les utilisateurs et les stocker dans une base de données. Il peut également interagir avec les utilisateurs.`,
  image: 'bot-chat',
  icon: 'i-mdi:robot',
  technologies: [
    {
      name: 'NestJS',
      url: 'https://nestjs.com/',
    },
    {
      name: 'PostgreSQL',
      url: 'https://www.postgresql.org/',
    },
    {
      name: 'Firebase',
      url: 'https://firebase.google.com/',
    },
    {
      name: 'Discord.js',
      url: 'https://discord.js.org/',
    },
    {
      name: 'Twurple',
      url: 'https://twurple.js.org/',
    },
    {
      name: 'Ollama',
      url: 'https://ollama.com/',
    },
  ],
  explains: [
    {
      image: 'bot-chat-discordjs',
      title: 'Récupération de données',
      description: `Une des tâches de ce bot est de récupérer des informations sur les utilisateurs. Pour cela, j'utilise la librairie Twurple pour créer une connexion à l'API Twitch ainsi que la librairie Discord.js pour créer une connexion à l'API Discord. Je récupère les informations comme la durée de visionnage, les messages, les commandes, les horaires de présence. Ces informations servent à alimenter un système de succès et de récompenses. Ainsi les utilisateurs sont incités à participer activement à la communauté.`,
    },
    {
      image: 'bot-chat-ollama',
      title: 'Discussion via LLM',
      description: `J'ai ajouté une fonctionnalité de discussion via un LLM. Cela permet de discuter avec le bot via des messages. Le bot répond à des questions générales, mais peut également être utilisé pour des questions plus spécifiques. Il est nourri par les données de la base de données PostgreSQL et Firebase. Le bot était configuré avec un modèle Ollama, mais aujourd'hui j'utilise un modèle DeepSeek, plus performant, rapide et moins coûteux en ressources.`,
    },
  ],
  difficulties: [
    `Je me suis initié à la mise en place de LLM avec Ollama, j'avais des problèmes de performance avec des temps de réponses assez long du fait que le modèle tourne en local mais aujourd'hui j'utilise un modèle DeepSeek qui est plus performant.`,
    `Beaucoup de données à gérer et d'automatisations liées à des Webhooks ou des tâches répétitives (cron). Il fallait une structure du code adaptée à ces différentes tâches pour gagner du temps autant en développement de nouvelles tâches qu'en maintenance et en sécurité.`,
  ],
}
