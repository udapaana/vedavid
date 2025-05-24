import type { VedaCorpus, SamhitaChapter, BrahmanaBook } from '@/types/veda'
import { getDataUrl } from '@/config/dataConfig'

class VedaService {
  private corpus: VedaCorpus | null = null
  
  async loadCorpus(): Promise<VedaCorpus> {
    if (this.corpus) return this.corpus
    
    try {
      const url = getDataUrl('corpus')
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load corpus data')
      
      this.corpus = await response.json()
      return this.corpus
    } catch (error) {
      console.error('Error loading corpus:', error)
      throw error
    }
  }
  
  async getSamhitaChapter(chapter: string): Promise<SamhitaChapter | null> {
    const corpus = await this.loadCorpus()
    return corpus.samhita?.[chapter] || null
  }
  
  async getBrahmanaBook(book: string): Promise<BrahmanaBook | null> {
    try {
      const url = getDataUrl('brahmana', `book_${book}.json`)
      const response = await fetch(url)
      if (!response.ok) return null
      return await response.json()
    } catch {
      return null
    }
  }
  
  async getAranyakaBook(book: string): Promise<BrahmanaBook | null> {
    try {
      const url = getDataUrl('aranyaka', `book_${book}.json`)
      const response = await fetch(url)
      if (!response.ok) return null
      return await response.json()
    } catch {
      return null
    }
  }
  
  getSamhitaChapters(): string[] {
    if (!this.corpus?.samhita) return []
    return Object.keys(this.corpus.samhita).sort((a, b) => {
      const [aKanda, aChapter] = a.split('.').map(Number)
      const [bKanda, bChapter] = b.split('.').map(Number)
      return aKanda !== bKanda ? aKanda - bKanda : aChapter - bChapter
    })
  }
  
  getBrahmanaBooks(): string[] {
    return ['1', '2', '3']
  }
  
  getAranyakaBooks(): string[] {
    return ['1', '2', '3', '4', '5', '6', '7', '8']
  }
}

export const vedaService = new VedaService()