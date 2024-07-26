import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { CPTCategoryCodeSets, POSCodeSets } from './types'

const getPOSCodeSets = (): Promise<POSCodeSets> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/PlaceOfService?includeExtraDetails=false&offset=0&limit=100&orderBy=displayName asc`,
      {
        headers: createHeaders(),
      },
    ),
  )
}
const getCPTCategCodeSets = async (): Promise<CPTCategoryCodeSets[]> =>
  handleRequest(
    fetch(`${API_URL}/api/metadata/codesets`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPOSCodeSetsCached = cache(getPOSCodeSets)
const getCPTCategoryCodeSetsCached = cache(getCPTCategCodeSets)

export {
  getPOSCodeSetsCached as getPOSCodeSets,
  getCPTCategoryCodeSetsCached as getCPTCategCodeSets,
}
