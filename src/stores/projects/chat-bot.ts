import type { Project } from '~/types/project'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useChatBotStore = defineStore('project-chat-bot', () => {
  const project: Project = {
    id: 'bot-chat',
    name: 'stores.projects.chat-bot.name',
    shortDescription: 'stores.projects.chat-bot.short-description',
    description: 'stores.projects.chat-bot.description',
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
        title: 'stores.projects.chat-bot.explains.1.title',
        description: 'stores.projects.chat-bot.explains.1.description',
      },
      {
        image: 'bot-chat-ollama',
        title: 'stores.projects.chat-bot.explains.2.title',
        description: 'stores.projects.chat-bot.explains.2.description',
      },
    ],
    difficulties: [
      'stores.projects.chat-bot.difficulties.1',
      'stores.projects.chat-bot.difficulties.2',
    ],
  }

  return {
    project,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatBotStore as any, import.meta.hot))
