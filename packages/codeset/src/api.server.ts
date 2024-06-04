import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { RealCodeSet, type CodeSet } from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  handleRequest(
    fetch(`${API_URL}/api/metadata/codesets`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
const getRealCodeSets = async (payload = {}): Promise<RealCodeSet[]> => {
  return handleRequest(
    fetch(`${API_URL}/api/codeset/actions/search`, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(payload),
    }),
  )
}

const getCodeSetsCached = cache(getCodeSets)
const getRealCodeSetsCached = cache(getRealCodeSets)

export {
  getCodeSetsCached as getCodeSets,
  getRealCodeSetsCached as getRealCodeSets,
}
