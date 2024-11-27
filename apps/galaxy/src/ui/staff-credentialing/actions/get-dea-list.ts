'use server'

import * as api from '@/api'
import { DEAResponse } from '../../staff-credentialing/types'

interface GetDeaListParams {
  staffId: number
  payload?: { status?: string }
}

const getDeaListAction = async ({
  payload,
}: GetDeaListParams): Promise<api.ActionResult<DEAResponse[]>> => {
  const mockData: DEAResponse[] = [
    {
      state: 'Texas',
      status: 'Active',
      license: 'PSY-678910',
      startDate: '2024-11-25',
      endDate: '2024-12-25',
      alert: true,
    },
    {
      state: 'Washington',
      status: 'Inactive',
      license: 'PSY-678910',
      startDate: '2024-11-25',
      endDate: '2025-11-25',
      alert: true,
    },
    {
      state: 'Washington',
      status: 'Na',
      license: 'PSY-678910',
      startDate: '2024-11-25',
      endDate: '2025-01-25',
      alert: false,
    },
  ]
  return {
    state: 'success',
    data: mockData,
  }
  // @TODO: This block will be used to integrate with the actual API
  // const response = await api.POST<DEAResponse[]>(
  //   api.GET_STAFF_DEA_ENDPOINT,
  //   payload,
  // )
  // if (response.state === 'error') {
  //   return {
  //     state: 'error',
  //     error: response.error,
  //   }
  // }
  // return {
  //   state: 'success',
  //   data: response.data,
  // }
}

export { getDeaListAction }
