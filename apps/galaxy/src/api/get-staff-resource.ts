import * as api from '@/api'
import { StaffResource } from '@/types'

const getStaffResource = async () => {
  const response = await api.GET<StaffResource>(
    api.GET_SELF_STAFF_DETAILS_ENDPOINT,
  )
  if (response.state === 'error') {
    throw new Error(response.error)
  }

  return response.data
}

export { getStaffResource }
