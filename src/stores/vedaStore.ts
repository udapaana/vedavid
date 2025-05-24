import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { VedaCorpus, NavigationState, TextDisplayOptions } from '@/types/veda'
import { vedaService } from '@/services/vedaService'
import { transliterationService } from '@/services/transliterationService'

export const useVedaStore = defineStore('veda', () => {
  const corpus = ref<VedaCorpus | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const navigation = ref<NavigationState>({
    currentTextType: 'samhita',
    currentSection: '1.1'
  })
  
  const displayOptions = ref<TextDisplayOptions>({
    showPadam: true,
    showSamhita: true,
    fontSize: 'md'
  })
  
  const currentScript = ref(transliterationService.getCurrentScript())
  
  const isLoaded = computed(() => corpus.value !== null)
  
  const availableChapters = computed(() => {
    if (!corpus.value?.samhita) return []
    return Object.keys(corpus.value.samhita).sort((a, b) => {
      const [aKanda, aChapter] = a.split('.').map(Number)
      const [bKanda, bChapter] = b.split('.').map(Number)
      return aKanda !== bKanda ? aKanda - bKanda : aChapter - bChapter
    })
  })
  
  async function loadCorpus() {
    loading.value = true
    error.value = null
    
    try {
      corpus.value = await vedaService.loadCorpus()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load corpus'
    } finally {
      loading.value = false
    }
  }
  
  function setCurrentSection(textType: NavigationState['currentTextType'], section: string) {
    navigation.value.currentTextType = textType
    navigation.value.currentSection = section
    navigation.value.currentVerse = undefined
  }
  
  function setCurrentVerse(verse: number) {
    navigation.value.currentVerse = verse
  }
  
  function updateDisplayOptions(options: Partial<TextDisplayOptions>) {
    displayOptions.value = { ...displayOptions.value, ...options }
  }
  
  function setCurrentScript(script: string) {
    currentScript.value = script
    transliterationService.setCurrentScript(script)
  }
  
  function getStaticTransliteration(transliterations: Record<string, string> | undefined) {
    return transliterationService.getStaticTransliteration(transliterations, currentScript.value)
  }

  function transliterate(text: string, fromScript?: string, toScript?: string) {
    return transliterationService.transliterate(text, fromScript, toScript || currentScript.value)
  }
  
  return {
    corpus: readonly(corpus),
    loading: readonly(loading),
    error: readonly(error),
    navigation: readonly(navigation),
    displayOptions: readonly(displayOptions),
    currentScript: readonly(currentScript),
    isLoaded,
    availableChapters,
    loadCorpus,
    setCurrentSection,
    setCurrentVerse,
    updateDisplayOptions,
    setCurrentScript,
    getStaticTransliteration,
    transliterate
  }
})