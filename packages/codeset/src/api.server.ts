import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { AuthorityCodeSet, RealCodeSet, type CodeSet } from './types'

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

const getReportCategories = async (): Promise<AuthorityCodeSet> =>
  handleRequest(
    fetch(`${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/ReportCategory`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getCodeSetsCached = cache(getCodeSets)
const getRealCodeSetsCached = cache(getRealCodeSets)
const getReportCategoriesCached = cache(getReportCategories)

export {
  getCodeSetsCached as getCodeSets,
  getRealCodeSetsCached as getRealCodeSets,
  getReportCategoriesCached as getReportCategories,
}

