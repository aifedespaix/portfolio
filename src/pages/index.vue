<script setup lang="ts">
import { useHeadTag } from '~/composables/head-tag'
import { useNavStore } from '~/stores/nav'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
useHeadTag({
  title: 'Accueil',
  description: 'Découvrez mon parcours et mes projets.',
  type: 'website',
})

const navStore = useNavStore()
const cards = computed(() => [navStore.projects].concat(navStore.main))

const colors = [
  'text-red-500 dark:text-red-400',
  'text-blue-500 dark:text-blue-400',
  'text-green-500 dark:text-green-400',
  'text-yellow-500 dark:text-yellow-400',
  'text-purple-500 dark:text-purple-400',
]
</script>

<template>
  <Pager>
    <TitleMain>{{ t('home.title') }}</TitleMain>

    <TitleH2 class="px-2">
      {{ t('home.about') }}
    </TitleH2>

    <Card>
      <div class="flex-reverse flex flex-col items-center justify-between gap-4" sm="flex-row">
        <div class="text-nowrap font-bold">
          Joan Tassel
        </div>
        <div class="text-center">
          {{ t('profile.role') }}
        </div>
        <Image
          class="aspect-square rounded-full"
          src="/assets/home/aife.webp"
          :alt="t('images.profile_alt')"
          :width="64" :height="64"
        />
      </div>
    </Card>

    <TitleH2 class="px-2">
      {{ t('home.work') }}
    </TitleH2>

    <div class="grid grid-cols-1 gap-2" sm="grid-cols-2" md="grid-cols-2" lg="grid-cols-4">
      <Card
        v-for="(card, index) in cards" :key="card.name" :to="card.to"
        :class="colors[index % colors.length]"
        class="flex items-center justify-center"
        md="aspect-square"
      >
        <TitleH3 class="h-10">
          {{ card.name }}
        </TitleH3>
        <div class="min-h-30 flex items-center justify-center" md="min-h-15" xl="min-h-30">
          <div :class="card.icon" class="text-8xl" md="text-6xl" xl="text-8xl" />
        </div>
        <div class="h-16 text-center">
          {{ card.description }}
        </div>
      </Card>
    </div>

    <TitleH2>
      {{ t('home.journey') }}
    </TitleH2>

    <Card class="gap-4 text-justify">
      <div class="card-grid">
        <Image
          src="/assets/home/work-begin.webp"
          :alt="t('images.discovery_alt')"
          class="float-right"
          :width="160" :height="160"
        />
        <TitleH3>{{ t('journey.discovery.title') }}</TitleH3>
        <p>
          {{ t('journey.discovery.part1') }}<br>
          <i18n-t keypath="journey.discovery.part2" tag="span">
            <template #link>
              <Link to="https://openclassrooms.com/fr/" external>
                OpenClassrooms
              </Link>
            </template>
          </i18n-t><br>
          {{ t('journey.discovery.part3') }}<br>
          {{ t('journey.discovery.part4') }}
        </p>
      </div>

      <div class="card-grid">
        <Image
          src="/assets/home/university.webp"
          :alt="t('images.university_alt')"
          class="float-left"
          :width="160" :height="160"
        />
        <TitleH3>{{ t('journey.professional.title') }}</TitleH3>
        <p class="align-middle">
          <i18n-t keypath="journey.professional.content" tag="span">
            <template #link1>
              <RouterLink to="/studies">
                parcours universitaire
              </RouterLink>
            </template>
            <template #link2>
              <Link to="/companies">
                en entreprise
              </Link>
            </template>
          </i18n-t>
        </p>
      </div>

      <div class="card-grid">
        <TitleH3>{{ t('journey.freelance.title') }}</TitleH3>
        <Image
          src="/assets/home/freelance.webp"
          :alt="t('images.freelance_alt')"
          class="float-right"
          :width="160" :height="160"
        />
        <p>
          <i18n-t keypath="journey.freelance.content" tag="span">
            <template #link1>
              <Link to="/projects" :title="t('journey.freelance.projects_link')">
                {{ t('journey.freelance.projects_link') }}
              </Link>
            </template>
          </i18n-t>
        </p>
      </div>
    </Card>
  </Pager>
