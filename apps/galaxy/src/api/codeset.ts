import { Codeset, CodesetCache, MetadataCodeset } from '@/types'
import * as api from './api'
import {
  METADATA_CODESET_ALL_ENDPOINT,
  STANDARD_CODESET_ENDPOINT,
} from './endpoints'

const CODESET_CACHE_SECONDS = 60 * 60

const getCodesets = async (names: string[]): Promise<CodesetCache> => {
  const standardCodesetNames: string[] = []
  names.forEach((name) => {
    if (name.includes('.')) {
      standardCodesetNames.push(name)
    }
  })

  const standardCodesetPromises = Promise.all(
    standardCodesetNames.map((name) => {
      const [assigningAuthority, codeSystemName] = name.split('.')

      return api.GET<Codeset>(
        STANDARD_CODESET_ENDPOINT(assigningAuthority, codeSystemName),
        {
          next: { revalidate: CODESET_CACHE_SECONDS },
        },
      )
    }),
  )

  const [standardCodesetResults, metadataCodesetResults] = await Promise.all([
    standardCodesetPromises,
    api.GET<MetadataCodeset[]>(METADATA_CODESET_ALL_ENDPOINT, {
      next: { revalidate: CODESET_CACHE_SECONDS },
    }),
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
        groupingCode: code.groupingCode,
      })),
    }
  })

  if (metadataCodesetResults.state === 'error') {
    throw new Error(metadataCodesetResults.error)
  }
  metadataCodesetResults?.data?.map((result) => {
    codesetCache[result.code] = {
      name: result.code,
      display: result.display,
      codes: result?.codes?.map((code) => ({
        value: code.code,
        display: code.display,
        groupingCode: code.groupingCode,
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
