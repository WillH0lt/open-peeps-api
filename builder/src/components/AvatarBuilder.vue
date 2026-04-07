<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { User, Smile, Shirt, Glasses, Shuffle, X, Download, Link, Github } from 'lucide-vue-next'
import {
  type AvatarConfig,
  type AvatarOption,
  type PartCategory,
  headOptions,
  faceOptions,
  bodyOptions,
  facialHairOptions,
  accessoryOptions,
  skinPresets,
  hairPresets,
  clothingPresets,
  backgroundPresets,
  avatarUrl,
  partUrl,
  randomConfig,
  encodeAvatarToken,
} from '../lib/open-peeps'

const BASE_URL = 'http://127.0.0.1:8788'

type Category = 'head' | 'face' | 'body' | 'beard' | 'glasses'

const activeCategory = ref<Category>('head')
const config = ref<AvatarConfig>({
  head: 20,
  body: 22,
  face: 29,
  facialHair: 0,
  accessory: 0,
  skinColor: '#C68642',
  hairColor: '#FF6B6B',
  topColor: '#FFCF77',
  jacketColor: '#845EC2',
  backgroundColor: '#C8E6C9',
})
const copied = ref(false)

watch(activeCategory, () => {
  openColorPicker.value = null
})

const previewUrl = computed(() => avatarUrl(config.value, BASE_URL))

const shareUrl = computed(() => {
  const token = encodeAvatarToken(config.value)
  return `${BASE_URL}/v1/${token}.svg`
})

const categories: { key: Category; label: string; icon: typeof User }[] = [
  { key: 'head', label: 'Head', icon: User },
  { key: 'face', label: 'Face', icon: Smile },
  { key: 'body', label: 'Clothes', icon: Shirt },
  { key: 'beard', label: 'Facial Hair', icon: User },
  { key: 'glasses', label: 'Glasses', icon: Glasses },
]

const currentOptions = computed<AvatarOption[]>(() => {
  switch (activeCategory.value) {
    case 'head': return headOptions
    case 'face': return faceOptions
    case 'body': return bodyOptions
    case 'beard': return facialHairOptions
    case 'glasses': return accessoryOptions
    default: return []
  }
})

const configKey = computed<keyof AvatarConfig>(() => {
  switch (activeCategory.value) {
    case 'head': return 'head'
    case 'face': return 'face'
    case 'body': return 'body'
    case 'beard': return 'facialHair'
    case 'glasses': return 'accessory'
    default: return 'head'
  }
})

const partCategory = computed<PartCategory>(() => {
  switch (activeCategory.value) {
    case 'head': return 'head'
    case 'face': return 'face'
    case 'body': return 'body'
    case 'beard': return 'facial-hair'
    case 'glasses': return 'accessories'
    default: return 'head'
  }
})

function selectOption(value: number) {
  config.value = { ...config.value, [configKey.value]: value }
}

function thumbnailUrl(option: AvatarOption): string {
  if (!option.slug) return ''
  const colors: Record<string, string> = {}
  if (config.value.skinColor) colors.skinColor = config.value.skinColor
  if (config.value.hairColor) colors.hairColor = config.value.hairColor
  if (config.value.topColor) colors.topColor = config.value.topColor
  if (config.value.jacketColor) colors.jacketColor = config.value.jacketColor
  return partUrl(BASE_URL, partCategory.value, option.slug, Object.keys(colors).length ? colors : undefined)
}

const openColorPicker = ref<string | null>(null)

function toggleColorPicker(key: string) {
  openColorPicker.value = openColorPicker.value === key ? null : key
}

function onClickOutsideColorPicker(e: Event) {
  const target = e.target as HTMLElement
  if (!target.closest('.color-picker-wrapper')) {
    openColorPicker.value = null
  }
}

onMounted(() => document.addEventListener('pointerdown', onClickOutsideColorPicker))
onUnmounted(() => document.removeEventListener('pointerdown', onClickOutsideColorPicker))

function selectColor(key: keyof AvatarConfig, color: string | undefined) {
  config.value = { ...config.value, [key]: color }
}

function shuffle() {
  config.value = randomConfig()
}

