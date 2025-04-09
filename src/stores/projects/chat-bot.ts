import type { Project } from '~/types/project.type'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useTechnologiesStore } from '../technologies'

export const useChatBotStore = defineStore('project-chat-bot', () => {
  const technologiesStore = useTechnologiesStore()
  const project: Project = {
    id: 'bot-chat',
    meta: {
      title: 'stores.projects.chat-bot.meta.title',
      description: 'stores.projects.chat-bot.meta.description',
    },
    name: 'stores.projects.chat-bot.name',
    shortDescription: 'stores.projects.chat-bot.short-description',
    description: 'stores.projects.chat-bot.description',
    image: 'bot-chat',
    icon: 'i-mdi:robot',
    technologies: [
      technologiesStore.technologies.nestjs,
      technologiesStore.technologies.postgresql,
      technologiesStore.technologies.firebase,
      technologiesStore.technologies.discordjs,
      technologiesStore.technologies.twurple,
      technologiesStore.technologies.ollama,
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
