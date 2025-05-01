'use server'

import * as api from '@/api'
import { Code, Codeset } from '@/ui/assigning-authorities/types'

interface GetCodsetCodesParams {
  groupingCode?: string
  groupingCodeStartsWith?: string
  codeStartsWith?: string
  codeDisplayName?: string
  codeDisplayNameContains?: string
  attributeName?: string
  attributeNameContains?: string
  attributeContent?: string
  attributeContentContains?: string
  assigningAuthorityId: string
  codesetId: string
  page?: number
  pageSize?: number
}

const getCodesetCodes = async (
  payload: GetCodsetCodesParams,
): Promise<api.ActionResult<Code[]>> => {
  const { page, assigningAuthorityId, codesetId, pageSize, ...finalPayload } =
    payload
  const url = new URL(api.GET_CODSET_CODES(assigningAuthorityId, codesetId))
  if (page && pageSize) {
    const offset = (page - 1) * pageSize
    url.searchParams.append('limit', String(pageSize))
    url.searchParams.append('offset', String(offset))
  }

  const response = await api.POST<Codeset>(`${url}`, {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeCodeAttributes: true,
    recordStatuses: ['Active'],
    ...finalPayload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.codes,
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getCodesetCodes }
