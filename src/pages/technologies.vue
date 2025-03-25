<script setup lang="ts">
const { t } = useI18n()

interface Technology {
  name: string
  description: string
  url: string
  experience: number
  icon: string
  utilisation: string
  apports?: string
  libraries: Library[]
}

interface Library {
  name: string
  description: string
  url: string
  experience: number
  icon: string
  utilisation: string
  apports?: string
  creations?: Creation[]
}

interface Creation {
  name: string | ComputedRef<string>
  to: string
}
const projectsStore = useProjectsStore()
const technologies: Record<string, Technology> = {
  javascript: {
    name: 'JavaScript & TypeScript',
    description: 'JavaScript est un langage de programmation côté client utilisé pour créer des pages web interactives. Il est initialement conçu pour ajouter des fonctionnalités dynamiques aux pages web, aujourd\'hui il est utilisé pour créer des applications web complexes.',
    url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
    experience: new Date().getFullYear() - 2015,
    icon: 'i-mdi:language-javascript',
    utilisation: `J'ai utilisé JavaScript pour la création de sites web interactifs. Je me suis rapidement tourné vers le TypeScript pour gagner en qualité de code et en facilité de développement.`,
    libraries: [
      {
        name: 'Vue.js',
        description: 'Vue.js est un framework JavaScript pour la création de pages web interactives. Il est conçu pour faciliter la création d\'applications et de sites webs de toute taille.',
        url: 'https://vuejs.org/',
        experience: new Date().getFullYear() - 2017,
        icon: 'i-mdi:vuejs',
        utilisation: `J'ai utilisé Vue.js pour la création de sites, interfaces de gestion, et overlays interactifs.`,
        apports: `Vue est le framework qui m'a le plus attiré, de pars son approche orientée HTML de la logique. C'est avec l'arrivée de Vue 3 que je l'ai intégré à une majorité de mes projets.`,
        creations: [
          projectsStore.projectList.mapInteractive,
          projectsStore.projectList.mapInteractive,
          projectsStore.projectList.gamePicross,
          projectsStore.projectList.interfaceAdministration,
        ],
      },
      {
        name: 'React',
        description: 'React est une librairie JavaScript pour la création de pages web interactives. Elle est la librairie la plus utilisée et populaire pour la création d\'applications web.',
        url: 'https://reactjs.org/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:react',
        utilisation: `J'utilise principalement React pour la réalisation de vidéos automatisées grâce à la librairie Remotion. J'en connais les bases, mais ne le reserve que pour cette utilisation.`,
        apports: ``,
        creations: [
          projectsStore.projectList.videoLearning,
          projectsStore.projectList.videoOverlay,
        ],
      },
      {
        name: 'Leaflet',
        description: 'Leaflet est une librairie JavaScript pour la création de cartes interactives.',
        url: 'https://leafletjs.com/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:leaf',
        utilisation: `J'utilise Leaflet pour la création de cartes interactives.`,
        apports: `La simplicité d'utilisation de Leaflet m'a permis de gagner du temps lors de la création de cartes.`,
        creations: [
          projectsStore.projectList.mapInteractive,
          projectsStore.projectList.mapEducative,
        ],
      },
      {
        name: 'Angular',
        description: `Angular est un framework dédié à la création d'applications web ambitieuses.`,
        url: 'https://angular.dev/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:angular',
        utilisation: `Angular fut mon premier framework front end que j'ai découvert. Son approche orientée composants et son architecture imposant une découpe stricte du code m'ont ouvert à de nombreux concepts que j'utilise aujourd'hui.`,
      },
      {
        name: 'NestJS',
        description: 'NestJS est un framework pour la création d\'applications Node.js. Il impose un cadre pour la structure du code, mais offre une grande flexibilité permettant de répondre à des besoins variés.',
        url: 'https://nestjs.com/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-simple-icons:nestjs',
        utilisation: `J'ai utilisé NestJS pour la création d'API REST et GraphQL, de services d'authentification, de stockage de fichiers.`,
        apports: `Ayant pas mal travaillé sur AngularJS, j'ai tout de suite accroché à la philosophie de NestJS. Aujourd'hui je l'utilise pour beaucoup de projets backend, de grande ou petite envergure.`,
        creations: [
          projectsStore.projectList.botChat,
        ],
      },
      {
        name: 'Firebase',
        description: 'Firebase est un service de base de données NoSQL pour le développement web.',
        url: 'https://firebase.google.com/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:firebase',
        utilisation: `J'ai utilisé Firebase pour la sauvegarde de données, l'authentification, les données en temps réel dans des projets où j'avais besoin d'un service rapide à mettre en place.`,
        apports: `Firebase me fait gagner beaucoup de temps quand je dois concevoir stocker des données lors d'un projet où les résultats doivent être rapides.`,
        creations: [
          projectsStore.projectList.interfaceAdministration,
        ],
      },
      {
        name: 'Three.js',
        description: 'Three.js est une librairie JavaScript pour la création de 3D.',
        url: 'https://threejs.org/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-tabler:brand-threejs',
        utilisation: `J'utilise souvent cette technologie pour la création de projets où je souhaite intégrer des graphismes 3D sur des projets persos. Que ce soit des petits jeux sur navigateur ou des graphismes 3D pour des sites web.`,
        apports: `Three.js m'a ouvert au monde du développement en 3D et aux jeux vidéos. J'ai beaucoup progressé sur la programmation Orienté Object et les Design Patterns. J'ai également pu travailler avec des moteurs Physiques, notamment Rapier, pour intégrer un système de gestion des collisions.`,
      },

    ],
  },
  php: {
    name: 'PHP',
    description: 'PHP est un langage de programmation principalement utilisé pour le développement web côté serveur. Il est très populaire pour son utilisation dans le développement web dynamique et son intégration avec HTML.',
    utilisation: `J'ai débuté la programmation grâce à ce langage, j'ai appris à l'utiliser pour factoriser la création de mes pages web. Jusqu'à concevoir des applications robustes grâce à son approche objet. Jusqu'à m'intéresser à des frameworks pour viser une structure plus propre et plus maintenable.`,
    experience: new Date().getFullYear() - 2018,
    icon: 'i-mdi:language-php',
    url: 'https://www.php.net/',
    libraries: [
      {
        name: 'Symfony',
        description: 'Symfony est un framework PHP pour le développement web. Il est conçu pour faciliter la création d\'applications web robustes et scalables.',
        url: 'https://symfony.com/',
        experience: new Date().getFullYear() - 2022,
        icon: 'i-mdi:symfony',
        utilisation: `J'ai travaillé avec Symfony durant de nombreux projets scolaires. L'objectif était de travailler efficacement en groupe, le cadre d'un tel framework d'organiser efficacement les différents jalons de production.`,
        apports: `J'ai appris à mettre en place des bonnes pratiques de développement, comme un découpage strict et une gestion des erreurs efficace.`,
      },
      {
        name: 'WordPress',
        description: 'WordPress est un système de gestion de contenu (CMS) open source conçu pour faciliter la création de sites web. Il est largement utilisé pour la création de blogs et de sites vitrines.',
        url: 'https://wordpress.org/',
        experience: new Date().getFullYear() - 2020,
        icon: 'i-mdi:wordpress',
        utilisation: `J'ai utilisé WordPress pour la création de sites web à destination d'autoentrepreneurs et d'associations. L'intérêt principal de WordPress est de pouvoir laisser le client gérer son contenu sans avoir besoin de connaissances en programmation. Mon travail consiste principalement à concevoir des thèmes WordPress adaptés à leurs besoins.`,
        creations: [
          projectsStore.projectList.mapEducative,
        ],
        apports: `J'ai appris travailler le référencement naturel, les bonnes pratiques de sécurité, et d'accessibilité.`,
      },
    ],
  },
}