</template>

<style scoped>
.card-grid img {
  @apply p-2 filter-saturate-50;
}
</style>

<i18n lang="yaml">
  fr:
    home:
      title: "Accueil"
      about: "À propos"
      work: "Mon Travail"
      journey: "Mon parcours"
    profile:
      role: "Développeur web freelance et créateur de contenu"
      name: "Joan Tassel"
    journey:
      discovery:
        title: "Découverte de l'informatique"
        part1: "Je me suis passionné d'informatique à mes 12 ans, lorsque j'ai eu accès à une connexion internet sur l'ordinateur familial."
        part2: "Je me suis très vite intéressé à la structure des sites web, et j'ai pu me former aux bases du HTML et CSS grâce au Site du Zéro (aujourd'hui {link})."
        part3: "J'ai rapidement commencé à développer mes propres sites web, et à me former aux langages de programmation. J'ai progressé en PHP et en SQL ce qui m'a permis de penser en profondeur sur la structure des applications que je souhaitais concevoir."
        part4: "J'ai ensuite développé différents sites internets, que ce soit pour des auto-entrepreneurs, des associations, ou des sites personnels proposant de l'aide sur des jeux vidéo."
      professional:
        title: "Ma professionnalisation"
        content: "C'est en sortant du lycée que j'ai décidé de me tourner vers l'informatique en tant que profession. J'ai passé 6 années dans un {link1} basé sur les sciences de l'informatique et à la gestion de projet. C'est durant cette période que je me suis convaincu que je voulais travailler dans le domaine du développement web. J'ai également eu la chance de faire mes premiers pas {link2} via différents stages et 3 années d'alternance."
        university_link: "parcours universitaire"
        company_link: "en entreprise"
      freelance:
        title: "Mon projet en tant que freelance"
        content: "À la fin de mes études, j'ai décidé de me lancer à mon compte. J'ai réalisé diverses missions en tant que développeur web freelance, je me suis également tourné vers la création de contenu au format vidéo sur la plateforme YouTube ainsi que Twitch. Aujourd'hui je travaille pour divers clients tout en continuant à développer mes {link1}."
        projects_link: "propres projets"
    images:
      profile_alt: "Photo de Profil Joan Tassel"
      discovery_alt: "Découverte du code"
      university_alt: "Université"
      freelance_alt: "Freelance"

  en:
      home:
        title: "Home"
        about: "About"
        work: "My Work"
        journey: "My Journey"
      profile:
        role: "Freelance Web Developer and Content Creator"
        name: "Joan Tassel"
      journey:
        discovery:
          title: "Discovery of Computer Science"
          part1: "I became passionate about computer science at the age of 12 when I gained access to an internet connection on the family computer."
          part2: "I quickly became interested in the structure of websites and learned the basics of HTML and CSS thanks to Site du Zéro (now {link})."
          part3: "I soon started developing my own websites and learning programming languages. I improved my skills in PHP and SQL, which allowed me to deeply understand the structure of the applications I wanted to create."
          part4: "I then developed various websites, whether for freelancers, associations, or personal sites offering help with video games."
        professional:
          title: "My Professionalization"
          content: "After high school, I decided to pursue computer science as a career. I spent six years in a {link1} focused on computer science and project management. During this time, I became convinced that I wanted to work in web development. I also had the opportunity to take my first steps {link2} through various internships and three years of work-study."
          university_link: "university path"
          company_link: "in a company"
        freelance:
          title: "My Freelance Journey"
          content: "At the end of my studies, I decided to start my own business. I carried out various projects as a freelance web developer and also turned to content creation in video format on YouTube and Twitch. Today, I work for various clients while continuing to develop my {link1}."
          projects_link: "own projects"
      images:
        profile_alt: "Profile Picture of Joan Tassel"
        discovery_alt: "Discovering Coding"
        university_alt: "University"
        freelance_alt: "Freelance"
</i18n>
