import { existsSync, promises as fs, mkdirSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import sharp from 'sharp'

interface ImageOptions {
  width: number
  height: number
  inputFile: string
  transparent: boolean
}

async function generateImages({ width, height, inputFile, transparent }: ImageOptions) {
  const outputDir = path.join(__dirname)
  const inputPath = path.join(outputDir, inputFile)
  const baseFileName = path.basename(inputPath, path.extname(inputPath))

  console.log(transparent)

  // Créer le dossier de sortie s'il n'existe pas
  await fs.mkdir(outputDir, { recursive: true })

  const sizes = [
    { width: width / 2, height: height / 2, suffix: width / 2 },
    { width, height, suffix: width },
    { width: width * 2, height: height * 2, suffix: width * 2 },
  ]

  const formats = ['png', 'jpg', 'webp', 'avif']

  for (const size of sizes) {
    for (const format of formats) {
      const outputFileName = `${baseFileName}-${size.suffix}.${format}`
      const outputImageDir = path.join(outputDir, baseFileName)
      if (!existsSync(outputImageDir)) {
        mkdirSync(outputImageDir, { recursive: true })
      }
      const outputPath = path.join(outputImageDir, outputFileName)

      console.log(`Généré: ${outputPath}`)
      console.log(`Input: ${inputPath}`)
      await sharp(inputPath)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .toFormat(format as keyof sharp.FormatEnum)
        .toFile(outputPath)

      console.log(`Généré: ${outputFileName}`)
    }
  }
}

// Gestion des arguments en ligne de commande
const args = process.argv.slice(2)
const options: Partial<ImageOptions> = {}

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '-i':
      options.inputFile = args[++i]
      break
    case '-w':
      options.width = Number.parseInt(args[++i], 10)
      break
    case '-h':
      options.height = Number.parseInt(args[++i], 10)
      break
  }
}

if (!options.inputFile || !options.width || !options.height) {
  console.error('Usage: ts-node image-making.ts -i <input-file> -w <width> -h <height>')
  process.exit(1)
}

generateImages(options as ImageOptions).catch(console.error)
