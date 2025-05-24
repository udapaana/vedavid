<template>
  <div class="min-h-screen bg-sumi-paper">
    <div class="max-w-6xl mx-auto mobile-padding py-16">
      <!-- Hero Section -->
      <div class="text-center mb-20 animate-fade-in">
        <div class="mb-8">
          <span class="text-6xl text-vedic-saffron block mb-4">॰</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-light text-sumi-ink mb-6">
            VedaVid
          </h1>
        </div>
        <div class="text-base text-sumi-stone mb-12">
          <p class="sanskrit-text mb-2">{{ vedaStore.transliterate('taittirIya SAKhA') }}</p>
          <p class="text-sm mobile-text">
            {{ corpus?.metadata.totals.total_texts.toLocaleString() }} texts across the complete corpus • 
            {{ corpus?.metadata.totals.total_files_processed }} source manuscripts digitized
          </p>
        </div>
      </div>
      
      <!-- Navigation Cards -->
      <div class="grid md:grid-cols-3 gap-8 mb-20 zen-spacing">
        <router-link 
          to="/samhita"
          class="group sumi-card p-8 hover:shadow-ink transition-all duration-300 border-l-4 border-transparent hover:border-vedic-saffron animate-slide-up"
          style="animation-delay: 0.1s"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-vedic-saffron/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-vedic-saffron/20 transition-colors">
              <span class="text-2xl text-vedic-saffron">{{ vedaStore.transliterate('saṃhitA') }}</span>
            </div>
            <h3 class="brush-heading text-lg">{{ vedaStore.transliterate('saṃhitA') }}</h3>
            <div class="text-sm text-sumi-mist">
              {{ samhitaStats.kandas }} Kandas • {{ samhitaStats.chapters }} Chapters
              <br />
              <span class="vedic-accent">{{ samhitaStats.verses.toLocaleString() }} Verses</span>
            </div>
          </div>
        </router-link>
        
        <router-link 
          to="/brahmana"
          class="group sumi-card p-8 hover:shadow-ink transition-all duration-300 border-l-4 border-transparent hover:border-vedic-turmeric animate-slide-up"
          style="animation-delay: 0.2s"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-vedic-turmeric/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-vedic-turmeric/20 transition-colors">
              <span class="text-2xl text-vedic-turmeric">{{ vedaStore.transliterate('brAhmaṇa') }}</span>
            </div>
            <h3 class="brush-heading text-lg">{{ vedaStore.transliterate('brAhmaṇa') }}</h3>
            <div class="text-sm text-sumi-mist">
              {{ brahmanaStats.books }} Books
              <br />
              <span class="text-vedic-turmeric">{{ brahmanaStats.sections.toLocaleString() }} Sections</span>
            </div>
          </div>
        </router-link>
        
        <router-link 
          to="/aranyaka"
          class="group sumi-card p-8 hover:shadow-ink transition-all duration-300 border-l-4 border-transparent hover:border-vedic-copper animate-slide-up"
          style="animation-delay: 0.3s"
        >
          <div class="text-center">
            <div class="w-16 h-16 bg-vedic-copper/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-vedic-copper/20 transition-colors">
              <span class="text-2xl text-vedic-copper">{{ vedaStore.transliterate('AraṇyAka') }}</span>
            </div>
            <h3 class="brush-heading text-lg">{{ vedaStore.transliterate('AraṇyAka') }}</h3>
            <div class="text-sm text-sumi-mist">
              {{ aranyakaStats.books }} Books
              <br />
              <span class="text-vedic-copper">{{ aranyakaStats.sections.toLocaleString() }} Sections</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useVedaStore } from '@/stores/vedaStore'

const vedaStore = useVedaStore()

const corpus = computed(() => vedaStore.corpus)

const samhitaStats = computed(() => {
  const metadata = corpus.value?.metadata.components.samhita
  return {
    kandas: metadata?.total_kandas || 7,
    chapters: metadata?.total_chapters || 44,
    verses: metadata?.total_verses || 2198
  }
})

const brahmanaStats = computed(() => {
  const metadata = corpus.value?.metadata.components.brahmana
  return {
    books: metadata?.total_files || 3,
    sections: metadata?.total_sections || 1997
  }
})

const aranyakaStats = computed(() => {
  const metadata = corpus.value?.metadata.components.aranyaka
  return {
    books: metadata?.total_files || 8,
    sections: metadata?.total_sections || 708
  }
})

onMounted(() => {
  if (!vedaStore.isLoaded) {
    vedaStore.loadCorpus()
  }
})
</script>