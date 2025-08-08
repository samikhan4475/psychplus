'use server'

import * as api from '@/api'
import { CodeItem } from '@/types'
import { SearchItem } from '../add-visit/components/search-popover-input'

interface ApiResponse {
  codeSystemName: string
  displayName: string
  version: string
  oid: string
  codes: CodeItem[]
}

const getCptCodeOptions = async (
  value: string,
): Promise<api.ActionResult<SearchItem[]>> => {
  const response = await api.GET<ApiResponse>(api.GET_PROCEDURES_CODES(value))

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const mappedResult: SearchItem[] = response.data?.codes?.map((code) => ({
    value: code.code,
    label: code.displayName,
    code: code.code,
    description: code.displayName,
  })) ?? []
  return {
    state: 'success',
    data: mappedResult,
  }
}

export { getCptCodeOptions }
