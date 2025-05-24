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
        <p class="text-lg sm:text-xl text-sumi-charcoal mb-8 max-w-3xl mx-auto leading-relaxed">
          A digital sanctuary for <span class="vedic-accent font-medium">Veda Adhyayana</span>, 
          where ancient Sanskrit wisdom meets modern accessibility through the art of mindful study.
        </p>
        <div class="text-base text-sumi-stone mb-12">
          <p class="sanskrit-text mb-2">तैत्तिरीय शाखा • Taittiriya Sakha</p>
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
              <span class="text-2xl text-vedic-saffron">संहिता</span>
            </div>
            <h3 class="brush-heading text-lg">Samhita</h3>
            <p class="text-sumi-charcoal mb-4 leading-relaxed">
              Sacred mantras in both <em>padam</em> (word-by-word) and <em>samhita</em> (continuous) recitations
            </p>
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
              <span class="text-2xl text-vedic-turmeric">ब्राह्मण</span>
            </div>
            <h3 class="brush-heading text-lg">Brahmana</h3>
            <p class="text-sumi-charcoal mb-4 leading-relaxed">
              Prose explanations unfolding the deeper meanings and ritual applications
            </p>
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
              <span class="text-2xl text-vedic-copper">आरण्यक</span>
            </div>
            <h3 class="brush-heading text-lg">Aranyaka</h3>
            <p class="text-sumi-charcoal mb-4 leading-relaxed">
              Forest teachings revealing the philosophical and mystical dimensions
            </p>
            <div class="text-sm text-sumi-mist">
              {{ aranyakaStats.books }} Books
              <br />
              <span class="text-vedic-copper">{{ aranyakaStats.sections.toLocaleString() }} Sections</span>
            </div>
          </div>
        </router-link>
      </div>
      
      <!-- About Section -->
      <div class="sumi-card p-8 lg:p-12 animate-slide-up" style="animation-delay: 0.4s">
        <h2 class="brush-heading text-center mb-8">
          About the Taittiriya Tradition
        </h2>
        <div class="max-w-4xl mx-auto zen-spacing-sm">
          <p class="text-sumi-charcoal leading-relaxed mb-6">
            The <span class="sanskrit-text vedic-accent">Taittiriya Sakha</span> represents one of the most 
            important recensions of the Krishna Yajurveda, preserving ancient Vedic knowledge through 
            precise oral transmission traditions spanning millennia.
          </p>
          <p class="text-sumi-charcoal leading-relaxed mb-6">
            This digital collection provides complete access to the three-fold corpus: 
            <span class="vedic-accent">Samhita</span> (sacred mantras), 
            <span class="vedic-accent">Brahmana</span> (ritual explanations), and 
            <span class="vedic-accent">Aranyaka</span> (philosophical teachings), maintaining both 
            word-by-word and continuous recitation formats.
          </p>
          <p class="text-sumi-charcoal leading-relaxed">
            VedaVid honors these sacred texts through mindful design, making them accessible for study, 
            research, and practice while preserving the integrity of traditional transmission methods.
          </p>
        </div>
        
        <!-- Features -->
        <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-vedic-saffron mb-2">॰</div>
            <h4 class="text-sm font-medium text-sumi-ink mb-1">Multi-script</h4>
            <p class="text-xs text-sumi-mist">10+ Indian scripts</p>
          </div>
          <div class="text-center">
            <div class="text-vedic-saffron mb-2">॰</div>
            <h4 class="text-sm font-medium text-sumi-ink mb-1">Mobile-first</h4>
            <p class="text-xs text-sumi-mist">Optimized for phones</p>
          </div>
          <div class="text-center">
            <div class="text-vedic-saffron mb-2">॰</div>
            <h4 class="text-sm font-medium text-sumi-ink mb-1">Complete corpus</h4>
            <p class="text-xs text-sumi-mist">4,903 total texts</p>
          </div>
          <div class="text-center">
            <div class="text-vedic-saffron mb-2">॰</div>
            <h4 class="text-sm font-medium text-sumi-ink mb-1">Tradition-faithful</h4>
            <p class="text-xs text-sumi-mist">Authentic recitations</p>
          </div>
        </div>
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