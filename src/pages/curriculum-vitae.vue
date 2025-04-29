<script setup lang="ts">
const colors = ref({
  background: {
    main: '#045d55',
    secondary: '#7dbfb7 ',

  },
  text: {
    main: '#000',
    title: '#fff',
  },
})

const cvStore = useCVStore()
const cv = cvStore.cv
</script>

<template>
  <div class="layout text-text-main h-full w-full">
    <div class="bg-background-secondary">
      <div class="aspect-square w-full flex items-center justify-center">
        <div class="bg-background-main w-85% overflow-hidden rounded-full p-6">
          <img src="/assets/home/aife_profile/aife_profile-256.jpg" alt="profile" class="h-full w-full rounded-full object-cover">
        </div>
      </div>

      <div class="flex flex-col gap-4 text-sm">
        <CvCategory :title="cv.contact.title">
          <div v-for="item in cv.contact.items" :key="item.label">
            <CvContactItem :icon="item.icon" :value="item.value" />
          </div>
        </CvCategory>

        <CvCategory :title="cv.languages.title">
          <div v-for="item in cv.languages.items" :key="item.label">
            {{ item.label }} - {{ item.value }}
          </div>
        </CvCategory>

        <CvCategory :title="cv.formations.title">
          <CvSchoolItem v-for="item in cv.formations.items" :key="item.school" :formation="item" />
        </CvCategory>

        <CvCategory :title="cv.passions.title">
          <ul class="list-disc pl-4">
            <li v-for="passion in cv.passions.items" :key="passion">
              {{ passion }}
            </li>
          </ul>
        </CvCategory>
      </div>
    </div>
    <div class="bg-background-main flex flex-col gap-2">
      <CvLayoutHeader :header="cv.header" />
      <div class="flex-1 bg-white">
        <CvCategory :title="cv.competences.title">
          <CvExperienceItem v-for="item in cv.experiences.items" :key="item.company" :experience="item" />
        </CvCategory>

        <div class="grid-bottom grid gap-2">
          <CvCategory :title="cv.softwaresAndTechnologies.title">
            <CvCompetenceItem v-for="item in cv.softwaresAndTechnologies.items" :key="item.name" only-icon :competence="item" />
          </CvCategory>

          <CvCategory reverse-title :title="cv.competences.title">
            <CvCompetenceItem v-for="item in cv.competences.items" :key="item.name" class="pr-6" :competence="item" />
          </CvCategory>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.grid-bottom {
  grid-template-columns: 1fr 2fr;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: v-bind('colors.text.title');
  padding: 10px 40px 10px 20px;
  border-radius: 0 999px 999px 0;
  background-color: v-bind('colors.background.main');
  display: inline-block;
}
.title-reverse {
  font-size: 24px;
  font-weight: 600;
  color: v-bind('colors.text.title');
  padding: 10px 20px 10px 40px;
  text-align: right;
  border-radius: 999px 0 0 999px;
  background-color: v-bind('colors.background.main');
  display: inline-block;
}

.bg-background-main {
  background-color: v-bind('colors.background.main');
}

.bg-background-secondary {
  background-color: v-bind('colors.background.secondary');
}

.text-text-main {
  color: v-bind('colors.text.main');
}

.text-text-title {
  color: v-bind('colors.text.title');
}
</style>
