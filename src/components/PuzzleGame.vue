<script setup lang="ts">
const props = defineProps<{
  imageUrl: string
  rows: number
  cols: number
}>()

const canvasRef = ref<HTMLCanvasElement>()
onMounted(async () => {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const ctx = canvas?.getContext('2d')

  const image = await loadImage(props.imageUrl)
  canvas.width = image.width
  canvas.height = image.height

  const pieces = splitImage(image, props.rows, props.cols)
  for (const piece of pieces) {
    ctx?.drawImage(piece, 0, 0)
  }
})

function splitImage(image: HTMLImageElement, rows: number, cols: number) {
  const pieces = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const piece = document.createElement('canvas')
      piece.width = image.width / cols
      piece.height = image.height / rows
      pieces.push(piece)
    }
  }
  return pieces
}

async function loadImage(url: string) {
  const promise = new Promise<HTMLImageElement>((resolve) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      resolve(image)
    }
  })
  return promise
}
</script>

<template>
  <canvas ref="canvasRef" class="h-full w-full" />
</template>
