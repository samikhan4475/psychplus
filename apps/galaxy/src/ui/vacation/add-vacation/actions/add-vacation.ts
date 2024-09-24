'use server'

import * as api from '@/api'
import { Metadata } from '@/types'

interface VacationsBody {
  recordStatus: string
  staffId: number
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  duration: string
  vacationStatus: string
}

interface VacationsResponse extends VacationsBody {
  metadata: Metadata
}

const addVacation = async ({
  staffId,
  body,
}: {
  staffId: string
  body: VacationsBody
}): Promise<api.ActionResult<VacationsResponse>> => {
  const response = await api.POST<VacationsResponse>(
    `${api.ADD_VACATION(staffId)}`,
    body,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return { state: 'success', data: response.data }
}

export { addVacation }
