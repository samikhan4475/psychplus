'use server'

import * as api from '@/api'
import { ActiveVisit } from '../types'

const getActiveVisitList = async (): Promise<
  api.ActionResult<ActiveVisit[]>
> => {
  const response = await new Promise<api.NetworkResult<ActiveVisit[]>>(
    (resolve) => {
      setTimeout(() => {
        resolve({ state: 'success', data } as api.NetworkResult<ActiveVisit[]>)
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
    total: 20,
  }
}

const data: ActiveVisit[] = [...Array(30)].map(() => ({
  patientName: 'Angla White Smith',
  gender: 'Male',
  age: '31 yrs',
  visitService: 'TMS Consult',
  visitType: 'OPV',
  visitStatus: 'Scheduled',
  location: 'Willow brook',
  dateTime: '7/17/24 08:00',
}))

export { getActiveVisitList }
