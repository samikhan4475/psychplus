'use server'

import * as api from '@/api'
import { LicenseHistoryResponse } from '../types'

interface GetLicenseHistoryParams {
  staffId: number
  payload?: { status?: string }
}

const getLicenseHistoryAction = async ({
  payload,
}: GetLicenseHistoryParams): Promise<
  api.ActionResult<LicenseHistoryResponse[]>
> => {
  // @TODO: This block will be used to integrate with the actual API
  // const response = await api.POST<LicenseHistoryResponse[]>(
  //   api.GET_STAFF_LICENSE_HISTORY_ENDPOINT,
  //   payload,
  // )
  // if (response.state === 'error') {
  //   return {
  //     state: 'error',
  //     error: response.error,
  //   }
  // }
  const mockData: LicenseHistoryResponse[] = [
    {
      status: 'Active',
      license: 'PSY-678910',
      startDate: '2024-11-25',
      endDate: '2024-12-25',
      createdAt: '2024-11-25',
      user: 'John Doe',
    },
    {
      status: 'Inactive',
      license: 'PSY-678910',
      startDate: '2024-11-25',
      endDate: '2025-11-25',
      createdAt: '2024-11-25',
      user: 'John Doe',
    },
    {
      status: 'Na',
      license: 'PSY-678910',
      startDate: '2024-11-25',
      endDate: '2025-01-25',
      createdAt: '2024-11-25',
      user: 'John Doe',
    },
  ]
  return {
    state: 'success',
    data: [...mockData],
  }
}

export { getLicenseHistoryAction }
