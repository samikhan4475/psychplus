import * as api from '@psychplus-v2/api'
import { CODESET_CACHE_SECONDS } from '@psychplus-v2/constants'
import { API_URL } from '@psychplus-v2/env'
import type {
  Codeset,
  CodesetCache,
  MetadataCodeset,
} from '@psychplus-v2/types'

const getCodesets = async (names: string[]): Promise<CodesetCache> => {
  const standardCodesetNames: string[] = []
  const metadataCodesetNames: string[] = []

  names.forEach((name) => {
    if (name.includes('.')) {
      standardCodesetNames.push(name)
    } else {
      metadataCodesetNames.push(name)
    }
  })

  const standardCodesetPromises = Promise.all(
    standardCodesetNames.map((name) => {
      const [assigningAuthority, codeSystemName] = name.split('.')

      return api.GET<Codeset>(
        `${API_URL}/api/codeset/authorities/${assigningAuthority}/codesets/${codeSystemName}`,
        {
          next: { revalidate: CODESET_CACHE_SECONDS },
        },
      )
    }),
  )

  const metadataCodesetPromises = Promise.all(
    metadataCodesetNames.map((name) => {
      return api.GET<MetadataCodeset>(
        `${API_URL}/api/metadata/codesets/${name}`,
        {
          next: { revalidate: CODESET_CACHE_SECONDS },
        },
      )
    }),
  )

  const [standardCodesetResults, metadataCodesetResults] = await Promise.all([
    standardCodesetPromises,
    metadataCodesetPromises,
  ])

  const codesetCache: CodesetCache = {}

  standardCodesetResults.forEach((result) => {
    if (result.state === 'error') {
      throw new Error(result.error)
    }

    codesetCache[result.data.codeSystemName] = {
      name: result.data.codeSystemName,
      display: result.data.displayName,
      codes: result.data.codes.map((code) => ({
        value: code.code,
        display: code.displayName,
        attributes: code.codeAttributes?.map((attr) => ({
          name: attr.name,
          value: attr.content,
        })),
      })),
    }
  })

  metadataCodesetResults.forEach((result) => {
    if (result.state === 'error') {
      throw new Error(result.error)
    }

    codesetCache[result.data.code] = {
      name: result.data.code,
      display: result.data.display,
      codes: result.data.codes.map((code) => ({
        value: code.code,
        display: code.display,
        attributes: code.attributes?.map((attr) => ({
          name: attr.name,
          value: attr.value,
        })),
      })),
    }
  })

  return codesetCache
}

export { getCodesets }
