<template>
  <div class="verse-container animate-slide-up">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-base sm:text-lg font-medium text-sumi-ink">
        {{ verse.verse_id }}
      </h3>
      <span 
        v-if="verse.has_samhita_match"
        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-vedic-saffron/10 text-vedic-saffron border border-vedic-saffron/20"
      >
        ✓ Complete
      </span>
    </div>
    
    <div class="zen-spacing">
      <div v-if="showPadam && verse.padam" class="zen-spacing-sm">
        <h4 class="text-sm font-medium text-sumi-stone tracking-wide flex items-center gap-2">
          <span class="text-vedic-saffron">॰</span>
          पदपाठ (Padam)
        </h4>
        <div 
          class="ink-text vedic-accent-bg p-4 rounded-lg"
          :class="fontSizeClass"
        >
          {{ transliteratedPadam }}
        </div>
      </div>
      
      <div v-if="showSamhita && verse.samhita" class="zen-spacing-sm">
        <h4 class="text-sm font-medium text-sumi-stone tracking-wide flex items-center gap-2">
          <span class="text-vedic-saffron">॰</span>
          संहिता (Samhita)
        </h4>
        <div 
          class="ink-text bg-sumi-cloud/50 border-l-4 border-sumi-stone p-4 rounded-lg"
          :class="fontSizeClass"
        >
          {{ transliteratedSamhita }}
        </div>
      </div>
    </div>
    
    <!-- Transliteration options for verse -->
    <div 
      v-if="showTransliterationOptions" 
      class="mt-4 p-3 bg-sumi-cloud/30 rounded-lg border border-sumi-mist/30"
    >
      <h5 class="text-xs font-medium text-sumi-charcoal mb-2">Other Scripts:</h5>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="script in alternativeScripts"
          :key="script.name"
          @click="setScript(script.script)"
          class="text-xs px-2 py-1 rounded bg-sumi-paper border border-sumi-mist hover:bg-vedic-saffron/10 hover:border-vedic-saffron/30 transition-colors"
          :class="{ 'bg-vedic-saffron/10 border-vedic-saffron/30': vedaStore.currentScript === script.script }"
        >
          {{ script.label }}
        </button>
      </div>
    </div>
    
    <!-- Toggle transliteration options -->
    <button
      @click="showTransliterationOptions = !showTransliterationOptions"
      class="mt-3 text-xs text-sumi-mist hover:text-vedic-saffron transition-colors"
    >
      {{ showTransliterationOptions ? 'Hide' : 'Show' }} other scripts
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { SamhitaVerse } from '@/types/veda'
import { transliterationService, SUPPORTED_SCRIPTS } from '@/services/transliterationService'
import { useVedaStore } from '@/stores/vedaStore'

interface Props {
  verse: SamhitaVerse
  showPadam: boolean
  showSamhita: boolean
  fontSize: 'sm' | 'md' | 'lg' | 'xl'
}

const props = defineProps<Props>()
const vedaStore = useVedaStore()
const showTransliterationOptions = ref(false)
const forceRerender = ref(0)

const fontSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizes[props.fontSize]
})

const transliteratedPadam = computed(() => {
  // Include forceRerender to make this reactive to cache updates
  forceRerender.value;
  
  if (!props.verse.padam) return ''
  
  // Use static transliteration if available (preferred)
  if (props.verse.padam_transliterations) {
    return vedaStore.getStaticTransliteration(props.verse.padam_transliterations)
  }
  
  // Fallback to Aksharamukha transliteration for runtime conversion
  return vedaStore.transliterate(props.verse.padam, 'baraha')
})

const transliteratedSamhita = computed(() => {
  // Include forceRerender to make this reactive to cache updates
  forceRerender.value;
  
  if (!props.verse.samhita) return ''
  
  // Use static transliteration if available (preferred)
  if (props.verse.samhita_transliterations) {
    return vedaStore.getStaticTransliteration(props.verse.samhita_transliterations)
  }
  
  // Fallback to Aksharamukha transliteration for runtime conversion
  return vedaStore.transliterate(props.verse.samhita, 'baraha')
})

const alternativeScripts = computed(() => {
  return SUPPORTED_SCRIPTS.filter(script => script.script !== vedaStore.currentScript)
})

const setScript = (script: string) => {
  vedaStore.setCurrentScript(script)
}

// Handle cache updates
const handleCacheUpdate = () => {
  forceRerender.value++
}

onMounted(() => {
  transliterationService.addScriptChangeListener(handleCacheUpdate)
})

onUnmounted(() => {
  transliterationService.removeScriptChangeListener(handleCacheUpdate)
})
</script>