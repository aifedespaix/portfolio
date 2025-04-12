<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  path: string
  width: number
  height: number
  alt: string
  transparent?: boolean
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
}

const props = withDefaults(defineProps<Props>(), {
  loading: 'lazy',
  decoding: 'async',
  fetchPriority: 'auto',
  transparent: false,
})

// Extraction du dossier, nom de l'image et extension depuis `src`
const srcParts = computed(() => {
  const parts = props.path.split('/')

  if (parts.length < 2) {
    throw new Error('Path must contain at least 2 parts')
  }

  const name = parts.at(-1)
  const folder = parts.join('/')

  return { folder, name }
})

if (props.width % 2 !== 0) {
  throw new Error('Width must be even')
}

if (props.height % 2 !== 0) {
  throw new Error('Height must be even')
}

// Définition des tailles pour srcset (x0.5, x1, x2)
const sizes = computed(() => [props.width / 2, props.width, props.width * 2])

// Génération des chemins AVIF, WebP et original
function generateSrcset(ext: string) {
  return sizes.value.map(size => `${srcParts.value.folder}/${srcParts.value.name}-${size}.${ext} ${size}w`).join(', ')
}

const avifSrcset = computed(() => generateSrcset('avif'))
const webpSrcset = computed(() => generateSrcset('webp'))

const ext = props.transparent ? 'png' : 'jpg'
const classicSrcset = computed(() => generateSrcset(ext))

// Attribut `sizes` pour une gestion responsive optimale
const sizesAttr = computed(() => {
  // On utilise la largeur de l'image comme référence pour le calcul
  return `(min-width: ${props.width}px) ${props.width}px, 100vw`
})
</script>

<template>
  <picture class="picture">
    <!-- AVIF -->
    <source :srcset="avifSrcset" type="image/avif">

    <!-- WebP -->
    <source :srcset="webpSrcset" type="image/webp">

    <!-- Format d'origine (JPG/PNG) -->
    <img
      :src="`${srcParts.folder}/${srcParts.name}-${width}.${ext}`"
      :srcset="classicSrcset"
      :sizes="sizesAttr"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :decoding="decoding"
      :fetchpriority="fetchPriority"
      class="img"
    >
  </picture>
</template>

<style scoped>
.img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.picture {
  display: block;
}
</style>