interface Logiciel {
  name: string
  description: string
  url: string
  experience: number
  icon: {
    name: string
    classes?: string
  }
  utilisation: string
  class?: string
}

const logiciels: Record<string, Logiciel> = {
  photoshop: {
    name: 'Photoshop',
    utilisation: `J'utilise Photoshop pour la retouche d'images, la création de visuels pour mes projets, ou pour travailler des supports visuels rapidement.`,
    description: 'Photoshop est un logiciel de retouche d\'images.',
    url: 'https://www.adobe.com/fr/products/photoshop.html',
    experience: new Date().getFullYear() - 2013,
    icon: {
      name: 'i-logos:adobe-photoshop',

    },
  },
  illustrator: {
    name: 'Illustrator',
    description: 'Illustrator est un logiciel de création de visuels vectoriels.',
    utilisation: `J'utilise Illustrator pour la création et modification de logos ou illustrations.`,
    url: 'https://www.adobe.com/fr/products/premiere.html',
    experience: 4,
    icon: {
      name: 'i-logos:adobe-illustrator',

    },
  },
  premierePro: {
    name: 'Premiere Pro',
    description: 'Premiere Pro est un logiciel de montage de vidéos.',
    utilisation: `J'utilise Premiere Pro pour réaliser une grande partie de les vidéos. Ma maîtrise du logiciel lié à une bonne organisation me permet de travailler très efficacement pour réaliser des montages dynamiques et impactants.`,
    url: 'https://www.adobe.com/fr/products/premiere.html',
    experience: new Date().getFullYear() - 2010,
    icon: {
      name: 'i-logos:adobe-premiere',

    },
  },
  afterEffects: {
    name: 'After Effects',
    description: `After Effects est un logiciel d'animations graphiques, il est utilisé pour du motion design et des effets spéciaux.`,
    utilisation: `J'utilise ce logiciel pour gagner fluidifier mon montage vidéo. Je n'ai pas une maîtrise d'un niveau expert, mais je m'en sers pour compléter l'utilisation de Premiere Pro.`,
    url: 'https://www.adobe.com/fr/products/aftereffects.html',
    experience: new Date().getFullYear() - 2019,
    icon: {
      name: 'i-logos:adobe-after-effects',

    },
  },
  davinciResolve: {
    name: 'DaVinci Resolve',
    description: 'DaVinci Resolve est un logiciel de montage de vidéos.',
    url: 'https://www.blackmagicdesign.com/fr/products/davinciresolve',
    experience: new Date().getFullYear() - 2022,
    icon: {
      name: 'i-simple-icons:davinciresolve',

    },
    utilisation: `Je me suis formé à Da Vinci Resolve car c'est un logiciel très complet et gratuit. Il m'a permis de progresser en colorimétrie et réfléchir à de nouvelles façons de monter mes vidéos.`,
  },
  vscode: {
    name: 'VSCode',
    description: 'VSCode est un éditeur de code multiplateforme gratuit et open source.',
    url: 'https://code.visualstudio.com/',
    experience: new Date().getFullYear() - 2017,
    icon: {
      name: 'i-logos:visual-studio-code',

    },
    utilisation: `J'utilise VSCode pour la plus part de mes projets et scripts. Ancient abonné à la suite JetBrains durant mes études, je ne souhaitais pas payer pour un IDE. J'ai adopté VSCode et son écosystème. J'apprécie avoir un contrôle sur mon environnement de travail.`,
  },
  obsStudio: {
    name: 'OBS Studio',
    description: 'OBS Studio est un logiciel de capture et de streaming de vidéos.',
    url: 'https://obsproject.com/',
    experience: new Date().getFullYear() - 2020,
    icon: {
      name: 'i-simple-icons:obsstudio',

    },
    utilisation: `J'utilise OBS Studio pour la gestion de les steams et l'enregistrement de scènes. C'est un logiciel stable et complet. Il m'a permis de concevoir des émissions en direct sur de longues périodes. Que ce soit des streams quotidiens ou des émissions durant plusieurs jours avec gérée par une équipe à distance.`,
  },
}
</script>

