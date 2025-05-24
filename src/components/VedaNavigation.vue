<template>
  <nav class="sumi-nav sticky top-0 z-40">
    <div class="max-w-7xl mx-auto mobile-padding">
      <div class="flex justify-between items-center h-14 sm:h-16">
        <div class="flex items-center space-x-4 sm:space-x-8">
          <router-link 
            to="/" 
            class="text-lg sm:text-xl font-medium text-sumi-ink hover:text-vedic-saffron transition-colors flex items-center gap-2"
          >
            <span class="text-vedic-saffron text-2xl">॰</span>
            VedaVid
          </router-link>
          
          <div class="hidden sm:flex space-x-4 md:space-x-6">
            <router-link 
              to="/samhita"
              class="text-sumi-charcoal hover:text-vedic-saffron transition-colors touch-target flex items-center"
              :class="{ 'text-vedic-saffron font-medium': $route.name === 'samhita' }"
            >
              {{ vedaStore.transliterate('saṃhitA') }}
            </router-link>
            <router-link 
              to="/brahmana"
              class="text-sumi-charcoal hover:text-vedic-saffron transition-colors touch-target flex items-center"
              :class="{ 'text-vedic-saffron font-medium': $route.name === 'brahmana' }"
            >
              {{ vedaStore.transliterate('brAhmaṇa') }}
            </router-link>
            <router-link 
              to="/aranyaka"
              class="text-sumi-charcoal hover:text-vedic-saffron transition-colors touch-target flex items-center"
              :class="{ 'text-vedic-saffron font-medium': $route.name === 'aranyaka' }"
            >
              {{ vedaStore.transliterate('AraṇyAka') }}
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- Script Selector -->
          <div class="hidden sm:block">
            <ScriptSelector @script-changed="handleScriptChange" />
          </div>
          
          <!-- Mobile menu button -->
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="sm:hidden p-2 rounded-md hover:bg-sumi-cloud transition-colors touch-target text-sumi-ink"
            title="Menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            @click="toggleDisplayOptions"
            class="p-2 rounded-md hover:bg-sumi-cloud transition-colors touch-target text-sumi-ink"
            title="Display Options"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-show="showMobileMenu" class="sm:hidden border-t border-sumi-mist/30">
      <div class="mobile-padding pt-2 pb-3 zen-spacing-sm">
        <router-link 
          to="/samhita"
          @click="showMobileMenu = false"
          class="block px-3 py-3 rounded-md hover:bg-sumi-cloud transition-colors touch-target text-sumi-charcoal"
          :class="{ 'bg-vedic-saffron/10 text-vedic-saffron font-medium': $route.name === 'samhita' }"
        >
          {{ vedaStore.transliterate('saṃhitA') }}
        </router-link>
        <router-link 
          to="/brahmana"
          @click="showMobileMenu = false"
          class="block px-3 py-3 rounded-md hover:bg-sumi-cloud transition-colors touch-target text-sumi-charcoal"
          :class="{ 'bg-vedic-saffron/10 text-vedic-saffron font-medium': $route.name === 'brahmana' }"
        >
          {{ vedaStore.transliterate('brAhmaṇa') }}
        </router-link>
        <router-link 
          to="/aranyaka"
          @click="showMobileMenu = false"
          class="block px-3 py-3 rounded-md hover:bg-sumi-cloud transition-colors touch-target text-sumi-charcoal"
          :class="{ 'bg-vedic-saffron/10 text-vedic-saffron font-medium': $route.name === 'aranyaka' }"
        >
          {{ vedaStore.transliterate('AraṇyAka') }}
        </router-link>
        
        <!-- Mobile script selector -->
        <div class="px-3 py-2 border-t border-sumi-mist/20 mt-2 pt-4">
          <ScriptSelector @script-changed="handleScriptChange" />
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Display Options Modal -->
  <div 
    v-if="showDisplayOptions"
    class="fixed inset-0 bg-sumi-ink/50 z-50 flex items-center justify-center animate-fade-in"
    @click="showDisplayOptions = false"
  >
    <div 
      class="sumi-card p-6 max-w-md w-full mx-4 animate-slide-up"
      @click.stop
    >
      <h3 class="brush-heading">Display Options</h3>
      
      <div class="space-y-4">
        <div v-if="$route.name === 'samhita'">
          <label class="block text-sm font-medium mb-2">Text Display</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input 
                type="checkbox" 
                v-model="localDisplayOptions.showPadam"
                class="mr-2"
              >
              Show Padam (Word-by-word)
            </label>
            <label class="flex items-center">
              <input 
                type="checkbox" 
                v-model="localDisplayOptions.showSamhita"
                class="mr-2"
              >
              Show Samhita (Continuous)
            </label>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Font Size</label>
          <select 
            v-model="localDisplayOptions.fontSize"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 mt-6">
        <button 
          @click="showDisplayOptions = false"
          class="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button 
          @click="saveDisplayOptions"
          class="px-4 py-2 bg-vedic-primary text-white rounded-md hover:bg-vedic-secondary"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useVedaStore } from '@/stores/vedaStore'
import ScriptSelector from './ScriptSelector.vue'

const vedaStore = useVedaStore()
const showDisplayOptions = ref(false)
const showMobileMenu = ref(false)

const localDisplayOptions = reactive({
  showPadam: vedaStore.displayOptions.showPadam,
  showSamhita: vedaStore.displayOptions.showSamhita,
  fontSize: vedaStore.displayOptions.fontSize
})

function toggleDisplayOptions() {
  showDisplayOptions.value = !showDisplayOptions.value
  if (showDisplayOptions.value) {
    localDisplayOptions.showPadam = vedaStore.displayOptions.showPadam
    localDisplayOptions.showSamhita = vedaStore.displayOptions.showSamhita
    localDisplayOptions.fontSize = vedaStore.displayOptions.fontSize
  }
}

function saveDisplayOptions() {
  vedaStore.updateDisplayOptions(localDisplayOptions)
  showDisplayOptions.value = false
}

function handleScriptChange(script: string) {
  vedaStore.setCurrentScript(script)
}
</script>