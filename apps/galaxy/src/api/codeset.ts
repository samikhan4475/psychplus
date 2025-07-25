import {
  AuthorityCodesetResponse,
  Codeset,
  CodesetCache,
  MetadataCodeset,
} from '@/types'
import * as api from './api'
import {
  METADATA_CODESET_ALL_ENDPOINT,
  STANDARD_CODESET_ENDPOINT,
  STANDARD_CODESET_ENDPOINT_NEW,
} from './endpoints'

const CODESET_CACHE_SECONDS = 60 * 60

export async function getCodesets(names: string[]): Promise<CodesetCache> {
  const codesetCache: CodesetCache = {}
  // ② Build all your standard‑codeset calls
  const standardCodesetPromises: Array<
    Promise<api.NetworkResult<Codeset | AuthorityCodesetResponse>>
  > = []

  const batchMap: Record<string, Set<string>> = {}

  for (const name of names) {
    if (!name.includes('.')) continue
    const [authority, system, grouping] = name.split('.')

    if (grouping) {
      standardCodesetPromises.push(
        api.GET<Codeset>(
          STANDARD_CODESET_ENDPOINT(authority, system, grouping),
          { next: { revalidate: CODESET_CACHE_SECONDS } },
        ),
      )
    } else {
      if (!batchMap[authority]) batchMap[authority] = new Set()
      batchMap[authority].add(system)
    }
  }

  for (const [authority, systems] of Object.entries(batchMap)) {
    const params = new URLSearchParams({ isIncludeAttributes: 'true' })
    systems.forEach((cs) => params.append('codeSystems', cs))
    standardCodesetPromises.push(
      api.GET<AuthorityCodesetResponse>(
        STANDARD_CODESET_ENDPOINT_NEW(authority, params.toString()),
        { next: { revalidate: CODESET_CACHE_SECONDS } },
      ),
    )
  }

  const [standardCodesetResults, metadataCodesetResults] = await Promise.all([
    Promise.all(standardCodesetPromises),
    api.GET<MetadataCodeset[]>(METADATA_CODESET_ALL_ENDPOINT, {
      next: { revalidate: CODESET_CACHE_SECONDS },
    }),
  ])

  for (const res of standardCodesetResults) {
    if (res.state === 'error') throw new Error(res.error)
    const payload = res.data ?? {}

    if ('codesets' in payload) {
      for (const cs of payload.codesets) {
        mergeCodeset(codesetCache, cs)
      }
    } else {
      mergeCodeset(codesetCache, payload)
    }
  }

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

// — helper to merge one Codeset into the cache
function mergeCodeset(cache: CodesetCache, cs: Codeset) {
  const { codeSystemName, displayName, codes } = cs
  const transformed = codes?.map(
    ({
      code,
      displayName,
      groupingCode,
      codeAttributes,
      attributes: rawAttributes,
    }) => {
      const sourceAttrs = codeAttributes ?? rawAttributes ?? []
      return {
        value: code,
        display: displayName,
        groupingCode,
        attributes: sourceAttrs?.map(({ name, content }) => ({
          name,
          value: content,
        })),
      }
    },
  )

  const existing = cache[codeSystemName]

  cache[codeSystemName] = existing
    ? { ...existing, codes: [...existing.codes, ...transformed] }
    : { name: codeSystemName, display: displayName, codes: transformed }
}
