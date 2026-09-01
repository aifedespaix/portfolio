# Refonte UI/UX du portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre le portfolio (Vue 3 / UnoCSS / Pinia) plus professionnel — couleur sémantique, motion cohérente et accessible, contraste vérifié, CV enfin trouvable, projets filtrables — sans perdre le ton ludique/personnel du site.

**Architecture:** Le travail introduit deux petites fondations partagées (tokens de motion via variables CSS + règles UnoCSS ; catalogue de catégories de projet via un composable statique) puis les applique composant par composant, dans l'ordre du spec (accès au CV d'abord car isolé et à fort impact, fondations ensuite, puis application, puis nouvelles fonctionnalités d'IA). Chaque tâche est indépendamment testable et committable.

**Tech Stack:** Vue 3 (Composition API, `<script setup>`), UnoCSS (attributify + classes), Pinia, vue-i18n (FR/EN via fichiers `.yml` colocalisés, fusionnés par `bun run translate`), Vitest + @vue/test-utils, vite-ssg.

**Spec:** `docs/superpowers/specs/2026-09-01-ui-ux-audit-design.md`

## Global Constraints

- WCAG AA minimum partout : texte ≥4.5:1, éléments larges/UI ≥3:1, dark et light (spec, Constat + Partie 3).
- Toute transition respecte `prefers-reduced-motion` (spec, Objectifs).
- N'anime que `opacity`/`transform` — jamais `top`/`margin`/`height`/`width` (spec, Partie 2, règle CLS).
- Pas de nouvelle route, pas de refonte de contenu/copywriting (spec, Non-objectifs). Seule exception : un lien vers la route `curriculumVitae`, déjà existante.
- `info-gold.vue` n'est jamais modifié dans ce plan : c'est la référence de style, pas une cible de refactor (spec, Partie 2).
- Le filtre de projets ne doit jamais retirer les 11 projets du DOM rendu (masquage CSS uniquement, jamais `v-if`) et l'état initial de `/projects` n'a aucun filtre pré-appliqué (spec, Partie 4, garde-fous SEO).
- Alias TypeScript `~/*` → `src/*`. Les exports nommés de `src/composables/*` et `src/stores/*` sont auto-importés (pas d'`import` à écrire pour les valeurs ; les types restent importés explicitement en `import type`).
- Après toute modification d'un fichier `.yml` sous `src/`, lancer `bun run translate` pour régénérer `locales/fr.yml` et `locales/en.yml`, et committer les deux.
- Chaque tâche se termine par `bun run lint` et `bun run typecheck` verts en plus des tests Vitest.

---

## Task 1: Infrastructure de test (Pinia + i18n) et lien vers le CV

La suite de tests actuelle est cassée (vérifié : `bun run test:unit` échoue sur les 7 tests de `test/components/card.test.ts` avec `getActivePinia() was called but there was no active Pinia`). Cette tâche corrige la fondation de test — nécessaire pour que toutes les tâches suivantes puissent écrire des tests qui passent — puis livre le correctif recruteur le plus impactant du spec (Partie 0) : un lien vers le CV, actuellement introuvable.

**Files:**

- Create: `test/setup.ts`
- Modify: `vite.config.ts:155-158` (ajoute `setupFiles`)
- Modify: `test/components/card.test.ts` (corrige un `to` invalide préexistant, révélé par le correctif Pinia)
- Modify: `src/stores/nav.ts`
- Modify: `src/stores/nav.yml`
- Modify: `src/components/layout/nav.vue`
- Modify: `src/components/layout/header.vue`
- Modify: `src/components/layout/header.yml`
- Modify: `src/components/layout/app-bar.vue`
- Modify: `src/components/layout/app-bar.yml`
- Test: `test/components/header.test.ts`, `test/components/app-bar.test.ts`

**Interfaces:**

- Produces: `test/setup.ts` installe globalement Pinia + i18n (via `config.global.plugins` de `@vue/test-utils`) avant chaque test — toutes les tâches suivantes en dépendent et n'ont pas besoin de le refaire.
- Produces: `useNavStore().curriculumVitae: NavItem` (icône `i-carbon-document`, route `curriculumVitae`).

- [ ] **Step 1: Créer l'infrastructure de test globale (Pinia + i18n)**

```ts
// test/setup.ts
import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import en from '../locales/en.yml'
import fr from '../locales/fr.yml'

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: { fr, en },
})

beforeEach(() => {
  config.global.plugins = [createPinia(), i18n]
})
```

```text
// vite.config.ts — dans le bloc `test`, ligne 155-158
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['test/setup.ts'],
  },
```

- [ ] **Step 2: Corriger le test préexistant cassé par le vrai comportement de `getUrlLocale`**

Dans `test/components/card.test.ts`, le test `'devrait être un RouterLink quand to est fourni'` passe `to: '/test'`, qui n'est pas une `RouteKey` valide et fait lever `getUrlLocale`. Remplacer par une route réelle :

```ts
it('devrait être un RouterLink quand to est fourni', () => {
  const wrapper = mount(Card, {
    props: {
      to: 'index',
    },
    global: {
      stubs: {
        RouterLink: true,
      },
    },
  })
  expect(wrapper.find('router-link-stub').exists()).toBe(true)
  expect(wrapper.classes()).toContain('cursor-pointer')
})
```

- [ ] **Step 3: Lancer la suite existante et vérifier qu'elle passe entièrement**

Run: `bun run test:unit -- --run`
Expected: `test/components/card.test.ts` — 7 passed, 0 failed.

- [ ] **Step 4: Commit**

```bash
git add test/setup.ts vite.config.ts test/components/card.test.ts
git commit -m "test: installe Pinia et i18n globalement pour Vitest"
```

- [ ] **Step 5: Écrire les tests (rouges) du lien CV dans le header et l'app-bar**

```ts
// test/components/header.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Header from '../../src/components/layout/header.vue'

describe('layout header', () => {
  it('affiche un lien vers le CV à côté du profil', () => {
    const wrapper = mount(Header, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    expect(wrapper.find('.i-carbon-document').exists()).toBe(true)
    expect(wrapper.find('.i-carbon-user').exists()).toBe(true)
  })
})
```

```ts
// test/components/app-bar.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppBar from '../../src/components/layout/app-bar.vue'

describe('layout app-bar', () => {
  it('affiche un lien vers le CV en plus de accueil/projets/profil', () => {
    const wrapper = mount(AppBar, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })

    expect(wrapper.find('.i-carbon-document').exists()).toBe(true)
  })
})
```

- [ ] **Step 6: Vérifier que les deux tests échouent**

Run: `bun run test:unit -- --run test/components/header.test.ts test/components/app-bar.test.ts`
Expected: FAIL — `.i-carbon-document` introuvable dans les deux cas.

- [ ] **Step 7: Ajouter l'entrée CV au store de navigation**

```ts
// src/stores/nav.ts — remplacer le corps de useNavStore
export const useNavStore = defineStore('nav', () => {
  const home = 'stores.nav.home'
  const settings = 'stores.nav.settings'

  const main = ref<NavItem[]>([
    { name: 'stores.nav.top.technologies.title', to: 'technologies', icon: 'i-mdi:tools', description: 'stores.nav.top.technologies.description' },
    { name: 'stores.nav.top.companies.title', to: 'companies', icon: 'i-mdi:company', description: 'stores.nav.top.companies.description' },
    { name: 'stores.nav.top.studies.title', to: 'studies', icon: 'i-mdi:school', description: 'stores.nav.top.studies.description' },
  ])

  const projects = ref<NavItem>({
    name: 'stores.nav.top.projects.title',
    to: 'projects',
    icon: 'i-icon-park-outline:code-computer',
    description: 'stores.nav.top.projects.description',
  })

  const curriculumVitae = ref<NavItem>({
    name: 'stores.nav.top.curriculumVitae.title',
    to: 'curriculumVitae',
    icon: 'i-carbon-document',
    description: 'stores.nav.top.curriculumVitae.description',
  })

  return {
    main,
    projects,
    curriculumVitae,
    home,
    settings,
  }
})
```

```yaml
# src/stores/nav.yml
fr:
  stores:
    nav:
      home: Accueil
      settings: Paramètres
      top:
        technologies:
          title: Technologies
          description: Les Technologies que j'utilise
        companies:
          title: Entreprises
          description: Les entreprises qui m'ont fait confiance
        studies:
          title: Études
          description: Mon parcours universitaire
        projects:
          title: Projets
          description: Mes projets personnels
        curriculumVitae:
          title: CV
          description: Mon curriculum vitae
en:
  stores:
    nav:
      home: Home
      settings: Settings
      top:
        technologies:
          title: Technologies
          description: Technologies I use
        companies:
          title: Companies
          description: Companies that trusted me
        studies:
          title: Studies
          description: My academic background
        projects:
          title: Projects
          description: My personal projects
        curriculumVitae:
          title: Resume
          description: My resume
```

- [ ] **Step 8: Ajouter le lien CV dans le header (desktop)**

```vue
<!-- src/components/layout/header.vue — dans le dernier <div class="flex items-center gap-2"> -->
    <div class="flex items-center gap-2">
      <ButtonToggleTheme />
      <ButtonIcon
        icon="i-carbon-language"
        :title="t('components.layout.header.language')"
        @click="layoutStore.toggleLanguage"
      />
      <router-link :to="getUrlLocale('curriculumVitae')">
        <ButtonIcon icon="i-carbon-document" :title="t('components.layout.header.cv')" />
      </router-link>
      <router-link :to="getUrlLocale('profile')">
        <ButtonIcon icon="i-carbon-user" :title="t('components.layout.header.profile')" />
      </router-link>
    </div>
```

`getUrlLocale` est déjà déstructuré depuis `useTranslationsStore()` en haut du fichier — aucun import supplémentaire nécessaire.

```yaml
# src/components/layout/header.yml
fr:
  components:
    layout:
      header:
        profile: Profil
        cv: Voir le CV
        menu:
          reduce: Réduire le menu
          extend: Étendre le menu
        title: Portfolio de Joan Tassel
        language: Passer le site en anglais
en:
  components:
    layout:
      header:
        profile: Profile
        cv: View resume
        menu:
          reduce: Collapse menu
          extend: Expand menu
        title: "Joan Tassel's Portfolio"
        language: Translate the site to French
```

- [ ] **Step 9: Ajouter le lien CV dans l'app-bar (mobile)**

Le header desktop est masqué sous 768px (`src/layouts/default.vue:44-52`) ; sur mobile, la seule navigation persistante est l'`AppBar` du bas. Sans entrée CV là aussi, le correctif ne s'applique qu'au desktop.

```vue
<!-- src/components/layout/app-bar.vue -->
const links: Link[] = [
  {
    label: 'components.layout.app-bar.index',
    to: 'index',
    icon: 'i-carbon-home',
  },
  {
    label: 'components.layout.app-bar.projects',
    to: 'projects',
    icon: 'i-icon-park-outline:code-computer',
    big: true,
  },
  {
    label: 'components.layout.app-bar.cv',
    to: 'curriculumVitae',
    icon: 'i-carbon-document',
  },
  {
    label: 'components.layout.app-bar.profile',
    to: 'profile',
    icon: 'i-carbon-user',
  },
]
```

```yaml
# src/components/layout/app-bar.yml
fr:
  components:
    layout:
      app-bar:
        index: Accueil
        projects: Projets
        cv: CV
        profile: Profil

en:
  components:
    layout:
      app-bar:
        index: Home
        projects: Projects
        cv: Resume
        profile: Profile
```

- [ ] **Step 10: Ajouter le lien CV en tête du sidenav (desktop étendu)**

```vue
<!-- src/components/layout/nav.vue — dans `links.top` -->
const links = ref<Links>({
  top: [
    { name: navStore.home, to: 'index', icon: 'i-carbon-home' },
    { ...navStore.curriculumVitae },
    ...navStore.main,
  ],
  categories: [
    {
      ...navStore.projects,
      links: [
        ...Object.values(projectStore.projectList).map(project => ({
          name: project.name,
          to: project.id,
          icon: project.icon,
        })),
      ],
    },
  ],
  bottom: [
    { name: navStore.settings, to: 'settings', icon: 'i-carbon-settings' },
  ],
})
```

(La structure de `categories` sera revue en profondeur dans la Task 10 — ici on ne fait que garder le comportement existant intact.)

- [ ] **Step 11: Régénérer les locales et vérifier que les tests passent**

Run: `bun run translate`
Run: `bun run test:unit -- --run test/components/header.test.ts test/components/app-bar.test.ts`
Expected: PASS — les deux tests passent.

- [ ] **Step 12: Lint, typecheck, suite complète**

Run: `bun run lint && bun run typecheck && bun run test:unit -- --run`
Expected: tout vert.

- [ ] **Step 13: Commit**

```bash
git add locales/fr.yml locales/en.yml src/stores/nav.ts src/stores/nav.yml \
  src/components/layout/nav.vue src/components/layout/header.vue src/components/layout/header.yml \
  src/components/layout/app-bar.vue src/components/layout/app-bar.yml \
  test/components/header.test.ts test/components/app-bar.test.ts
git commit -m "feat: ajoute un lien vers le CV dans le header, l'app-bar et le sidenav"
```

---

## Task 2: Tokens de motion (variables CSS + règles UnoCSS)

Fondation partagée pour la Partie 2 du spec : un vocabulaire de durées/easing unique, exposé à la fois en CSS pur (pour les fichiers `.css`) et en classes UnoCSS (pour l'attributify utilisé dans les composants). Aucun composant n'est modifié ici — c'est fait Task 3 et 4.

**Files:**

- Create: `src/styles/motion.css`
- Modify: `src/styles/main.scss:1-4` (ajoute l'import)
- Modify: `uno.config.ts` (ajoute des `rules`)
- Test: `test/styles/motion.test.ts`

**Interfaces:**

- Produces: variables CSS globales `--motion-fast` (150ms), `--motion-base` (300ms), `--motion-slow` (500ms), `--motion-ease` (`cubic-bezier(0.22, 1, 0.36, 1)`), automatiquement réduites à `0.01ms` sous `prefers-reduced-motion: reduce`.
- Produces: classes UnoCSS `duration-motion-fast`, `duration-motion-base`, `duration-motion-slow`, `ease-motion`.

- [ ] **Step 1: Écrire le test (rouge) vérifiant le contenu des tokens**

Un test de contenu de fichier est le seul moyen pertinent de vérifier des tokens CSS purs en environnement Vitest/jsdom (jsdom n'applique pas de vraies media queries CSS) — il protège contre une régression (valeur codée en dur qui remplace le token, media query supprimée).

```ts
// test/styles/motion.test.ts
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/motion.css', 'utf-8')

describe('motion.css', () => {
  it('définit les trois durées et l\'easing communs', () => {
    expect(css).toContain('--motion-fast: 150ms;')
    expect(css).toContain('--motion-base: 300ms;')
    expect(css).toContain('--motion-slow: 500ms;')
    expect(css).toContain('--motion-ease: cubic-bezier(0.22, 1, 0.36, 1);')
  })

  it('réduit les durées à quasi zéro sous prefers-reduced-motion', () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion: reduce\)/)
    const reducedBlock = css.split('@media (prefers-reduced-motion: reduce)')[1]
    expect(reducedBlock).toContain('--motion-fast: 0.01ms;')
    expect(reducedBlock).toContain('--motion-base: 0.01ms;')
    expect(reducedBlock).toContain('--motion-slow: 0.01ms;')
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/styles/motion.test.ts`
Expected: FAIL — `src/styles/motion.css` n'existe pas.

- [ ] **Step 3: Créer le fichier de tokens**

```text
/* src/styles/motion.css */
:root {
  --motion-fast: 150ms;
  --motion-base: 300ms;
  --motion-slow: 500ms;
  --motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-fast: 0.01ms;
    --motion-base: 0.01ms;
    --motion-slow: 0.01ms;
  }
}
```

```text
/* src/styles/main.scss — en tête de fichier */
@use './colors.css';
@use './motion.css';
@use './markdown.css';
@use './scrollbar.css';
@use './reveal.css';
```

- [ ] **Step 4: Ajouter les règles UnoCSS correspondantes**

```text
// uno.config.ts
export default defineConfig({
  content: {
    pipeline: {
      include: [
        'src/**/*.{vue,js,ts}',
      ],
    },
  },
  rules: [
    ['duration-motion-fast', { 'transition-duration': 'var(--motion-fast)' }],
    ['duration-motion-base', { 'transition-duration': 'var(--motion-base)' }],
    ['duration-motion-slow', { 'transition-duration': 'var(--motion-slow)' }],
    ['ease-motion', { 'transition-timing-function': 'var(--motion-ease)' }],
  ],
  theme: {
    // ... inchangé
```

(Insérer `rules` comme nouvelle clé du même objet passé à `defineConfig`, avant ou après `theme` — l'ordre des clés ne change rien.)

- [ ] **Step 5: Vérifier que le test passe**

Run: `bun run test:unit -- --run test/styles/motion.test.ts`
Expected: PASS.

- [ ] **Step 6: Vérification manuelle des classes UnoCSS générées**

Run: `bun run dev`, ouvrir la home, dans les devtools appliquer temporairement `class="duration-motion-base ease-motion"` sur un élément quelconque et confirmer dans l'onglet Styles que `transition-duration: var(--motion-base)` et `transition-timing-function: var(--motion-ease)` sont bien générées (preuve que UnoCSS reconnaît les nouvelles règles).

- [ ] **Step 7: Lint, typecheck**

Run: `bun run lint && bun run typecheck`
Expected: vert.

- [ ] **Step 8: Commit**

```bash
git add src/styles/motion.css src/styles/main.scss uno.config.ts test/styles/motion.test.ts
git commit -m "feat: ajoute un vocabulaire de motion commun (tokens CSS + regles UnoCSS)"
```

---

## Task 3: Reduced motion pour `v-reveal`

`v-reveal` (directive `src/directives/reveal.ts` + `src/styles/reveal.css`) est l'animation la plus utilisée du site (quasi toutes les pages) et c'est la seule, avec `info-gold.vue`, qui n'existait pas encore en Task 2. En la faisant consommer les tokens de motion, elle hérite automatiquement du comportement `prefers-reduced-motion` défini centralement — pas besoin d'ajouter sa propre media query.

**Files:**

- Modify: `src/styles/reveal.css`
- Test: `test/styles/reveal.test.ts`

**Interfaces:**

- Consumes: `--motion-slow`, `--motion-ease` (Task 2).

- [ ] **Step 1: Écrire le test (rouge)**

```ts
// test/styles/reveal.test.ts
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/reveal.css', 'utf-8')

describe('reveal.css', () => {
  it('utilise les tokens de motion partagés plutôt que des durées codées en dur', () => {
    expect(css).toContain('var(--motion-slow')
    expect(css).toContain('var(--motion-ease')
    expect(css).not.toMatch(/0\.6s/)
  })

  it('n\'anime que opacity et transform (neutre CLS)', () => {
    expect(css).toMatch(/transition:/)
    expect(css).not.toMatch(/(top|margin|height|width)\s*:/)
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/styles/reveal.test.ts`
Expected: FAIL — `reveal.css` contient encore `0.6s ease-out`.

- [ ] **Step 3: Convertir `reveal.css` aux tokens de motion**

```text
/* src/styles/reveal.css */
.reveal-hidden {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--motion-slow) var(--motion-ease) var(--reveal-delay, 0s),
    transform var(--motion-slow) var(--motion-ease) var(--reveal-delay, 0s);
}

.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 4: Vérifier que le test passe**

Run: `bun run test:unit -- --run test/styles/reveal.test.ts`
Expected: PASS.

- [ ] **Step 5: Vérification manuelle du reduced-motion**

Run: `bun run dev`. Dans Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce", recharger une page utilisant `v-reveal` (ex. `/`) et confirmer que les éléments apparaissent quasi instantanément (pas de glissement visible sur 500ms). Désactiver l'émulation et confirmer que l'animation normale (glissement + fondu) revient.

- [ ] **Step 6: Lint, typecheck**

Run: `bun run lint && bun run typecheck`

- [ ] **Step 7: Commit**

```bash
git add src/styles/reveal.css test/styles/reveal.test.ts
git commit -m "feat: v-reveal respecte prefers-reduced-motion via les tokens de motion"
```

---

## Task 4: Application des tokens de motion aux composants

Remplace les durées codées en dur (300ms, 900ms, 200ms) identifiées par l'audit dans les composants (hors `info-gold.vue`, jamais touché) par les classes `duration-motion-*`/`ease-motion` de la Task 2.

**Files:**

- Modify: `src/components/card.vue:46`
- Modify: `src/components/nav/link.vue:52`
- Modify: `src/components/button/toggle-theme.vue:19`
- Modify: `src/components/layout/footer.vue:50`
- Modify: `src/pages/index.vue:69,162`
- Modify: `src/pages/projects/index.vue:35`
- Modify: `src/components/ProjectDetails.vue:44,143,156-164`
- Test: `test/components/motion-rollout.test.ts`

**Interfaces:**

- Consumes: classes `duration-motion-fast`, `duration-motion-base`, `ease-motion` (Task 2).

- [ ] **Step 1: Écrire les tests (rouges) pour chaque composant**

```ts
// test/components/motion-rollout.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ToggleTheme from '../../src/components/button/toggle-theme.vue'
import Card from '../../src/components/card.vue'

describe('rollout des tokens de motion', () => {
  it('card.vue utilise duration-motion-base', () => {
    const wrapper = mount(Card)
    expect(wrapper.attributes('transition')).toBe('background-color duration-motion-base')
  })

  it('button/toggle-theme.vue passe de 900ms à duration-motion-base', () => {
    const wrapper = mount(ToggleTheme)
    const knob = wrapper.find('span')
    expect(knob.attributes('transition')).toBe('transform duration-motion-base ease-motion')
  })
})
```

- [ ] **Step 2: Vérifier que les tests échouent**

Run: `bun run test:unit -- --run test/components/motion-rollout.test.ts`
Expected: FAIL — les attributs `transition` contiennent encore `duration-300`/`duration-900`.

- [ ] **Step 3: Appliquer les tokens dans `card.vue`**

```vue
<!-- src/components/card.vue:46 -->
    transition="background-color duration-motion-base"
```

- [ ] **Step 4: Appliquer les tokens dans `nav/link.vue`**

```vue
<!-- src/components/nav/link.vue:52 -->
    transition="colors duration-motion-fast ease-motion"
```

- [ ] **Step 5: Appliquer les tokens dans `button/toggle-theme.vue`**

```vue
<!-- src/components/button/toggle-theme.vue:19 -->
      transition="transform duration-motion-base ease-motion"
```

- [ ] **Step 6: Appliquer les tokens dans `layout/footer.vue`**

```vue
<!-- src/components/layout/footer.vue:50 -->
        transition="text duration-motion-base ease-motion"
```

- [ ] **Step 7: Appliquer les tokens dans `pages/index.vue`**

```vue
<!-- src/pages/index.vue:69 -->
        hover="scale-102" transition="transition-transform duration-motion-base"
```

```vue
<!-- src/pages/index.vue:162 -->
      <div class="flex flex-col items-center gap-2 text-center" transition="transform duration-motion-base" hover="scale-102" dark="text-purple-400">
```

- [ ] **Step 8: Appliquer les tokens dans `pages/projects/index.vue`**

```vue
<!-- src/pages/projects/index.vue:35 -->
        hover="scale-102"
        transition="transition-transform duration-motion-base"
```

- [ ] **Step 9: Appliquer les tokens dans `ProjectDetails.vue`**

```vue
<!-- src/components/ProjectDetails.vue:44 -->
          class="relative flex items-center gap-3 rounded-lg p-4 transition-colors duration-motion-base"
```

```vue
<!-- src/components/ProjectDetails.vue:143 -->
          transition="colors duration-motion-base ease-motion"
```

Dans le bloc `<style scoped>` du même fichier (lignes 156-164) :

```text
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--motion-base) var(--motion-ease);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
```

- [ ] **Step 10: Vérifier que les tests passent**

Run: `bun run test:unit -- --run test/components/motion-rollout.test.ts`
Expected: PASS.

- [ ] **Step 11: Suite complète, lint, typecheck**

Run: `bun run test:unit -- --run && bun run lint && bun run typecheck`

- [ ] **Step 12: Commit**

```bash
git add src/components/card.vue src/components/nav/link.vue src/components/button/toggle-theme.vue \
  src/components/layout/footer.vue src/pages/index.vue src/pages/projects/index.vue \
  src/components/ProjectDetails.vue test/components/motion-rollout.test.ts
git commit -m "refactor: applique les tokens de motion communs aux composants"
```

---

## Task 5: Modèle de données — catégories de projet

Fondation partagée pour les Parties 1 et 4 du spec : un catalogue unique de 3 catégories (`game`, `tool`, `education`), chacune avec un libellé i18n, une icône et des classes de couleur littérales (texte + puce), choisies et vérifiées AA contre les fonds de carte réels (`bg-light-100` = `#fcfcfc`, `bg-dark-700` = `#1b1b1b`, valeurs lues dans le CSS compilé du site) :

| Catégorie   | Texte clair (sur `#fcfcfc`)                                      | Ratio  | Texte sombre (sur `#1b1b1b`) | Ratio  |
| ----------- | ---------------------------------------------------------------- | ------ | ---------------------------- | ------ |
| `game`      | `text-violet-600`                                                | 5.55:1 | `text-violet-400`            | 6.33:1 |
| `tool`      | `text-teal-700` (pas 600, qui ne passe qu'à 3.65:1)              | 5.33:1 | `text-teal-400`              | 9.25:1 |
| `education` | `text-rose-700` (marge de sécurité vs. 600, à 4.57:1 tout juste) | 6.13:1 | `text-rose-400`              | 6.40:1 |

Répartition des 11 projets (établie à partir de leur description) : `game` = game-engine, map-game, game-666, shlagemon, mini-games (5) ; `tool` = bot-chat, interface-administration, groove-box, migracount (4) ; `education` = map-education, video-learning (2).

Les couleurs sont des chaînes de classes Tailwind **littérales et complètes** (jamais construites par interpolation de template) — c'est ce qui permet à UnoCSS de les détecter statiquement dans le pipeline de contenu, exactement comme le tableau `colors` déjà utilisé aujourd'hui dans `pages/index.vue`.

**Files:**

- Create: `src/composables/project-categories.ts`
- Create: `src/composables/project-categories.yml`
- Modify: `src/types/project.type.ts`
- Modify: `src/stores/projects/game-engine.ts`, `map-game.ts`, `game-666.ts`, `shlagemon.ts`, `mini-games.ts`, `chat-bot.ts`, `interface-administration.ts`, `groove-box.ts`, `migracount.ts`, `map-education.ts`, `video-learning.ts`
- Test: `test/composables/project-categories.test.ts`, `test/stores/projects.test.ts`

**Interfaces:**

- Produces: `type ProjectCategory = 'game' | 'tool' | 'education'`
- Produces: `PROJECT_CATEGORIES: ProjectCategoryMeta[]` (chaque `ProjectCategoryMeta` a `id`, `labelKey`, `icon`, `textClass`, `chipClass`)
- Produces: `getProjectCategory(id: ProjectCategory): ProjectCategoryMeta` (lève si `id` inconnu)
- Produces: `Project.category: ProjectCategory` (nouveau champ, requis)

- [ ] **Step 1: Écrire le test (rouge) du catalogue de catégories**

```ts
// test/composables/project-categories.test.ts
import { describe, expect, it } from 'vitest'
import { getProjectCategory, PROJECT_CATEGORIES } from '../../src/composables/project-categories'

describe('project-categories', () => {
  it('expose exactement 3 categories avec un identifiant unique', () => {
    const ids = PROJECT_CATEGORIES.map(category => category.id)
    expect(ids).toEqual(['game', 'tool', 'education'])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('retourne la categorie correspondante avec getProjectCategory', () => {
    expect(getProjectCategory('tool').labelKey).toBe('stores.projectCategories.tool')
    expect(getProjectCategory('tool').textClass).toContain('teal-700')
  })

  it('leve une erreur pour un identifiant inconnu', () => {
    expect(() => getProjectCategory('unknown' as any)).toThrow('Unknown project category: unknown')
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/composables/project-categories.test.ts`
Expected: FAIL — le module n'existe pas.

- [ ] **Step 3: Créer le catalogue de catégories**

```ts
// src/composables/project-categories.ts
import type { I18nKey } from '~/types/i18n'

export type ProjectCategory = 'game' | 'tool' | 'education'

export interface ProjectCategoryMeta {
  id: ProjectCategory
  labelKey: I18nKey
  icon: string
  textClass: string
  chipClass: string
}

export const PROJECT_CATEGORIES: ProjectCategoryMeta[] = [
  {
    id: 'game',
    labelKey: 'stores.projectCategories.game',
    icon: 'i-mdi:gamepad-variant',
    textClass: 'text-violet-600 dark:text-violet-400',
    chipClass: 'bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  },
  {
    id: 'tool',
    labelKey: 'stores.projectCategories.tool',
    icon: 'i-mdi:tools',
    textClass: 'text-teal-700 dark:text-teal-400',
    chipClass: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300',
  },
  {
    id: 'education',
    labelKey: 'stores.projectCategories.education',
    icon: 'i-mdi:school',
    textClass: 'text-rose-700 dark:text-rose-400',
    chipClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  },
]

export function getProjectCategory(id: ProjectCategory): ProjectCategoryMeta {
  const category = PROJECT_CATEGORIES.find(category => category.id === id)
  if (!category) {
    throw new Error(`Unknown project category: ${id}`)
  }
  return category
}
```

```yaml
# src/composables/project-categories.yml
fr:
  stores:
    projectCategories:
      game: Jeu
      tool: Outil
      education: Éducation
en:
  stores:
    projectCategories:
      game: Game
      tool: Tool
      education: Education
```

- [ ] **Step 4: Régénérer les locales et vérifier que le test passe**

Run: `bun run translate`
Run: `bun run test:unit -- --run test/composables/project-categories.test.ts`
Expected: PASS.

- [ ] **Step 5: Écrire le test (rouge) de couverture des 11 projets**

```ts
// test/stores/projects.test.ts
import { describe, expect, it } from 'vitest'
import { PROJECT_CATEGORIES } from '../../src/composables/project-categories'
import { useProjectsStore } from '../../src/stores/projects'

describe('projects store', () => {
  it('assigne une categorie valide a chacun des 11 projets', () => {
    const projectsStore = useProjectsStore()
    const validIds = PROJECT_CATEGORIES.map(category => category.id)
    const projects = Object.values(projectsStore.projectList)

    expect(projects).toHaveLength(11)
    for (const project of projects) {
      expect(validIds).toContain(project.category)
    }
  })
})
```

- [ ] **Step 6: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/stores/projects.test.ts`
Expected: FAIL — TypeScript refuse la compilation (`category` n'existe pas sur `Project`) ou, si Vitest laisse passer, `project.category` vaut `undefined`.

- [ ] **Step 7: Ajouter le champ `category` au type `Project`**

```ts
import type { I18nKey } from './i18n'
import type { ProjectRouteKey } from './route.type'
// src/types/project.type.ts
import type { ProjectCategory } from '~/composables/project-categories'
import type { Technology } from '~/stores/technologies'

export interface Project {
  id: ProjectRouteKey
  category: ProjectCategory
  meta: {
    title: I18nKey
    description: I18nKey
  }
  name: I18nKey
  description: I18nKey
  shortDescription: I18nKey
  image: string
  technologies: Technology[]
  explains: Explain[]
  difficulties: I18nKey[]
  icon: string
  links?: {
    name: I18nKey
    more?: I18nKey
    url: string
    icon: string
    type?: 'youtube' | 'tiktok' | 'github'
  }[]
}

interface Explain {
  image: string
  title: I18nKey
  description: I18nKey
}
```

- [ ] **Step 8: Renseigner la catégorie dans chacun des 11 stores de projet**

Ajouter la ligne `category: '...'` juste après `id: '...'` dans chaque fichier :

```ts
// src/stores/projects/game-engine.ts    → category: 'game'
// src/stores/projects/map-game.ts       → category: 'game'
// src/stores/projects/game-666.ts       → category: 'game'
// src/stores/projects/shlagemon.ts      → category: 'game'
// src/stores/projects/mini-games.ts     → category: 'game'
// src/stores/projects/chat-bot.ts       → category: 'tool'
// src/stores/projects/interface-administration.ts → category: 'tool'
// src/stores/projects/groove-box.ts     → category: 'tool'
// src/stores/projects/migracount.ts     → category: 'tool'
// src/stores/projects/map-education.ts  → category: 'education'
// src/stores/projects/video-learning.ts → category: 'education'
```

Exemple pour `game-engine.ts` :

```text
  const project: Project = {
    id: 'game-engine',
    category: 'game',
    meta: {
```

- [ ] **Step 9: Vérifier que les tests passent**

Run: `bun run test:unit -- --run test/composables/project-categories.test.ts test/stores/projects.test.ts`
Expected: PASS.

- [ ] **Step 10: Lint, typecheck, suite complète**

Run: `bun run lint && bun run typecheck && bun run test:unit -- --run`

- [ ] **Step 11: Commit**

```bash
git add src/composables/project-categories.ts src/composables/project-categories.yml \
  src/types/project.type.ts src/stores/projects/*.ts locales/fr.yml locales/en.yml \
  test/composables/project-categories.test.ts test/stores/projects.test.ts
git commit -m "feat: ajoute un modele de categories de projet (game/tool/education)"
```

---

## Task 6: Couleur de catégorie sur la grille de projets, nettoyage de la home

Applique la couleur de catégorie (Task 5) sur les 11 cartes de `/projects`, et retire le tableau `colors[index % colors.length]` de la home — qui ne colore pas des projets mais 4 raccourcis de navigation (Projets/Technologies/Entreprises/Études) sans rapport avec les catégories de projet. Le spec (Partie 1) demande une palette resserrée pour "le reste du site" : ces 4 cartes basculent sur l'accent bleu déjà utilisé pour les liens du site (`text-blue-600 dark:text-blue-400`, vérifié AA en Task 7 — 5.03:1 clair, 6.78:1 sombre).

**Files:**

- Modify: `src/pages/projects/index.vue:38`
- Modify: `src/pages/index.vue:21-27,66`

**Interfaces:**

- Consumes: `PROJECT_CATEGORIES`, `getProjectCategory` (Task 5, auto-importés).

- [ ] **Step 1: Écrire le test (rouge)**

```ts
// test/pages/projects-colors.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectsIndex from '../../src/pages/projects/index.vue'

describe('page projets — couleur de categorie', () => {
  it('colore le titre de chaque projet selon sa categorie', () => {
    const wrapper = mount(ProjectsIndex, {
      global: {
        stubs: { RouterLink: true, Image: true },
      },
    })

    const gameEngineTitle = wrapper.findAll('h2').find(h2 => h2.text().includes('Moteur de Jeu Web'))
    expect(gameEngineTitle?.classes()).toContain('text-violet-600')
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/pages/projects-colors.test.ts`
Expected: FAIL — la classe `text-violet-600` est absente.

- [ ] **Step 3: Appliquer la couleur de catégorie sur la grille de projets**

```vue
<!-- src/pages/projects/index.vue:36-41 -->
        <Card is-hoverable :footer="t('pages.projects.discover')" class="h-full">
          <h2 v-reveal class="flex items-center gap-2 text-lg font-bold" :class="getProjectCategory(project.category).textClass">
            <div :class="project.icon" class="min-w-4" />
            {{ t(project.name) }}
          </h2>
```

- [ ] **Step 4: Vérifier que le test passe**

Run: `bun run test:unit -- --run test/pages/projects-colors.test.ts`
Expected: PASS.

- [ ] **Step 5: Retirer le tableau de couleurs arbitraires de la home**

```vue
<!-- src/pages/index.vue — script setup, retirer entièrement -->
const colors = [
  'text-red-600 dark:text-red-400',
  'text-blue-600 dark:text-blue-400',
  'text-green-700 dark:text-green-400',
  'text-purple-800 dark:text-yellow-400',
  'text-purple-600 dark:text-purple-400',
]
```

```vue
<!-- src/pages/index.vue:63-69 — retirer :class="colors[index % colors.length]" -->
      <Card
        v-for="(card, index) in cards" :key="card.name" v-reveal
        :to="card.to"
        class="flex items-center justify-center text-blue-600 dark:text-blue-400"
        lg="aspect-square"
        hover="scale-102" transition="transition-transform duration-motion-base"
      >
```

(`index` n'est plus utilisé pour la couleur ; il reste nécessaire pour `:key` implicite via `card.name` — vérifier qu'aucun autre usage de `index` ne subsiste dans la boucle avant de le retirer des paramètres si `eslint` signale une variable inutilisée.)

- [ ] **Step 6: Test de non-régression sur la home**

```ts
// test/pages/index-colors.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import IndexPage from '../../src/pages/index.vue'

describe('home — nettoyage des couleurs arbitraires', () => {
  it('utilise l\'accent bleu du site plutot qu\'un arc-en-ciel par index', () => {
    const wrapper = mount(IndexPage, {
      global: {
        stubs: { RouterLink: true, Image: true },
      },
    })

    const workCards = wrapper.findAll('.text-blue-600')
    expect(workCards.length).toBeGreaterThan(0)
    expect(wrapper.html()).not.toContain('text-red-600')
    expect(wrapper.html()).not.toContain('text-green-700')
  })
})
```

Run: `bun run test:unit -- --run test/pages/index-colors.test.ts`
Expected: PASS directement (implémenté à l'étape précédente) — si rouge, ajuster l'étape 5.

- [ ] **Step 7: Lint, typecheck, suite complète**

Run: `bun run lint && bun run typecheck && bun run test:unit -- --run`

- [ ] **Step 8: Commit**

```bash
git add src/pages/projects/index.vue src/pages/index.vue \
  test/pages/projects-colors.test.ts test/pages/index-colors.test.ts
git commit -m "feat: colore les projets par categorie, retire l'arc-en-ciel arbitraire de la home"
```

---

## Task 7: Audit et verrouillage du contraste

Le spec demande un audit de contraste calculé (pas estimé) sur les combinaisons texte/fond identifiées. Plutôt qu'une vérification manuelle jetable, cette tâche livre un utilitaire de calcul de contraste WCAG réutilisable et un test qui verrouille chaque paire couleur/fond réellement utilisée dans le code — y compris les nouvelles couleurs de catégorie (Task 5). Résultat de l'audit : les paires `text-blue-600`/`text-blue-400` déjà utilisées dans `technologies.vue`, `link/Intern.vue`, `link/Extern.vue`, `card/study.vue`, `card/company.vue` passent déjà largement l'AA (5.03:1 et 6.78:1) — aucun changement de couleur n'est nécessaire dans ces fichiers ; le test sert de garde-fou pour l'avenir.

**Files:**

- Create: `src/utils/contrast.ts`
- Test: `test/utils/contrast.test.ts`

**Interfaces:**

- Produces: `contrastRatio(foregroundHex: string, backgroundHex: string): number`

- [ ] **Step 1: Écrire le test (rouge) de l'utilitaire de contraste**

```ts
// test/utils/contrast.test.ts
import { describe, expect, it } from 'vitest'
import { contrastRatio } from '../../src/utils/contrast'

describe('contrastRatio', () => {
  it('calcule un ratio de 21:1 entre noir et blanc', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
  })

  it('calcule un ratio de 1:1 pour deux couleurs identiques', () => {
    expect(contrastRatio('#2563eb', '#2563eb')).toBeCloseTo(1, 1)
  })
})

describe('audit AA des couleurs de texte reellement utilisees', () => {
  const lightCardBg = '#fcfcfc' // bg-light-100
  const darkCardBg = '#1b1b1b' // dark-700

  it.each([
    ['blue-600 sur fond clair (technologies, liens, cards CV)', '#2563eb', lightCardBg],
    ['blue-400 sur fond sombre (technologies, liens, cards CV)', '#60a5fa', darkCardBg],
    ['violet-600 sur fond clair (categorie game)', '#7c3aed', lightCardBg],
    ['violet-400 sur fond sombre (categorie game)', '#a78bfa', darkCardBg],
    ['teal-700 sur fond clair (categorie tool)', '#0f766e', lightCardBg],
    ['teal-400 sur fond sombre (categorie tool)', '#2dd4bf', darkCardBg],
    ['rose-700 sur fond clair (categorie education)', '#be123c', lightCardBg],
    ['rose-400 sur fond sombre (categorie education)', '#fb7185', darkCardBg],
  ])('%s passe l\'AA (>= 4.5:1)', (_label, fg, bg) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it('confirme que teal-600 (non utilise) echouerait l\'AA, justifiant le choix de teal-700', () => {
    expect(contrastRatio('#0d9488', lightCardBg)).toBeLessThan(4.5)
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/utils/contrast.test.ts`
Expected: FAIL — le module n'existe pas.

- [ ] **Step 3: Implémenter l'utilitaire de contraste WCAG**

```ts
// src/utils/contrast.ts
function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const r = Number.parseInt(normalized.slice(0, 2), 16)
  const g = Number.parseInt(normalized.slice(2, 4), 16)
  const b = Number.parseInt(normalized.slice(4, 6), 16)
  return [r, g, b]
}

function channelLuminance(channel: number): number {
  const normalized = channel / 255
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

export function contrastRatio(foregroundHex: string, backgroundHex: string): number {
  const l1 = relativeLuminance(foregroundHex)
  const l2 = relativeLuminance(backgroundHex)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}
```

- [ ] **Step 4: Vérifier que les tests passent**

Run: `bun run test:unit -- --run test/utils/contrast.test.ts`
Expected: PASS — y compris la confirmation que `teal-600` échoue (justifiant `teal-700` dans Task 5).

- [ ] **Step 5: Lint, typecheck**

Run: `bun run lint && bun run typecheck`

- [ ] **Step 6: Commit**

```bash
git add src/utils/contrast.ts test/utils/contrast.test.ts
git commit -m "test: verrouille le contraste AA des couleurs de texte utilisees (audit calcule)"
```

---

## Task 8: Longueur de ligne pour les textes longs

Contraint la largeur des blocs de texte longs à une longueur de ligne lisible (`max-w-[65ch]`), sur `ProjectDetails.vue` (déjà dans un conteneur `max-w-4xl`, mais le paragraphe lui-même peut s'étirer pleine largeur à l'intérieur en grand écran) et les paragraphes de parcours de la home. La page `curriculum-vitae.vue` est volontairement exclue : c'est une mise en page fixe A4 destinée à l'impression (`src/layouts/print.vue`, `210mm × 297mm`), pas un flux de lecture — y appliquer une contrainte en `ch` casserait sa grille figée sans bénéfice de lisibilité.

**Files:**

- Modify: `src/components/ProjectDetails.vue:27,101`
- Modify: `src/pages/index.vue:96,107,131,142,154`

- [ ] **Step 1: Écrire le test (rouge)**

```ts
// test/components/project-details-typography.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectDetails from '../../src/components/ProjectDetails.vue'
import { useProjectsStore } from '../../src/stores/projects'

describe('ProjectDetails — longueur de ligne', () => {
  it('contraint la description principale a 65ch maximum', () => {
    const projectsStore = useProjectsStore()
    const project = Object.values(projectsStore.projectList)[0]

    const wrapper = mount(ProjectDetails, {
      props: { data: project },
      global: { stubs: { Image: true } },
    })

    const description = wrapper.find('header p')
    expect(description.classes()).toContain('max-w-[65ch]')
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/components/project-details-typography.test.ts`
Expected: FAIL.

- [ ] **Step 3: Appliquer la contrainte dans `ProjectDetails.vue`**

```vue
<!-- src/components/ProjectDetails.vue:27 -->
      <p class="max-w-[65ch] text-justify text-lg">
        {{ t(data.description) }}
      </p>
```

```vue
<!-- src/components/ProjectDetails.vue:101 -->
            <p class="max-w-[65ch] text-justify">
              {{ t(explain.description) }}
            </p>
```

- [ ] **Step 4: Appliquer la contrainte aux paragraphes de parcours de la home**

Sur les 4 `<p>` du bloc "journey" (`src/pages/index.vue:96,107,131,142`), ajouter `max-w-[65ch]` à la classe existante. Exemple :

```vue
<!-- src/pages/index.vue:96-97 -->
        <p class="max-w-[65ch]">
          {{ t('pages.index.journey.discovery.part1') }}<br>
```

Répéter pour les 3 autres `<p>` du même bloc (professional, freelance, today) en conservant leurs classes existantes (`class="align-middle"` devient `class="max-w-[65ch] align-middle"`, etc.).

- [ ] **Step 5: Vérifier que le test passe**

Run: `bun run test:unit -- --run test/components/project-details-typography.test.ts`
Expected: PASS.

- [ ] **Step 6: Vérification manuelle**

Run: `bun run dev`, ouvrir un projet (`/projects/game-engine`) et la home en grand écran (≥1440px) : confirmer que les paragraphes ne s'étirent plus pleine largeur du conteneur et restent lisibles (~65 caractères par ligne).

- [ ] **Step 7: Lint, typecheck, suite complète**

Run: `bun run lint && bun run typecheck && bun run test:unit -- --run`

- [ ] **Step 8: Commit**

```bash
git add src/components/ProjectDetails.vue src/pages/index.vue \
  test/components/project-details-typography.test.ts
git commit -m "style: limite la longueur de ligne des textes longs a 65ch"
```

---

## Task 9: Filtre par catégorie et recherche sur `/projects`

Implémente la Partie 4 du spec avec ses garde-fous SEO : la logique de filtrage est extraite en fonction pure testable isolément (`matchesProjectFilter`), et le rendu masque les cartes non retenues en CSS (`v-show`) plutôt que de les démonter (`v-if`), pour que les 11 liens projets restent toujours présents dans le HTML rendu, sans filtre pré-appliqué à l'état initial.

**Files:**

- Create: `src/composables/project-filter.ts`
- Modify: `src/pages/projects/index.vue`
- Modify: `src/pages/projects/index.yml`
- Test: `test/composables/project-filter.test.ts`, `test/pages/projects-filter.test.ts`

**Interfaces:**

- Produces: `matchesProjectFilter(project: Pick<Project, 'category'>, translatedName: string, translatedShortDescription: string, selectedCategories: ProjectCategory[], query: string): boolean`
- Consumes: `PROJECT_CATEGORIES` (Task 5).

- [ ] **Step 1: Écrire le test (rouge) de la logique de filtrage pure**

```ts
// test/composables/project-filter.test.ts
import { describe, expect, it } from 'vitest'
import { matchesProjectFilter } from '../../src/composables/project-filter'

describe('matchesProjectFilter', () => {
  const project = { category: 'game' as const }

  it('affiche le projet sans filtre ni recherche actifs', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], '')).toBe(true)
  })

  it('masque le projet si sa categorie n\'est pas selectionnee', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['tool'], '')).toBe(false)
  })

  it('affiche le projet si sa categorie est selectionnee', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['game'], '')).toBe(true)
  })

  it('filtre par recherche insensible a la casse sur le nom et la description', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], 'SHLAG')).toBe(true)
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], 'inexistant')).toBe(false)
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', [], 'clicker')).toBe(true)
  })

  it('combine categorie et recherche avec un ET logique', () => {
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['tool'], 'shlag')).toBe(false)
    expect(matchesProjectFilter(project, 'Shlagemon', 'Un clicker RPG', ['game'], 'shlag')).toBe(true)
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/composables/project-filter.test.ts`
Expected: FAIL — le module n'existe pas.

- [ ] **Step 3: Implémenter la fonction de filtrage pure**

```ts
// src/composables/project-filter.ts
import type { ProjectCategory } from '~/composables/project-categories'
import type { Project } from '~/types/project.type'

export function matchesProjectFilter(
  project: Pick<Project, 'category'>,
  translatedName: string,
  translatedShortDescription: string,
  selectedCategories: ProjectCategory[],
  query: string,
): boolean {
  const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category)
  const normalizedQuery = query.trim().toLowerCase()
  const matchesSearch = normalizedQuery === ''
    || `${translatedName} ${translatedShortDescription}`.toLowerCase().includes(normalizedQuery)
  return matchesCategory && matchesSearch
}
```

- [ ] **Step 4: Vérifier que les tests passent**

Run: `bun run test:unit -- --run test/composables/project-filter.test.ts`
Expected: PASS.

- [ ] **Step 5: Ajouter les clés i18n des filtres**

```yaml
# src/pages/projects/index.yml
fr:
  pages:
    projects:
      meta:
        title: Projets web récents – Sites, applications et réalisations modernes
        description: Parcourez une sélection de mes projets web, entre sites vitrines, applications interactives et expérimentations techniques.
      title: Mes projets
      discover: Découvrir le projet
      filters:
        categoryLabel: Filtrer par catégorie
        searchLabel: Rechercher un projet
        searchPlaceholder: Rechercher un projet…
en:
  pages:
    projects:
      meta:
        title: Recent Web Projects – Websites, Applications & Interactive Work
        description: Explore a curated selection of my web development projects, including modern websites, interactive apps, and technical experiments.
      title: My projects
      discover: Discover the project
      filters:
        categoryLabel: Filter by category
        searchLabel: Search a project
        searchPlaceholder: Search a project…
```

- [ ] **Step 6: Ajouter l'état de filtre et la logique de visibilité dans la page**

```vue
<!-- src/pages/projects/index.vue — script setup, ajouter -->
<script setup lang="ts">
import type { ProjectCategory } from '~/composables/project-categories'
import type { Project } from '~/types/project.type'

const { t, getUrlLocale } = useTranslationsStore()
const projectsStore = useProjectsStore()
const imagePath = (id: string, image: string) => `/assets/projects/${id}/${image}`
const projectUrl = (id: ProjectKey) => `${getUrlLocale(id)}`

useHeadTag({
  title: computed(() => t('pages.projects.meta.title')),
  description: computed(() => t('pages.projects.meta.description')),
  type: 'website',
})

const selectedCategories = ref<ProjectCategory[]>([])
const searchQuery = ref('')

function toggleCategory(id: ProjectCategory) {
  selectedCategories.value = selectedCategories.value.includes(id)
    ? selectedCategories.value.filter(category => category !== id)
    : [...selectedCategories.value, id]
}

function isProjectVisible(project: Project) {
  return matchesProjectFilter(project, t(project.name), t(project.shortDescription), selectedCategories.value, searchQuery.value)
}
</script>
```

(`ProjectKey` était déjà utilisé dans ce fichier — vérifier son import existant et le conserver ; `matchesProjectFilter` et `PROJECT_CATEGORIES` sont auto-importés depuis `src/composables/`.)

- [ ] **Step 7: Ajouter la barre de filtres et de recherche, et masquer (pas démonter) les cartes non retenues**

```vue
<!-- src/pages/projects/index.vue — template, avant la grille -->
    <div class="flex flex-col gap-3 px-2" md="px-4">
      <div class="flex flex-wrap gap-2" role="group" :aria-label="t('pages.projects.filters.categoryLabel')">
        <button
          v-for="category in PROJECT_CATEGORIES"
          :key="category.id"
          type="button"
          class="rounded-full px-3 py-1 text-sm font-medium transition-colors duration-motion-fast ease-motion"
          :class="[category.chipClass, selectedCategories.includes(category.id) ? 'ring-2 ring-offset-1' : 'opacity-60 hover:opacity-100']"
          :aria-pressed="selectedCategories.includes(category.id)"
          @click="toggleCategory(category.id)"
        >
          {{ t(category.labelKey) }}
        </button>
      </div>

      <input
        v-model="searchQuery"
        type="search"
        class="rounded-lg p-2"
        bg="light-100 dark:dark-700"
        :aria-label="t('pages.projects.filters.searchLabel')"
        :placeholder="t('pages.projects.filters.searchPlaceholder')"
      >
    </div>

    <div
      class="grid grid-cols-1 gap-4 overflow-hidden"
      md="grid-cols-2 p-4 overflow-initial"
      lg="grid-cols-3"
      xl="grid-cols-4"
      xxl="grid-cols-5"
    >
      <router-link
        v-for="project in projectsStore.projectList"
        v-show="isProjectVisible(project)"
        :key="project.name"
        :to="projectUrl(project.id)"
        class="aspect-square"
        xs="aspect-a"
        md="aspect-square"
        hover="scale-102"
        transition="transition-transform duration-motion-base"
      >
```

Le reste du contenu de la carte (inchangé) suit. `v-for` continue de parcourir tous les projets — seul `v-show` change, pas de `v-if`.

- [ ] **Step 8: Écrire le test (rouge) de la page**

```ts
// test/pages/projects-filter.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProjectsIndex from '../../src/pages/projects/index.vue'

describe('page projets — filtre et recherche', () => {
  it('affiche les 11 projets dans le DOM sans filtre pre-applique', () => {
    const wrapper = mount(ProjectsIndex, {
      global: { stubs: { RouterLink: true, Image: true } },
    })

    expect(wrapper.findAll('router-link-stub')).toHaveLength(11)
  })

  it('affiche un champ de recherche et une puce par categorie', () => {
    const wrapper = mount(ProjectsIndex, {
      global: { stubs: { RouterLink: true, Image: true } },
    })

    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
    expect(wrapper.findAll('button[aria-pressed]')).toHaveLength(3)
  })
})
```

- [ ] **Step 9: Vérifier, régénérer les locales, faire passer les tests**

Run: `bun run translate`
Run: `bun run test:unit -- --run test/pages/projects-filter.test.ts`
Expected: PASS.

- [ ] **Step 10: Vérification manuelle des garde-fous SEO**

Run: `bun run dev`, ouvrir `/projects`, ouvrir les DevTools → Elements, confirmer que les 11 `<a>` sont présents dans le DOM initial (sans interaction), puis cliquer une puce de catégorie et confirmer dans les DevTools que les cartes masquées reçoivent `style="display: none"` (ou équivalent) et restent dans le DOM, plutôt que d'en disparaître.

- [ ] **Step 11: Lint, typecheck, suite complète**

Run: `bun run lint && bun run typecheck && bun run test:unit -- --run`

- [ ] **Step 12: Commit**

```bash
git add src/composables/project-filter.ts src/pages/projects/index.vue src/pages/projects/index.yml \
  locales/fr.yml locales/en.yml \
  test/composables/project-filter.test.ts test/pages/projects-filter.test.ts
git commit -m "feat: ajoute le filtre par categorie et la recherche sur /projects"
```

---

## Task 10: Sidenav repliable par catégorie

Remplace l'unique catégorie "Projets" du sidenav (avec repli tout-ou-rien via `isNavExtended`) par les 3 catégories de la Task 5, chacune dépliable indépendamment. Le lien "Projets" vers `/projects` migre dans `links.top` puisque les en-têtes de catégorie ne sont plus des liens.

**Files:**

- Modify: `src/components/layout/nav.vue`
- Test: `test/components/nav.test.ts`

**Interfaces:**

- Consumes: `PROJECT_CATEGORIES` (Task 5).

- [ ] **Step 1: Écrire le test (rouge)**

```ts
// test/components/nav.test.ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import Nav from '../../src/components/layout/nav.vue'

async function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  })
  await router.push('/')
  await router.isReady()
  return router
}

describe('layout nav', () => {
  it('inclut le lien Projets et le lien CV dans les liens du haut', async () => {
    const router = await createTestRouter()
    const wrapper = mount(Nav, {
      global: { plugins: [router], stubs: { RouterLink: true } },
    })

    expect(wrapper.find('.i-icon-park-outline\\:code-computer').exists()).toBe(true)
    expect(wrapper.find('.i-carbon-document').exists()).toBe(true)
  })

  it('affiche 3 en-tetes de categorie repliables independamment', async () => {
    const router = await createTestRouter()
    const wrapper = mount(Nav, {
      global: { plugins: [router], stubs: { RouterLink: true } },
    })

    const headers = wrapper.findAll('button[aria-expanded]')
    expect(headers).toHaveLength(3)
    expect(headers.every(header => header.attributes('aria-expanded') === 'true')).toBe(true)
  })

  it('replie une categorie au clic sur son en-tete, sans affecter les autres', async () => {
    const router = await createTestRouter()
    const wrapper = mount(Nav, {
      global: { plugins: [router], stubs: { RouterLink: true } },
    })

    const headers = wrapper.findAll('button[aria-expanded]')
    await headers[0].trigger('click')

    expect(wrapper.findAll('button[aria-expanded]')[0].attributes('aria-expanded')).toBe('false')
    expect(wrapper.findAll('button[aria-expanded]')[1].attributes('aria-expanded')).toBe('true')
  })
})
```

- [ ] **Step 2: Vérifier que le test échoue**

Run: `bun run test:unit -- --run test/components/nav.test.ts`
Expected: FAIL — il n'y a qu'une seule catégorie et pas de `button[aria-expanded]`.

- [ ] **Step 3: Réécrire la construction des catégories et l'état de repli**

```vue
<!-- src/components/layout/nav.vue — script setup -->
<script setup lang="ts">
import type { ProjectCategory } from '~/composables/project-categories'
import type { I18nKey } from '~/types/i18n'
import { useNavStore } from '~/stores/nav'
import { RouteKey } from '~/types/route.type'

interface Link {
  name: I18nKey
  to: RouteKey
  icon: string
}

interface Category {
  name: I18nKey
  links: Link[]
  id: ProjectCategory
  textClass: string
  icon: string
}

interface Links {
  top: Link[]
  categories: Category[]
  bottom: Link[]
}

const projectStore = useProjectsStore()
const layoutStore = useLayoutStore()
const navStore = useNavStore()

const { t } = useTranslationsStore()

const links = ref<Links>({
  top: [
    { name: navStore.home, to: 'index', icon: 'i-carbon-home' },
    { ...navStore.projects },
    { ...navStore.curriculumVitae },
    ...navStore.main,
  ],
  categories: PROJECT_CATEGORIES.map(category => ({
    name: category.labelKey,
    id: category.id,
    icon: category.icon,
    textClass: category.textClass,
    links: Object.values(projectStore.projectList)
      .filter(project => project.category === category.id)
      .map(project => ({ name: project.name, to: project.id, icon: project.icon })),
  })),
  bottom: [
    { name: navStore.settings, to: 'settings', icon: 'i-carbon-settings' },
  ],
})

const expandedCategories = reactive(new Set<ProjectCategory>(PROJECT_CATEGORIES.map(category => category.id)))

function isExpanded(id: ProjectCategory) {
  return expandedCategories.has(id)
}

function toggleCategory(id: ProjectCategory) {
  if (expandedCategories.has(id)) {
    expandedCategories.delete(id)
  }
  else {
    expandedCategories.add(id)
  }
}

const route = useRoute()
function isActive(to: string) {
  return route.path === to
}
</script>
```

- [ ] **Step 4: Réécrire le template des catégories**

```vue
<!-- src/components/layout/nav.vue — template -->
    <div v-for="category in links.categories" :key="category.name" v-show="layoutStore.isNavExtended" class="flex flex-col gap-1px">
      <button
        type="button"
        class="flex items-center justify-between gap-2 rounded-md p-2 text-left font-bold transition-colors duration-motion-fast ease-motion"
        :class="category.textClass"
        hover="bg-light-600 dark:bg-dark-700"
        :aria-expanded="isExpanded(category.id)"
        @click="toggleCategory(category.id)"
      >
        <span class="flex items-center gap-2">
          <div :class="category.icon" class="min-w-4" />
          {{ t(category.name) }}
        </span>
        <div
          class="i-carbon-chevron-down transition-transform duration-motion-fast"
          :class="{ 'rotate-180': isExpanded(category.id) }"
        />
      </button>

      <NavLink
        v-for="link in category.links"
        v-show="isExpanded(category.id)"
        :key="link.name"
        :link="link"
        :active="isActive(link.to)"
      />
    </div>
```

(Le bloc `v-if="category.to"` / `v-else` précédent disparaît entièrement : plus aucune catégorie n'a de `to`.)

- [ ] **Step 5: Vérifier que les tests passent**

Run: `bun run test:unit -- --run test/components/nav.test.ts`
Expected: PASS.

- [ ] **Step 6: Vérification manuelle**

Run: `bun run dev`, ouvrir le site en desktop (≥768px), étendre le sidenav, confirmer les 3 catégories (Jeu/Outil/Éducation) avec leur couleur, replier "Jeu" au clic et confirmer que "Outil"/"Éducation" restent dépliées, que le chevron tourne, et que `aria-expanded` change dans les DevTools.

- [ ] **Step 7: Lint, typecheck, suite complète**

Run: `bun run lint && bun run typecheck && bun run test:unit -- --run`

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/nav.vue test/components/nav.test.ts
git commit -m "feat: sidenav — categories de projet repliables independamment"
```

---

## Vérification finale

Une fois les 10 tâches complétées :

- [ ] Run: `bun run lint && bun run typecheck && bun run test:unit -- --run` — tout vert.
- [ ] Run: `bun run build` — le build SSG passe sans erreur (notamment la génération du sitemap, cf. `vite.config.ts:165-169`).
- [ ] Parcours manuel complet (desktop + mobile émulé) : CV accessible en 1 clic depuis le header, l'app-bar et le sidenav ; `/projects` avec filtre + recherche fonctionnels ; sidenav avec 3 catégories repliables ; `prefers-reduced-motion` respecté sur `v-reveal` et les hovers ; contraste correct en dark et light.
