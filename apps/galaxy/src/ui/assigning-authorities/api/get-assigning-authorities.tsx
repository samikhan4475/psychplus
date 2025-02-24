import * as api from '@/api'
import { AssigningAuthority } from '@/ui/assigning-authorities/types'

interface GetAssigningAuthoritiesParams {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  isIncludeMetadataPermissions?: boolean
  isIncludeCodesets?: boolean
  isIncludeCodes?: boolean
  isIncludeCodeAttributes?: boolean
  assigningAuthorityId?: string
  namespace?: string
  oid?: string
  codeSystemName?: string
  recordStatuses?: string[]
  groupingCode?: string
  groupingCodeStartsWith?: string
  codeStartsWith?: string
  codeDisplayNameContains?: string
  attributeName?: string
  attributeContent?: string
  attributeContentContains?: string
}

const getAssigningAuthorities = async (
  payload: GetAssigningAuthoritiesParams,
): Promise<api.ActionResult<AssigningAuthority[]>> => {
  const response = await api.POST<AssigningAuthority[]>(
    `${api.GET_ASSIGNING_AUTHORITIES_WITH_OPTIONAL_CODSET_CODES}`,
    {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      isIncludeMetadataPermissions: true,
      recordStatuses: ['Active'],
      ...payload,
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getAssigningAuthorities }
