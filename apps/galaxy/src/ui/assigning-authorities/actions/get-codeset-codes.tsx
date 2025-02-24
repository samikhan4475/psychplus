'use server'

import * as api from '@/api'
import { CODESET_CODES_TABLE_PAGE_SIZE } from '@/ui/assigning-authorities/codesets'
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
}

interface GetCodesetCodesResponse {
  codes: Code[]
  total: number
}

const getCodesetCodes = async (
  payload: GetCodsetCodesParams,
): Promise<api.ActionResult<GetCodesetCodesResponse>> => {
  const { page, assigningAuthorityId, codesetId, ...finalPayload } = payload
  const offset = ((payload?.page ?? 1) - 1) * CODESET_CODES_TABLE_PAGE_SIZE
  const url = new URL(api.GET_CODSET_CODES(assigningAuthorityId, codesetId))
  url.searchParams.append('limit', String(CODESET_CODES_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

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
    data: {
      codes: response.data.codes,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getCodesetCodes, type GetCodesetCodesResponse }