async function copyLink() {
  await navigator.clipboard.writeText(shareUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

async function downloadSvg() {
  const res = await fetch(shareUrl.value)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'open-peep.svg'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="relative z-1 max-w-lg mx-auto p-5 flex flex-col gap-3 min-h-dvh sm:h-[90vh] sm:min-h-0 sm:py-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <span
        class="text-stencil text-2xl bg-electric-200 px-2 py-0.5 w-fit inline-block -rotate-1"
      >
        Build Your Peep
      </span>
      <a
        href="https://github.com/willwillems/open-peeps-worker"
        target="_blank"
        class="z-btn-sm rounded bg-white px-2 py-1 flex items-center gap-1.5 text-xs font-display"
      >
        <Github :size="14" />
        GitHub
      </a>
    </div>

    <!-- Preview -->
    <div class="flex flex-col items-center gap-2">
      <div class="relative">
        <img
          :src="previewUrl"
          alt="Avatar preview"
          class="w-40 h-40 rounded border-pixel object-cover"
          :style="{ backgroundColor: config.backgroundColor && config.backgroundColor !== 'transparent' ? config.backgroundColor : '#F9E8E0' }"
        />
        <button
          class="absolute -bottom-1 -right-1 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center border-2 border-white hover:bg-accent transition-colors cursor-pointer"
          title="Randomize"
          @click="shuffle"
        >
          <Shuffle :size="16" />
        </button>
      </div>
      <div class="relative color-picker-wrapper">
        <button
          class="flex items-center gap-1.5 px-2 py-1 rounded border-2 text-[10px] font-display transition-all cursor-pointer"
          :class="openColorPicker === 'backgroundColor' ? 'border-accent bg-accent-50' : 'border-black/20 hover:border-black/40'"
          @click="toggleColorPicker('backgroundColor')"
        >
          <span
            class="w-5 h-5 rounded-full border-2 border-black/20 shrink-0"
            :style="{ backgroundColor: config.backgroundColor || 'transparent' }"
          />
          Background
        </button>
        <div
          v-if="openColorPicker === 'backgroundColor'"
          class="absolute top-full left-1/2 -translate-x-1/2 mt-1 z-10 bg-white border-2 border-black/20 rounded-lg p-2 shadow-[3px_3px_0_#000] flex flex-wrap gap-1.5 w-max max-w-48"
        >
          <button
            v-for="color in backgroundPresets"
            :key="color"
            class="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer"
            :class="config.backgroundColor === color ? 'border-accent shadow-[2px_2px_0_var(--color-accent)] scale-110' : 'border-black/20'"
            :style="{ backgroundColor: color }"
            :title="color"
            @click="selectColor('backgroundColor', color)"
          />
        </div>
      </div>
    </div>

    <!-- Category tabs -->
    <div class="grid grid-cols-3 gap-1.5">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded text-[8px] sm:text-[10px] font-display whitespace-nowrap border-2 transition-all cursor-pointer"
        :class="activeCategory === cat.key
          ? 'border-accent bg-accent text-white shadow-[2px_2px_0_#000]'
          : 'border-black/20 bg-white hover:border-black/40'"
        @click="activeCategory = cat.key"
      >
        <component :is="cat.icon" :size="14" class="hidden sm:block" />
        {{ cat.label }}
      </button>
    </div>

    <!-- Options panel -->
    <div class="overflow-y-auto flex-1 min-h-0 rounded border-3 border-black/10 bg-white/50 p-2">
      <!-- Inline color pickers for Head -->
      <div v-if="activeCategory === 'head'" class="flex gap-3 px-1 pb-3">
        <div v-for="picker in [
          { key: 'skinColor', label: 'Skin', presets: skinPresets },
          { key: 'hairColor', label: 'Hair', presets: hairPresets },
        ]" :key="picker.key" class="relative color-picker-wrapper">
          <button
            class="flex items-center gap-1.5 px-2 py-1 rounded border-2 text-[10px] font-display transition-all cursor-pointer"
            :class="openColorPicker === picker.key ? 'border-accent bg-accent-50' : 'border-black/20 hover:border-black/40'"
            @click="toggleColorPicker(picker.key)"
          >
            <span
              class="w-5 h-5 rounded-full border-2 border-black/20 shrink-0"
              :style="{ backgroundColor: (config[picker.key as keyof AvatarConfig] as string) || '#ccc' }"
            />
            {{ picker.label }}
          </button>
          <div
            v-if="openColorPicker === picker.key"
            class="absolute top-full left-0 mt-1 z-10 bg-white border-2 border-black/20 rounded-lg p-2 shadow-[3px_3px_0_#000] flex flex-wrap gap-1.5 w-max max-w-48"
          >
            <button
              v-for="color in picker.presets"
              :key="color"
              class="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer"
              :class="config[picker.key as keyof AvatarConfig] === color ? 'border-accent shadow-[2px_2px_0_var(--color-accent)] scale-110' : 'border-black/20'"
              :style="{ backgroundColor: color }"
              @click="selectColor(picker.key as keyof AvatarConfig, color)"
            />
          </div>
        </div>
      </div>

      <!-- Inline color pickers for Body -->
      <div v-if="activeCategory === 'body'" class="flex gap-3 px-1 pb-3">
        <div v-for="picker in [
          { key: 'topColor', label: 'Shirt', presets: clothingPresets },
          { key: 'jacketColor', label: 'Jacket', presets: clothingPresets },
        ]" :key="picker.key" class="relative color-picker-wrapper">
          <button
            class="flex items-center gap-1.5 px-2 py-1 rounded border-2 text-[10px] font-display transition-all cursor-pointer"
            :class="openColorPicker === picker.key ? 'border-accent bg-accent-50' : 'border-black/20 hover:border-black/40'"
            @click="toggleColorPicker(picker.key)"
          >
            <span
              class="w-5 h-5 rounded-full border-2 border-black/20 shrink-0"
              :style="{ backgroundColor: (config[picker.key as keyof AvatarConfig] as string) || '#ccc' }"
            />
            {{ picker.label }}
          </button>
          <div
            v-if="openColorPicker === picker.key"
            class="absolute top-full left-0 mt-1 z-10 bg-white border-2 border-black/20 rounded-lg p-2 shadow-[3px_3px_0_#000] flex flex-wrap gap-1.5 w-max max-w-48"
          >
            <button
              v-for="color in picker.presets"
              :key="color"
              class="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer"
              :class="config[picker.key as keyof AvatarConfig] === color ? 'border-accent shadow-[2px_2px_0_var(--color-accent)] scale-110' : 'border-black/20'"
              :style="{ backgroundColor: color }"
              @click="selectColor(picker.key as keyof AvatarConfig, color)"
            />
          </div>
        </div>
      </div>

      <!-- Parts grid -->
      <div class="grid grid-cols-4 sm:grid-cols-5 gap-2">
        <button
          v-for="option in currentOptions"
          :key="option.value"
          class="relative flex flex-col items-center gap-1 rounded-lg p-1.5 transition-all border-2 cursor-pointer"
          :class="config[configKey] === option.value
            ? 'border-accent bg-accent-50 shadow-[2px_2px_0_var(--color-accent)]'
            : 'border-transparent hover:border-black/20 hover:bg-white'"
          @click="selectOption(option.value)"
        >
          <img
            v-if="option.slug"
            :src="thumbnailUrl(option)"
            :alt="option.label"
            class="w-16 h-16 rounded object-contain"
            loading="lazy"
          />
          <div
            v-else
            class="w-16 h-16 rounded bg-stone-100 flex items-center justify-center"
          >
            <X :size="24" class="text-stone-300" />
          </div>
          <span class="text-[7px] font-display leading-tight text-center truncate w-full">
            {{ option.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex gap-2 mt-auto mb-8 sm:mb-0 shrink-0">
      <button
        class="flex-1 flex items-center justify-center gap-2 z-btn z-btn-primary font-display text-xs py-3 px-4 cursor-pointer"
        @click="downloadSvg"
      >
        <Download :size="16" />
        Download
      </button>
      <button
        class="flex-1 flex items-center justify-center gap-2 z-btn bg-white font-display text-xs py-3 px-4 cursor-pointer"
        @click="copyLink"
      >
        <Link :size="16" />
        {{ copied ? 'Copied!' : 'Copy Link' }}
      </button>
    </div>
  </div>
</template>
