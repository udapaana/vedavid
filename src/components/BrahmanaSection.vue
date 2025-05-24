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
      {{ section.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BrahmanaSection } from '@/types/veda'

interface Props {
  section: BrahmanaSection
  fontSize: 'sm' | 'md' | 'lg' | 'xl'
}

const props = defineProps<Props>()

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