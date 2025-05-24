export interface VedaMetadata {
  title: string
  description: string
  components: Record<string, ComponentInfo>
  totals: {
    total_texts: number
    total_files_processed: number
  }
  parsing_info?: Record<string, string>
}

export interface ComponentInfo {
  description: string
  [key: string]: any
}

export interface SamhitaVerse {
  verse_id: string
  chapter: string
  padam?: string
  samhita?: string
  has_samhita_match: boolean
}

export interface SamhitaChapter {
  chapter: string
  source_padam_file: string
  verse_count: number
  matched_count: number
  verses: SamhitaVerse[]
}

export interface BrahmanaSection {
  section_id: string
  file_info: string
  text: string
  text_type: 'brahmana' | 'aranyaka'
}

export interface BrahmanaBook {
  text_type: 'brahmana' | 'aranyaka'
  book: string
  section_count: number
  sections: BrahmanaSection[]
}

export interface VedaCorpus {
  metadata: VedaMetadata
  samhita?: Record<string, SamhitaChapter>
  brahmana?: Record<string, BrahmanaBook>
  aranyaka?: Record<string, BrahmanaBook>
}

export interface TextDisplayOptions {
  showPadam: boolean
  showSamhita: boolean
  fontSize: 'sm' | 'md' | 'lg' | 'xl'
}

export interface NavigationState {
  currentTextType: 'samhita' | 'brahmana' | 'aranyaka'
  currentSection: string
  currentVerse?: number
}