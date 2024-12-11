'use server'

import * as api from '@/api'
import { StaffLocation } from '../types'

interface UpdateStaffLocationParams {
  status: boolean
  staffId: string
  locationId: string
}

const updateStaffLocationAction = async ({
  staffId,
  locationId,
  status,
}: UpdateStaffLocationParams): Promise<api.ActionResult<StaffLocation>> => {
  console.log(staffId, locationId, status)

  const response = await api.PUT<StaffLocation>(
    api.UPDATE_PROVIDER_LOCATION_STATUS_ENDPOINT(staffId, locationId),
    {
      isActive: status,
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

export { updateStaffLocationAction }
