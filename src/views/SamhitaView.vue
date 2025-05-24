<template>
  <div class="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
    <div class="mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-vedic-primary mb-2">
        Taittiriya Samhita
      </h1>
      <p class="text-sm sm:text-base text-gray-600">
        Mantra texts with Padam (पदपाठ) and Samhita (संहिता) recitations
      </p>
    </div>
    
    <div class="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-8">
      <div class="order-1 lg:order-none lg:col-span-1">
        <div class="lg:sticky lg:top-20">
          <ChapterSelector
            v-model="selectedChapter"
            :options="chapterOptions"
            label="Select Chapter"
            placeholder="Choose a chapter..."
          />
          
          <div v-if="currentChapter" class="hidden lg:block bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 mb-2">Chapter Info</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p><strong>Chapter:</strong> {{ currentChapter.chapter }}</p>
              <p><strong>Verses:</strong> {{ currentChapter.verse_count }}</p>
              <p><strong>Matched:</strong> {{ currentChapter.matched_count }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-3">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-vedic-primary"></div>
          <p class="mt-2 text-gray-600">Loading chapter...</p>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
          <p class="text-red-800">{{ error }}</p>
        </div>
        
        <div v-else-if="!selectedChapter" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Select a Chapter</h3>
          <p class="text-gray-600">Choose a chapter from the sidebar to begin studying the Samhita texts.</p>
        </div>
        
        <div v-else-if="currentChapter">
          <div class="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 class="text-xl sm:text-2xl font-semibold text-vedic-primary">
              Chapter {{ currentChapter.chapter }}
            </h2>
            <div class="text-sm text-gray-600">
              {{ currentChapter.verses.length }} verses
            </div>
          </div>
          
          <div class="space-y-4 sm:space-y-6">
            <SamhitaVerse
              v-for="verse in currentChapter.verses"
              :key="verse.verse_id"
              :verse="verse"
              :show-padam="displayOptions.showPadam"
              :show-samhita="displayOptions.showSamhita"
              :font-size="displayOptions.fontSize"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVedaStore } from '@/stores/vedaStore'
import { vedaService } from '@/services/vedaService'
import ChapterSelector from '@/components/ChapterSelector.vue'
import SamhitaVerse from '@/components/SamhitaVerse.vue'
import type { SamhitaChapter } from '@/types/veda'

interface Props {
  chapter?: string
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()
const vedaStore = useVedaStore()

const selectedChapter = ref('')
const currentChapter = ref<SamhitaChapter | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const displayOptions = computed(() => vedaStore.displayOptions)

const chapterOptions = computed(() => {
  return vedaStore.availableChapters.map(chapter => ({
    value: chapter,
    label: `Chapter ${chapter}`
  }))
})

async function loadChapter(chapter: string) {
  if (!chapter) {
    currentChapter.value = null
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    currentChapter.value = await vedaService.getSamhitaChapter(chapter)
    if (!currentChapter.value) {
      error.value = `Chapter ${chapter} not found`
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load chapter'
  } finally {
    loading.value = false
  }
}

watch(selectedChapter, (newChapter) => {
  if (newChapter && newChapter !== route.params.chapter) {
    router.push(`/samhita/${newChapter}`)
  }
  loadChapter(newChapter)
})

watch(() => route.params.chapter, (newChapter) => {
  const chapter = newChapter as string || ''
  if (chapter !== selectedChapter.value) {
    selectedChapter.value = chapter
  }
}, { immediate: true })

onMounted(async () => {
  if (!vedaStore.isLoaded) {
    await vedaStore.loadCorpus()
  }
  
  if (props.chapter || route.params.chapter) {
    selectedChapter.value = (props.chapter || route.params.chapter) as string
  }
})
</script>