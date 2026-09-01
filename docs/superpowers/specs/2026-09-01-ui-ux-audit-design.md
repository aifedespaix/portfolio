# Audit UI/UX & refonte système visuel — Design

Date : 2026-09-01
Statut : validé par l'utilisateur en brainstorming, prêt pour plan d'implémentation.

## Contexte

Portfolio personnel (Vue 3 + UnoCSS + Pinia). `PRODUCT.md` définit déjà l'identité
cible : moderne, créative, ludique mais technique, avec un rejet explicite du
"style SaaS générique" (cartes identiques, gradient text, glassmorphism décoratif,
bordures latérales colorées), une exigence WCAG AA, et le respect de
`prefers-reduced-motion`.

`src/components/visual/info-gold.vue` (modification en cours, non committée au
moment de l'audit) illustre le niveau de finition visé : easing `cubic-bezier`
personnalisé, effet shimmer au survol, gestion explicite de
`prefers-reduced-motion`. C'est la référence de qualité pour ce travail.

Ce spec a ensuite été audité par deux agents jouant chacun un persona externe
(recruteur technique, consultant SEO) pour vérifier que le design tient face à
un lecteur qui n'a pas participé au brainstorming. Leurs constats ont fait
remonter un angle mort (accès au CV, ci-dessous) et deux garde-fous
d'implémentation (Parties 2 et 4) intégrés dans ce document.

## Constat (audit)

- **Couleur** : aucune palette centralisée. `src/styles/colors.css` ne définit
  qu'une variable (`--loadBar`). Les couleurs sont des classes Tailwind posées au
  cas par cas — ex. `colors[index % colors.length]` dans `src/pages/index.vue`
  (couleur de carte = position dans un tableau, sans rapport avec le contenu),
  `text-purple-600` en dur dans plusieurs pages. 9 fichiers différents contiennent
  des couleurs vives codées en dur (`text-(red|blue|green|purple|yellow|amber)-*`),
  sans registre commun.
- **Contraste** : jamais vérifié systématiquement. Des combinaisons comme
  `text-purple-600` sur `bg-light-100` ne sont pas garanties AA (4.5:1).
- **Motion** : durées incohérentes selon les composants — 300ms (hover cartes,
  `card.vue`, `pages/index.vue`, `projects/index.vue`), 600ms (`reveal.css`),
  900ms (`button/toggle-theme.vue`, lent pour un simple switch), 350ms avec easing
  `cubic-bezier(0.22, 1, 0.36, 1)` (`info-gold.vue`). Aucun vocabulaire commun.
  `prefers-reduced-motion` n'est géré que dans `info-gold.vue` — absent de
  `src/directives/reveal.ts` / `src/styles/reveal.css`, alors que c'est la
  transition la plus utilisée du site (quasi toutes les pages via `v-reveal`).
- **Typographie** : hiérarchie simple et cohérente sur les 3 niveaux dédiés
  (`title/main.vue`, `title/h2.vue`, `title/h3.vue`), mais rien au-delà — pas de
  règle de longueur de ligne, pas de poids/tracking documentés pour le corps de
  texte.
- **IA / navigation** : `src/stores/projects.ts` liste 11 projets à plat, sans
  catégorie. `src/pages/projects/index.vue` est une grille plate sans filtre ni
  recherche. `src/components/layout/nav.vue` a déjà une structure de données
  `categories` mais une seule catégorie ("projects") y est utilisée, et le seul
  mécanisme de repli est global (`layoutStore.isNavExtended` dans
  `src/stores/layout.ts`, tout-ou-rien).
- **CV inaccessible** (trouvé par l'audit recruteur) : la route
  `curriculum-vitae` (`src/routes/main-routes.ts`) et la page
  `src/pages/curriculum-vitae.vue` existent et sont complètes, mais aucun lien
  n'y mène — ni `header.vue` (icône profil → `/profile`, une page quasi vide),
  ni `nav.ts` (`main` = technologies/companies/studies), ni `footer.vue`. Un
  visiteur qui n'a pas l'URL exacte ne peut pas trouver le CV, alors que
  `PRODUCT.md` fixe explicitement la conversion en contact comme but du site.

## Objectifs

- Rendre le site plus "pro" en donnant un sens à chaque couleur et une cohérence
  aux transitions, sans perdre le côté ludique/personnel voulu par `PRODUCT.md`.
- Garantir AA partout, dark et light.
- Généraliser le respect de `prefers-reduced-motion` (actuellement un cas isolé).
- Faciliter la navigation dans les 11 projets : filtre par catégorie + recherche
  sur la page, repli par catégorie dans le sidenav.
- Rendre la page CV (déjà existante) accessible en un clic depuis le header et/ou
  le nav.

## Non-objectifs

- Pas de refonte de contenu/copywriting (le texte reste tel quel, seule sa forme
  — hiérarchie, contraste — est retravaillée).
- Pas de nouvelles pages ni de nouvelle structure de routes. Exception explicite :
  ajouter un **lien** vers la route `curriculum-vitae`, qui existe déjà, n'est pas
  une nouvelle route et reste dans le périmètre (Partie 0).
- Pas de changement du multicolore en une palette monochrome corporate (rejeté en
  brainstorming).
- Pas de schema.org (`ItemList`/`CreativeWork`) ni de badges de stack technique
  sur la home dans cette itération — pistes identifiées par l'audit SEO/recruteur,
  volontairement différées (voir "Pistes différées" en fin de document) pour ne
  pas élargir le scope déjà défini en brainstorming.

## Partie 0 — Accès au CV

Issu de l'audit recruteur : ajouter un lien vers la route `curriculum-vitae`
(déjà existante, cf. Constat) directement visible sans navigation supplémentaire
— ex. dans `src/components/layout/header.vue` (à côté ou à la place du lien
profil) et/ou en tête de `stores/nav.ts`. Pas de nouvelle page, pas de nouvelle
route : uniquement un lien manquant à ajouter. Changement isolé, à faire en
premier (impact conversion élevé, coût quasi nul, aucune dépendance avec les
autres parties).

## Partie 1 — Système de couleur

- Ajouter dans `uno.config.ts` (`theme.colors`) une palette de **catégories de
  projet** : une couleur fixe par catégorie (ex. jeu, outil, web/data, éducation),
  choisie pour rester distincte en clair et sombre et pour passer AA sur les fonds
  `light-100`/`dark-700` utilisés par `card.vue`.
- Chaque carte projet (accueil, page projets, sidenav) utilise la couleur de sa
  catégorie au lieu de `colors[index % colors.length]` (`src/pages/index.vue`) ou
  d'un choix arbitraire.
- Le reste du site (boutons, liens, CV) garde une palette de marque resserrée
  autour du bleu déjà utilisé comme `theme-color` (`#083BA0` dans `App.vue`) et
  des neutres `light-*`/`dark-*` existants — pas de nouvelle couleur de marque.
- Les couleurs de plateforme du footer (GitHub/LinkedIn/YouTube/Twitch, déjà
  sémantiques) restent inchangées.
- Toute nouvelle association couleur/texte est vérifiée AA (contraste calculé,
  pas estimé) avant d'être committée.

## Partie 2 — Système de motion

- Définir un petit vocabulaire de durées/easings en variables CSS (au niveau
  `:root`, à côté de `colors.css` ou dans un nouveau `motion.css`) :
  `--motion-fast` (~150ms), `--motion-base` (~300ms), `--motion-slow` (~500ms),
  et un easing commun inspiré de celui d'`info-gold.vue`
  (`cubic-bezier(0.22, 1, 0.36, 1)`).
- Remplacer les durées en dur (300ms, 600ms, 900ms, 350ms) par ces variables dans
  les composants concernés : `card.vue`, `nav/link.vue`, `button/toggle-theme.vue`
  (900ms → `--motion-base`), `layout/footer.vue`, `pages/index.vue`,
  `pages/projects/index.vue`.
- Étendre `prefers-reduced-motion` à `src/directives/reveal.ts` /
  `src/styles/reveal.css` : sous la media query, transition quasi instantanée
  (comme le fait déjà `.award-container` dans `info-gold.vue`) plutôt que
  translation de 20px sur 600ms.
- `info-gold.vue` n'a pas besoin d'être retouché pour la couleur/motion — il sert
  de modèle, pas de cible de refactor.
- **Règle CLS** (issue de l'audit SEO) : toute animation, actuelle ou future,
  n'anime que `opacity`/`transform` — jamais `top`/`margin`/`height`/`width`.
  C'est déjà le cas de `v-reveal` (translateY + opacity), ce qui le rend neutre
  vis-à-vis du Cumulative Layout Shift ; cette règle fige cette propriété pour le
  réarrangement de grille introduit par le filtre de la Partie 4.

## Partie 3 — Typographie & contraste

- Documenter (commentaire ou petit tableau dans le design system, pas de nouveau
  fichier de config obligatoire) le rôle de chaque niveau existant
  (`TitleMain`/`h1`, `TitleH2`, `TitleH3`) : poids, taille, cas d'usage.
- Ajouter une contrainte de longueur de ligne pour les blocs de texte longs (CV,
  descriptions de projet) — `max-width` en `ch` plutôt que laisser le texte
  s'étirer pleine largeur sur grand écran.
- Repasser toutes les combinaisons texte/fond identifiées dans l'audit
  (`text-purple-600`, `text-red-600`, etc. sur `bg-light-*`/`dark-*`) et ajuster
  les nuances qui ne passent pas AA (4.5:1 texte normal, 3:1 gros texte/UI).

## Partie 4 — IA : projets

- **Modèle de données** : ajouter un champ `category` à `Project`
  (`src/types/project.type.ts`), avec une liste fermée de catégories définies une
  fois (couplée à la palette de couleur de la Partie 1). Renseigner la catégorie
  de chacun des 11 projets dans `src/stores/projects/*.ts`.
- **Page `/projects`** (`src/pages/projects/index.vue`) : reste une grille plate
  (pas de sections groupées). Ajouter au-dessus de la grille :
  - une barre de **toggles de catégorie** (sélection multiple, style chip coloré
    selon la Partie 1) qui filtre la grille ;
  - une **barre de recherche** (filtre sur nom + description) combinée au filtre
    de catégorie (ET logique).
  - Filtrage réactif côté client (11 projets, pas besoin de pagination/backend).
  - **Garde-fous SEO** (issus de l'audit SEO) : à l'état initial (chargement de
    la page, avant toute interaction), aucun filtre n'est pré-appliqué — les 11
    projets sont visibles, y compris si un filtre était mémorisé d'une session
    précédente (pas de restauration automatique depuis `localStorage`/URL qui
    changerait le rendu par défaut). Le filtrage masque les cartes non
    matchées via une classe CSS (`v-show`/équivalent) plutôt que de les démonter
    du DOM (`v-if`), pour que les 11 liens projets restent toujours présents
    dans le HTML rendu.
- **Sidenav** (`src/components/layout/nav.vue`) : chaque catégorie devient une
  section dépliable indépendamment (état local par catégorie, ex. un `Set` de
  catégories ouvertes dans le composant ou un petit store), en plus du repli
  global existant (`layoutStore.isNavExtended`, qui masque/affiche tout le nav et
  reste inchangé). Un chevron/icône par en-tête de catégorie indique l'état.

## Pistes différées (identifiées, hors périmètre de cette itération)

Remontées par les audits recruteur/SEO mais volontairement exclues du scope
validé en brainstorming, pour ne pas transformer un audit visuel en refonte de
contenu/structure. À reconsidérer dans une itération ultérieure :

- **Badges de stack technique sur la home** (audit recruteur) : un résumé visuel
  Vue/TS/Pinia/UnoCSS visible sans clic, pour un scan en quelques secondes —
  actuellement noyé dans la page profonde `/technologies`.
- **Projets "phares"** (audit recruteur) : mettre en avant 2-3 projets
  représentatifs en tête de grille, indépendamment du filtre de catégorie —
  alternative jugée plus utile qu'une recherche texte pour un visiteur pressé.
- **Structured data schema.org** (audit SEO) : `ItemList` sur `/projects` et
  `CreativeWork`/`SoftwareSourceCode` par projet, en s'appuyant sur le nouveau
  champ `category` — coût faible, gain rich-results, mais distinct du travail
  visuel/motion couvert ici.
- **Ancres de section / breadcrumbs par catégorie** (audit SEO) : deep-links
  thématiques (`#categorie-jeu`) et `BreadcrumbList` sur les pages projet,
  compatibles avec le non-objectif "pas de nouvelles routes" mais non traités
  ici pour rester focalisé sur les 4 parties validées.

## Accessibilité — checklist de vérification

- Contraste AA vérifié (calcul, pas estimation) pour chaque nouvelle association
  couleur de catégorie / fond.
- `prefers-reduced-motion` respecté par toute nouvelle transition (Parties 1, 2, 4) et par `v-reveal` (actuellement non couvert).
- Barre de recherche et toggles de catégorie utilisables au clavier, avec un
  `aria-label` explicite (input recherche) et un état `aria-pressed`/équivalent
  pour les toggles.
- Sections dépliables du sidenav : `aria-expanded` sur le déclencheur.

## Ordre d'implémentation proposé

0. Lien vers le CV (Partie 0) — isolé, sans dépendance, impact conversion élevé.
1. Tokens couleur (Partie 1) + tokens motion (Partie 2, avec la règle CLS) —
   fondation partagée.
2. `v-reveal` + `reveal.css` : reduced-motion (gain accessibilité immédiat, isolé).
3. Application des tokens motion aux composants listés (Partie 2).
4. Application des couleurs de catégorie (cartes accueil, page projets, sidenav)
   - audit contraste (Partie 1 + 3).
5. Typographie / longueur de ligne (Partie 3).
6. IA projets : champ `category`, filtre + recherche sur `/projects` (avec les
   garde-fous SEO : état initial non filtré, `v-show` plutôt que `v-if`), repli
   par catégorie dans le sidenav (Partie 4).

Chaque étape est indépendamment vérifiable (visuellement + `bun run lint` /
`bun run typecheck`) avant de passer à la suivante.
