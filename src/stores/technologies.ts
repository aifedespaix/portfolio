import { acceptHMRUpdate, defineStore } from 'pinia'

export interface Technology {
  name: string
  url: string
}

type Technologies = 'react'
  | 'nestjs'
  | 'postgresql'
  | 'firebase'
  | 'discordjs'
  | 'twurple'
  | 'ollama'
  | 'vue3'
  | 'cryptojs'
  | 'elementui'
  | 'unocss'
  | 'leaflet'
  | 'wordpress'
  | 'fusejs'
  | 'threejs'
  | 'vueuse'
  | 'chatgpt'
  | 'coquiTTS'
  | 'remotion'
  | 'react'
  | 'puppeteer'
  | 'angular'
  | 'symfony'

export const useTechnologiesStore = defineStore('technologies', () => {
  const technologies: Record<Technologies, Technology> = {
    react: {
      name: 'React',
      url: 'https://react.dev/',
    },
    nestjs: {
      name: 'NestJS',
      url: 'https://nestjs.com/',
    },
    postgresql: {
      name: 'PostgreSQL',
      url: 'https://www.postgresql.org/',
    },
    firebase: {
      name: 'Firebase',
      url: 'https://firebase.google.com/',
    },
    discordjs: {
      name: 'Discord.js',
      url: 'https://discord.js.org/',
    },
    twurple: {
      name: 'Twurple',
      url: 'https://twurple.js.org/',
    },
    ollama: {
      name: 'Ollama',
      url: 'https://ollama.com/',
    },
    vue3: {
      name: 'Vue3',
      url: 'https://vuejs.org/',
    },
    cryptojs: {
      name: 'CryptoJS',
      url: 'https://cryptojs.gitbook.io/docs/',
    },
    elementui: {
      name: 'ElementUI',
      url: 'https://element-plus.org/',
    },
    unocss: {
      name: 'UnoCSS',
      url: 'https://unocss.dev/',
    },
    leaflet: {
      name: 'Leaflet',
      url: 'https://leafletjs.com/',
    },
    wordpress: {
      name: 'Wordpress',
      url: 'https://wordpress.org/',
    },
    fusejs: {
      name: 'Fuse.js',
      url: 'https://fusejs.io/',
    },
    threejs: {
      name: 'Three.js',
      url: 'https://threejs.org/',
    },
    vueuse: {
      name: 'VueUse',
      url: 'https://vueuse.org/',
    },
    chatgpt: {
      name: 'ChatGPT',
      url: 'https://chatgpt.com/',
    },
    coquiTTS: {
      name: 'Coqui TTS',
      url: 'https://github.com/coqui-ai/TTS',
    },
    remotion: {
      name: 'Remotion',
      url: 'https://remotion.dev/',
    },
    puppeteer: {
      name: 'Puppeteer',
      url: 'https://pptr.dev/',
    },
    angular: {
      name: 'Angular',
      url: 'https://angular.dev/',
    },
    symfony: {
      name: 'Symfony',
      url: 'https://symfony.com/',
    },
  }

  return {
    technologies,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTechnologiesStore as any, import.meta.hot))
