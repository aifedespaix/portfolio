import {
  createLocalFontProcessor,
} from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

const safelist = [
  'i-mdi:puzzle',
  'i-mdi:format-letter-starts-with',  
  'i-icon-park-outline:code-computer',
  'i-mdi:map',
  'i-mdi:map-marker-multiple',
  'i-mdi:administrator',
  'i-mdi:video',
  'i-mdi:text',
  'i-mdi:robot',
  'i-mdi:color',
  'i-mdi:gamepad',
  'i-mdi:mine',
  'i-mdi:fit-to-screen',
  'i-mdi:school',
  'i-mdi:company',
]

export default defineConfig({
  theme: {
    breakpoints: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      tertiary: 'var(--tertiary)',
      main: 'var(--main)',
      sub: 'var(--sub)',
      sup: 'var(--sup)',
      accent: 'var(--accent)',
      gold: 'var(--gold)',
      blue: 'var(--blue)',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' ').concat(safelist),
})
