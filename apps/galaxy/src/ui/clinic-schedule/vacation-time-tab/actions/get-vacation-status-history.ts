'use server'

import * as api from '@/api'
import { VacationsTime } from '../types'

const getVacationStatusHistory = async (): Promise<
  api.ActionResult<VacationsTime[]>
> => {
  const response = await new Promise<api.NetworkResult<VacationsTime[]>>(
    (resolve) => {
      setTimeout(() => {
        resolve({ state: 'success', data } as api.NetworkResult<
          VacationsTime[]
        >)
      }, 2000)
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

const data: VacationsTime[] = [...Array(20)].map((_, index) => ({
  id: index + 1,
  endDateTime: `2023-01-${10 + index} 00:00`,
  startDateTime: `2023-01-${10 + index} 00:00 `,
  duration: '10 days',
  status: 'Active',
  recordStatus: 'Success',
  staffId: index,
  vacationStatus: 'Completed',
  metadata: {
    createdByFullName: 'John Smith',
    createdOn: '2023-01-10T00:00:00Z',
  },
}))

export { getVacationStatusHistory }