<template>
  <Pager>
    <TitleMain>{{ t('technologies.title') }}</TitleMain>
    <Card>
      <p class="text-justify">
        Mon expérience en tant que développeur web m'a demander de découvrir des langages de programmation, ainsi que de multiples frameworks, bibliothèques et outils.
        J'ai également appris à utiliser différents logiciel pour mon travail en tant que créateur de contenu. Cet espace permet de centraliser les technologies que j'ai adoptées dans mon processus de travail.
      </p>
    </Card>

    <Card v-for="technologie in technologies" :key="technologie.name">
      <div class="flex items-center gap-2">
        <div
          :class="technologie.icon"
          class="h-14 w-14 flex items-center justify-center rounded-full text-4xl"
          text="blue-600 dark:blue-400"
        />
        <div>
          <TitleH2 class="mb-0! pb-0!">
            {{ technologie.name }}
          </TitleH2>
          <div class="flex items-center gap-2 text-gray-500">
            <div class="font-bold">
              {{ technologie.experience }} ans d'expérience
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 text-justify">
        <p class="italic">
          {{ technologie.description }}
        </p>
        <p class="mt-2">
          {{ technologie.utilisation }}
        </p>
        <p v-if="technologie.apports" class="mt-2">
          {{ technologie.apports }}
        </p>
      </div>

      <div class="mt-4">
        <a
          :href="technologie.url"
          target="_blank"
          class="w-fit flex items-center gap-2 rounded-md p-2 text-blue-600 dark:text-blue-400"
          transition="bg duration-300 ease-in-out"
          hover="bg-black/20"
        >
          <div class="i-mdi:web" />
          <div>Site officiel</div>
        </a>
      </div>

      <div v-if="technologie.libraries?.length" class="mt-6">
        <TitleH3>Bibliothèques et Frameworks associés</TitleH3>
        <div class="grid mt-4 gap-4" sm="grid-cols-2">
          <div
            v-for="lib in technologie.libraries"
            :key="lib.name"
            class="rounded-lg p-4"
          >
            <div class="mb-2 flex items-center gap-2">
              <div :class="lib.icon" class="text-2xl" text="blue-600 dark:blue-400" />
              <div class="font-bold">
                {{ lib.name }}
              </div>
            </div>

            <p class="mb-2 text-sm italic">
              {{ lib.description }}
            </p>
            <p class="mb-2 text-sm">
              {{ lib.utilisation }}
            </p>
            <p v-if="lib.apports" class="mb-2 text-sm">
              {{ lib.apports }}
            </p>
            <a
              :href="lib.url"
              target="_blank"
              class="mt-2 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400"
              hover="underline"
            >
              <div class="i-mdi:web text-sm" />
              <div>Documentation</div>
            </a>

            <div v-if="lib.creations?.length" class="mt-2">
              <div class="mb-1 text-sm font-bold">
                Réalisations :
              </div>
              <div class="flex flex-wrap gap-2">
                <LinkMini v-for="creation in lib.creations" :key="creation.to" :to="creation.to">
                  {{ creation.name }}
                </LinkMini>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>

    <TitleH2 class="mt-6">
      Les logiciels que j'utilise régulièrement
    </TitleH2>

    <div class="grid grid-cols-1 gap-2" md="grid-cols-2">
      <Card v-for="logiciel in logiciels" :key="logiciel.name">
        <div class="flex items-center gap-2">
          <div
            :class="[logiciel.icon.name]"
            class="h-14 w-14 flex items-center justify-center text-4xl" text="blue-600 dark:blue-400"
          />
          <div>
            <TitleH2 class="mb-0! pb-0!">
              {{ logiciel.name }}
            </TitleH2>
            <div class="flex items-center gap-2 text-gray-500">
              <div class="font-bold">
                {{ logiciel.experience }} ans d'expérience
              </div>
            </div>
          </div>
        </div>

        <div class="text-justify">
          <p class="italic">
            {{ logiciel.description }}
          </p>
          <p class="mt-4">
            {{ logiciel.utilisation }}
          </p>
        </div>

        <div class="mt-4">
          <a
            :href="logiciel.url"
            target="_blank"
            class="w-fit flex items-center gap-2 rounded-md p-2 text-blue-600 dark:text-blue-400"
            transition="bg duration-300 ease-in-out"
            hover="bg-black/20"
          >
            <div class="i-mdi:web" />
            <div>Site officiel</div>
          </a>
        </div>
      </Card>
    </div>
  </Pager>
</template>
