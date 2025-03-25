<script setup lang="ts">
import { useSeo } from '~/composables/seo'
import { useNavStore } from '~/stores/nav'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
useSeo({
  pageTitle: t('home.title'),
  description: t('home.description'),
  image: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000',
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
      <div class="flex items-center justify-between">
        <div class="font-bold">
          Joan Tassel
        </div>
        <div>Développeur web</div>
        <div class="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </Card>

    <TitleH2 class="px-2">
      {{ t('home.work') }}
    </TitleH2>

    <div class="grid grid-cols-1 gap-2" sm="grid-cols-2" md="grid-cols-2" lg="grid-cols-4" xl="grid-cols-5">
      <Card
        v-for="(card, index) in cards" :key="card.name" :to="card.to"
        :class="colors[index % colors.length]"
        class="flex items-center justify-center"
        md="aspect-square"
      >
        <TitleH3 class="h-10">
          {{ card.name }}
        </TitleH3>
        <div :class="card.icon" class="text-8xl" />
        <div class="h-16 text-center">
          {{ card.description }}
        </div>
      </Card>
    </div>

    <Card class="gap-4 text-justify">
      <div class="card-grid">
        <img src="/assets/home/work-begin.webp" alt="Découverte du code" class="float-right">
        <TitleH3>Découverte de l'informatique</TitleH3>
        <p>
          Je me suis passionné d'informatique à mes 12 ans, lorsque j'ai eu accès à une connexion internet sur l'ordinateur familial.
          <br>
          Je me suis très vite intéressé à la structure des sites web, et j'ai pu me former aux bases du HTML et CSS grâce au Site du Zéro (aujourd'hui <Link to="https://openclassrooms.com/fr/" external>
            OpenClassrooms
          </Link>).
          <br>
          J'ai rapidement commencé à développer mes propres sites web, et à me former aux langages de programmation. J'ai progressé en PHP et en SQL ce qui m'a permis de penser en profondeur sur la structure des applications que je souhaitais concevoir.
          <br>J'ai ensuite développé différents sites internets, que ce soit pour des auto-entrepreneurs, des associations, ou des sites personnels proposant de l'aide sur des jeux vidéo.
        </p>
      </div>

      <div class="card-grid">
        <img src="/assets/home/university.webp" alt="Découverte du code" class="float-left">
        <TitleH3>Ma professionnalisation</TitleH3>
        <p class="align-middle">
          C'est en sortant du lycée que j'ai décidé de me tourner vers l'informatique en tant que profession.
          J'ai passé 6 années dans un <RouterLink to="/studies">
            parcours universitaire
          </RouterLink> basé sur les sciences de l'informatique et à la gestion de projet.
          C'est durant cette période que je me suis convaincu que je voulais travailler dans le domaine du développement web. J'ai également eu la chance de faire mes premiers pas
          <Link to="/companies">
            en entreprise
          </Link> via différents stages et 3 années d'alternance.
        </p>
      </div>

      <div class="card-grid">
        <TitleH3>Mon projet en tant que freelance</TitleH3>
        <img src="/assets/home/freelance.webp" alt="Découverte du code" class="float-right">
        <p>
          À la fin de mes études, j'ai décidé de me lancer à mon compte. J'ai réalisé diverses missions en tant que développeur web freelance, je me suis également tourné vers la création de contenu au format vidéo sur la plateforme YouTube ainsi que Twitch. Aujourd'hui je travaille pour divers clients tout en continuant à développer mes <Link to="/projects" title="Mes projets">
            propres projets
          </Link>.
        </p>
      </div>
    </Card>
  </Pager>
</template>

<style scoped>
.card-grid img {
  @apply w-40 p-2;
}
</style>
