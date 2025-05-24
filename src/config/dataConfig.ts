export interface DataSourceConfig {
  type: 'local' | 'remote' | 'api'
  baseUrl: string
  endpoints: {
    corpus: string
    samhita: string
    brahmana: string
    aranyaka: string
  }
}

export const dataConfig: DataSourceConfig = {
  type: (import.meta.env.VITE_DATA_SOURCE_TYPE as 'local' | 'remote' | 'api') || 'local',
  baseUrl: import.meta.env.VITE_DATA_BASE_URL || '/data',
  endpoints: {
    corpus: '/taittiriya/web_complete/taittiriya_complete_corpus.json',
    samhita: '/taittiriya/web_enhanced/chapters',
    brahmana: '/taittiriya/web_brahmana_aranyaka/brahmana',
    aranyaka: '/taittiriya/web_brahmana_aranyaka/aranyaka'
  }
}

export function getDataUrl(endpoint: keyof DataSourceConfig['endpoints'], ...pathSegments: string[]): string {
  const baseEndpoint = dataConfig.endpoints[endpoint]
  const segments = pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''
  return `${dataConfig.baseUrl}${baseEndpoint}${segments}`
}