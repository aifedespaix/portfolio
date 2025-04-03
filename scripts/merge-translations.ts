import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import yaml from 'js-yaml'

interface TranslationData {
  fr: Record<string, any>
  en: Record<string, any>
}

async function* walkDir(dir: string): AsyncGenerator<string> {
  const files = await readdir(dir, { withFileTypes: true })
  for (const file of files) {
    const path = join(dir, file.name)
    if (file.isDirectory()) {
      yield* walkDir(path)
    }
    else if (file.name.endsWith('.yml')) {
      yield path
    }
  }
}

function deepMerge(target: Record<string, any>, source: Record<string, any>, path: string[] = []): void {
  for (const key in source) {
    const newPath = [...path, key]
    if (key in target) {
      if (typeof target[key] === 'object' && typeof source[key] === 'object') {
        deepMerge(target[key], source[key], newPath)
      }
      else {
        console.warn(`Conflit détecté à ${newPath.join('.')}:`)
        console.warn(`  Valeur existante: ${JSON.stringify(target[key])}`)
        console.warn(`  Nouvelle valeur: ${JSON.stringify(source[key])}`)
      }
    }
    else {
      target[key] = source[key]
    }
  }
}

function compareStructures(obj1: Record<string, any>, obj2: Record<string, any>, path: string[] = [], sourceFile?: string): boolean {
  const keys1 = Object.keys(obj1).sort()
  const keys2 = Object.keys(obj2).sort()

  if (keys1.length !== keys2.length) {
    console.error(`Différence de structure à ${path.join('.')}${sourceFile ? ` (dans ${sourceFile})` : ''}:`)
    console.error(`  Nombre de clés différent: ${keys1.length} vs ${keys2.length}`)
    return false
  }

  for (let i = 0; i < keys1.length; i++) {
    const key = keys1[i]
    const newPath = [...path, key]

    if (key !== keys2[i]) {
      console.error(`Différence de structure à ${path.join('.')}${sourceFile ? ` (dans ${sourceFile})` : ''}:`)
      console.error(`Clés différentes: ${key} vs ${keys2[i]}`)
      return false
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!compareStructures(obj1[key], obj2[key], newPath, sourceFile)) {
        return false
      }
    }
  }

  return true
}

async function main() {
  const translations: TranslationData = {
    fr: {},
    en: {},
  }

  // Lire et fusionner tous les fichiers YAML
  for await (const filePath of walkDir('src')) {
    try {
      const content = await readFile(filePath, 'utf-8')
      const data = yaml.load(content) as TranslationData

      if (!data.fr || !data.en) {
        console.warn(`Fichier ${filePath} ne contient pas les clés 'fr' et 'en'`)
        continue
      }

      // Vérifier la structure pour chaque fichier individuellement
      if (!compareStructures(data.fr, data.en, [], filePath)) {
        console.error(`Le fichier ${filePath} a des structures de traduction incohérentes`)
        process.exit(1)
      }

      deepMerge(translations.fr, data.fr)
      deepMerge(translations.en, data.en)
    }
    catch (error) {
      console.error(`Erreur lors de la lecture de ${filePath}:`, error)
    }
  }

  // Vérifier la cohérence des structures finales
  if (!compareStructures(translations.fr, translations.en)) {
    console.error('Les structures des traductions fr et en ne sont pas identiques')
    process.exit(1)
  }

  // Sauvegarder les fichiers
  await writeFile('./locales/fr.yml', yaml.dump({ fr: translations.fr }))
  await writeFile('./locales/en.yml', yaml.dump({ en: translations.en }))

  console.log('Fusion des traductions terminée avec succès')
}

main().catch(console.error)
