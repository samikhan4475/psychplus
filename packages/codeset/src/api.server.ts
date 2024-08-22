import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import {
  AssigningAuthorities,
  AssigningAuthority,
  AuthorityCodeSet,
  RealCodeSet,
  RelationshipCodeSet,
  type CodeSet,
} from './types'

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
    fetch(
      `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/ReportCategory`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getRelationshipCodeSets = (): Promise<RelationshipCodeSet> =>
  handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/hl7v3/codesets/RoleCode?includeExtraDetails=false`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const getActiveCodeSets = async (payload = {}): Promise<AssigningAuthority[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/codeset/actions/search?offset=0&limit=0&orderBy=namespace%20asc`,
      {
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify(payload),
        method: 'POST',
      },
    ),
  )

const getAuthorities = async (): Promise<AssigningAuthorities[]> =>
  handleRequest(
    fetch(
      `${API_URL}/api/codeset/actions/search?offset=0&limit=0&orderBy=namespace%20asc`,
      {
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify({
          isIncludeMetadataResourceChangeControl: true,
          isIncludeMetadataResourceIds: true,
          isIncludeMetadataResourceStatus: true,
          isIncludeMetadataPermissions: true,
          isIncludeCodesets: true,
          recordStatuses: ['Active'],
        }),
        method: 'POST',
      },
    ),
  )

const getCodeSetsCached = cache(getCodeSets)
const getRealCodeSetsCached = cache(getRealCodeSets)
const getReportCategoriesCached = cache(getReportCategories)
const getRelationshipCodeSetsCached = cache(getRelationshipCodeSets)
const getActiveCodeSetsCached = cache(getActiveCodeSets)
const getAuthoritiesCached = cache(getAuthorities)

export {
  getCodeSetsCached as getCodeSets,
  getRealCodeSetsCached as getRealCodeSets,
  getReportCategoriesCached as getReportCategories,
  getRelationshipCodeSetsCached as getRelationshipCodeSets,
  getActiveCodeSetsCached as getActiveCodeSets,
  getAuthoritiesCached as getAuthorities,
}
