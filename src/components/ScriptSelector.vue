<template>
  <div class="script-selector">
    <button
      @click="toggleDropdown"
      class="script-toggle touch-target flex items-center gap-2"
      :aria-expanded="isOpen"
    >
      <span class="text-vedic-saffron">॰</span>
      <span>{{ currentScriptLabel }}</span>
      <ChevronDownIcon 
        class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-2 w-48 sumi-card shadow-ink z-50"
        @click.stop
      >
        <div class="p-2 zen-spacing-sm">
          <h3 class="text-sm font-medium text-sumi-charcoal mb-2 px-2">
            Choose Script
          </h3>
          <button
            v-for="script in scripts"
            :key="script.name"
            @click="selectScript(script)"
            class="w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150"
            :class="{
              'bg-vedic-saffron/10 text-vedic-saffron border-l-2 border-vedic-saffron': 
                vedaStore.currentScript === script.script,
              'hover:bg-sumi-mist/10 text-sumi-ink': 
                vedaStore.currentScript !== script.script
            }"
          >
            <div class="flex justify-between items-center">
              <span>{{ script.label }}</span>
              <span v-if="vedaStore.currentScript === script.script" class="text-vedic-saffron">✓</span>
            </div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { transliterationService, SUPPORTED_SCRIPTS, type TransliterationOption } from '../services/transliterationService'
import { useVedaStore } from '@/stores/vedaStore'

const vedaStore = useVedaStore()
const isOpen = ref(false)
const scripts = SUPPORTED_SCRIPTS

const currentScriptLabel = computed(() => {
  return transliterationService.getScriptLabel(vedaStore.currentScript)
})

// Watch for external script changes and sync
watch(() => vedaStore.currentScript, (newScript) => {
  transliterationService.setCurrentScript(newScript)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectScript = (script: TransliterationOption) => {
  vedaStore.setCurrentScript(script.script)
  isOpen.value = false
  
  // Emit event to parent components can react to script changes
  emit('script-changed', script.script)
}

const closeDropdown = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.script-selector')) {
    isOpen.value = false
  }
}

const emit = defineEmits<{
  'script-changed': [script: string]
}>()

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.script-selector {
  @apply relative;
}
</style>