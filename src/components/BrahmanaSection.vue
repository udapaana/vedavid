<template>
  <div class="border border-vedic-accent rounded-lg p-6 mb-4 bg-white shadow-sm">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-lg font-semibold text-vedic-primary">
        {{ section.section_id }}
      </h3>
      <span class="text-sm text-gray-500">
        {{ section.file_info }}
      </span>
    </div>
    
    <div 
      class="sanskrit-text p-4 bg-amber-50 rounded border-l-4 border-amber-400"
      :class="fontSizeClass"
    >
      {{ transliteratedText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { BrahmanaSection } from '@/types/veda'
import { useVedaStore } from '@/stores/vedaStore'
import { transliterationService } from '@/services/transliterationService'

interface Props {
  section: BrahmanaSection
  fontSize: 'sm' | 'md' | 'lg' | 'xl'
}

const props = defineProps<Props>()
const vedaStore = useVedaStore()
const forceRerender = ref(0)

const transliteratedText = computed(() => {
  // Include forceRerender to make this reactive to cache updates
  forceRerender.value;
  
  if (!props.section.text) return ''
  
  // Use static transliteration if available (preferred)
  if (props.section.text_transliterations) {
    return vedaStore.getStaticTransliteration(props.section.text_transliterations)
  }
  
  // Fallback to Aksharamukha transliteration for runtime conversion
  return vedaStore.transliterate(props.section.text, 'baraha')
})

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

const fontSizeClass = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizes[props.fontSize]
})
</script>