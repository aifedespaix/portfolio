import type { Project } from '~/types/project'

export const videoLearningData: Project = {
  id: 'video-learning',
  name: `Vidéos Automatisées`,
  shortDescription: `Génération de vidéos à but éducatif et automatisées.`,
  description: `J'ai développé un outil pour générer des vidéos automatiquement. Le but est d'apprendre une langue grâce à des exercices. Le principe est simple : un mot est affiché à l'écran, il faut le traduire dans les 3 secondes avant que la réponse ne soit prononcée. Les vidéos sont au format vertical et à destination de Youtube et TikTok.`,
  image: 'video-learning',
  icon: 'i-mdi:video',
  links: [
    {
        name: 'Apprendre l\'Anglais',
        url: 'https://www.youtube.com/@Apprends_Anglais_facile',
        icon: 'i-mdi:youtube',
        type: 'youtube',
      },
      {
        name: `Apprendre l'Anglais`,
        url: 'https://www.tiktok.com/@apprends_anglais_facile',
        icon: 'i-icon-park-outline:tiktok',
        type: 'tiktok',
      },
      {
        name: 'Apprendre le Français',
          url: 'https://www.youtube.com/@Learn_French_Easy',
          icon: 'i-mdi:youtube',
          type: 'youtube',
        },
      {
        name: 'Apprendre le Français',
        url: 'https://www.tiktok.com/@french_learning_easy',
        icon: 'i-icon-park-outline:tiktok',
        type: 'tiktok',
      },
  ],
  technologies: [
    {
      name: 'ChatGPT',
      url: 'https://chatgpt.com/',
    },
    {
      name: 'NestJS',
      url: 'https://nestjs.com/',
    },
    {
      name: 'Coqui TTS',
      url: 'https://github.com/coqui-ai/TTS',
    },
    {
      name: 'React',
      url: 'https://react.dev/',
    },
    {
      name: 'ThreeJS',
      url: 'https://threejs.org/',
    },
    {
      name: 'Remotion',
      url: 'https://remotion.dev/',
    },
    {
      name: 'Puppeteer',
      url: 'https://pptr.dev/',
    },
  ],
  explains: [
    {
      image: 'video-learning-gpt',
      title: 'Génération des mots',
      description: `Les mots sont générés depuis des thèmes que je définis. Une IA génères une liste de mots et leur traduction selon le thème.`,
    },
    {
      image: 'video-learning-nest',
      title: 'Difficulté des mots',
      description: `Je transfère les résultats de l'IA vers une base de données gérée par NestJS. Chaque mot est associé à un niveau de difficulté manuellement via une interface dédiée.`,
    },
    {
      image: 'video-learning-coqui',
      title: 'Génération des voix',
      description: `Chaque mot est prononcé par une voix par IA qui tourne en local. La voix est générée avec Coqui TTS. Je lui fourni un fichier audio de référence pour la voix et un fichier texte, il génère ainsi une voix qui prononce le texte.`,
    },
    {
      image: 'video-learning-remotion',
      title: 'Génération des vidéos',
      description: `Les vidéos sont générées avec Remotion. J'y applique une phrase d'introduction et un thème, quelques mots à deviner à difficulté croissante, jusqu'à la fin de la vidéo. Le tout accompagné d'un personnage en 3D qui réagit à la question et la réponse. Remotion est capable de générer une vidéo en quelques minutes, il se nourrit des infos stockées dans la base de données via des requêtes au serveur NestJS.`,
    },
    {
      image: 'video-learning-puppeteer',
      title: 'Upload des vidéos',
      description: `Youtube et Tiktok proposent des API pour uploader des vidéos, cependant il y a des restrictions de droits d'accès, j'ai donc développé un script en NodeJS pour uploader les vidéos grâce à Puppeteer, c'est un outil qui sert à réaliser des tâches automatisées sur des sites web. Tout le processus de connexion, upload, remplissage des informations et programmation de la vidéo est automatisé.`,
    },
    
  ],
  difficulties: [
    `Les voix générées sont parfois ratées, je dois vérifier manuellement chaque résultat et relancer l'IA avec une nouvelle graine dans le cas où la voix est mauvaise ou buguée.`,
    `Le système d'envoie des vidéos étant automatisé par un script utilisant un navigateur virtuel, chaque évolution de l'interface de Youtube et Tiktok est susceptible de faire bugger le script.`,
    `Je pensais que le contenu puisse attirer un certain publique de par la qualité des vidéos comparé à d'autres chaînes concurrentes. Cependant, le manque de diffusion m'a fait arrêté la publication de nouvelles vidéos.`,
  ],
}
