'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Codeset } from '@psychplus-v2/types'

type CodesetParams = {
  authority: string
  codeset: string
  filters?: Record<string, string>
  orderBy?: string
  includeExtraDetails?: boolean
}

const getCodeSetAction = async (
  params: CodesetParams,
): Promise<ActionResult<Codeset>> => {
  const {
    authority,
    codeset,
    filters = {},
    orderBy,
    includeExtraDetails,
  } = params
  const url = new URL(
    `${API_URL}/api/codeset/authorities/${authority}/codesets/${codeset}`,
  )

  Object.entries(filters).forEach(([k, v]) => url.searchParams.append(k, v))
  if (orderBy) url.searchParams.append('orderBy', orderBy)
  if (!includeExtraDetails)
    url.searchParams.append('includeExtraDetails', 'false')
  const result = await api.GET<Codeset>(url.toString())
  if (result.state === 'error') {
    return { state: 'error', error: result.error }
  }

  return { state: 'success', data: result.data }
}

export { getCodeSetAction }
