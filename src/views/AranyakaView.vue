<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-vedic-primary mb-2">
        Taittiriya Aranyaka
      </h1>
      <p class="text-gray-600">
        Forest texts with philosophical and mystical content
      </p>
    </div>
    
    <div class="grid lg:grid-cols-4 gap-8">
      <div class="lg:col-span-1">
        <div class="sticky top-4">
          <ChapterSelector
            v-model="selectedBook"
            :options="bookOptions"
            label="Select Book"
            placeholder="Choose a book..."
          />
          
          <div v-if="currentBook" class="bg-white border border-gray-200 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 mb-2">Book Info</h3>
            <div class="text-sm text-gray-600 space-y-1">
              <p><strong>Book:</strong> {{ currentBook.book }}</p>
              <p><strong>Sections:</strong> {{ currentBook.section_count }}</p>
              <p><strong>Type:</strong> {{ currentBook.text_type }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-3">
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-vedic-primary"></div>
          <p class="mt-2 text-gray-600">Loading book...</p>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
          <p class="text-red-800">{{ error }}</p>
        </div>
        
        <div v-else-if="!selectedBook" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Select a Book</h3>
          <p class="text-gray-600">Choose a book from the sidebar to begin studying the Aranyaka texts.</p>
        </div>
        
        <div v-else-if="currentBook">
          <div class="mb-6 flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-vedic-primary">
              Book {{ currentBook.book }}
            </h2>
            <div class="text-sm text-gray-600">
              {{ currentBook.sections.length }} sections
            </div>
          </div>
          
          <div class="space-y-4">
            <BrahmanaSection
              v-for="section in currentBook.sections"
              :key="section.section_id"
              :section="section"
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
import BrahmanaSection from '@/components/BrahmanaSection.vue'
import type { BrahmanaBook } from '@/types/veda'

interface Props {
  book?: string
}

const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()
const vedaStore = useVedaStore()

const selectedBook = ref('')
const currentBook = ref<BrahmanaBook | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const displayOptions = computed(() => vedaStore.displayOptions)

const bookOptions = computed(() => {
  return vedaService.getAranyakaBooks().map(book => ({
    value: book,
    label: `Book ${book}`
  }))
})

async function loadBook(book: string) {
  if (!book) {
    currentBook.value = null
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    currentBook.value = await vedaService.getAranyakaBook(book)
    if (!currentBook.value) {
      error.value = `Book ${book} not found`
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load book'
  } finally {
    loading.value = false
  }
}

watch(selectedBook, (newBook) => {
  if (newBook && newBook !== route.params.book) {
    router.push(`/aranyaka/${newBook}`)
  }
  loadBook(newBook)
})

watch(() => route.params.book, (newBook) => {
  const book = newBook as string || ''
  if (book !== selectedBook.value) {
    selectedBook.value = book
  }
}, { immediate: true })

onMounted(async () => {
  if (!vedaStore.isLoaded) {
    await vedaStore.loadCorpus()
  }
  
  if (props.book || route.params.book) {
    selectedBook.value = (props.book || route.params.book) as string
  }
})
</script>