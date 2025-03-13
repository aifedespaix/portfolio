<script setup lang="ts">
const { t } = useI18n()

interface Study {
  school: string
  location: string
  diploma: string
  description: string
  competencies: {
    name: string
    icon: string
  }[]
  date: {
    start: string
    end: string
  }
  url: string
  logo: {
    src: string
    classes?: string[]
  }
}

const studies: Study[] = [
  {
    school: 'Université de Caen',
    location: 'Caen, France',
    diploma: 'BUT Informatique',
    description: 'Formation en informatique générale, j\'ai pu découvrir les bases de l\'informatique et de la programmation. Cette formation m\'a permis de valider mon intérêt pour le développement web tout en m\'apportant un bagage solide dans les sciences de l\'informatique.',
    competencies: [
      {
        name: 'Développement Web',
        icon: 'i-mdi-web',
      },
      {
        name: 'Base de données',
        icon: 'i-mdi-database',
      },
      {
        name: 'Administration système et réseaux',
        icon: 'i-mdi-server',
      },
    ],
    date: {
      start: '2013',
      end: '2015',
    },
    url: 'https://www.unicaen.fr/',
    logo: {
      src: '/assets/studies/logo-iut-caen.webp',
      classes: ['rounded-none'],
    },
  },
  {
    school: 'Université Claude Bernard Lyon 1',
    location: 'Lyon, France',
    diploma: 'Licence Informatique',
    description: 'Cette année fut un tournant pour moi et la vision du métier que je souhaitais exercer. J\'ai été au bout de cette année sans la valider. J\'ai tout de même acquis de fortes connaissances en algorithmie et en UX design.',
    competencies: [
      {
        name: 'Développement Web',
        icon: 'i-mdi-web',
      },
      {
        name: 'Design UX',
        icon: 'i-mdi-palette',
      },
      {
        name: 'Algorithmie',
        icon: 'i-mdi-ab-testing',
      },
    ],
    date: {
      start: '2015',
      end: '2016',
    },
    url: 'https://www.univ-lyon1.fr',
    logo: {
      src: '/assets/studies/logo-fac-lyon.webp',
      classes: ['bg-white'],
    },
  },
  {
    school: 'Institut G4',
    location: 'Lyon, France',
    diploma: 'Chef de projet Système d\'Information',
    description: `Je me suis orienté dans le domaine de la gestion de projet informatique.Ayant des connaissances variées et étant intéressé sur tous les aspects de la réalisation de projets, il est naturel pour moi de réfléchir et concevoir des solutions optimales que ce soit organisationnel ou en accord avec les contraintes techniques. J'ai également participé à la formation d'élèves sur mes domaines de compétence. La transmission du savoir est une notion importante pour moi.`,
    competencies: [
      {
        name: 'Développement Web',
        icon: 'i-mdi-web',
      },
      {
        name: 'Gestion de projet',
        icon: 'i-mdi:work',
      },
      {
        name: 'Formation',
        icon: 'i-mdi-school',
      },
    ],
    date: {
      start: '2016',
      end: '2020',
    },
    url: 'https://institut-g4.fr/',
    logo: {
      src: '/assets/studies/logo-institut_g4.webp',
    },
  },
]
</script>

<template>
  <Pager>
    <TitleMain>{{ t('studies.title') }}</TitleMain>

    <Card v-for="study in studies" :key="study.school">
      <div class="flex items-center gap-2">
        <img :src="study.logo.src" :alt="study.school" class="h-14 w-14 rounded-full" :class="study.logo.classes ">
        <div>
          <TitleH2 class="mb-0! pb-0!">
            {{ study.school }}
          </TitleH2>
          <div class="flex items-center gap-2 text-gray-500">
            <div class="font-bold">
              {{ study.date.start }} - {{ study.date.end }}
            </div>
            <div>
              {{ study.location }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-justify">
        <p>{{ study.description }}</p>
      </div>

      <div class="max-w-120 rounded-md bg-secondary p-2">
        <TitleH3>
          Compétences notables
        </TitleH3>
        <div class="flex flex-wrap justify-center gap-2">
          <div
            v-for="competency in study.competencies" :key="competency.name"
            class="grid grid-rows-2 aspect-square max-w-40 min-w-30 flex-1 rounded-md bg-tertiary px-2 py-1 text-sm font-bold"
            hover="shadow-md animate-rubber-band"
            transition="shadow duration-300 ease-in-out"
          >
            <div :class="competency.icon" class="self-center justify-self-center text-3rem text-blue" />
            <div class="self-center text-center">
              {{ competency.name }}
            </div>
          </div>
        </div>
      </div>

      <div class="mt-2 flex justify-between">
        <div class="bg-gold flex items-center gap-2 rounded-md p-2 text-xl">
          <div class="i-mdi-diploma" />
          <div>{{ study.diploma }}</div>
        </div>
        <a :href="study.url" target="_blank" class="flex items-center gap-2 rounded-md p-1 text-blue-500" hover="bg-black/20">
          <div class="i-mdi-web" />
          <div>
            Site de l'école
          </div>
        </a>
      </div>
    </Card>
  </Pager>
</template>
