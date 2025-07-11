'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Waitlist, WaitlistStatus } from '../types'

interface WaitlistPayload {
  isIncludeMetadataResourceChangeControl?: boolean
  isIncludeMetadataResourceIds?: boolean
  isIncludeMetadataResourceStatus?: boolean
  patientIds?: number[]
  providerId?: number
  serviceOffered?: number
  patientName?: string
  dateRangeStart?: string
  dateRangeEnd?: string
  timeRangeStart?: string
  timeRangeEnd?: string
  initiatedDateRangeStart?: string
  initiatedDateRangeEnd?: string
  waitlistStatus?: WaitlistStatus[]
  recordStatuses?: string[]
  isAlertSent?: boolean
  isIncludeStaff?: boolean
  isIncludePatient?: boolean
  page?: number
  pageSize?: number
}

const getWaitlists = async (
  payload: WaitlistPayload,
): Promise<ActionResult<Waitlist[]>> => {
  const { page, pageSize, ...finalPayload } = payload

  const url = new URL(`${API_URL}/api/patients/self/waitlists/actions/search`)
  if (page && pageSize) {
    const offset = (page - 1) * pageSize
    url.searchParams.append('limit', String(pageSize))
    url.searchParams.append('offset', String(offset))
  }

  const result = await api.POST<Waitlist[]>(`${url}`, {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeStaff: true,
    isIncludePatient: true,
    ...finalPayload,
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
    total: Number(result.headers.get('psychplus-totalresourcecount')),
  }
}

export { getWaitlists }
