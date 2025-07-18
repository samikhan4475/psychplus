'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { PATIENT_TRANSFER_TABLE_PAGE_SIZE } from '../constants'
import type {
  PatientTransferListResponse,
  PatientTransferPayload,
  PatientTransferRecord,
} from '../types'

interface PatientTransferListParams {
  payload?: PatientTransferPayload
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getPatientTransferListAction = async ({
  payload,
  page = 1,
  sort,
}: PatientTransferListParams): Promise<
  api.ActionResult<PatientTransferListResponse>
> => {
  const offset = (page - 1) * PATIENT_TRANSFER_TABLE_PAGE_SIZE

  const url = new URL(api.GET_RESPONSE_HISTORY_LIST_ENDPOINT)
  url.searchParams.append('limit', String(PATIENT_TRANSFER_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const reqPayload = {
    ...defaultPayLoad,
    ...payload,
  }

  const response = await api.POST<PatientTransferRecord[]>(`${url}`, reqPayload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      transferHistory: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPatientTransferListAction }
